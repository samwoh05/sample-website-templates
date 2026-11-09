/* Bea Kowalczyk portfolio template. Vanilla JS, no libraries, no scroll listeners.
   Every section stays readable if this file fails to load. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var mq = function (q) {
    return window.matchMedia ? window.matchMedia(q) : { matches: false };
  };
  var reduced = mq('(prefers-reduced-motion: reduce)');
  var hasIO = 'IntersectionObserver' in window;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function onChange(list, fn) {
    if (list.addEventListener) list.addEventListener('change', fn);
    else if (list.addListener) list.addListener(fn);
  }

  /* Re-run a one-shot CSS animation class. Skipped under reduced motion. */
  function replay(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    if (reduced.matches) return;
    void el.offsetWidth;
    el.classList.add(cls);
  }

  var ICON_WARN = '<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M12 3L2 21h20z"/><path d="M12 10v4.5M12 17.5v.5"/></svg>';
  var ICON_CHECK = '<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M4 4h16v16H4z"/><path d="M8 12.5l3 3 5-6.5"/></svg>';

  /* 1. Mobile menu */
  var menuBtn = $('.menu-btn');
  var nav = $('#mobile-nav');
  if (menuBtn && nav) {
    var menuLabel = $('.menu-btn__label', menuBtn);
    var wide = mq('(min-width: 1024px)');
    var isOpen = function () { return menuBtn.getAttribute('aria-expanded') === 'true'; };
    var setMenu = function (open, returnFocus) {
      menuBtn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu';
      if (!open && returnFocus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', function () { setMenu(!isOpen()); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setMenu(false, true);
    });
    nav.addEventListener('click', function (e) {
      if (isOpen() && e.target.closest('a')) setMenu(false);
    });
    onChange(wide, function (e) { if (e.matches) setMenu(false); });
  }

  /* 2. Ticker pause toggle (WCAG 2.2.2) */
  var ticker = $('.ticker');
  var tickerBtn = $('.ticker__toggle');
  if (ticker && tickerBtn) {
    tickerBtn.addEventListener('click', function () {
      var paused = tickerBtn.getAttribute('aria-pressed') !== 'true';
      tickerBtn.setAttribute('aria-pressed', String(paused));
      ticker.classList.toggle('is-paused', paused);
    });
  }

  /* 3. Services tabs: roving tabindex, automatic activation */
  var tablist = $('.svc-tabs');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var panels = tabs.map(function (t) { return doc.getElementById(t.getAttribute('aria-controls')); });
    tabs.forEach(function (tab, i) {
      if (!panels[i]) return;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
    });
    var selectTab = function (index, focus) {
      tabs.forEach(function (tab, j) {
        var on = j === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };
    var current = 0;
    tabs.forEach(function (tab, i) { if (tab.getAttribute('aria-selected') === 'true') current = i; });
    selectTab(current, false);

    var activate = function (i, focus) {
      if (i === current) { if (focus) tabs[i].focus(); return; }
      current = i;
      selectTab(i, focus);
      replay(panels[i], 'is-thunk');
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(i, false); });
      tab.addEventListener('keydown', function (e) {
        var last = tabs.length - 1;
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        if (next === null) return;
        e.preventDefault();
        activate(next, true);
      });
    });
  }

  /* 4. Nav scroll-spy: lime fill on the section in the middle of the viewport */
  var navLinks = $$('.site-nav__link');
  if (hasIO && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var currentId = null;
    var setCurrent = function (id) {
      currentId = id;
      navLinks.forEach(function (a) {
        if (byId[id] === a) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setCurrent(en.target.id);
        else if (currentId === en.target.id) setCurrent(null);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = doc.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* 5. Comic strip reveal. Content is only hidden once this gate is set. */
  var strip = $('.strip');
  if (strip && hasIO && !reduced.matches) {
    root.classList.add('reveal-ready');
    var revealIO = null;
    var reveal = function () {
      strip.classList.add('is-in');
      if (revealIO) revealIO.disconnect();
    };
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) reveal(); });
    }, { threshold: 0.2 });
    revealIO.observe(strip);
    strip.addEventListener('focusin', reveal);
    window.addEventListener('beforeprint', reveal);
    /* Failsafe: if the strip is already in or above the viewport after 2.5s, show it. */
    window.setTimeout(function () {
      if (strip.getBoundingClientRect().top < window.innerHeight) reveal();
    }, 2500);
  }

  /* 6. Demo form. Sends nothing. */
  var form = $('#brief-form');
  var nameEl = $('#f-name');
  var typeEl = $('#f-type');
  var emailEl = $('#f-email');
  var status = $('#form-status');
  var submitted = false;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var checks = [
    { el: nameEl, test: function (v) { return v.trim() ? '' : 'Add your name so I know who to reply to.'; } },
    { el: typeEl, test: function (v) { return v ? '' : 'Pick a project type. Not sure is fine.'; } },
    { el: emailEl, test: function (v) {
      v = v.trim();
      if (!v) return 'Add an email so I can reply.';
      return EMAIL.test(v) ? '' : 'That email looks wrong. Check for a typo.';
    } }
  ].filter(function (c) { return c.el; });

  function showError(c, msg) {
    var err = doc.getElementById(c.el.id + '-error');
    if (msg) {
      c.el.setAttribute('aria-invalid', 'true');
      if (err) {
        err.innerHTML = ICON_WARN;
        var t = doc.createElement('span');
        t.textContent = msg;
        err.appendChild(t);
        err.hidden = false;
        c.el.setAttribute('aria-describedby', err.id);
      }
    } else {
      c.el.removeAttribute('aria-invalid');
      c.el.removeAttribute('aria-describedby');
      if (err) { err.hidden = true; err.textContent = ''; }
    }
    return !!msg;
  }

  function setStatus(kind, text) {
    if (!status) return;
    status.textContent = '';
    if (!text) return;
    var s = doc.createElement('span');
    s.className = 'sticker sticker--msg ' + (kind === 'ok' ? 'sticker--lime' : 'sticker--pink');
    s.innerHTML = kind === 'ok' ? ICON_CHECK : ICON_WARN;
    var t = doc.createElement('span');
    t.textContent = text;
    s.appendChild(t);
    status.appendChild(s);
    replay(s, 'is-slapped');
  }

  function countText(n) {
    return n === 1 ? '1 blank needs fixing.' : n + ' blanks need fixing.';
  }

  if (form) {
    form.noValidate = true;
    var lastCount = 0;

    var recount = function () {
      var n = checks.filter(function (c) { return c.el.getAttribute('aria-invalid') === 'true'; }).length;
      if (n !== lastCount) setStatus('err', n ? countText(n) : '');
      lastCount = n;
    };

    checks.forEach(function (c) {
      var revalidate = function () {
        if (!submitted) return;
        showError(c, c.test(c.el.value));
        recount();
      };
      c.el.addEventListener('blur', revalidate);
      if (c.el.tagName === 'SELECT') c.el.addEventListener('change', revalidate);
      /* While typing, only clear a fixed error. New errors wait for blur, so the
         Send button never jumps under the pointer. */
      c.el.addEventListener('input', function () {
        if (submitted && c.el.getAttribute('aria-invalid') === 'true' && !c.test(c.el.value)) {
          showError(c, '');
          recount();
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitted = true;
      var firstBad = null;
      var bad = 0;
      checks.forEach(function (c) {
        if (showError(c, c.test(c.el.value))) {
          bad += 1;
          if (!firstBad) firstBad = c.el;
        }
      });
      lastCount = bad;
      if (bad) {
        setStatus('err', countText(bad));
        firstBad.focus();
        return;
      }
      var first = nameEl ? nameEl.value.trim().split(/\s+/)[0] : '';
      setStatus('ok', (first ? 'Thanks, ' + first + '.' : 'Thanks.') + ' This is a demo form, so nothing was sent.');
      form.reset();
      submitted = false;
      lastCount = 0;
      checks.forEach(function (c) { showError(c, ''); });
    });
  }

  /* Placeholder social links (href="#"): stay put instead of jumping to the top. */
  $$('[data-placeholder-link][href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* "Ask about" buttons: prefill Project type, scroll to the form, focus Your name. */
  $$('[data-service]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var contact = $('#contact');
      if (!typeEl || !contact) return;
      e.preventDefault();
      var value = btn.getAttribute('data-service');
      Array.prototype.forEach.call(typeEl.options, function (opt) {
        if (opt.value === value) typeEl.value = value;
      });
      if (submitted) {
        checks.forEach(function (c) { if (c.el === typeEl) showError(c, c.test(typeEl.value)); });
      }
      contact.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
      if (nameEl) {
        try { nameEl.focus({ preventScroll: true }); } catch (err) { nameEl.focus(); }
      }
    });
  });
})();
