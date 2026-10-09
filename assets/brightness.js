/* ============================================================
   Display brightness
   ------------------------------------------------------------
   A projector in a bright room washes the prototype out: the
   light greys the design leans on stop reading at all. This
   puts a slider behind the app bar's avatar so the whole page
   can be darkened (with a little extra contrast to keep those
   greys apart) or brightened on the spot.

   Self-injecting, the same arrangement as assets/megamenu.js
   and assets/history-notes.js: a screen picks it up with one
   line and gets the behaviour and the styling together.

     <script src="assets/brightness.js"></script>

   It carries its own <style> rather than a companion .css,
   because it is ten rules and a second <link> on every screen
   is more to keep in step than it is worth. It depends on
   nothing from the host screen except the avatar's class.

   Emma's spec, 2026-10-09.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'display-brightness';
  var MIN = -40, MAX = 30;
  var WIDTH = 300;              /* must match .bright-pop width below */
  var AVATAR = '.rmx-appbar__avatar';

  /* ---- the filter itself ----
     Darker alone makes a washed-out projector worse, not better: everything
     slides toward the middle and the hairlines and light greys this design is
     built from disappear. So going down also pushes contrast up, enough to
     keep them apart. Going up is brightness only -- adding contrast there
     would crush the whites the page is mostly made of.

     At v = 0 the filter is removed outright rather than set to a no-op, so a
     page nobody has touched carries no filter at all. */
  function applyBrightness(v) {
    v = Math.max(MIN, Math.min(MAX, parseInt(v, 10) || 0));
    var brightness = 1 + v / 100;
    var contrast = v < 0 ? 1 + (-v / 100) * 1.4 : 1;
    document.documentElement.style.filter = v
      ? 'brightness(' + brightness.toFixed(2) + ') contrast(' + contrast.toFixed(2) + ')'
      : '';
    try { localStorage.setItem(KEY, String(v)); } catch (e) {}
    return v;
  }

  /* Storage can throw outright -- a file:// page in some browsers, a private
     window, blocked site data -- and a prototype that will not open because
     somebody's browser declined to remember a slider is worse than one that
     forgets it. Every read and write is wrapped. */
  function savedBrightness() {
    try {
      var raw = localStorage.getItem(KEY);
      return Math.max(MIN, Math.min(MAX, parseInt(raw, 10) || 0));
    } catch (e) { return 0; }
  }

  var STYLE = [
    AVATAR + ' { cursor: pointer; }',
    '.bright-pop { position: fixed; z-index: 3000; width: ' + WIDTH + 'px; box-sizing: border-box;',
    '  padding: 12px 16px; background: var(--background-tile, #fff);',
    '  border: 1px solid var(--border-primary, #cedbe7); border-radius: var(--radius-sm, 4px);',
    /* No shadow token exists; the floating panels on these screens are written
       out the same way. */
    '  box-shadow: 0 6px 24px rgba(19, 49, 76, .22); }',
    '.bright-pop[hidden] { display: none; }',
    '.bp-t { font: var(--type-label-m-semibold, 600 14px/normal Roboto, sans-serif);',
    '  color: var(--text-secondary, #13314c); margin-bottom: 8px; }',
    '.bp-row { display: flex; align-items: center; gap: 8px; }',
    '.bp-row input[type=range] { flex: 1; min-width: 0; accent-color: var(--text-link, #008dd5); }',
    '.bp-end, .bp-foot { font: var(--type-label-s-regular, 400 12px/normal Roboto, sans-serif);',
    '  color: var(--text-secondary, #13314c); }',
    '.bp-end { flex: none; }',
    '.bp-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }',
    /* A link, the way every other "do the small thing" control on these
       screens is a link rather than a button. */
    '.bp-foot button { border: 0; background: none; padding: 0; cursor: pointer;',
    '  font: inherit; color: var(--text-link, #008dd5); }'
  ].join('\n');

  function injectStyle() {
    if (document.getElementById('brightStyle')) return;
    var el = document.createElement('style');
    el.id = 'brightStyle';
    el.textContent = STYLE;
    (document.head || document.documentElement).appendChild(el);
  }

  function pop() { return document.getElementById('brightPop'); }

  /* Below the avatar and running leftward from its right edge, so it hangs off
     the thing that opened it rather than off the corner of the window. Both
     edges are clamped: at a narrow window the panel would otherwise start off
     the left of the screen, which is the one place nobody would look for it. */
  function place(el, anchor) {
    var r = anchor.getBoundingClientRect();
    var right = Math.round(window.innerWidth - r.right);
    right = Math.max(8, Math.min(right, window.innerWidth - WIDTH - 8));
    el.style.right = right + 'px';
    el.style.top = Math.max(8, Math.round(r.bottom + 8)) + 'px';
  }

  function openBrightness(anchor) {
    var el = pop();
    if (!el) {
      el = document.createElement('div');
      el.id = 'brightPop';
      el.className = 'bright-pop';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', 'Display brightness');
      document.body.appendChild(el);
    }
    var v = savedBrightness();
    el.innerHTML =
      '<div class="bp-t">Display brightness</div>' +
      '<div class="bp-row">' +
        '<span class="bp-end">Darker</span>' +
        '<input type="range" id="brightRange" min="' + MIN + '" max="' + MAX + '" step="1"' +
        ' value="' + v + '" aria-label="Display brightness">' +
        '<span class="bp-end">Brighter</span>' +
      '</div>' +
      '<div class="bp-foot">' +
        '<span id="brightVal">' + label(v) + '</span>' +
        '<button type="button" id="brightReset">Reset</button>' +
      '</div>';
    el.hidden = false;
    place(el, anchor);
  }

  function label(v) { return (v > 0 ? '+' : '') + v; }
  function close() { var el = pop(); if (el) el.hidden = true; }
  function isOpen() { var el = pop(); return !!el && !el.hidden; }

  document.addEventListener('input', function (e) {
    if (!e.target || e.target.id !== 'brightRange') return;
    var v = applyBrightness(e.target.value);
    var out = document.getElementById('brightVal');
    if (out) out.textContent = label(v);
  });

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('#brightReset')) {
      applyBrightness(0);
      var range = document.getElementById('brightRange');
      var out = document.getElementById('brightVal');
      if (range) range.value = 0;
      if (out) out.textContent = label(0);
      return;
    }
    var avatar = t.closest(AVATAR);
    if (avatar) {
      if (isOpen()) close(); else openBrightness(avatar);
      return;
    }
    if (isOpen() && !t.closest('#brightPop')) close();
  });

  /* Escape closes it, as it does every other overlay on these screens. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close();
  });

  /* Anchored to an element that moves when the window changes width. */
  window.addEventListener('resize', function () {
    if (!isOpen()) return;
    var avatar = document.querySelector(AVATAR);
    if (avatar) place(pop(), avatar); else close();
  });

  injectStyle();
  applyBrightness(savedBrightness());
})();
