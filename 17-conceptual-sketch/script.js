/* Conceptual Sketch portfolio (#17). Vanilla, no dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motion = !mqReduce.matches;
  if (!motion) root.classList.remove('motion');

  /* 1-2. Draw gating and hero start */
  if (motion) {
    document.querySelectorAll('svg[data-draw], svg [data-draw]').forEach(function (el) {
      el.classList.add('pre-draw');
    });
    var started = false;
    var start = function () {
      if (started) return;
      started = true;
      // two frames so the hidden state paints before the transition starts
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.classList.add('is-ready'); });
      });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    setTimeout(start, 600);
  } else {
    root.classList.add('is-ready');
  }

  /* 3. Section and project reveals, once each */
  var revealEls = document.querySelectorAll('section[data-draw], .project');
  if (!motion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-drawn'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-drawn');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* 4. Show working toggle */
  var toggles = document.querySelectorAll('[data-toggle-working]');
  var setWorking = function (on, save) {
    root.classList.toggle('is-clean', !on);
    toggles.forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    if (save) {
      try { localStorage.setItem('oda-working', on ? 'on' : 'off'); } catch (e) {}
    }
  };
  setWorking(!root.classList.contains('is-clean'), false);
  toggles.forEach(function (b) {
    b.addEventListener('click', function () {
      setWorking(b.getAttribute('aria-pressed') !== 'true', true);
    });
  });

  /* 5. Nav: current sheet and the mobile index */
  var navLinks = document.querySelectorAll('.nav-inline a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { navIo.observe(s); });
  }
  var index = document.querySelector('details.index');
  if (index) {
    var summary = index.querySelector('summary');
    index.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && index.open) {
        index.open = false;
        summary.focus();
      }
    });
    index.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { index.open = false; });
    });
  }

  /* 6. Hero viewBox crop on narrow screens */
  var heroSvg = document.getElementById('hero-svg');
  var mqNarrow = window.matchMedia('(max-width: 639px)');
  var setViewBox = function () {
    if (!heroSvg) return;
    heroSvg.setAttribute('viewBox', heroSvg.getAttribute(mqNarrow.matches ? 'data-vb-narrow' : 'data-vb-wide'));
  };
  setViewBox();
  if (mqNarrow.addEventListener) mqNarrow.addEventListener('change', setViewBox);
  else if (mqNarrow.addListener) mqNarrow.addListener(setViewBox);

  /* 7. CTA line boil, hover only */
  var cta = document.querySelector('.btn-primary');
  var turb = document.getElementById('cta-turb');
  if (cta && turb && motion) {
    var seeds = [3, 7, 11], si = 0, timer = null;
    var boil = function () {
      if (timer) return;
      timer = setInterval(function () {
        si = (si + 1) % seeds.length;
        turb.setAttribute('seed', seeds[si]);
      }, 180);
    };
    var stop = function () { clearInterval(timer); timer = null; };
    cta.addEventListener('mouseenter', boil);
    cta.addEventListener('focus', boil);
    cta.addEventListener('mouseleave', stop);
    cta.addEventListener('blur', stop);
  }

  /* Leaders from margin quotes to phrases in the lead quote */
  var notesGrid = document.querySelector('.notes-grid');
  var drawLeaders = function () {
    if (!notesGrid) return;
    var box = notesGrid.getBoundingClientRect();
    notesGrid.querySelectorAll('.mq[data-leader]').forEach(function (fig) {
      var path = document.getElementById(fig.getAttribute('data-leader'));
      var target = document.getElementById(fig.getAttribute('data-target'));
      if (!path || !target) return;
      var a = fig.getBoundingClientRect(), t = target.getBoundingClientRect();
      var isA = fig.classList.contains('mq-a');
      var x1 = (isA ? a.left - 8 : a.left + 24) - box.left;
      var y1 = (isA ? a.top + a.height * 0.5 : a.top - 8) - box.top;
      var x2 = (isA ? t.right : t.left + t.width * 0.5) - box.left;
      var y2 = (isA ? t.top - 6 : t.bottom + 8) - box.top;
      var cx = isA ? (x1 + x2) / 2 : x1 - 10, cy = isA ? y1 : (y1 + y2) / 2;
      path.setAttribute('d', 'M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Q' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ' + x2.toFixed(1) + ',' + y2.toFixed(1));
    });
  };
  drawLeaders();
  window.addEventListener('resize', drawLeaders);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLeaders);

  /* 8. Brief form: validation, errors, success */
  var form = document.getElementById('brief');
  if (!form) return;
  var bang = '<svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M9,2.5 C9.3,6 8.8,8.5 9,11.5"/><path d="M9,14.6 L9.1,15"/></svg>';
  var submitted = false;
  var checks = {
    name: function () { return form.elements.name.value.trim() ? '' : 'Add your name.'; },
    email: function () {
      var v = form.elements.email.value.trim();
      if (!v) return 'Add your email.';
      if (v.indexOf('@') === -1) return 'That email is missing an @.';
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? '' : 'Check the email, it looks incomplete.';
    },
    timing: function () { return form.querySelector('input[name="timing"]:checked') ? '' : 'Pick one of A, B or C.'; },
    brief: function () { return form.elements.brief.value.trim().length >= 20 ? '' : 'A few more words, please. 20 characters at least.'; }
  };
  var fieldEl = function (key) {
    return key === 'timing' ? form.querySelector('.timing') : form.elements[key];
  };
  var show = function (key, msg) {
    var err = document.getElementById('err-' + key);
    var el = fieldEl(key);
    var targets = key === 'timing' ? form.querySelectorAll('input[name="timing"]') : [el];
    if (msg) {
      err.innerHTML = bang + '<span></span>';
      err.lastChild.textContent = msg;
      if (key === 'timing') el.setAttribute('aria-invalid', 'true');
      targets.forEach(function (t) {
        t.setAttribute('aria-invalid', 'true');
        t.setAttribute('aria-describedby', 'err-' + key);
      });
    } else {
      err.textContent = '';
      if (key === 'timing') el.removeAttribute('aria-invalid');
      targets.forEach(function (t) {
        t.removeAttribute('aria-invalid');
        t.removeAttribute('aria-describedby');
      });
    }
  };
  var jiggle = function (key) {
    if (!motion) return;
    var wrap = form.querySelector('[data-field="' + key + '"]');
    var label = wrap && wrap.querySelector('label, legend');
    if (!label) return;
    label.classList.remove('jiggle');
    void label.offsetWidth;
    label.classList.add('jiggle');
  };
  Object.keys(checks).forEach(function (key) {
    var el = key === 'timing' ? form.querySelectorAll('input[name="timing"]') : [form.elements[key]];
    el.forEach(function (input) {
      input.addEventListener(key === 'timing' ? 'change' : 'blur', function () {
        if (submitted) show(key, checks[key]());
      });
    });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitted = true;
    var first = null;
    Object.keys(checks).forEach(function (key) {
      var msg = checks[key]();
      show(key, msg);
      if (msg) {
        jiggle(key);
        if (!first) first = key === 'timing' ? form.querySelector('input[name="timing"]') : form.elements[key];
      }
    });
    if (first) { first.focus(); return; }
    var box = document.createElement('div');
    box.className = 'sent';
    box.setAttribute('tabindex', '-1');
    box.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path pathLength="1" d="M6,22 L16,32 L35,7"/></svg><p>Noted. This form is a template and sends nothing.</p>';
    form.replaceWith(box);
    box.focus();
    var status = document.getElementById('brief-status');
    if (status) status.textContent = 'Noted. This form is a template and sends nothing.';
  });
})();
