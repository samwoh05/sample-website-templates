/* Flavour Select: small vanilla helpers. Every query is guarded. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var finePointer = window.matchMedia ? window.matchMedia('(pointer: fine)') : { matches: false };
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Player: flavour swap ---------- */
  var player = document.querySelector('.player');
  var fieldset = document.querySelector('.flavours');
  var live = document.getElementById('now-playing');
  var tracks = [
    { title: 'Tidepool' }, { title: 'Radio Kweek' },
    { title: 'Orbit Launderette' }, { title: 'Pop Quiz Late' }
  ];

  if (player && fieldset) {
    var radios = Array.prototype.slice.call(fieldset.querySelectorAll('input[name="flavour"]'));
    var checkedIndex = function () {
      for (var i = 0; i < radios.length; i++) { if (radios[i].checked) return i; }
      return 0;
    };
    var sync = function () {
      var i = checkedIndex();
      if (radios[i]) player.dataset.flavour = radios[i].value;
      return i;
    };
    sync();

    fieldset.addEventListener('change', function (event) {
      var i = sync();
      if (!live) return;
      /* Radio changes are announced natively, so only skips use the live region */
      live.textContent = (event.detail && event.detail.fromSkip && tracks[i])
        ? 'Now playing: ' + tracks[i].title + ', track ' + (i + 1) + ' of ' + radios.length + '.'
        : '';
    });

    var step = function (dir) {
      if (!radios.length) return;
      var next = (checkedIndex() + dir + radios.length) % radios.length;
      radios[next].checked = true;
      var evt;
      try {
        evt = new CustomEvent('change', { bubbles: true, detail: { fromSkip: true } });
      } catch (e) {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent('change', true, false, { fromSkip: true });
      }
      radios[next].dispatchEvent(evt);
    };
    var prev = player.querySelector('.skip--prev');
    var next = player.querySelector('.skip--next');
    if (prev) { prev.hidden = false; prev.addEventListener('click', function () { step(-1); }); }
    if (next) { next.hidden = false; next.addEventListener('click', function () { step(1); }); }
  }

  /* ---------- Pointer light (fine pointers, motion allowed) ---------- */
  var hero = document.querySelector('.hero');
  var device = document.querySelector('.device');
  if (hero && player && device && finePointer.matches && !reduceMotion.matches) {
    var frame = 0;
    var px = 0;
    var py = 0;
    var clamp = function (v) { return Math.max(-40, Math.min(40, v)); };
    var paint = function () {
      frame = 0;
      var r = device.getBoundingClientRect();
      var dx = clamp((px - (r.left + r.width / 2)) / 6);
      var dy = clamp((py - (r.top + r.height / 2)) / 6);
      player.style.setProperty('--lx', dx.toFixed(1) + 'px');
      player.style.setProperty('--ly', dy.toFixed(1) + 'px');
    };
    hero.addEventListener('pointermove', function (e) {
      px = e.clientX; py = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
    });
    hero.addEventListener('pointerleave', function () {
      if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
      player.style.setProperty('--lx', '0px');
      player.style.setProperty('--ly', '0px');
    });
  }

  /* ---------- Menu: close after a link is chosen ---------- */
  var menu = document.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('a')) menu.open = false;
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (hasIO && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Section reveals ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var showAll = function () { reveals.forEach(function (el) { el.classList.add('is-in'); }); };
  if (!hasIO || reduceMotion.matches) {
    showAll();
  } else if (reveals.length) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); revealIO.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealIO.observe(el); });
    /* Safety net: after 2s anything still hidden is shown, so nothing stays invisible */
    window.setTimeout(showAll, 2000);
  }

  /* ---------- Once-in-view helpers: services draw and chat arrival ---------- */
  var onceInView = function (el, fn) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.disconnect(); fn(); }
      });
    }, { threshold: 0.2 });
    io.observe(el);
  };
  var stage = document.querySelector('.orbit-stage');
  if (stage && hasIO && !reduceMotion.matches) {
    stage.classList.add('will-draw');
    onceInView(stage, function () { stage.classList.add('is-drawn'); });
  }
  var chat = document.querySelector('.chat');
  if (chat && hasIO && !reduceMotion.matches) {
    var msgs = Array.prototype.slice.call(chat.querySelectorAll('.msg'));
    chat.classList.add('will-arrive');
    onceInView(chat, function () {
      msgs.forEach(function (m, i) {
        var start = i * 350;
        var hasDots = !!m.querySelector('.typing');
        if (hasDots) window.setTimeout(function () { m.classList.add('is-typing'); }, start);
        window.setTimeout(function () { m.classList.remove('is-typing'); m.classList.add('is-in'); }, start + 300);
      });
    });
  }

  /* ---------- Contact form (demo only, nothing is sent) ---------- */
  var form = document.querySelector('.form');
  if (form) {
    form.setAttribute('novalidate', '');
    var status = form.querySelector('.form__status');
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var messages = { 'f-name': 'Add your name.', 'f-email': 'Add an email like name@example.com.', 'f-msg': 'Add a few lines about the project.' };
    var setError = function (field, text) {
      var err = document.getElementById(field.id + '-err');
      if (text) {
        field.setAttribute('aria-invalid', 'true');
        if (err) {
          err.innerHTML = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-alert-circle"/></svg>';
          err.appendChild(document.createTextNode(text));
          err.hidden = false;
        }
      } else {
        field.removeAttribute('aria-invalid');
        if (err) { err.hidden = true; err.textContent = ''; }
      }
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      ['f-name', 'f-email', 'f-msg'].forEach(function (id) {
        var field = document.getElementById(id);
        if (!field) return;
        var value = field.value.trim();
        var bad = !value || (id === 'f-email' && !emailOk.test(value));
        setError(field, bad ? messages[id] : '');
        if (bad && !firstBad) firstBad = field;
      });
      if (!status) return;
      status.classList.remove('is-shown');
      if (firstBad) {
        status.textContent = '';
        firstBad.focus();
        return;
      }
      void status.offsetWidth;
      status.innerHTML = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>';
      status.appendChild(document.createTextNode('Thanks. This is a demo form, so nothing was sent.'));
      status.classList.add('is-shown');
    });
  }
})();
