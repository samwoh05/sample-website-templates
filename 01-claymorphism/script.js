/* Big Squish. Small vanilla script: menu, reveal, hero play, demo form. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Menu sheet ---------- */
  var menuBtn = doc.querySelector('.menu-btn');
  var sheet = doc.getElementById('menu-sheet');
  var closeBtn = sheet ? sheet.querySelector('.sheet-close') : null;
  var closeTimer = null;
  var behind = doc.querySelectorAll('main, .site-footer');

  /* Modal: page behind goes inert and stops scrolling while the sheet is open. */
  function setBehind(isInert) {
    behind.forEach(function (el) { el.inert = isInert; });
    root.style.overflow = isInert ? 'hidden' : '';
  }

  function onOutside(e) {
    if (sheet.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu(false);
  }

  function focusables() {
    return Array.prototype.slice.call(
      sheet.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openMenu() {
    clearTimeout(closeTimer);
    sheet.hidden = false;
    sheet.classList.remove('is-closing');
    sheet.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    setBehind(true);
    doc.addEventListener('pointerdown', onOutside);
    var items = focusables();
    if (items.length) items[0].focus();
    doc.addEventListener('keydown', onSheetKey);
  }

  function closeMenu(returnFocus) {
    if (sheet.hidden) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    sheet.classList.remove('is-open');
    sheet.classList.add('is-closing');
    doc.removeEventListener('keydown', onSheetKey);
    doc.removeEventListener('pointerdown', onOutside);
    setBehind(false);
    closeTimer = setTimeout(function () {
      sheet.hidden = true;
      sheet.classList.remove('is-closing');
    }, reduceMotion ? 0 : 180);
    if (returnFocus) menuBtn.focus();
  }

  function onSheetKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(true);
      return;
    }
    if (e.key !== 'Tab') return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && (doc.activeElement === first || !sheet.contains(doc.activeElement))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (doc.activeElement === last || !sheet.contains(doc.activeElement))) {
      e.preventDefault();
      first.focus();
    }
  }

  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', function () {
      if (menuBtn.getAttribute('aria-expanded') === 'true') closeMenu(true);
      else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', function () { closeMenu(true); });
    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu(false);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) closeMenu(false);
    });
  }

  /* ---------- Current section in nav ---------- */
  var navLinks = doc.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.remove('is-current');
          a.removeAttribute('aria-current');
        });
        var link = linkFor[entry.target.id];
        if (link) {
          link.classList.add('is-current');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    doc.querySelectorAll('main section[id]').forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Section reveal ---------- */
  var revealItems = doc.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Hero play ---------- */
  var hero = doc.querySelector('.hero');
  var stage = doc.querySelector('.stage');
  var eyes = doc.querySelector('.eyes');

  if (hero && stage && !reduceMotion) {
    /* Bub looks at a hovered or focused CTA. Works for keyboard and touch too. */
    var ctas = [
      { el: hero.querySelector('.cta-1'), cls: 'look-cta1' },
      { el: hero.querySelector('.cta-2'), cls: 'look-cta2' }
    ];
    ctas.forEach(function (c) {
      if (!c.el) return;
      var on = function () { stage.classList.add(c.cls); };
      var off = function () { stage.classList.remove(c.cls); };
      c.el.addEventListener('mouseenter', on);
      c.el.addEventListener('mouseleave', off);
      c.el.addEventListener('focus', function () {
        var visible = true;
        try { visible = c.el.matches(':focus-visible'); } catch (err) { visible = true; }
        if (visible) on();
      });
      c.el.addEventListener('blur', off);
    });

    /* Squish on press. Coarse pointers get this too. */
    stage.querySelectorAll('.obj').forEach(function (obj) {
      obj.addEventListener('pointerdown', function () {
        obj.classList.remove('squish');
        void obj.offsetWidth;
        obj.classList.add('squish');
      });
      obj.addEventListener('animationend', function (e) {
        if (e.animationName === 'squish') obj.classList.remove('squish');
      });
    });

    /* Tilt, parallax and eye tracking on fine pointers only. */
    if (finePointer) {
      var frame = 0;
      var lastEvent = null;

      var update = function () {
        frame = 0;
        if (!lastEvent) return;
        var rect = hero.getBoundingClientRect();
        var px = ((lastEvent.clientX - rect.left) / rect.width) * 2 - 1;
        var py = ((lastEvent.clientY - rect.top) / rect.height) * 2 - 1;
        px = Math.max(-1, Math.min(1, px));
        py = Math.max(-1, Math.min(1, py));
        hero.style.setProperty('--px', px.toFixed(3));
        hero.style.setProperty('--py', py.toFixed(3));

        if (eyes) {
          var er = eyes.getBoundingClientRect();
          var dx = lastEvent.clientX - (er.left + er.width / 2);
          var dy = lastEvent.clientY - (er.top + er.height / 2);
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          var reach = Math.min(8, dist / 20);
          stage.style.setProperty('--ex', (dx / dist * reach).toFixed(2) + 'px');
          stage.style.setProperty('--ey', (dy / dist * reach).toFixed(2) + 'px');
        }
      };

      hero.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
        lastEvent = e;
        hero.classList.add('is-tracking');
        if (!frame) frame = requestAnimationFrame(update);
      });

      hero.addEventListener('pointerleave', function () {
        lastEvent = null;
        if (frame) { cancelAnimationFrame(frame); frame = 0; }
        hero.classList.remove('is-tracking');
        hero.style.setProperty('--px', '0');
        hero.style.setProperty('--py', '0');
        stage.style.setProperty('--ex', '0px');
        stage.style.setProperty('--ey', '0px');
      });
    }
  }

  /* ---------- Demo contact form ---------- */
  var form = doc.getElementById('contact-form');
  if (!form) return;

  var statusEl = doc.getElementById('form-status');
  var success = doc.getElementById('form-success');
  var failBox = doc.getElementById('form-fail');
  var submitBtn = form.querySelector('.btn-submit');
  var submitLabel = submitBtn.querySelector('.btn-label');
  var loaderTpl = doc.getElementById('loader-tpl');
  var attempted = false;

  var rules = {
    name: function (v) { return v.trim() ? '' : 'Please add your name.'; },
    email: function (v) {
      v = v.trim();
      if (!v) return 'Please add your email so I can reply.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'That email looks incomplete.';
    },
    message: function (v) { return v.trim() ? '' : 'Please write a line or two about the project.'; }
  };

  function setError(input, msg) {
    var err = doc.getElementById(input.id + '-error');
    if (!err) return;
    var text = err.querySelector('span');
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      if (text.textContent !== msg) text.textContent = msg;
      err.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      err.hidden = true;
      text.textContent = '';
    }
  }

  function validate(input) {
    var rule = rules[input.name];
    if (!rule) return true;
    var msg = rule(input.value);
    setError(input, msg);
    return !msg;
  }

  var checked = Array.prototype.filter.call(form.elements, function (el) {
    return rules[el.name];
  });

  checked.forEach(function (input) {
    input.addEventListener('input', function () {
      if (attempted) validate(input);
    });
  });

  function announce(msg) {
    statusEl.textContent = '';
    setTimeout(function () { statusEl.textContent = msg; }, 30);
  }

  function setLoading(on) {
    if (on) {
      submitBtn.style.width = submitBtn.offsetWidth + 'px';
      submitBtn.setAttribute('aria-busy', 'true');
      submitLabel.textContent = 'Sending';
      if (loaderTpl) submitBtn.insertBefore(loaderTpl.content.firstElementChild.cloneNode(true), submitLabel);
    } else {
      submitBtn.removeAttribute('aria-busy');
      submitBtn.style.width = '';
      submitLabel.textContent = 'Start a project';
      var spinner = submitBtn.querySelector('.spin');
      if (spinner) spinner.remove();
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.getAttribute('aria-busy') === 'true') return;
    attempted = true;
    failBox.hidden = true;

    var firstInvalid = null;
    checked.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    setLoading(true);
    announce('Sending');

    setTimeout(function () {
      var email = form.elements.email.value.toLowerCase();
      if (email.indexOf('fail') !== -1) {
        setLoading(false);
        failBox.hidden = false;
        announce(failBox.textContent);
        return;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
      announce('Thanks, that is in. Ottilie will reply within two working days.');
    }, 1200);
  });
})();
