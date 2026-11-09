/* 16 · Luxury typography · "Planche I". Vanilla JS, no libraries. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. Hero load sequence: wait for fonts, fall back after 1500ms */
  var loaded = false;
  function markLoaded() {
    if (loaded) return;
    loaded = true;
    document.body.classList.add('is-loaded');
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(markLoaded);
  window.setTimeout(markLoaded, 1500);

  /* 2. Scroll reveals, once each */
  var reveals = document.querySelectorAll('.reveal');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* 3. Seal pause control */
  var hero = document.querySelector('.hero');
  var toggle = document.querySelector('.seal-toggle');
  if (hero && toggle) {
    var label = toggle.querySelector('.seal-toggle__label');
    toggle.addEventListener('click', function () {
      /* state lives in data-paused; the accessible name changes instead of aria-pressed */
      var paused = toggle.dataset.paused !== 'true';
      toggle.dataset.paused = String(paused);
      label.textContent = paused ? 'Turn the seal' : 'Pause the seal';
      hero.classList.toggle('is-paused', paused);
    });
  }

  /* 4. Work preview frame (fine pointers, 1024px and up) */
  var index = document.querySelector('.index');
  var preview = document.querySelector('.index__preview');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  if (index && preview) {
    var shots = preview.querySelectorAll('[data-preview]');
    var show = function (row) {
      if (!fine.matches) return;
      var n = Number(row.getAttribute('data-index'));
      shots.forEach(function (s, i) {
        if (i === n) s.setAttribute('data-active', ''); else s.removeAttribute('data-active');
      });
      /* over the numeral side: odd plates (numeral left) show left, even plates show right */
      preview.classList.toggle('is-left', !row.classList.contains('index__row--alt'));
      preview.classList.add('is-visible');
    };
    var hide = function () { preview.classList.remove('is-visible'); };
    index.querySelectorAll('.index__row').forEach(function (row) {
      row.addEventListener('pointerenter', function () { show(row); });
      row.addEventListener('focusin', function () { show(row); });
    });
    index.addEventListener('pointerleave', hide);
    index.addEventListener('focusout', function (e) {
      if (!index.contains(e.relatedTarget)) hide();
    });
  }

  /* 5. Letters: WAI tabs with roving tabindex, no auto-rotation */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.letters__tab'));
  var counter = document.querySelector('.letters__no-n');
  var back = document.querySelector('.letters__back');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    var n = tabs.indexOf(tab) + 1;
    if (counter) counter.textContent = n;
    if (back) back.setAttribute('href', '#fnref-' + n);
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* 6. Form validation (demonstration only, sends nothing) */
  var form = document.getElementById('enquiry');
  if (!form) return;
  var summary = document.getElementById('error-summary');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var rules = [
    { id: 'f-name', check: function (v) { return v ? '' : 'Enter your name.'; } },
    { id: 'f-email', check: function (v) {
      if (!v) return 'Enter your email address.';
      return emailPattern.test(v) ? '' : 'Enter an email address in the format name@house.com.';
    } },
    { id: 'f-timeline', check: function (v) { return v ? '' : 'Choose a timeline.'; } },
    { id: 'f-brief', check: function (v) {
      return v.length >= 20 ? '' : 'Tell me a little more about the brief (at least 20 characters).';
    } }
  ];

  function setError(rule, message) {
    var field = document.getElementById(rule.id);
    var err = document.getElementById(rule.id + '-error');
    err.querySelector('.field__error-text').textContent = message;
    err.hidden = !message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  function validate(rule) {
    var field = document.getElementById(rule.id);
    var message = rule.check(field.value.trim());
    setError(rule, message);
    return message;
  }

  function summaryText(count) {
    return count === 1 ? 'There is 1 problem with this form' : 'There are ' + count + ' problems with this form';
  }

  /* drop a fixed field from the error summary and recount */
  function clearSummaryEntry(id) {
    if (summary.hidden) return;
    var link = summary.querySelector('a[href="#' + id + '"]');
    if (link && link.parentNode) link.parentNode.remove();
    var left = summary.querySelectorAll('.error-summary__list li').length;
    if (left) summary.querySelector('.error-summary__text').textContent = summaryText(left);
    else summary.hidden = true;
  }

  rules.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    var evt = field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(evt, function () {
      if (field.getAttribute('aria-invalid') === 'true' && !rule.check(field.value.trim())) {
        setError(rule, '');
        clearSummaryEntry(rule.id);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = [];
    rules.forEach(function (rule) {
      var message = validate(rule);
      if (message) errors.push({ id: rule.id, message: message });
    });

    if (errors.length) {
      var list = summary.querySelector('.error-summary__list');
      list.innerHTML = '';
      errors.forEach(function (err) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + err.id;
        a.textContent = err.message;
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          document.getElementById(err.id).focus();
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.querySelector('.error-summary__text').textContent = summaryText(errors.length);
      summary.hidden = false;
      if (errors.length === 1) document.getElementById(errors[0].id).focus();
      else summary.focus();
      return;
    }

    summary.hidden = true;
    var actions = form.querySelector('.card__actions');
    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.tabIndex = -1;
    status.textContent = 'Thank you. This is a demonstration form, so nothing was sent.';
    actions.replaceWith(status);
    status.focus();
  });
})();
