/* Juno Varela scrapbook template. Vanilla JS, no libraries, no scroll listeners. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Menu toggle */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-menu');
  if (menuBtn && nav) {
    var setMenu = function (open, returnFocus) {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      if (!open && returnFocus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true', false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
  }

  /* 2. Work stops paste in, connectors draw after the next stop lands */
  var stops = Array.prototype.slice.call(document.querySelectorAll('.stop'));
  var connectors = Array.prototype.slice.call(document.querySelectorAll('.connector'));
  var reveal = function (stop, delay) {
    if (stop.classList.contains('is-in')) return;
    stop.style.setProperty('--d', (delay || 0) + 'ms');
    stop.classList.add('is-in');
    var n = stops.indexOf(stop) + 1;
    connectors.forEach(function (c) {
      if (c.getAttribute('data-after') === String(n)) c.classList.add('is-in');
    });
  };
  var revealAll = function () { stops.forEach(function (s) { reveal(s, 0); }); };
  if (stops.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll();
    } else {
      var io = new IntersectionObserver(function (entries) {
        var i = 0;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target, i * 80);
            i += 1;
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      stops.forEach(function (s) { io.observe(s); });
      window.setTimeout(revealAll, 2000);
    }
  }

  /* 3. Contact form: demo only, nothing is sent */
  var form = document.querySelector('[data-form]');
  var envelope = document.querySelector('[data-envelope]');
  var slip = document.querySelector('[data-slip]');
  if (!form || !envelope || !slip) return;
  form.setAttribute('novalidate', '');
  var status = form.querySelector('.form__status');
  var slipText = slip.querySelector('[data-slip-text]');
  var resetBtn = slip.querySelector('[data-reset]');
  var fields = {
    name: form.querySelector('#f-name'),
    email: form.querySelector('#f-email'),
    what: form.querySelector('#f-what')
  };

  var names = { name: 'name', email: 'email', what: 'what to draw' };

  var setError = function (input, msg) {
    if (!input) return;
    var err = document.getElementById(input.id + '-err');
    if (!err) return;
    var text = err.querySelector('span');
    if (msg) {
      if (text) text.textContent = msg;
      err.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      err.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  };
  var check = function (key) {
    var el = fields[key];
    if (!el) return '';
    var v = el.value.trim();
    if (key === 'name' && !v) return 'Please add your name.';
    if (key === 'email') {
      if (!v) return 'Please add an email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'That email looks incomplete. Check the part after the @.';
    }
    if (key === 'what' && !v) return 'Please pick what you\'d like drawn.';
    return '';
  };
  Object.keys(fields).forEach(function (key) {
    var el = fields[key];
    if (!el) return;
    var clear = function () { if (el.getAttribute('aria-invalid') === 'true' && !check(key)) setError(el, ''); };
    el.addEventListener('input', clear);
    el.addEventListener('change', clear);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    var bad = [];
    Object.keys(fields).forEach(function (key) {
      var msg = check(key);
      setError(fields[key], msg);
      if (msg) {
        bad.push(names[key]);
        if (!firstBad) firstBad = fields[key];
      }
    });
    if (firstBad) {
      if (status) {
        status.textContent = bad.length === 1
          ? '1 field needs a look: ' + bad[0] + '.'
          : bad.length + ' fields need a look: ' + bad.join(', ') + '.';
      }
      firstBad.focus();
      return;
    }
    if (status) status.textContent = 'Sealing your letter.';
    var first = fields.name.value.trim().split(/\s+/)[0];
    if (slipText) slipText.textContent = 'Thanks, ' + first + '. This form is a demo, so nothing was sent. Email hello@junovarela.example to reach me.';
    envelope.classList.add('is-sealing');
    window.setTimeout(function () {
      form.hidden = true;
      envelope.classList.add('is-sealed');
      slip.hidden = false;
      if (status) status.textContent = '';
      slip.focus();
    }, reduce ? 0 : 820);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      Object.keys(fields).forEach(function (key) { setError(fields[key], ''); });
      envelope.classList.remove('is-sealing', 'is-sealed');
      slip.hidden = true;
      form.hidden = false;
      if (fields.name) fields.name.focus();
    });
  }
})();
