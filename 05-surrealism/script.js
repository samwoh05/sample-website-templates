/* The Long Afternoon: menu, reveals, cloud pause, eye follow, demo form. */
(function () {
  'use strict';
  var doc = document;
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reduced() { return !!(mq && mq.matches); }

  /* 1. Menu toggle */
  var btn = doc.querySelector('.menu-btn');
  var panel = doc.getElementById('nav-panel');
  if (btn && panel) {
    var label = btn.querySelector('.menu-btn__text');
    var setOpen = function (open, returnFocus) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.classList.toggle('is-open', open);
      if (label) label.textContent = open ? 'Close' : 'Menu';
      if (!open && returnFocus) btn.focus();
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true', false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setOpen(false, false);
    });
    /* Close when focus or a tap leaves the panel */
    panel.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (btn.getAttribute('aria-expanded') === 'true' && to && !panel.contains(to) && to !== btn) setOpen(false, false);
    });
    doc.addEventListener('pointerdown', function (e) {
      if (btn.getAttribute('aria-expanded') === 'true' && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false, false);
    });
  }

  /* 2. Reveals: work frames and stair steps */
  var targets = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  var showAll = function () {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  };
  if (targets.length) {
    if (!('IntersectionObserver' in window)) {
      showAll();
    } else {
      var fired = false;
      var io = new IntersectionObserver(function (entries) {
        fired = true;
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      targets.forEach(function (t) { io.observe(t); });
      /* Safety net: if the observer never reports, show everything. When it
         does report, reveals wait for the reader to scroll to them. */
      var net = function () { window.setTimeout(function () { if (!fired) showAll(); }, 1500); };
      /* Keyboard focus reveals a hidden step or cloud before it is seen */
      doc.addEventListener('focusin', function (e) {
        var r = e.target.closest && e.target.closest('.reveal');
        if (r && !r.classList.contains('is-in')) { r.classList.add('is-in'); io.unobserve(r); }
      });
      if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', net);
      else net();
    }
  }

  /* 3. Pause the cloud drift when the hero leaves the viewport */
  var hero = doc.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('is-offscreen', !entries[0].isIntersecting);
    }).observe(hero);
  }

  /* 4. The eye watches the pointer (fine pointers, motion allowed) */
  var words = doc.getElementById('words');
  var look = doc.getElementById('eye-look');
  var eye = doc.querySelector('.eye');
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (words && look && eye && fine) {
    var px = 0, py = 0, frame = 0;
    var rest = function () {
      if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
      look.style.transform = 'translate(0px,0px)';
    };
    var aim = function () {
      frame = 0;
      var r = eye.getBoundingClientRect();
      var dx = px - (r.left + r.width / 2);
      var dy = py - (r.top + r.height / 2);
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var m = Math.min(10, d / 24);
      look.style.transform = 'translate(' + (dx / d * m).toFixed(2) + 'px,' + (dy / d * m).toFixed(2) + 'px)';
    };
    words.addEventListener('pointermove', function (e) {
      /* read the setting on every move, so turning on reduced motion stops the eye at once */
      if (reduced()) { rest(); return; }
      px = e.clientX; py = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(aim);
    });
    words.addEventListener('pointerleave', rest);
  }

  /* 5. Lines of sight: join the eye to each quote, measured from the layout */
  var grid = doc.querySelector('.words__grid');
  var sight = grid && grid.querySelector('.words__sight path');
  if (grid && sight && eye) {
    /* corners of every rendered text line in a quote (tight, not the block box) */
    var corners = function (q) {
      var out = [];
      Array.prototype.forEach.call(q.querySelectorAll('blockquote p, .quote__name, .quote__role'), function (el) {
        var rg = doc.createRange();
        rg.selectNodeContents(el);
        Array.prototype.forEach.call(rg.getClientRects(), function (r) {
          if (r.width < 2) return;
          out.push([r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]);
        });
      });
      return out;
    };
    var draw = function () {
      if (sight.ownerSVGElement && window.getComputedStyle(sight.ownerSVGElement).display === 'none') return;
      var g = grid.getBoundingClientRect();
      if (!g.width || !g.height) return;
      var er = eye.getBoundingClientRect();
      var sx = er.width / 360, sy = er.height / 228;
      /* the almond: centre and radii in the eye's viewBox (0 -14 360 228) */
      var cx = er.left + 180 * sx, cy = er.top + 114 * sy;
      var rx = 170 * sx, ry = 70 * sy;
      /* the paper cloud resting on the eye: sight lines never cross it */
      var cl = { l: er.left + 144 * sx, r: er.left + 306 * sx, t: er.top, b: er.top + 66 * sy };
      var hitsCloud = function (x1, y1, x2, y2) {
        for (var i = 0; i <= 20; i++) {
          var x = x1 + (x2 - x1) * i / 20, y = y1 + (y2 - y1) * i / 20;
          if (x > cl.l && x < cl.r && y > cl.t && y < cl.b) return true;
        }
        return false;
      };
      var d = '';
      Array.prototype.forEach.call(grid.querySelectorAll('.quote'), function (q) {
        var best = null;
        corners(q).forEach(function (c) {
          var dx = c[0] - cx, dy = c[1] - cy, len = Math.sqrt(dx * dx + dy * dy);
          if (!len) return;
          var ux = dx / len, uy = dy / len;
          var edge = 1 / Math.sqrt((ux * ux) / (rx * rx) + (uy * uy) / (ry * ry));
          if (len - edge < 40) return;
          var seg = [cx + ux * (edge + 12), cy + uy * (edge + 12), c[0] - ux * 12, c[1] - uy * 12];
          if (hitsCloud(seg[0], seg[1], seg[2], seg[3])) return;
          if (!best || len < best.len) best = { len: len, seg: seg };
        });
        if (!best) return;
        var fx = function (x) { return ((x - g.left) / g.width * 100).toFixed(2); };
        var fy = function (y) { return ((y - g.top) / g.height * 100).toFixed(2); };
        d += 'M' + fx(best.seg[0]) + ' ' + fy(best.seg[1]) + 'L' + fx(best.seg[2]) + ' ' + fy(best.seg[3]);
      });
      if (d) sight.setAttribute('d', d);
    };
    var t = 0;
    window.addEventListener('resize', function () { window.clearTimeout(t); t = window.setTimeout(draw, 120); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(draw);
    window.addEventListener('load', draw);
    draw();
  }

  /* 6. Demo form: inline errors, status message, no network */
  var form = doc.querySelector('.brief-form');
  if (form) {
    form.setAttribute('novalidate', '');
    var status = form.querySelector('.form-status');
    var door = doc.querySelector('.cdoor');
    var fields = Array.prototype.slice.call(form.querySelectorAll('[data-msg]'));
    var setError = function (field, msg) {
      var err = doc.getElementById(field.id + '-error');
      var base = field.getAttribute('data-describedby') || '';
      if (!err) return;
      if (msg) {
        var text = err.querySelector('.field__error-text');
        if (text) text.textContent = msg;
        err.hidden = false;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', (base + ' ' + err.id).trim());
      } else {
        err.hidden = true;
        field.removeAttribute('aria-invalid');
        if (base) field.setAttribute('aria-describedby', base);
        else field.removeAttribute('aria-describedby');
      }
    };
    fields.forEach(function (f) {
      f.setAttribute('data-describedby', f.getAttribute('aria-describedby') || '');
      f.addEventListener('input', function () {
        if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) setError(f, '');
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      fields.forEach(function (f) {
        if (f.checkValidity()) { setError(f, ''); }
        else {
          var msg = (f.validity && f.validity.typeMismatch && f.getAttribute('data-msg-type')) || f.getAttribute('data-msg');
          setError(f, msg); if (!first) first = f;
        }
      });
      if (first) {
        if (status) status.textContent = '';
        first.focus();
        return;
      }
      if (status) status.textContent = 'Thank you. This is a demo form, so nothing was sent.';
      if (door && !reduced()) {
        door.classList.remove('is-sent');
        void door.offsetWidth;
        door.classList.add('is-sent');
      }
      form.reset();
    });
  }
})();
