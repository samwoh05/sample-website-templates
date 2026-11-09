/* 18 Ethereal: "Fog Cue". Vanilla JS, loaded with defer. */
(function () {
  'use strict';

  var root = document.documentElement;

  // 1. Mark that JS is running (entrances and loops only exist with JS).
  root.classList.remove('no-js');
  root.classList.add('js');

  // 2. Saved pause preference.
  var KEY = 'ethereal-paused';
  var paused = false;
  try { paused = window.localStorage.getItem(KEY) === '1'; } catch (e) { paused = false; }

  // 3. House-light fader.
  var hero = document.querySelector('.hero');
  var fader = document.querySelector('.fader');
  var input = document.getElementById('lift');
  var out = document.getElementById('lift-out');

  function setLift() {
    var v = input.value;
    hero.style.setProperty('--lift', v);
    out.value = v + '%';
    input.setAttribute('aria-valuetext', 'House light ' + v + ' percent');
    input.style.setProperty('--fill', v + '%');
  }

  if (hero && fader && input && out) {
    fader.hidden = false;
    input.addEventListener('input', setLift);
    setLift();
  }

  // 4. Signature move: the light rises and the veils part.
  function rise() {
    if (!hero) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('is-risen'); });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rise);
  } else {
    rise();
  }

  // 5. Staggered entrances.
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // 6. Pause toggles (hero and footer stay in sync).
  var toggles = document.querySelectorAll('.pause');
  var footerPause = document.querySelector('.footer__pause');
  if (footerPause) footerPause.hidden = false;

  function applyPause() {
    root.classList.toggle('is-paused', paused);
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      var use = btn.querySelector('use');
      if (use) use.setAttribute('href', paused ? '#i-play' : '#i-pause');
    });
  }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      paused = !paused;
      applyPause();
      try { window.localStorage.setItem(KEY, paused ? '1' : '0'); } catch (e) { /* storage blocked */ }
    });
  });
  applyPause();

  // 7. Sample form: validates, then sends nothing.
  var form = document.querySelector('.form');
  if (!form) return;
  var status = form.querySelector('.form__status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var checks = [
    { el: form.querySelector('#f-name'), err: form.querySelector('#f-name-err'), ok: function (v) { return v.trim() !== ''; } },
    { el: form.querySelector('#f-email'), err: form.querySelector('#f-email-err'), ok: function (v) { return emailRe.test(v.trim()); } },
    { el: form.querySelector('#f-feel'), err: form.querySelector('#f-feel-err'), ok: function (v) { return v.trim() !== ''; } }
  ];

  function mark(c, valid) {
    if (valid) {
      c.el.removeAttribute('aria-invalid');
      c.err.hidden = true;
    } else {
      c.el.setAttribute('aria-invalid', 'true');
      c.err.hidden = false;
    }
  }

  checks.forEach(function (c) {
    c.el.addEventListener('input', function () {
      if (c.el.getAttribute('aria-invalid') === 'true' && c.ok(c.el.value)) mark(c, true);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';
    var firstBad = null;
    checks.forEach(function (c) {
      var valid = c.ok(c.el.value);
      mark(c, valid);
      if (!valid && !firstBad) firstBad = c.el;
    });
    if (firstBad) {
      firstBad.focus();
      return;
    }
    form.reset();
    // Set the message on the next tick so the live region registers a change every time.
    setTimeout(function () { status.textContent = 'Thank you. This is a sample form, so nothing was sent.'; }, 50);
  });
})();
