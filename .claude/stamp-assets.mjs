#!/usr/bin/env node
/* Stamp a content hash onto every stylesheet and script the screens link.

   Run:  node .claude/stamp-assets.mjs        (after changing anything in assets/)

   Why: GitHub Pages serves HTML revalidated but assets with max-age=600, so for
   ten minutes after a push a visitor can get the new markup with the old
   stylesheet. That is not a blank page, it is a page laid out by rules written
   for different markup, which looks far more broken than either version is --
   it bit us on 2026-09-24, with the mention rows drawn by a grid meant for a
   layout that no longer existed.

   A hash in the URL makes a changed file a different file, so a stale copy can
   never be paired with new markup. Unchanged assets keep their hash and stay
   cached, which is the point of the cache.

   Idempotent: run it as often as you like. It only rewrites when a hash
   actually moved, so a no-op run leaves the files untouched. */

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';

const ROOT = process.cwd();
const PAGES = ['index.html', 'screens/tasks.html', 'screens/tenants.html',
               'screens/my-workspace.html', 'screens/my-workspace-original.html'];

const hashes = new Map();
function hashOf(file) {
  if (!hashes.has(file)) {
    hashes.set(file, createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8));
  }
  return hashes.get(file);
}

let changed = 0, stamped = 0;
const missing = [];

for (const page of PAGES) {
  const path = join(ROOT, page);
  const dir = dirname(path);
  let html;
  try { html = readFileSync(path, 'utf8'); } catch { continue; }

  /* Only inside a real tag. The shared assets quote their own
     <script src="assets/x.js"> in header comments, and those fetch nothing --
     an earlier version of this script stamped those too and then failed
     looking for files at paths that were never meant to resolve. */
  const stamp = (whole, head, url, _old, tail) => {
    const file = resolve(dir, url);
    let h;
    try { h = hashOf(file); } catch { missing.push(page + ' -> ' + url); return whole; }
    stamped++;
    return head + url + '?v=' + h + tail;
  };
  const out = html
    .replace(/(<link\b[^>]*\bhref=")((?:\.\.\/)?assets\/[\w-]+\.css)(\?v=[0-9a-f]+)?(")/g, stamp)
    .replace(/(<script\b[^>]*\bsrc=")((?:\.\.\/)?assets\/[\w-]+\.js)(\?v=[0-9a-f]+)?(")/g, stamp);

  if (out !== html) { writeFileSync(path, out); changed++; }
}

if (missing.length) {
  console.error('  these are linked but not on disk:\n    ' + missing.join('\n    '));
  process.exit(1);
}
console.log(`  stamped ${stamped} asset link(s) across ${PAGES.length} page(s); ${changed} file(s) rewritten`);
