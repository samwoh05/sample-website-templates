/* 12-bento-box: optional behaviour. The page works without this file. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function motionOK() { return !(reduceQuery && reduceQuery.matches); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* 1. Rotterdam clock: updates on the minute, not a live region.
     Without JS the tile shows "CET" and "Rotterdam time zone", never a fake time. */
  var clock = document.getElementById('clock');
  var zone = document.getElementById('clock-zone');
  if (clock && window.Intl && Intl.DateTimeFormat) {
    var timeFmt = null;
    var zoneFmt = null;
    try {
      timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
      zoneFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', timeZoneName: 'short' });
    } catch (e) { timeFmt = null; }

    if (timeFmt) {
      var firstTick = true;
      var setTime = function (text) { clock.textContent = text; };
      var tick = function () {
        var now = new Date();
        var text = timeFmt.format(now);

        if (zone && zoneFmt && zoneFmt.formatToParts) {
          var name = '';
          each(zoneFmt.formatToParts(now), function (part) {
            if (part.type === 'timeZoneName') { name = part.value; }
          });
          zone.textContent = (!name || name.indexOf('GMT') === 0) ? 'Rotterdam time' : name;
        }

        if (clock.textContent !== text) {
          if (!firstTick && motionOK()) {
            clock.classList.add('is-fading');
            window.setTimeout(function () {
              setTime(text);
              clock.classList.remove('is-fading');
            }, 150);
          } else {
            setTime(text);
          }
        }
        firstTick = false;
        window.setTimeout(tick, 60000 - Date.now() % 60000);
      };
      tick();
    }
  }

  /* 2. Reshuffle the hero grid. Spans never change, so FLIP only translates. */
  var hero = document.getElementById('hero-grid');
  var shuffleBtn = document.getElementById('reshuffle');
  var heroStatus = document.getElementById('hero-status');
  if (hero && shuffleBtn) {
    var layouts = ['a', 'b', 'c'];
    var busy = false;

    shuffleBtn.addEventListener('click', function () {
      if (busy) { return; }
      var tiles = Array.prototype.filter.call(hero.children, function (el) {
        return el.classList.contains('tile');
      });
      var current = layouts.indexOf(hero.getAttribute('data-layout'));
      var next = (current + 1) % layouts.length;
      var animate = motionOK() && typeof Element.prototype.animate === 'function';
      var first = animate ? tiles.map(function (t) { return t.getBoundingClientRect(); }) : null;

      hero.setAttribute('data-layout', layouts[next]);
      if (heroStatus) { heroStatus.textContent = 'Layout ' + (next + 1) + ' of ' + layouts.length; }
      if (!animate) { return; }

      busy = true;
      var running = [];
      tiles.forEach(function (tile, i) {
        var last = tile.getBoundingClientRect();
        var dx = first[i].left - last.left;
        var dy = first[i].top - last.top;
        if (!dx && !dy) { return; }
        var anim = tile.animate(
          [{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'none' }],
          { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' }
        );
        running.push(anim.finished);
      });
      var done = function () { busy = false; };
      Promise.all(running).then(done, done);
    });
  }

  /* 3. Reveal tiles in sections 02 onward. Each tile is observed on its own,
     so tiles already in view never wait for the rest of their grid. */
  var tiles = document.querySelectorAll('.reveal > *');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var k = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        /* Stagger only the tiles that arrive together */
        entry.target.style.setProperty('--i', Math.min(k, 6));
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
        k += 1;
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    each(tiles, function (tile) { io.observe(tile); });
  } else {
    each(tiles, function (tile) { tile.classList.add('is-in'); });
  }

  /* 4. Copy email */
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  if (copyBtn) {
    var copyText = copyBtn.querySelector('.copy-btn__text');
    var resetTimer = null;
    var announce = function (msg) {
      if (!copyStatus) { return; }
      copyStatus.textContent = '';
      window.setTimeout(function () { copyStatus.textContent = msg; }, 50);
    };
    var copied = function () {
      copyBtn.classList.add('is-copied');
      copyText.textContent = 'Copied';
      announce('Email address copied.');
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(function () {
        copyBtn.classList.remove('is-copied');
        copyText.textContent = 'Copy email';
      }, 2000);
    };
    var emailLink = document.querySelector('.email-link');
    var failed = function () {
      /* Select the address so the user can copy it with the keyboard */
      if (emailLink && window.getSelection && document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(emailLink);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      copyBtn.classList.remove('is-copied');
      copyText.textContent = 'Address selected';
      announce('Copy failed. The address is selected, copy it with your keyboard.');
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(function () { copyText.textContent = 'Copy email'; }, 3000);
    };
    copyBtn.addEventListener('click', function () {
      var address = copyBtn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(copied, failed);
      } else {
        failed();
      }
    });
  }

  /* 5. Form: client-side checks only. Nothing is sent. */
  var form = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');
  if (form) {
    /* Native checks run when JS is off; with JS the inline messages take over */
    form.noValidate = true;
    var alertIcon = '<svg class="icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="7.5"/><path d="M10 6.5v4.5M10 13.75v.01"/></svg>';
    var rules = [
      { id: 'name', msg: 'Enter your name.', test: function (el) { return el.value.trim() !== ''; } },
      { id: 'email', msg: 'Enter an email address like name@example.com.', test: function (el) { return el.value.trim() !== '' && el.validity.valid; } },
      { id: 'type', msg: 'Choose a project type.', test: function (el) { return el.value !== ''; } },
      { id: 'message', msg: 'Write a short message.', test: function (el) { return el.value.trim() !== ''; } }
    ];

    var setError = function (rule, el, invalid) {
      var err = document.getElementById(rule.id + '-error');
      if (invalid) {
        el.setAttribute('aria-invalid', 'true');
        if (err) {
          err.innerHTML = alertIcon;
          var span = document.createElement('span');
          span.textContent = rule.msg;
          err.appendChild(span);
        }
      } else {
        el.removeAttribute('aria-invalid');
        if (err) { err.textContent = ''; }
      }
    };

    rules.forEach(function (rule) {
      var el = document.getElementById(rule.id);
      if (!el) { return; }
      var recheck = function () {
        if (el.getAttribute('aria-invalid') === 'true' && rule.test(el)) { setError(rule, el, false); }
      };
      el.addEventListener('input', recheck);
      el.addEventListener('change', recheck);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;
      var count = 0;
      rules.forEach(function (rule) {
        var el = document.getElementById(rule.id);
        if (!el) { return; }
        var ok = rule.test(el);
        setError(rule, el, !ok);
        if (!ok) {
          count += 1;
          if (!firstInvalid) { firstInvalid = el; }
        }
      });

      var message = count === 0
        ? 'This is a template form. Connect it to your form service to send messages.'
        : (count === 1 ? '1 field needs attention.' : count + ' fields need attention.');
      if (firstInvalid) { firstInvalid.focus(); }
      /* Clear first so the same message is announced again on a repeat submit */
      formStatus.textContent = '';
      window.setTimeout(function () { formStatus.textContent = message; }, 50);
    });
  }
})();
