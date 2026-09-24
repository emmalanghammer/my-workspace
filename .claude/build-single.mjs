#!/usr/bin/env node
/* Fold the whole prototype into ONE .html file you can attach to an email.

   Run:  node .claude/build-single.mjs
   Out:  rmx-prototype-single.html

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
const OUT = join(ROOT, 'rmx-prototype-single.html');

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
<style>
  html, body { margin: 0; height: 100%; background: #f1f1f1; }
  #screen { display: block; border: 0; width: 100%; height: 100%; }
</style>
</head>
<body>
<!-- The whole RMX prototype in one file: My Workspace, the Tasks register and
     the Tenants register, with the mega menu, the AI filters and the task
     overlays. Built by .claude/build-single.mjs from the linked screens.
     Open it straight from disk, no server needed. -->
<iframe id="screen" title="RMX prototype"></iframe>
<script>
(function () {
  var SCREENS = {
${Object.keys(SCREENS).map(n => `    ${JSON.stringify(n)}: ${literal(pages[n])}`).join(',\n')}
  };

  /* One object standing in for sessionStorage, shared by every screen, so
     cross-screen state survives a navigation the way it does on the site. */
  function makeStore() {
    var d = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(d, k) ? d[k] : null; },
      setItem: function (k, v) { d[k] = String(v); },
      removeItem: function (k) { delete d[k]; },
      clear: function () { d = {}; },
      key: function (i) { return Object.keys(d)[i] || null; },
      get length() { return Object.keys(d).length; }
    };
  }
  window.__rmxStore = makeStore();

  var SHIM = [
    '<script>(function(){',
    'var SEARCH = __SEARCH__;',
    'var U = window.URLSearchParams;',
    'window.URLSearchParams = function (init) {',
    '  return new U(arguments.length === 0 || init === "" || init == null ? SEARCH : init);',
    '};',
    'window.URLSearchParams.prototype = U.prototype;',
    'var store = null;',
    'try { store = parent.__rmxStore; } catch (e) {}',
    'if (!store) { var d = {}; store = {',
    '  getItem: function (k) { return Object.prototype.hasOwnProperty.call(d, k) ? d[k] : null; },',
    '  setItem: function (k, v) { d[k] = String(v); },',
    '  removeItem: function (k) { delete d[k]; },',
    '  clear: function () { d = {}; },',
    '  key: function (i) { return Object.keys(d)[i] || null; },',
    '  get length() { return Object.keys(d).length; } }; }',
    'try {',
    '  Object.defineProperty(window, "sessionStorage", { configurable: true, get: function () { return store; } });',
    '  Object.defineProperty(window, "localStorage", { configurable: true, get: function () { return store; } });',
    '} catch (e) {}',
    'window.__rmxNav = function (href) { parent.postMessage({ rmxNav: String(href) }, "*"); };',
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

  var frame = document.getElementById('screen');

  function render(r) {
    var shim = SHIM.replace('__SEARCH__', JSON.stringify(r.search));
    frame.srcdoc = SCREENS[r.key].replace('<head>', '<head>' + shim);
  }

  function fromHash() {
    return route(decodeURIComponent((location.hash || '').replace(/^#/, '')) || 'index.html');
  }

  window.addEventListener('message', function (e) {
    if (!e.data || !e.data.rmxNav) return;
    var r = route(e.data.rmxNav);
    var next = '#' + r.key + r.search;
    if (location.hash === next) render(r);
    else location.hash = next;
  });

  window.addEventListener('hashchange', function () { render(fromHash()); });
  render(fromHash());
})();
<\/script>
</body>
</html>
`;

writeFileSync(OUT, shell);
console.log('  wrote rmx-prototype-single.html  ' + Math.round(shell.length / 1024) + ' KB');
notes.forEach(n => console.log(n));
