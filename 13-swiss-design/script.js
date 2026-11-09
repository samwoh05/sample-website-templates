/* KONZERT / INDEX: small helpers. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  /* 1. Grid overlay: header button or footer button ------------------------- */
  var overlay = document.querySelector('.grid-overlay');
  var gridBtns = document.querySelectorAll('[data-grid-toggle]');
  var KEY = 'swiss-grid';
  function setGrid(on, save) {
    overlay.classList.toggle('is-on', on);
    gridBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
    });
    if (save) { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} }
  }
  function toggleGrid() { setGrid(!overlay.classList.contains('is-on'), true); }
  var stored = false;
  try { stored = localStorage.getItem(KEY) === '1'; } catch (e) {}
  overlay.classList.add('no-anim');
  setGrid(stored, false);
  requestAnimationFrame(function () { requestAnimationFrame(function () { overlay.classList.remove('no-anim'); }); });
  gridBtns.forEach(function (b) { b.addEventListener('click', toggleGrid); });
  /* 2. Menu panel below 1024px -------------------------------------------- */
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  function setMenu(open, returnFocus) {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close' : 'Menu';
    if (!open && returnFocus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) setMenu(false, true);
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  var desktop = window.matchMedia('(min-width: 1024px)');
  desktop.addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  /* 3. Current section in the nav, and section rules drawing in ------------ */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { spy.observe(s); });
    var drawer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-drawn'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.section__rule').forEach(function (r) { drawer.observe(r); });
  } else {
    root.classList.remove('js-motion');
  }
  /* 4. Basel clock, hours and minutes, every 30 seconds -------------------- */
  var clock = document.querySelector('[data-clock]');
  if (clock && window.Intl) {
    try {
      var fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit',
        hourCycle: 'h23', timeZoneName: 'short'
      });
      var tick = function () {
        var parts = {};
        fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
        var hm = parts.hour + ':' + parts.minute;
        clock.textContent = hm + ' ' + (parts.timeZoneName || 'CET');
        clock.setAttribute('datetime', hm);
      };
      tick();
      setInterval(tick, 30000);
    } catch (e) { /* keep the static "Basel, CET" text */ }
  }
  /* 5. Hero black field: starts at the top of "Velten." -------------------- */
  var hero = document.querySelector('.hero');
  var line2 = hero && hero.querySelector('.hero__line--2');
  var heroIndex = hero && hero.querySelector('.hero__index');
  var small = window.matchMedia('(max-width: 599px)');
  function placeBlock() {
    if (!line2) return;
    if (small.matches) { hero.style.removeProperty('--block-top'); return; }
    var top0 = hero.getBoundingClientRect().top;
    var top = line2.getBoundingClientRect().top - top0;
    if (desktop.matches) top = Math.max(top, heroIndex.getBoundingClientRect().bottom - top0 + 32);
    hero.style.setProperty('--block-top', Math.round(top) + 'px');
  }
  var raf = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(placeBlock); });
  placeBlock();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeBlock);
  /* 6. Demo contact form --------------------------------------------------- */
  var form = document.querySelector('.contact__form');
  var status = document.getElementById('form-status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      form.querySelectorAll('[required]').forEach(function (f) {
        var v = f.value.trim();
        var msg = !v ? f.getAttribute('data-msg')
          : (f.type === 'email' && !emailRe.test(v)) ? 'Enter an email address like name@example.com.' : '';
        document.getElementById(f.id + '-error').textContent = msg;
        if (msg) { f.setAttribute('aria-invalid', 'true'); first = first || f; }
        else f.removeAttribute('aria-invalid');
      });
      if (first) { status.textContent = ''; first.focus(); return; }
      form.reset();
      status.textContent = 'Thanks. This is a demo form, nothing was sent.';
    });
    form.addEventListener('input', function (e) {
      var f = e.target;
      if (f.getAttribute('aria-invalid') === 'true' && f.value.trim()) {
        f.removeAttribute('aria-invalid');
        document.getElementById(f.id + '-error').textContent = '';
      }
    });
  }
  window.swissReady = true;
})();
