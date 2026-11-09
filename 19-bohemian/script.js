/* 19 Bohemian: dye pots, scroll reveals and the demo form. Vanilla, deferred. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js-ready');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function raf2(fn) { requestAnimationFrame(function () { requestAnimationFrame(fn); }); }

  /* 1. Dye pots: re-dye the hero cloth */
  var DYES = {
    madder: { dye: '#A8432A', print: '#F3EADB', status: 'Cloth dyed with madder. Brick red.' },
    weld:   { dye: '#D3A43C', print: '#5B4330', status: 'Cloth dyed with weld. Ochre yellow.' },
    indigo: { dye: '#2F4373', print: '#E7DAC2', status: 'Cloth dyed with indigo. Deep blue.' },
    walnut: { dye: '#6A4C35', print: '#E9C9A0', status: 'Cloth dyed with walnut. Warm brown.' }
  };
  var hero = document.querySelector('.hero');
  var pots = document.querySelector('fieldset.pots');
  var rise = hero && hero.querySelector('.cloth__rise');
  var wet = hero && hero.querySelector('.cloth__wet');
  var status = document.getElementById('dye-status');
  var pending = null;

  function sway() {
    hero.classList.remove('is-swaying');
    void hero.offsetWidth;
    hero.classList.add('is-swaying');
  }

  /* Settle the current rise at once: the base layers take the new dye, the rise layer hides again. */
  function settle() {
    if (!pending) return;
    hero.setAttribute('data-dye', pending);
    pending = null;
    rise.classList.add('no-anim');
    wet.classList.add('no-anim');
    rise.classList.remove('is-rising');
    wet.classList.remove('is-wet');
  }

  function dyeTo(name) {
    var d = DYES[name];
    if (!d) return;
    if (reduce.matches || !rise) {
      settle();
      hero.setAttribute('data-dye', name);
      status.textContent = d.status;
      return;
    }
    settle();
    pending = name;
    rise.style.setProperty('--dye', d.dye);
    rise.style.setProperty('--print', d.print);
    raf2(function () {
      if (pending !== name) return;
      rise.classList.remove('no-anim');
      wet.classList.remove('no-anim');
      rise.classList.add('is-rising');
      wet.classList.add('is-wet');
    });
    status.textContent = d.status;
  }

  if (hero && pots && rise) {
    pots.addEventListener('change', function (e) {
      if (e.target && e.target.name === 'dye') dyeTo(e.target.value);
    });
    rise.addEventListener('transitionend', function (e) {
      if (e.target !== rise || e.propertyName !== 'transform' || !pending) return;
      settle();
      raf2(function () {
        rise.classList.remove('no-anim');
        wet.classList.remove('no-anim');
      });
      sway();
    });
  }

  /* 2. Scroll reveals, once each, 60ms stagger inside a section */
  var items = document.querySelectorAll('[data-reveal]');
  document.querySelectorAll('main section').forEach(function (sec) {
    sec.querySelectorAll('[data-reveal]').forEach(function (el, i) {
      el.style.setProperty('--d', Math.min(i, 6) * 60 + 'ms');
    });
  });
  if (!('IntersectionObserver' in window) || reduce.matches) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 3. Demo form: validates in the browser and sends nothing */
  var form = document.querySelector('.contact form');
  if (!form) return;
  var formStatus = document.getElementById('form-status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var fields = [
    { el: form.querySelector('#f-name'), check: function (v) { return v ? '' : 'Please add your name.'; } },
    { el: form.querySelector('#f-email'), check: function (v) {
        if (!v) return 'Please add an email address so I can reply.';
        return emailRe.test(v) ? '' : 'That email address looks incomplete.';
      } },
    { el: form.querySelector('#f-msg'), check: function (v) { return v ? '' : 'Please tell me a little about the project.'; } }
  ];

  function showError(f, msg) {
    var err = document.getElementById(f.el.id + '-error');
    if (msg) {
      err.querySelector('span').textContent = msg;
      err.hidden = false;
      f.el.setAttribute('aria-invalid', 'true');
    } else {
      err.hidden = true;
      f.el.removeAttribute('aria-invalid');
    }
  }

  fields.forEach(function (f) {
    f.el.addEventListener('input', function () {
      if (f.el.getAttribute('aria-invalid') === 'true') showError(f, '');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formStatus.textContent = '';
    var firstBad = null;
    fields.forEach(function (f) {
      var msg = f.check(f.el.value.trim());
      showError(f, msg);
      if (msg && !firstBad) firstBad = f.el;
    });
    if (firstBad) { firstBad.focus(); return; }
    form.reset();
    setTimeout(function () {
      formStatus.textContent = 'Thank you. Tamsin reads post on Fridays and will reply within a week.';
    }, 50);
  });
})();
