/* 22 Wabi-sabi: "The Mended Bowl". Vanilla JS, no libraries. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = mq.matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* 1. Hero: the shard settles, then the seam draws itself. Once. */
  var hero = $('.hero');
  function settleNow() { hero.classList.add('is-settling', 'is-settled'); }
  if (hero) {
    if (reduceMotion) settleNow();
    else requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('is-settling');
        setTimeout(function () { hero.classList.add('is-settled'); }, 4000); /* 400 + 1600 + 2000 */
      });
    });
  }
  function onMotionChange(e) { reduceMotion = e.matches; if (reduceMotion) { settleNow(); revealAll(); } }
  if (mq.addEventListener) mq.addEventListener('change', onMotionChange);

  /* 2. Toggle: see the bowl before and after the repair */
  var toggle = $('.toggle'), bowl = $('#bowl'), desc = $('#bowl-desc'), state = $('#bowl-state');
  var copy = {
    mended: { label: 'See it before the repair', state: 'Mended with urushi and gold in the studio, 2025.',
      desc: 'A wide, slightly lopsided tea bowl with a dark ash glaze, a lighter ash drip on its right side and an unglazed clay foot. Two cracks run through it, joined by a thin line of gold.' },
    cracked: { label: 'See it mended', state: 'Cracked in the kiln, 2024. Mended in the studio, 2025.',
      desc: 'The same tea bowl before its repair: two bare dark cracks, and a small shard on the right that has come loose from the body.' }
  };
  /* The label names the action and swaps; the live #bowl-state line announces the state,
     so there is no aria-pressed (a toggle button's label must not change with its state). */
  var cracked = false;
  if (toggle && bowl) toggle.addEventListener('click', function () {
    cracked = !cracked;
    var c = cracked ? copy.cracked : copy.mended;
    toggle.textContent = c.label;
    bowl.classList.toggle('is-cracked', cracked);
    if (desc) desc.textContent = c.desc;
    if (state) state.textContent = c.state;
  });

  /* 3. Menu sheet */
  var menuBtn = $('.menu-btn'), sheet = $('#menu-sheet');
  function focusables() { return $$('a[href], button', sheet); }
  function openSheet() {
    sheet.hidden = false; menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked'); focusables()[0].focus();
  }
  function closeSheet(returnFocus) {
    sheet.hidden = true; menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked'); if (returnFocus) menuBtn.focus();
  }
  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', openSheet);
    $('.sheet__close', sheet).addEventListener('click', function () { closeSheet(true); });
    $$('a', sheet).forEach(function (a) { a.addEventListener('click', function () { closeSheet(false); }); });
    sheet.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(true); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.addEventListener('resize', function () { if (!sheet.hidden && window.innerWidth >= 1024) closeSheet(false); });
  }

  /* 4. Scroll reveal: H2s and plates settle into place. Skipped under reduced motion. */
  var reveals = $$('.reveal');
  function revealAll() { reveals.forEach(function (el) { el.classList.add('is-in'); }); }
  if (reduceMotion || !('IntersectionObserver' in window)) revealAll();
  else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); } });
    }, { threshold: 0.2 });
    reveals.forEach(function (el) { ro.observe(el); });
  }
  /* Hidden starting states are safe now: tell the fail-safe in <head> not to undo them. */
  root.classList.add('js-ready');

  /* 5. Active nav link follows the section in view */
  var navLinks = $$('.nav a');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { no.observe(s); });
  }

  /* 6. Contact form: validate, explain, never send */
  var form = $('#letter-form'), status = $('#form-status');
  if (!form) return;
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var rules = {
    name: function (v) { return v ? '' : 'Please add your name.'; },
    email: function (v) { return !v ? 'Please add your email so I can write back.' : (emailRe.test(v) ? '' : "That email doesn't look quite right. Could you check it?"); },
    message: function (v) { return v ? '' : 'A few words about the piece would help.'; }
  };
  var touched = false;
  function check(field) {
    var msg = rules[field.name](field.value.trim());
    var err = document.getElementById(field.id + '-err');
    err.querySelector('span').textContent = msg;
    err.hidden = !msg;
    if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    return !msg;
  }
  var fields = ['name', 'email', 'message'].map(function (n) { return form.elements[n]; });
  fields.forEach(function (f) {
    f.addEventListener('blur', function () { if (touched) check(f); });
    /* clear an error as soon as it is fixed, so nothing shifts under the pointer on the next click */
    f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    touched = true;
    var bad = fields.filter(function (f) { return !check(f); });
    if (bad.length) {
      status.classList.add('is-error');
      status.textContent = bad.length === 1 ? 'One field needs a look before this can go.' : bad.length + ' fields need a look before this can go.';
      bad[0].focus();
      return;
    }
    /* No backend in this template. Connect a form endpoint here (see README). */
    status.classList.remove('is-error');
    status.textContent = "Thank you. Your letter is on my desk. I'll write back within a week.";
    form.reset();
    touched = false;
  });
})();
