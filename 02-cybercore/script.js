/* NV.SYS portfolio template. Vanilla, deferred, no libraries, no scroll listeners. */
document.documentElement.classList.add('js');
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const hasIO = 'IntersectionObserver' in window;
  const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let reduced = !!(mq && mq.matches);
  if (mq) {
    const onChange = (e) => { reduced = e.matches; if (reduced) root.classList.remove('booting', 'glitching'); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }
  const icon = (n) => '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>';
  /* Boot sequence: once per session, replayed by Reboot */
  const label = $('[data-load-label]'), pct = $('[data-load-pct]');
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const setLoad = (l, p) => { if (label) label.textContent = l; if (pct) pct.textContent = p; };
  function boot() {
    timers.forEach(clearTimeout); timers = [];
    root.classList.remove('booting', 'glitching');
    if (reduced) { setLoad('Ready', '100%'); return; }
    void root.offsetWidth;
    root.classList.add('booting');
    setLoad('Loading portfolio', '0%');
    for (let i = 1; i <= 8; i++) later(() => setLoad('Loading portfolio', Math.round(i * 12.5) + '%'), 200 + i * 112);
    later(() => setLoad('Ready', '100%'), 1120);
    later(() => { root.classList.remove('booting'); root.classList.add('glitching'); }, 1250);
    later(() => root.classList.remove('glitching'), 1600);
  }
  let booted = false;
  try {
    booted = window.sessionStorage.getItem('nv-booted') === '1';
    window.sessionStorage.setItem('nv-booted', '1');
  } catch (e) { booted = false; }
  if (!booted) boot();
  const reboot = $('#reboot'), h1 = $('#hero-title'), top = $('#top');
  if (reboot) reboot.addEventListener('click', () => {
    if (top) top.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (h1) h1.focus({ preventScroll: true });
    if (reduced) boot(); else setTimeout(boot, 350);
  });
  /* Clock: Rotterdam local time */
  const clocks = $$('[data-clock]');
  let fmt = null;
  try { fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }); } catch (e) { fmt = null; }
  function tickClock() {
    if (!fmt || document.hidden || !clocks.length) return;
    const parts = fmt.formatToParts(new Date());
    const get = (t) => (parts.find((p) => p.type === t) || {}).value || '';
    const hm = get('hour') + ':' + get('minute');
    clocks.forEach((c) => { c.textContent = c.closest('.tray') ? hm : hm + ' ' + get('timeZoneName'); c.setAttribute('datetime', hm); });
  }
  tickClock();
  setInterval(tickClock, 60000);
  /* Pause motion: one button stops globe and ticker. Both also pause offscreen and in a hidden tab */
  const globe = $('.globe'), toggle = $('.globe-toggle'), ticker = $('.ticker');
  let userPaused = false, heroOff = false, tickerOff = false;
  const syncMotion = () => {
    if (globe) globe.classList.toggle('is-paused', userPaused || heroOff || document.hidden);
    if (ticker) ticker.classList.toggle('is-paused', userPaused || tickerOff);
  };
  if (toggle) toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    syncMotion();
  });
  document.addEventListener('visibilitychange', () => { syncMotion(); tickClock(); });
  if (hasIO && top) new IntersectionObserver(([e]) => { heroOff = !e.isIntersecting; syncMotion(); }).observe(top);
  if (hasIO && ticker) new IntersectionObserver(([e]) => { tickerOff = !e.isIntersecting; syncMotion(); }).observe(ticker);
  /* Nav: current section */
  const navLinks = $$('.nav__links a');
  if (hasIO && navLinks.length) {
    const map = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const a = map.get(e.target.id);
      if (a && e.isIntersecting) { navLinks.forEach((l) => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'location'); } else if (a) a.removeAttribute('aria-current');
    }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
  /* Mobile menu */
  const menuBtn = $('.nav__toggle'), menu = $('#menu');
  const closeMenu = (focusBtn) => {
    if (!menuBtn || !menu || menu.hidden) return;
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    if (focusBtn) menuBtn.focus();
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      const first = open ? $('a', menu) : null;
      if (first) first.focus();
    });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(true); });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target) && !menuBtn.contains(e.target)) closeMenu(false); });
    menu.addEventListener('focusout', (e) => { if (e.relatedTarget && !menu.contains(e.relatedTarget) && e.relatedTarget !== menuBtn) closeMenu(false); });
    const wide = window.matchMedia ? window.matchMedia('(min-width: 768px)') : null;
    const onWide = (e) => { if (e.matches) closeMenu(false); };
    if (wide) { if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide); }
  }
  /* Work: active row and preview clone */
  const rows = $$('.dir__item'), preview = $('.preview'), pBody = $('[data-preview]'), pMeta = $('[data-preview-meta]');
  function activate(li, animate) {
    if (!li || (li.hasAttribute('data-active') && pBody && pBody.firstElementChild)) return;
    rows.forEach((r) => r.removeAttribute('data-active'));
    li.setAttribute('data-active', '');
    const ph = $('.ph', li), link = $('.dir__name a', li);
    if (!pBody || !ph) return;
    const clone = ph.cloneNode(true);
    ['role', 'aria-label', 'data-placeholder'].forEach((a) => clone.removeAttribute(a));
    clone.setAttribute('aria-hidden', 'true');
    pBody.replaceChildren(clone);
    if (pMeta && link) pMeta.textContent = '1600 x 1000 / ' + link.dataset.slug;
    if (!animate || reduced || !preview) return;
    pBody.classList.remove('is-swap'); preview.classList.remove('is-scan');
    void pBody.offsetWidth;
    pBody.classList.add('is-swap'); preview.classList.add('is-scan');
  }
  rows.forEach((li) => ['pointerenter', 'focusin'].forEach((ev) => li.addEventListener(ev, () => activate(li, true))));
  if (rows[0]) activate(rows[0], false);
  /* One-shot reveals: about log and services board */
  function reveal(el, threshold) {
    if (!el || reduced || !hasIO) return;
    el.classList.add('is-pending');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.remove('is-pending'); io.disconnect(); } }, { threshold });
    io.observe(el);
  }
  const log = $('.log');
  if (log) Array.from(log.children).forEach((n, i) => n.style.setProperty('--k', i));
  reveal(log, 0.15);
  reveal($('.board'), 0.3);
  /* Quotes: reorder the stack, DOM order stays */
  const next = $('[data-next]'), stack = $$('.stack__item'), count = $('[data-count]'), from = $('[data-from]');
  if (next && stack.length) next.addEventListener('click', () => {
    const front = stack.find((i) => i.dataset.order === '0');
    const rotate = () => {
      stack.forEach((i) => { i.dataset.order = String((Number(i.dataset.order) + 2) % 3); });
      const idx = stack.findIndex((i) => i.dataset.order === '0'), cap = $('figcaption', stack[idx]);
      if (count) count.textContent = String(idx + 1);
      if (from && cap) from.textContent = ', ' + cap.textContent;
      if (front) front.classList.remove('is-leaving');
    };
    if (reduced || !front) { rotate(); return; }
    front.classList.add('is-leaving');
    setTimeout(rotate, 240);
  });
  /* Form: non-functional demo with inline validation */
  const form = $('.form'), status = $('.form__status');
  if (!form) return;
  const fields = $$('[data-error]', form);
  const clear = (f) => {
    const id = f.id + '-err', old = document.getElementById(id);
    if (old) old.remove();
    f.removeAttribute('aria-invalid');
    const ids = (f.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== id).join(' ');
    if (ids) f.setAttribute('aria-describedby', ids); else f.removeAttribute('aria-describedby');
  };
  fields.forEach((f) => f.addEventListener('input', () => clear(f)));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) status.textContent = '';
    let first = null;
    fields.forEach((f) => {
      clear(f);
      if (f.checkValidity()) return;
      const p = document.createElement('p');
      p.className = 'err'; p.id = f.id + '-err';
      p.innerHTML = icon('alert') + '<span></span>';
      p.lastChild.textContent = f.dataset.error;
      f.insertAdjacentElement('afterend', p);
      f.setAttribute('aria-invalid', 'true');
      f.setAttribute('aria-describedby', ((f.getAttribute('aria-describedby') || '') + ' ' + p.id).trim());
      if (!first) first = f;
    });
    if (first) { first.focus(); return; }
    form.reset();
    /* Short delay so screen readers register the change in the live region */
    if (status) setTimeout(() => { status.innerHTML = icon('caret') + '<span>Template demo. Nothing was sent. Connect a form service to make this live.</span>'; }, 50);
  });
})();
