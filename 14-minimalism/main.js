/* 14-minimalism: reveal on scroll, plus a demo contact form. */
(function () {
  'use strict';

  /* Reveal styles only apply once this script runs, so content stays visible if it fails to load */
  document.documentElement.classList.add('js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Reveal observer (skipped entirely under reduced motion) */
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  }

  /* 2. Contact form: inline validation and a demo submit */
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.setAttribute('novalidate', '');

  var rules = {
    name: [function (v) { return v.trim() !== ''; }, 'Error: enter your name.'],
    email: [function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, 'Error: enter an email address like name@domain.com.'],
    type: [function (v) { return v !== ''; }, 'Error: choose a building type.'],
    message: [function (v) { return v.trim() !== ''; }, 'Error: tell me a little about the project.']
  };
  var fields = Array.prototype.filter.call(form.elements, function (el) { return rules[el.name]; });
  var submitted = false;

  function check(field) {
    var ok = rules[field.name][0](field.value);
    var err = document.getElementById(field.id + '-error');
    var ids = field.getAttribute('data-hint') ? [field.getAttribute('data-hint')] : [];
    if (ok) {
      field.removeAttribute('aria-invalid');
      if (err) err.textContent = '';
    } else {
      field.setAttribute('aria-invalid', 'true');
      if (err) { err.textContent = rules[field.name][1]; ids.push(err.id); }
    }
    if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
    else field.removeAttribute('aria-describedby');
    return ok;
  }

  fields.forEach(function (field) {
    field.addEventListener('blur', function () { if (submitted) check(field); });
    field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', function () { if (submitted) check(field); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitted = true;
    var firstBad = null;
    fields.forEach(function (field) { if (!check(field) && !firstBad) firstBad = field; });
    if (firstBad) { firstBad.focus(); return; }

    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = 'Sending'; }

    window.setTimeout(function () {
      var status = document.createElement('div');
      status.className = 'form-success';
      status.setAttribute('role', 'status');
      status.setAttribute('tabindex', '-1');
      status.textContent = 'This is a demo form. Nothing was sent. Write to studio@arendsen.example instead.';
      form.parentNode.replaceChild(status, form);
      status.focus();
    }, reduce ? 0 : 600);
  });
})();
