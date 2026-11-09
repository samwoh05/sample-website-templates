/* Night Shift LP: small vanilla helpers. Everything visual lives in styles.css. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* 1. Intro: start once fonts are ready, or after 1200ms */
  var ready = function () { root.classList.add('is-ready'); };
  var readyTimer = setTimeout(ready, 1200);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { clearTimeout(readyTimer); requestAnimationFrame(ready); });
  }

  /* Reduced motion, read live */
  var rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var syncRM = function () { root.classList.toggle('rm', rmQuery.matches); };
  syncRM();
  if (rmQuery.addEventListener) rmQuery.addEventListener('change', syncRM);

  var hasIO = 'IntersectionObserver' in window;

  /* 2. Nav: solid background after the sentinel, current section */
  var nav = document.querySelector('.nav');
  var sentinel = document.querySelector('.nav-sentinel');
  if (hasIO && nav && sentinel) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('nav-solid', !entries[0].isIntersecting);
    }).observe(sentinel);
  }
  var navLinks = document.querySelectorAll('.nav__links a, .menu__links a');
  if (hasIO) {
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        /* The hero (#top) has no nav link, so this clears every link */
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { sectionIO.observe(s); });
    var heroEl = document.getElementById('top');
    if (heroEl) sectionIO.observe(heroEl);
  }

  /* 3. Mobile menu */
  var menu = document.getElementById('menu');
  var menuBtn = document.querySelector('.menu-btn');
  var closeBtn = document.querySelector('.menu-close');
  var focusables = function () { return menu.querySelectorAll('a[href], button'); };
  /* Everything behind the open menu is made inert for keyboard and screen reader users */
  var behind = document.querySelectorAll('.skip-link, .nav__inner, .cover-name, .cover-ui, main, .footer');
  var setInert = function (on) {
    behind.forEach(function (el) {
      if (on) { el.inert = true; el.setAttribute('aria-hidden', 'true'); }
      else { el.inert = false; el.removeAttribute('aria-hidden'); }
    });
  };
  var openMenu = function () {
    setInert(true);
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    root.classList.add('menu-open');
    closeBtn.focus();
  };
  var closeMenu = function (returnFocus) {
    setInert(false);
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    root.classList.remove('menu-open');
    if (returnFocus) menuBtn.focus();
  };
  if (menu && menuBtn && closeBtn) {
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', function () { closeMenu(true); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && !menu.hidden) closeMenu(false); });
  }

  /* 4. Pause motion toggle, remembered per visitor */
  var pauseBtn = document.querySelector('.pause-btn');
  var setPaused = function (on) {
    root.classList.toggle('motion-off', on);
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  };
  try { if (localStorage.getItem('rv08-motion') === 'off') setPaused(true); } catch (err) { /* storage blocked */ }
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      var on = !root.classList.contains('motion-off');
      setPaused(on);
      try { localStorage.setItem('rv08-motion', on ? 'off' : 'on'); } catch (err) { /* storage blocked */ }
    });
  }

  /* 5. Pause hero loops when off screen or when the tab is hidden */
  var hero = document.querySelector('.hero');
  var heroVisible = true;
  var syncHero = function () { root.classList.toggle('hero-off', !heroVisible || document.hidden); };
  if (hasIO && hero) {
    new IntersectionObserver(function (entries) { heroVisible = entries[0].isIntersecting; syncHero(); }).observe(hero);
  }
  document.addEventListener('visibilitychange', syncHero);

  /* 6. Tracklist: the now playing screen follows hover and focus */
  var covers = document.querySelectorAll('.screen__frame .ph');
  var npCode = document.querySelector('.np-code');
  var npTime = document.querySelector('.np-time');
  var play = function (track) {
    var id = track.getAttribute('data-track');
    covers.forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-track') === id); });
    if (npCode) npCode.textContent = id;
    if (npTime) npTime.textContent = track.getAttribute('data-time');
  };
  /* Track links are placeholders (href="#") until real project URLs go in: stop them jumping to the top */
  document.querySelectorAll('.track__title a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
  document.querySelectorAll('.track').forEach(function (t) {
    t.addEventListener('mouseenter', function () { play(t); });
    t.addEventListener('focusin', function () { play(t); });
  });

  /* 7. Reveals, once, with a 60ms stagger inside lists */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (hasIO) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) {
      var parent = el.parentElement;
      var siblings = parent ? Array.prototype.filter.call(parent.children, function (c) { return c.hasAttribute('data-reveal'); }) : [];
      el.style.setProperty('--i', Math.max(0, siblings.indexOf(el)));
      revealIO.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* 8. Lisbon clock */
  var clock = document.querySelector('.clock__live');
  if (clock && window.Intl) {
    var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' });
    var tick = function () { clock.textContent = 'Lisbon ' + fmt.format(new Date()); };
    tick();
    setInterval(tick, 60000);
  }

  /* 9. Booking form: validation, error summary, demo message */
  var form = document.getElementById('booking');
  if (!form) return;
  var summary = document.getElementById('err-summary');
  var status = form.querySelector('.form-status');
  var warn = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/></svg>';
  var rules = [
    { id: 'f-name', test: function (v) { return v.trim() !== ''; }, msg: 'Enter your name.' },
    { id: 'f-email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: 'Enter an email address like name@studio.com.' },
    { id: 'f-type', test: function (v) { return v !== ''; }, msg: 'Choose a project type.' },
    { id: 'f-msg', test: function (v) { return v.trim().length >= 20; }, msg: 'Write at least 20 characters about the project.' }
  ];
  var setError = function (field, err, msg) {
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', err.id);
      err.innerHTML = warn + '<span>' + msg + '</span>';
      err.hidden = false;
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      err.hidden = true;
      err.textContent = '';
    }
  };
  var check = function (rule) {
    var field = document.getElementById(rule.id);
    var ok = rule.test(field.value);
    setError(field, document.getElementById(rule.id + '-err'), ok ? '' : rule.msg);
    return ok;
  };
  rules.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    field.addEventListener('blur', function () { if (field.hasAttribute('aria-invalid')) check(rule); });
    field.addEventListener('input', function () { if (field.hasAttribute('aria-invalid')) check(rule); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var failed = rules.filter(function (rule) { return !check(rule); });
    if (failed.length) {
      var n = failed.length;
      summary.innerHTML = '<p>' + n + (n === 1 ? ' field needs' : ' fields need') + ' attention</p><ul>' +
        failed.map(function (r) { return '<li><a href="#' + r.id + '">' + r.msg + '</a></li>'; }).join('') + '</ul>';
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;
    summary.innerHTML = '';
    form.reset();
    status.textContent = 'Demo only: nothing was sent. Connect this form to your own service before publishing.';
  });
  summary.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) target.focus();
  });
})();
