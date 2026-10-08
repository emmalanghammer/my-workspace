#!/usr/bin/env node
/* Fold the whole prototype into ONE .html file you can attach to an email.

   Run:  node .claude/build-single.mjs
   Out:  TasksandAIFilters.html   <- the name Emma sends it under

   NO IFRAME, deliberately. Every screen is written straight into the top
   document, because a browser extension's content script usually only runs
   there: with the screens inside an <iframe srcdoc> a cursor highlighter saw a
   page where the pointer never moved, which is most of what this file is for
   during a demo. Emma's constraint, 2026-10-08 (mClick - Professional Cursor
   Studio: activeTab, no host permissions, so top frame only).

   The frame used to earn its keep by keeping the three screens' globals apart
   -- each declares its own `state`, `matches`, `renderAll`. A full reload does
   the same job for free: navigating sets location.hash and reloads, so every
   screen starts in a brand-new global and can never collide with the last one.
   State that has to survive a navigation goes through real sessionStorage,
   which is what the screens already use and what a reload preserves.

   This does its own inlining from the linked screens rather than reading
   dist/. scripts/bundle.mjs (the skill's bundler) writes a literal </script>
   into the page when it inlines any of assets/{datetime,history-notes,
   megamenu}.js, because each of those files shows its own <script src=...>
   tag in a header comment. The HTML parser ends the block at that comment,
   so the rest of the file lands on the page as text and never runs: in a
   bundled tasks.html the task details never open and ~80 elements appear
   with ids like \"hnOverlay\". Raise it with Emma; the fix belongs in the
   skill, not here. Escaping the closer is the whole of it.

   Why a wrapper and not a concatenation: each screen is a whole document
   with its own <style> and <script>. Merged into one document they would
   fight. So each screen stays a complete document, rendered into an iframe
   via srcdoc one at a time, with a shim injected ahead of the screen's own
   scripts to replace the three things an iframe takes away:

     1. the query string - srcdoc has no URL, so ?open=... is gone. The shim
                           feeds the pending search to URLSearchParams.
     2. storage          - a document with no URL (and a file:// page) has no
                           sessionStorage, so taskstate.js would throw. The
                           shim points it at one object shared by every
                           screen, which is what sessionStorage was for.
     3. navigation       - a relative href cannot resolve against srcdoc. The
                           shim posts links up to the wrapper, which renders
                           the next screen.

   The wrapper routes on the hash (#tasks.html?open=...) so Back works. */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = process.cwd();
/* Named for what it is, not for what built it: this is the file that gets
   attached to an email, and "TasksandAIFilters.html" is what Emma calls the
   prototype. Renamed from rmx-prototype-single.html on 2026-09-29. */
const OUT = join(ROOT, 'TasksandAIFilters.html');

/* name in the single file -> path on disk */
const SCREENS = {
  'index.html': 'index.html',
  'tasks.html': 'screens/tasks.html',
  'tenants.html': 'screens/tenants.html'
};

const problems = [];
const notes = [];

/* A <script> block ends at the first </script the parser sees, wherever it
   sits - a comment and a string are no protection. Every occurrence in this
   prototype is a usage example in a file header, so escaping the slash is
   safe; it would not be inside a regex literal. */
const escapeCloser = js => js.replace(/<\/script/gi, '<\\/script');

/* Replacements go in through a FUNCTION. As a replacement string, every $&
   in a stylesheet or a script would expand to the match. */
const put = (html, tag, body) => html.replace(tag, () => body);

function inline(name, file) {
  const dir = dirname(resolve(ROOT, file));
  let html = readFileSync(resolve(ROOT, file), 'utf8');
  let css = 0, js = 0;

  /* The href may carry a ?v= cache-busting stamp (.claude/stamp-assets.mjs);
     strip it to reach the file. */
  html = html.replace(/<link rel="stylesheet" href="([^"]+\.css)(?:\?v=[0-9a-f]+)?">/g, (m, href) => {
    const text = readFileSync(resolve(dir, href), 'utf8');
    if (/<\/style/i.test(text)) problems.push(`${name}: ${href} contains </style`);
    css++;
    return `<style data-inlined>/* ${href.replace(/^(\.\.\/)?assets\//, '')} */\n${text}</style>`;
  });

  html = html.replace(/<script src="([^"]+\.js)(?:\?v=[0-9a-f]+)?"><\/script>/g, (m, src) => {
    const text = readFileSync(resolve(dir, src), 'utf8');
    js++;
    return `<script data-inlined>/* ${src.replace(/^(\.\.\/)?assets\//, '')} */\n${escapeCloser(text)}</script>`;
  });

  /* Favicons are the wrapper's job; inside an iframe they are dead requests. */
  html = html.replace(/<link rel="(?:icon|apple-touch-icon)"[^>]*>/g, '');

  /* location.href = X cannot resolve against srcdoc. Route it through the
     shim, and fail loudly if the shape ever changes rather than shipping a
     dead link. */
  const hrefAssigns = (html.match(/\b(?:window\.)?location\.href\s*=/g) || []).length;
  html = html.replace(/\b(?:window\.)?location\.href\s*=\s*([^;]+);/g,
                      (_m, expr) => `window.__rmxNav(${expr});`);

  /* Nothing may still ASK for a file that will not be there. Only tags that
     make a request count: the shared assets quote <script src=...> and
     <use href=...> inside their header comments, which fetch nothing. */
  const markup = html.replace(/<(script|style) data-inlined>[\s\S]*?<\/\1>/g, '');
  const left = [
    ...(markup.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || []),
    ...(markup.match(/<script[^>]+src="(?!https?:)[^"]*"/g) || []),
    ...(markup.match(/<use[^>]+href="(?!#)[^"]*"/g) || []),
    ...(markup.match(/<img[^>]+src="(?!data:|https?:)[^"]*"/g) || [])
  ].filter(t => !/fonts\.googleapis\.com/.test(t));
  if (left.length) problems.push(`${name}: still requests ${[...new Set(left)].join(' | ')}`);
  if (html.indexOf('<head>') === -1) problems.push(`${name}: no <head> to inject the shim into`);

  notes.push(`    ${name.padEnd(13)} ${String(Math.round(html.length / 1024)).padStart(4)} KB   ` +
             `${css} css, ${js} js inlined` + (hrefAssigns ? `, ${hrefAssigns} location.href rewritten` : ''));
  return html;
}

const pages = {};
for (const [name, file] of Object.entries(SCREENS)) pages[name] = inline(name, file);
if (problems.length) { console.error('  ' + problems.join('\n  ')); process.exit(1); }

/* A screen becomes a JS string literal. JSON.stringify handles the quotes and
   newlines; the <\/ keeps a screen's own </script> from closing the wrapper. */
const literal = s => JSON.stringify(s).replace(/<\//g, '<\\/');

const favicon = readFileSync(join(ROOT, 'assets/favicon.svg'), 'utf8');
const faviconURI = 'data:image/svg+xml;base64,' + Buffer.from(favicon).toString('base64');

const shell = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tasks and AI Filters</title>
<link rel="icon" type="image/svg+xml" href="${faviconURI}">
</head>
<body>
<!-- The whole RMX prototype in one file: My Workspace, the Tasks register and
     the Tenants register, with the mega menu, the AI filters and the task
     overlays. Built by .claude/build-single.mjs from the linked screens.
     Open it straight from disk, no server needed.

     The chosen screen is written into THIS document, not into a frame, so a
     browser extension sees the real page. See the builder's header. -->
<script>
(function () {
  var SCREENS = {
${Object.keys(SCREENS).map(n => `    ${JSON.stringify(n)}: ${literal(pages[n])}`).join(',\n')}
  };

  /* Injected ahead of each screen's own scripts. It papers over the three
     things a screen notices about being one of several in one file. */
  var SHIM = [
    '<script>(function(){',
    /* 1. the query string. It lives in the hash here ("#tasks.html?open=..."),
          so ?open= and ?notes= would otherwise be invisible to the screen. */
    'var SEARCH = __SEARCH__;',
    'var U = window.URLSearchParams;',
    'window.URLSearchParams = function (init) {',
    '  return new U(arguments.length === 0 || init === "" || init == null ? SEARCH : init);',
    '};',
    'window.URLSearchParams.prototype = U.prototype;',
    /* 2. storage. Real sessionStorage, because a navigation is a reload now and
          an in-memory stand-in would forget everything on the way. Chrome gives
          a file:// page its own sessionStorage; if a browser refuses, the
          screens still run, they just stop remembering across screens. */
    'try { window.sessionStorage.setItem("__rmx", "1"); window.sessionStorage.removeItem("__rmx"); }',
    /* If a browser refuses storage to a file:// page, fall back to window.name,
       which survives a same-tab navigation and is just a string. A plain
       in-memory object would forget everything on every reload, and a reload is
       exactly what a navigation is here -- claiming a task and then changing
       screen would quietly lose the claim. */
    'catch (e) {',
    '  var TAG = "__rmx:";',
    '  var d = {};',
    '  try { if (name.indexOf(TAG) === 0) d = JSON.parse(name.slice(TAG.length)) || {}; } catch (e3) { d = {}; }',
    '  var flush = function () { try { name = TAG + JSON.stringify(d); } catch (e4) {} };',
    '  var store = {',
    '    getItem: function (k) { return Object.prototype.hasOwnProperty.call(d, k) ? d[k] : null; },',
    '    setItem: function (k, v) { d[k] = String(v); flush(); },',
    '    removeItem: function (k) { delete d[k]; flush(); },',
    '    clear: function () { d = {}; flush(); },',
    '    key: function (i) { return Object.keys(d)[i] || null; },',
    '    get length() { return Object.keys(d).length; } };',
    '  try {',
    '    Object.defineProperty(window, "sessionStorage", { configurable: true, get: function () { return store; } });',
    '    Object.defineProperty(window, "localStorage", { configurable: true, get: function () { return store; } });',
    '  } catch (e2) {}',
    '}',
    /* 3. navigation. A relative href has nowhere to go in a one-file build, so
          every link to a screen becomes a hash change plus a reload -- which is
          also what hands the next screen a clean global. */
    'window.__rmxNav = function (href) {',
    '  var raw = String(href || "");',
    '  var q = raw.indexOf("?");',
    '  var path = q === -1 ? raw : raw.slice(0, q);',
    '  var key = path.split("/").pop() || "index.html";',
    '  var next = "#" + key + (q === -1 ? "" : raw.slice(q));',
    '  if (location.hash === next) location.reload();',
    '  else { location.hash = next; location.reload(); }',
    '};',
    'document.addEventListener("click", function (e) {',
    '  var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;',
    '  if (!a) return;',
    '  var h = a.getAttribute("href");',
    '  if (!h || !/\\\\.html(\\\\?|$)/.test(h)) return;',
    '  e.preventDefault();',
    '  window.__rmxNav(h);',
    '}, true);',
    '})();<\\/' + 'script>'
  ].join('');

  function route(href) {
    var raw = String(href || '');
    var q = raw.indexOf('?');
    var path = q === -1 ? raw : raw.slice(0, q);
    var search = q === -1 ? '' : raw.slice(q);
    var key = path.split('/').pop() || 'index.html';
    if (!SCREENS[key]) key = 'index.html';
    return { key: key, search: search };
  }

  var r = route(decodeURIComponent((location.hash || '').replace(/^#/, '')) || 'index.html');
  var html = SCREENS[r.key];

  /* The screen's own <body> attributes, applied by hand rather than left to
     the parser's merging rules: My Workspace is <body class="rmx"> and the
     whole page is styled off that class. */
  var bodyTag = /<body([^>]*)>/i.exec(html);
  if (bodyTag && bodyTag[1].trim()) {
    var holder = document.createElement('div');
    holder.innerHTML = '<i ' + bodyTag[1].trim() + '></i>';
    var attrs = holder.firstChild.attributes;
    for (var i = 0; i < attrs.length; i++) document.body.setAttribute(attrs[i].name, attrs[i].value);
  }

  /* Written during the initial parse, so the screen's scripts run in order and
     its DOMContentLoaded listeners fire the way they do on the real page. The
     screen's own <!doctype>, <html>, <head> and <body> tags are ignored at this
     point in the stream; its <style> blocks still apply. */
  document.write(SHIM.replace('__SEARCH__', JSON.stringify(r.search)) + html);
  /* Back and forward change the hash without reloading, so make them reload. */
  window.addEventListener('hashchange', function () { location.reload(); });
})();
<\/script>
</body>
</html>
`;

writeFileSync(OUT, shell);
console.log('  wrote TasksandAIFilters.html  ' + Math.round(shell.length / 1024) + ' KB');
notes.forEach(n => console.log(n));
