/* World 1-1, Rotterdam: page script. Vanilla JS, no dependencies, loaded with defer.
   Jobs: brick name, intro, Pip, reveals, nav state, menu, theme, shop prefill, demo form. */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.remove('no-js');

  var motionOk = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    'IntersectionObserver' in window);
  if (motionOk) doc.classList.add('motion-ok');

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var XLINK_NS = 'http://www.w3.org/1999/xlink';

  /* ---------- 1. Brick name from data-name ----------
     5x7 glyphs, one empty column between letters. A space starts a new row. */
  var GLYPHS = {
    A: '01110 10001 10001 11111 10001 10001 10001', B: '11110 10001 10001 11110 10001 10001 11110',
    C: '01110 10001 10000 10000 10000 10001 01110', D: '11110 10001 10001 10001 10001 10001 11110',
    E: '11111 10000 10000 11110 10000 10000 11111', F: '11111 10000 10000 11110 10000 10000 10000',
    G: '01110 10001 10000 10111 10001 10001 01111', H: '10001 10001 10001 11111 10001 10001 10001',
    I: '01110 00100 00100 00100 00100 00100 01110', J: '00111 00010 00010 00010 00010 10010 01100',
    K: '10001 10010 10100 11000 10100 10010 10001', L: '10000 10000 10000 10000 10000 10000 11111',
    M: '10001 11011 10101 10101 10001 10001 10001', N: '10001 10001 11001 10101 10011 10001 10001',
    O: '01110 10001 10001 10001 10001 10001 01110', P: '11110 10001 10001 11110 10000 10000 10000',
    Q: '01110 10001 10001 10001 10101 10010 01101', R: '11110 10001 10001 11110 10100 10010 10001',
    S: '01111 10000 10000 01110 00001 00001 11110', T: '11111 00100 00100 00100 00100 00100 00100',
    U: '10001 10001 10001 10001 10001 10001 01110', V: '10001 10001 10001 10001 10001 01010 00100',
    W: '10001 10001 10001 10101 10101 10101 01010', X: '10001 10001 01010 00100 01010 10001 10001',
    Y: '10001 10001 01010 00100 00100 00100 00100', Z: '11111 00001 00010 00100 01000 10000 11111',
    '-': '00000 00000 00000 11111 00000 00000 00000'
  };

  var hero = document.querySelector('.hero');
  var nameEl = document.querySelector('.hero__name');
  var stage = document.querySelector('.hero__stage');

  function buildName() {
    if (!nameEl || !stage) return;
    var holder = nameEl.querySelector('.hero__bricks');
    var words = (nameEl.getAttribute('data-name') || '').toUpperCase().split(/\s+/).filter(Boolean);
    var lastCells = 0;
    holder.textContent = '';
    words.forEach(function (word) {
      var chars = word.split('').filter(function (c) { return GLYPHS[c]; });
      if (!chars.length) return;
      var maps = chars.map(function (c) { return GLYPHS[c].split(' '); });
      var cells = chars.length * 6 - 1;
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', 'brick-row');
      svg.setAttribute('viewBox', '0 0 ' + cells * 5 + ' 35');
      svg.setAttribute('shape-rendering', 'crispEdges');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.style.setProperty('--cells', cells);
      for (var x = 0; x < cells; x++) {
        var cx = x % 6;
        if (cx === 5) continue;
        var map = maps[Math.floor(x / 6)];
        var col = document.createElementNS(SVG_NS, 'g');
        col.setAttribute('class', 'brick-col');
        col.style.setProperty('--i', x);
        for (var y = 0; y < 7; y++) {
          if (map[y].charAt(cx) !== '1') continue;
          var use = document.createElementNS(SVG_NS, 'use');
          use.setAttribute('href', '#brick');
          use.setAttributeNS(XLINK_NS, 'xlink:href', '#brick');
          use.setAttribute('x', x * 5);
          use.setAttribute('y', y * 5);
          use.setAttribute('width', 5);
          use.setAttribute('height', 5);
          col.appendChild(use);
        }
        if (col.childNodes.length) svg.appendChild(col);
      }
      holder.appendChild(svg);
      lastCells = cells;
    });
    var rows = holder.children.length;
    stage.style.setProperty('--cells-last', lastCells);
    /* 1 when the last row follows another row. CSS indents that row from 1024px (--row-indent). */
    stage.style.setProperty('--multi', rows > 1 ? 1 : 0);
    stage.style.setProperty('--rows-below', Math.max(rows - 1, 0));
  }
  buildName();

  /* ---------- 1b. Scene scale ----------
     The skyline SVG is 360x204 art pixels. Scale it by a whole number so every
     art pixel is the same size on screen. CSS anchors it bottom right. */
  var scene = document.querySelector('.hero__scene');
  function scaleScene() {
    if (!hero || !scene) return;
    var k = Math.max(2, Math.ceil(Math.max(hero.clientWidth / 360, (hero.clientHeight - 64) / 204)));
    hero.style.setProperty('--k', k);
  }
  scaleScene();
  var sceneTimer;
  window.addEventListener('resize', function () {
    clearTimeout(sceneTimer);
    sceneTimer = setTimeout(scaleScene, 100);
  });

  /* ---------- 2. Pip ---------- */
  var pip = document.querySelector('.pip');
  var pipBtn = pip && pip.querySelector('.pip__btn');
  var bubble = document.querySelector('.hero__stage .pip__bubble');
  var lines = [
    'I animate at 12 frames a second.',
    'My favourite palette size is 16.',
    'Booking projects from November 2026.',
    'Press start below. It goes to the work.'
  ];
  var lineIndex = 0;
  var busy = false;

  function setFrame(n) { if (pip) pip.setAttribute('data-frame', String(n)); }

  function startBlinks() {
    if (!motionOk) return;
    var count = 0;
    var timer = setInterval(function () {
      if (busy) return;
      setFrame(1);
      setTimeout(function () { if (pip.getAttribute('data-frame') === '1') setFrame(0); }, 120);
      count += 1;
      if (count >= 4) clearInterval(timer);
    }, 5000);
  }

  function land() {
    setFrame(2);
    pip.classList.add('is-dusting');
    setTimeout(function () { setFrame(0); }, 120);
    setTimeout(function () {
      pip.classList.remove('is-dusting');
      hero.classList.remove('intro');
      busy = false;
      startBlinks();
    }, 360);
  }

  if (pip && hero) {
    var playIntro = motionOk && !window.location.hash && (window.scrollY || window.pageYOffset) < 8;
    if (playIntro) {
      busy = true;
      hero.classList.add('intro');
      setTimeout(land, 1100 + 360);
    } else {
      startBlinks();
    }

    pipBtn.addEventListener('click', function () {
      bubble.textContent = lines[lineIndex % lines.length];
      lineIndex += 1;
      if (!motionOk || busy) return;
      busy = true;
      pip.classList.remove('is-jumping');
      void pip.offsetWidth;
      pip.classList.add('is-jumping');
      setFrame(3);
      setTimeout(function () {
        pip.classList.remove('is-jumping');
        setFrame(0);
        busy = false;
      }, 480);
    });
  }

  /* ---------- 3. Reveals: headings, level nodes, stat bars, dialogue ---------- */
  if (motionOk) {
    document.querySelectorAll('.dialogue__quote p').forEach(function (p) {
      var words = p.textContent.trim().split(/\s+/);
      p.textContent = '';
      words.forEach(function (w, i) {
        var span = document.createElement('span');
        span.className = 'w';
        span.style.setProperty('--i', i);
        span.textContent = w;
        p.appendChild(span);
        if (i < words.length - 1) p.appendChild(document.createTextNode(' '));
      });
      p.closest('.dialogue').setAttribute('data-words', words.length);
    });

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in');
        revealer.unobserve(el);
        if (el.classList.contains('dialogue')) {
          var wait = Number(el.getAttribute('data-words') || 0) * 28 + 120;
          setTimeout(function () { el.classList.add('is-done'); }, wait);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    document.querySelectorAll('.reveal, .level, .bars, .dialogue').forEach(function (el) {
      revealer.observe(el);
    });
  }

  /* ---------- 4. Nav: current section ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var tracked = document.querySelectorAll('.hero, main section[id]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    tracked.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 5. Menu button under 600px ---------- */
  var nav = document.querySelector('.nav');
  var menuBtn = nav && nav.querySelector('.nav__menu');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    navLinks.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (menuBtn.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- 6. Theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  var lightQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  function isDay() {
    var t = doc.getAttribute('data-theme');
    if (t) return t === 'light';
    return !!(lightQuery && lightQuery.matches);
  }
  function syncToggle() { if (toggle) toggle.setAttribute('aria-pressed', String(isDay())); }
  if (toggle) {
    syncToggle();
    toggle.addEventListener('click', function () {
      var next = isDay() ? 'dark' : 'light';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('ja-theme', next); } catch (err) { /* storage blocked: the choice lasts for this visit */ }
      syncToggle();
    });
    if (lightQuery && lightQuery.addEventListener) lightQuery.addEventListener('change', syncToggle);
  }

  /* ---------- 7. Shop links prefill the project type ---------- */
  var typeSelect = document.getElementById('f-type');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!typeSelect) return;
      typeSelect.value = a.getAttribute('data-service');
      var st = document.getElementById('form-status');
      if (st) st.textContent = 'Project type set to ' + typeSelect.options[typeSelect.selectedIndex].text + '.';
    });
  });

  /* ---------- 8. Demo form ---------- */
  var form = document.querySelector('.form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var slot = document.querySelector('.save-slot');
  var required = ['f-name', 'f-email', 'f-message'].map(function (id) { return document.getElementById(id); });
  var submitted = false;

  function setError(input, message) {
    var out = document.getElementById(input.getAttribute('aria-describedby'));
    out.textContent = '';
    if (message) {
      var mark = document.createElement('span');
      mark.className = 'g g-bang';
      mark.setAttribute('aria-hidden', 'true');
      out.appendChild(mark);
      out.appendChild(document.createTextNode(message));
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function check(input) {
    var v = input.value.trim();
    var ok;
    if (input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    else if (input.id === 'f-message') ok = v.length >= 20;
    else ok = v.length > 0;
    setError(input, ok ? '' : input.getAttribute('data-error'));
    return ok;
  }

  required.forEach(function (input) {
    input.addEventListener('input', function () { if (submitted) check(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitted = true;
    status.textContent = '';
    slot.classList.remove('is-saved', 'is-filling');
    var firstBad = null;
    required.forEach(function (input) {
      if (!check(input) && !firstBad) firstBad = input;
    });
    if (firstBad) {
      firstBad.focus();
      return;
    }
    var message = 'Saved. This is a demo form, so nothing was sent. Connect it to your form service in script.js.';
    /* To send for real, post new FormData(form) to your form service here. */
    slot.classList.add('is-saved');
    /* A short delay after clearing the region makes screen readers announce a repeat message. */
    if (motionOk) slot.classList.add('is-filling');
    setTimeout(function () { status.textContent = message; }, motionOk ? 400 : 50);
    form.reset();
    submitted = false;
  });
})();
