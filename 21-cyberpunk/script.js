/* 21 Cyberpunk: Sector Vell Nightshift. Vanilla JS, no network requests. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function iconMarkup(id) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>';
  }

  /* 1. Menu disclosure (below 1024px) */
  var menuBtn = document.querySelector('.menu-btn');
  var navList = document.getElementById('nav-list');
  var wide = window.matchMedia('(min-width: 1024px)');

  function setMenu(open, returnFocus) {
    if (!menuBtn || !navList) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    navList.classList.toggle('is-open', open);
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    menuBtn.querySelector('.menu-btn__label').textContent = open ? 'Close' : 'Menu';
    if (!open && returnFocus) menuBtn.focus();
  }

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true', false);
    });
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    var onWide = function () { if (wide.matches) setMenu(false, false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* 2. Pause street: one control for rain, holo flicker and ticker */
  var pauseBtn = document.querySelector('.pause-btn');

  function setStill(still) {
    root.classList.toggle('is-still', still);
    if (!pauseBtn) return;
    pauseBtn.querySelector('use').setAttribute('href', still ? '#i-play' : '#i-pause');
    pauseBtn.querySelector('.pause-btn__label').textContent = still ? 'Play street' : 'Pause street';
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      setStill(!root.classList.contains('is-still'));
    });
  }

  /* 3. Hero boot, chromatic split pulses and the ambient auto-stop */
  var hero = document.querySelector('.hero');
  var title = document.getElementById('hero-title');
  var heroText = document.querySelector('.hero__text');

  if (!reduceMotion && hero && title) {
    hero.classList.add('boot');

    var lastPulse = 0;
    var pulse = function () {
      title.classList.remove('is-split');
      void title.offsetWidth;
      title.classList.add('is-split');
      lastPulse = Date.now();
      window.setTimeout(function () { title.classList.remove('is-split'); }, 320);
    };

    /* Three timed pulses after boot, then it stops for good */
    [7000, 14000, 21000].forEach(function (t) { window.setTimeout(pulse, t); });

    /* One pulse on hover or focus, with a 2s cooldown so it never loops */
    var retrigger = function () {
      if (Date.now() - lastPulse > 2000) pulse();
    };
    title.addEventListener('pointerenter', retrigger);
    if (heroText) heroText.addEventListener('focusin', retrigger);

    /* Ambient motion stops by itself after 24s */
    window.setTimeout(function () {
      if (!root.classList.contains('is-still')) setStill(true);
    }, 24000);
  }

  /* 4. Scroll reveals */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* 5. Demo contact form: validates, sends nothing */
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var checks = {
    name: function (v) { return v.trim().length > 0; },
    email: function (v) { return emailPattern.test(v.trim()); },
    message: function (v) { return v.trim().length >= 20; }
  };

  function showError(field, show) {
    var err = document.getElementById(field.id + '-error');
    var hintId = field.id + '-hint';
    if (show) {
      err.innerHTML = iconMarkup('i-alert') + '<span>' + err.getAttribute('data-msg') + '</span>';
      err.hidden = false;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', hintId + ' ' + err.id);
    } else {
      err.innerHTML = '';
      err.hidden = true;
      field.removeAttribute('aria-invalid');
      field.setAttribute('aria-describedby', hintId);
    }
  }

  function setStatus(kind, text) {
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
    if (!kind) { status.innerHTML = ''; return; }
    var lead = kind === 'ok'
      ? '<span class="form-status__sq" aria-hidden="true"></span>'
      : iconMarkup('i-alert');
    status.innerHTML = lead + '<span>' + text + '</span>';
  }

  Object.keys(checks).forEach(function (id) {
    var field = document.getElementById(id);
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true' && checks[id](field.value)) showError(field, false);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    Object.keys(checks).forEach(function (id) {
      var field = document.getElementById(id);
      var ok = checks[id](field.value);
      showError(field, !ok);
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      setStatus('error', 'Check the highlighted fields.');
      firstInvalid.focus();
      return;
    }
    form.reset();
    setStatus('ok', 'Demo form: nothing was sent. Connect it to your own form service to go live.');
  });
})();
