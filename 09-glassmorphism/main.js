/* 09 · Glassmorphism · "Light Table" · vanilla JS, loaded with defer */
(() => {
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('js');

  const mqMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(pointer: fine) and (min-width: 900px)');
  let reduced = mqMotion.matches;
  let fine = mqFine.matches;

  /* ---------- Arrival cleanup: drop will-change once each layer lands ---------- */
  document.querySelectorAll('.slab, .lens').forEach((el) => {
    el.addEventListener('animationend', () => el.classList.add('done'), { once: true });
  });

  /* ---------- Menu dialog ---------- */
  const menuBtn = document.querySelector('.nav__menu');
  const menu = document.getElementById('menu');
  if (menuBtn && menu && typeof menu.showModal === 'function') {
    menuBtn.addEventListener('click', () => {
      menu.showModal();
      menuBtn.setAttribute('aria-expanded', 'true');
    });
    let navigating = false;
    menu.addEventListener('close', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      if (!navigating) menuBtn.focus();
      navigating = false;
    });
    menu.querySelector('[data-close]').addEventListener('click', () => menu.close());
    menu.addEventListener('click', (e) => { if (e.target === menu) menu.close(); });
    menu.querySelectorAll('.sheet__links a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        navigating = Boolean(target);
        menu.close();
        if (target) {
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          target.focus({ preventScroll: true });
          history.replaceState(null, '', a.getAttribute('href'));
        }
      });
    });
  }

  /* ---------- Hour of light ---------- */
  const KEY = 'lbl09-hour';
  const radios = [...document.querySelectorAll('.hour input[type="radio"]')];
  let override = 'follow';
  let scrollHour = 'morning';
  try { override = localStorage.getItem(KEY) || 'follow'; } catch (e) { /* storage blocked */ }

  const applyHour = () => {
    const hour = override !== 'follow' ? override : (reduced ? 'morning' : scrollHour);
    body.dataset.hour = hour;
  };
  const syncRadios = () => radios.forEach((r) => { r.checked = r.value === override; });

  radios.forEach((r) => r.addEventListener('change', () => {
    if (!r.checked) return;
    override = r.value;
    try { localStorage.setItem(KEY, override); } catch (e) { /* storage blocked */ }
    syncRadios();
    applyHour();
  }));
  syncRadios();
  applyHour();

  /* ---------- Section observer: hour + nav current ---------- */
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const zones = [...document.querySelectorAll('[data-hour]')].filter((el) => el !== body);
  const zoneIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      scrollHour = el.dataset.hour;
      applyHour();
      const id = el.id ? '#' + el.id : '';
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  zones.forEach((z) => zoneIO.observe(z));

  /* ---------- Reveals (one shot) ---------- */
  const revealIO = new IntersectionObserver((entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach((el) => {
    if (reduced) el.classList.add('in'); else revealIO.observe(el);
  });

  /* ---------- Edge light: light comes from where you are ---------- */
  const hero = document.querySelector('.hero');
  const lens = document.querySelector('.lens');
  const edges = [...document.querySelectorAll('.hero .edge')];
  let rects = [];
  let heroVisible = true;
  let raf = 0;
  let px = 0, py = 0;
  let lx = 0, ly = 0, tx = 0, ty = 0;

  /* Each edge sits in a rotated pane (Slab -3deg, Shard -2deg). Store the pane's centre,
     unrotated size and angle so the pointer can be mapped into the pane's own frame. */
  const angleOf = (el) => {
    const t = getComputedStyle(el).transform;
    if (!t || t === 'none') return 0;
    const m = new DOMMatrixReadOnly(t);
    return Math.atan2(m.b, m.a);
  };
  const measure = () => {
    rects = edges.map((el) => {
      const r = el.getBoundingClientRect();
      const a = -angleOf(el.parentElement);
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: el.offsetWidth, h: el.offsetHeight, cos: Math.cos(a), sin: Math.sin(a) };
    });
  };
  const rigOn = () => fine && !reduced;

  const tick = () => {
    raf = 0;
    measure(); /* rects are viewport-relative, so read them at tick time (no scroll listener) */
    edges.forEach((el, i) => {
      const r = rects[i];
      if (!r) return;
      const dx = px - r.cx, dy = py - r.cy;
      const ex = dx * r.cos - dy * r.sin + r.w / 2;
      const ey = dx * r.sin + dy * r.cos + r.h / 2;
      el.style.setProperty('--ex', ex.toFixed(1) + 'px');
      el.style.setProperty('--ey', ey.toFixed(1) + 'px');
    });
    if (lens) {
      const cx = innerWidth / 2, cy = innerHeight / 2;
      tx = Math.max(-12, Math.min(12, -(px - cx) / cx * 12));
      ty = Math.max(-12, Math.min(12, -(py - cy) / cy * 12));
      lx += (tx - lx) * 0.12;
      ly += (ty - ly) * 0.12;
      lens.style.setProperty('--lx', lx.toFixed(2) + 'px');
      lens.style.setProperty('--ly', ly.toFixed(2) + 'px');
      if (Math.abs(tx - lx) > 0.1 || Math.abs(ty - ly) > 0.1) raf = requestAnimationFrame(tick);
    }
  };

  if (hero && edges.length) {
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
    hero.addEventListener('pointerenter', () => { if (rigOn()) { measure(); edges.forEach((el) => el.classList.remove('is-rest')); } });
    hero.addEventListener('pointermove', (e) => {
      if (!rigOn() || !heroVisible) return;
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      edges.forEach((el) => { el.classList.add('is-rest'); el.style.setProperty('--ex', '0px'); el.style.setProperty('--ey', '0px'); });
      if (lens) { lx = ly = 0; lens.style.setProperty('--lx', '0px'); lens.style.setProperty('--ly', '0px'); }
    });
  }

  mqMotion.addEventListener('change', (e) => { reduced = e.matches; applyHour(); if (reduced) document.querySelectorAll('.rv').forEach((el) => el.classList.add('in')); });
  mqFine.addEventListener('change', (e) => { fine = e.matches; });

  /* ---------- Demo form ---------- */
  const form = document.querySelector('.form');
  if (form) {
    const status = form.querySelector('.status');
    const rules = {
      'f-name': (v) => v.trim() ? '' : 'Add your name',
      'f-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter an email like name@studio.pt',
      'f-type': (v) => v ? '' : 'Pick a project type',
      'f-msg': (v) => v.trim() ? '' : 'Tell me a little about the room',
    };
    const check = (field) => {
      const rule = rules[field.id];
      if (!rule) return true;
      const msg = rule(field.value);
      const err = document.getElementById(field.id + '-error');
      if (msg) {
        field.setAttribute('aria-invalid', 'true');
        err.querySelector('span').textContent = msg;
        err.hidden = false;
      } else {
        field.removeAttribute('aria-invalid');
        err.hidden = true;
      }
      return !msg;
    };
    Object.keys(rules).forEach((id) => {
      const f = document.getElementById(id);
      f.addEventListener('blur', () => { if (f.value || f.hasAttribute('aria-invalid')) check(f); });
      f.addEventListener('input', () => { if (f.hasAttribute('aria-invalid')) check(f); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      const fields = Object.keys(rules).map((id) => document.getElementById(id));
      const bad = fields.filter((f) => !check(f));
      if (bad.length) {
        status.textContent = bad.length === 1 ? 'One field needs attention.' : bad.length + ' fields need attention.';
        bad[0].focus();
        return;
      }
      status.textContent = 'Thanks. This is a demo form, so nothing was sent. Write to studio@leonorbritolund.example instead.';
      form.reset();
    });
  }
})();
