document.documentElement.classList.replace('no-js', 'js');

/* Palazzo Plum: nav, marquee pause, re-papering and bell-pull, parallax and tilt,
   reveal, work filter, hanging-list cross-highlight, form validation. */
(() => {
  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const mqDesk = matchMedia('(min-width: 1024px)');
  const motionOn = () => !mqReduce.matches;
  const parallaxOn = () => motionOn() && html.dataset.motion !== 'calm';
  const setMotionClass = () => html.classList.toggle('motion', motionOn());
  setMotionClass();

  /* nav: mobile disclosure, hide on scroll down (desktop), active room */
  const rail = $('#rail');
  const toggle = $('.rail__toggle', rail);
  const list = $('#rooms-list');
  const setOpen = (open, focusBack) => {
    rail.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open && focusBack) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rail.classList.contains('is-open')) setOpen(false, true);
  });
  list.addEventListener('click', (e) => { if (e.target.closest('a') && !mqDesk.matches) setOpen(false); });
  mqDesk.addEventListener('change', () => setOpen(false));

  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    const hide = mqDesk.matches && y > lastY && y > 160 && !rail.contains(document.activeElement);
    rail.classList.toggle('is-hidden', hide);
    lastY = y;
  }, { passive: true });
  rail.addEventListener('focusin', () => rail.classList.remove('is-hidden'));

  const navLinks = $$('.rail__list a[href^="#"]:not(.enamel)');
  const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.removeAttribute('aria-current'));
      const a = byId.get(en.target.id);
      if (a) a.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  byId.forEach((a, id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });

  /* marquee: pause and play */
  const marquee = $('#marquee');
  const mqBtn = $('.marquee__toggle', marquee);
  mqBtn.addEventListener('click', () => {
    const paused = mqBtn.getAttribute('aria-pressed') !== 'true';
    mqBtn.setAttribute('aria-pressed', String(paused));
    mqBtn.setAttribute('aria-label', paused ? 'Play ribbon' : 'Pause ribbon');
    marquee.classList.toggle('is-paused', paused);
  });

  /* re-papering: radios and the bell-pull */
  const salon = $('#salon');
  const drops = $('.drops', salon);
  const bell = $('.bellpull', salon);
  const cwStatus = $('#cw-status');
  const radios = $$('input[name="colourway"]');
  const names = { emerald: 'Emerald Damask', cobalt: 'Cobalt Chintz', pink: 'Pink Regency' };
  const order = Object.keys(names);
  let dropTimer = 0;
  const repaper = (scheme) => {
    if (salon.dataset.scheme === scheme && !drops.childElementCount) return;
    cwStatus.textContent = 'Wallpaper: ' + names[scheme];
    clearTimeout(dropTimer);
    if (!motionOn()) { salon.dataset.scheme = scheme; drops.textContent = ''; return; }
    drops.textContent = '';
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('div');
      d.className = 'drop';
      d.style.setProperty('--i', i);
      d.innerHTML = '<div class="paper paper--salon" data-scheme="' + scheme + '"><i></i><i></i><i></i></div>';
      drops.appendChild(d);
    }
    dropTimer = setTimeout(() => { salon.dataset.scheme = scheme; drops.textContent = ''; }, 420 + 5 * 60 + 60);
  };
  radios.forEach((r) => r.addEventListener('change', () => { if (r.checked) repaper(r.value); }));
  bell.hidden = false;
  bell.addEventListener('click', () => {
    const current = (radios.find((r) => r.checked) || radios[0]).value;
    const next = order[(order.indexOf(current) + 1) % order.length];
    const radio = radios.find((r) => r.value === next);
    radio.checked = true;
    repaper(next);
    if (motionOn()) {
      bell.classList.remove('is-ringing');
      void bell.offsetWidth;
      bell.classList.add('is-ringing');
    }
  });

  /* parallax and tilt: one rAF loop, transforms only, paused offscreen */
  const hangItems = $$('.hang__item');
  const valance = $('.valance', salon);
  const fringe = $('.valance__fringe', salon);
  const powder = $('#powder');
  const quotes = $$('.quote[data-depth]');
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const onScreen = new Set();
  let raf = 0;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const resetTransforms = () => {
    hangItems.forEach((el) => { el.style.transform = ''; el.style.willChange = ''; });
    quotes.forEach((q) => { q.style.translate = ''; });
    valance.style.transform = ''; fringe.style.transform = '';
    salon.style.removeProperty('--px'); salon.style.removeProperty('--py');
  };
  const tick = () => {
    raf = 0;
    if (!parallaxOn()) { resetTransforms(); return; }
    cur.x += (target.x - cur.x) * 0.1;
    cur.y += (target.y - cur.y) * 0.1;
    const fine = mqFine.matches && innerWidth >= 768;
    if (onScreen.has(salon)) {
      const r = salon.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(r.height, 1), 0, 1);
      valance.style.transform = 'translateY(' + (-40 * p).toFixed(1) + 'px)';
      fringe.style.transform = 'rotate(' + (Math.sin(p * Math.PI * 3) * 1.5).toFixed(2) + 'deg)';
      hangItems.forEach((el) => {
        const d = parseFloat(el.dataset.depth) || 0;
        const tx = fine ? cur.x * d * 10 : 0;
        const ty = (fine ? cur.y * d * 10 : 0) - 60 * d * p;
        const rx = fine ? -cur.y * 3 : 0;
        const ry = fine ? cur.x * 3 : 0;
        el.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      if (fine) {
        salon.style.setProperty('--px', cur.x.toFixed(3));
        salon.style.setProperty('--py', cur.y.toFixed(3));
      }
    }
    if (onScreen.has(powder) && innerWidth >= 768) {
      const r = powder.getBoundingClientRect();
      const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1) - 0.5;
      quotes.forEach((q) => {
        const d = parseFloat(q.dataset.depth) || 0;
        q.style.translate = '0 ' + (-80 * d * p).toFixed(1) + 'px';
        q.style.rotate = fine ? 'x ' + (-cur.y * 2).toFixed(2) + 'deg' : '';
      });
    }
    if (Math.abs(target.x - cur.x) > 0.002 || Math.abs(target.y - cur.y) > 0.002) schedule();
  };
  const schedule = () => { if (!raf && parallaxOn() && onScreen.size) raf = requestAnimationFrame(tick); };
  const loopIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? onScreen.add(en.target) : onScreen.delete(en.target)));
    schedule();
  });
  loopIO.observe(salon);
  loopIO.observe(powder);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('pointermove', (e) => {
    if (!mqFine.matches || !parallaxOn()) return;
    target.x = (e.clientX / innerWidth) * 2 - 1;
    target.y = (e.clientY / innerHeight) * 2 - 1;
    schedule();
  }, { passive: true });
  salon.addEventListener('pointerenter', () => { if (parallaxOn() && mqFine.matches) hangItems.forEach((el) => { el.style.willChange = 'transform'; }); });
  salon.addEventListener('pointerleave', () => { hangItems.forEach((el) => { el.style.willChange = ''; }); target.x = 0; target.y = 0; schedule(); });
  mqReduce.addEventListener('change', () => { setMotionClass(); if (!parallaxOn()) resetTransforms(); else schedule(); });

  /* reveal: Stagger List, IntersectionObserver at .2 */
  const revealSel = [
    '.room:not(.salon) .kicker', '.room:not(.salon) .h2', '.gallery__head', '.library__plaque', '.shelf', '.manifesto p',
    '.hanging-list', '.haber__side > *', '.drawer', '.spool', '.rack__title', '.powder__note', '.quote', '.sheet', '.desk__aside > *',
  ].join(',');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      revealIO.unobserve(en.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -20% 0px' });
  $$(revealSel).forEach((el) => {
    if (el.closest('[data-reveal]')) return;
    const siblings = [...el.parentElement.children];
    el.dataset.reveal = '';
    el.style.setProperty('--d', Math.min(siblings.indexOf(el), 8) * 60 + 'ms');
    revealIO.observe(el);
  });
  $$('.lot').forEach((lot, i) => {
    lot.style.setProperty('--d', (i % 2) * 70 + 'ms');
    revealIO.observe(lot);
  });
  addEventListener('beforeprint', () => $$('[data-reveal], .lot').forEach((el) => el.classList.add('is-in')));

  /* work filter */
  const filter = $('.filter');
  const pills = $$('.pill', filter);
  const lots = $$('.lot');
  const lotsWrap = $('.lots');
  const filterStatus = $('#filter-status');
  filter.hidden = false;
  pills.forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    pills.forEach((p) => p.setAttribute('aria-pressed', String(p === btn)));
    let n = 0;
    lots.forEach((lot) => {
      const on = f === 'all' || lot.dataset.tags.split(' ').includes(f);
      lot.classList.toggle('is-dim', !on);
      if (on) n++;
    });
    lotsWrap.classList.toggle('is-filtering', f !== 'all');
    filterStatus.textContent = f === 'all' ? 'Showing all 6 works' : n + ' of 6 works in ' + btn.textContent.trim();
  }));

  /* hanging list: rows ring their frame, frames light their row */
  const rows = $$('[data-lot]');
  const setHot = (id, on) => {
    const lot = document.getElementById('lot-' + id);
    if (!lot) return;
    $('.frame', lot).classList.toggle('is-ringed', on);
    $('.frame-swing', lot).classList.toggle('is-straight', on);
  };
  rows.forEach((row) => {
    const id = row.dataset.lot;
    ['mouseenter', 'focusin'].forEach((ev) => row.addEventListener(ev, () => setHot(id, true)));
    ['mouseleave', 'focusout'].forEach((ev) => row.addEventListener(ev, () => setHot(id, false)));
  });
  lots.forEach((lot) => {
    const id = lot.id.slice(4);
    const hit = $('.lot__hit', lot);
    const light = (on) => rows.forEach((r) => { if (r.dataset.lot === id) r.classList.toggle('is-hot', on); });
    hit.addEventListener('mouseenter', () => light(true));
    hit.addEventListener('mouseleave', () => light(false));
    hit.addEventListener('focusin', () => light(true));
    hit.addEventListener('focusout', () => light(false));
  });

  /* form validation: inline errors, error summary, live status. Nothing is sent. */
  const form = $('#sheet');
  const summary = $('#err-summary');
  const sheetStatus = $('#sheet-status');
  const ringBtn = $('.ring', form);
  const fields = [
    { id: 'f-name', label: 'Name', test: (v) => v.trim().length > 0 },
    { id: 'f-email', label: 'Email', test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) },
    { id: 'f-message', label: 'Message', test: (v) => v.trim().length >= 20 },
  ].map((f) => ({ ...f, el: document.getElementById(f.id), err: document.getElementById(f.id + '-err') }));
  const validate = (f) => {
    const ok = f.test(f.el.value);
    f.err.hidden = ok;
    if (ok) f.el.removeAttribute('aria-invalid'); else f.el.setAttribute('aria-invalid', 'true');
    return ok;
  };
  fields.forEach((f) => {
    f.el.addEventListener('blur', () => { if (f.el.value.trim() || f.el.hasAttribute('aria-invalid')) validate(f); });
    f.el.addEventListener('input', () => { if (f.el.hasAttribute('aria-invalid')) validate(f); });
  });
  summary.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) el.focus();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sheetStatus.textContent = '';
    const bad = fields.filter((f) => !validate(f));
    if (bad.length >= 2) {
      $('#err-summary-title').textContent = bad.length + ' things need a look before the bell rings';
      const ul = $('ul', summary);
      ul.textContent = '';
      bad.forEach((f) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + f.id;
        a.textContent = f.label + ': ' + f.err.textContent.trim();
        li.appendChild(a);
        ul.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;
    if (bad.length === 1) { bad[0].el.focus(); return; }
    if (motionOn()) {
      ringBtn.classList.remove('is-ringing');
      void ringBtn.offsetWidth;
      ringBtn.classList.add('is-ringing');
    }
    sheetStatus.textContent = 'Message noted. Ottavia will reply within 3 working days. (This demo form does not send anything.)';
    form.reset();
  });
})();
