/* HALVORSEN, Issue 07. Vanilla JS: 1 .js class (inline in <head>, removed after 3s unless this file confirms with .js-ready), 2 masthead rise, 3 reveals and hairlines,
   4 folio counter and bar, 5 progress rule, 6 coupon validation. */
(function () {
  'use strict';
  var d = document, root = d.documentElement, hasIO = 'IntersectionObserver' in window;
  root.classList.add('js', 'js-ready');
  /* 2. Masthead letters rise once the first frame has painted */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('loaded'); });
  });
  /* Stagger indices for reveals and hairlines */
  d.querySelectorAll('.cover, .chapter').forEach(function (sec) {
    sec.querySelectorAll('.rv').forEach(function (el, i) { el.style.setProperty('--i', i); });
    sec.querySelectorAll('.grid-lines > span').forEach(function (el, i) { el.style.setProperty('--i', i); });
  });
  var cover = d.querySelector('.cover');
  if (cover) cover.classList.add('in');
  /* 3. Reveals and hairlines: once per chapter opener */
  var openers = d.querySelectorAll('.chapter .opener'), revealIO = null;
  function reveal(o) {
    o.closest('.chapter').classList.add('in');
    if (revealIO) revealIO.unobserve(o);
  }
  if (hasIO) {
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) reveal(e.target); });
    }, { threshold: 0.2 });
    openers.forEach(function (o) { revealIO.observe(o); });
  } else {
    d.querySelectorAll('.chapter').forEach(function (s) { s.classList.add('in'); });
  }
  /* 4. Folio counter, and the bar shows once the cover has gone */
  var bar = d.getElementById('folio-bar'), num = d.getElementById('folio-num');
  if (hasIO && bar && num) {
    var pageIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var p = e.target.getAttribute('data-page');
        num.textContent = 'p. ' + p + ' of 09';
        bar.classList.toggle('on', p !== '01');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    d.querySelectorAll('[data-page]').forEach(function (s) { pageIO.observe(s); });
  } else if (bar) {
    bar.classList.add('on');
  }
  /* 5. Reading progress rule, rAF-throttled */
  var prog = d.querySelector('.folio-progress'), ticking = false;
  function paint() {
    ticking = false;
    var max = root.scrollHeight - window.innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    /* Catch openers skipped by a jump (End key, scrollbar drag, fast fling) */
    openers.forEach(function (o) {
      if (!o.closest('.chapter').classList.contains('in') && o.getBoundingClientRect().top < window.innerHeight) reveal(o);
    });
  }
  if (prog) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    paint();
  }
  /* 6. Reply coupon: validate on submit, error summary, demo success */
  var form = d.getElementById('brief-form');
  if (!form) return;
  var summary = d.getElementById('err-summary'), summaryH = d.getElementById('err-summary-h'), list = d.getElementById('err-list');
  var rules = [
    ['f-name', function (v) { return v.trim() !== ''; }],
    ['f-email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }],
    ['f-brief', function (v) { return v.trim() !== ''; }]
  ];
  function setState(field, ok) {
    var err = d.getElementById(field.id + '-err');
    var base = field.getAttribute('data-describedby') || '';
    err.hidden = ok;
    if (ok) field.removeAttribute('aria-invalid');
    else field.setAttribute('aria-invalid', 'true');
    var ids = (base + (ok ? '' : ' ' + err.id)).trim();
    if (ids) field.setAttribute('aria-describedby', ids);
    else field.removeAttribute('aria-describedby');
    return err.querySelector('.msg').textContent;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var bad = [];
    rules.forEach(function (r) {
      var field = d.getElementById(r[0]);
      var ok = r[1](field.value);
      var msg = setState(field, ok);
      if (!ok) bad.push({ id: field.id, msg: msg });
    });
    if (bad.length) {
      summaryH.textContent = bad.length === 1 ? 'There is 1 problem with your brief' : 'There are ' + bad.length + ' problems with your brief';
      list.innerHTML = '';
      bad.forEach(function (b) {
        var li = d.createElement('li');
        var a = d.createElement('a');
        a.href = '#' + b.id;
        a.textContent = b.msg;
        a.addEventListener('click', function (e) { e.preventDefault(); d.getElementById(b.id).focus(); });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.hidden = false;
      summary.focus({ preventScroll: true });
      summary.scrollIntoView({ block: 'center' });
      return;
    }
    summary.hidden = true;
    form.hidden = true;
    var done = d.getElementById('success');
    done.hidden = false;
    done.focus({ preventScroll: true });
    done.scrollIntoView({ block: 'center' });
  });
  /* Clear a field's error as soon as it becomes valid */
  rules.forEach(function (r) {
    var field = d.getElementById(r[0]);
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true' && r[1](field.value)) setState(field, true);
    });
  });
})();
