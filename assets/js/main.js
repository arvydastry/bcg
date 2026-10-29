/* BCG + Skanlika demo maketas. Vanilla JS.
   Čia atkartojami tik tie efektai, kuriuos Salient turi savo elementuose (žr. salient-gidas.html):
   Animate on scroll, Split Line Heading, Mask Reveal, Column Parallax, Milestone skaitikliai, Scrolling Text,
   Toggles, Sticky header, Off-canvas meniu. Formos niekur nesiunčia duomenų. */
(function () {
  'use strict';
  const d = document, w = window, root = d.documentElement;
  const reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = w.matchMedia('(hover: none)').matches;
  const $ = (s, c) => (c || d).querySelector(s);
  const $$ = (s, c) => Array.from((c || d).querySelectorAll(s));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Pranešimas (toast) ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-visible'), 3600);
  }
  w.BCG = { toast };


  /* ---------- Kalbos (demo) ir demo nuorodos ---------- */
  $$('[data-lang-demo]').forEach(b => b.addEventListener('click', () => toast('Demo: ' + b.dataset.langDemo + ' versija bus pilname projekte (WPML arba Polylang). Dabar rodoma tik LT.')));
  $$('[data-demo-link]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); toast('Demo: „' + a.dataset.demoLink + '“ puslapis bus pilname projekte.'); }));

  /* ---------- Antraštė: sticky būsena ir slėpimas slenkant ---------- */
  const header = $('#site-header');
  let lastY = w.scrollY, ticking = false;
  function onScroll() {
    const y = w.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
      if (!d.body.classList.contains('menu-open')) {
        if (y > 320 && y > lastY + 6) header.classList.add('is-hidden');
        else if (y < lastY - 6 || y < 320) header.classList.remove('is-hidden');
      }
    }
    lastY = y;
    if (!ticking) { ticking = true; requestAnimationFrame(() => { parallax(); spy(); ticking = false; }); }
  }
  w.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobilus meniu ---------- */
  const burger = $('.burger'), menu = $('#mobile-menu');
  function openMenu() { if (!menu) return; menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); d.body.classList.add('menu-open'); burger && burger.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { if (!menu) return; menu.classList.remove('is-open'); d.body.classList.remove('menu-open'); burger && burger.setAttribute('aria-expanded', 'false'); setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduce ? 0 : 600); }
  burger && burger.addEventListener('click', openMenu);
  $('.mobile-menu__close') && $('.mobile-menu__close').addEventListener('click', closeMenu);
  menu && $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
  d.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); $$('.nav__item.is-open').forEach(i => i.classList.remove('is-open')); } });

  /* ---------- Išskleidžiamas meniu lietimui ir klaviatūrai ---------- */
  $$('.nav__item[data-drop]').forEach(item => {
    const link = $('.nav__link', item);
    link.addEventListener('click', e => {
      if (touch && !item.classList.contains('is-open')) { e.preventDefault(); $$('.nav__item.is-open').forEach(i => i !== item && i.classList.remove('is-open')); item.classList.add('is-open'); }
    });
    link.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); item.classList.add('is-open'); const f = $('a', $('.nav__drop', item)); f && f.focus(); } });
  });
  d.addEventListener('click', e => { if (!e.target.closest('.nav__item')) $$('.nav__item.is-open').forEach(i => i.classList.remove('is-open')); });

  /* ---------- Split Line Heading ---------- */
  function splitLines(el) {
    if (!el.dataset.original) el.dataset.original = el.innerHTML;
    el.innerHTML = el.dataset.original;
    const units = [];
    Array.from(el.childNodes).forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { units.push(d.createTextNode(' ')); return; }
          const s = d.createElement('span'); s.className = 'w'; s.textContent = t; units.push(s);
        });
      } else units.push(n);
    });
    el.innerHTML = ''; units.forEach(u => el.appendChild(u));
    const lines = []; let cur = null, top = null;
    units.forEach(u => {
      if (u.nodeType === 3) { cur && cur.push(u); return; }
      const t = u.offsetTop;
      if (top === null || Math.abs(t - top) > 4) { cur = []; lines.push(cur); top = t; }
      cur.push(u);
    });
    el.innerHTML = '';
    lines.forEach(ls => {
      const line = d.createElement('span'); line.className = 'line'; const inner = d.createElement('span');
      ls.forEach(u => inner.appendChild(u)); line.appendChild(inner); el.appendChild(line);
    });
  }
  const splits = $$('[data-split]');
  function resplit() { if (reduce) return; splits.forEach(el => { const was = el.classList.contains('in'); splitLines(el); if (was) el.classList.add('in'); }); }
  if (!reduce) { splits.forEach(splitLines); }
  let rT; w.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(resplit, 200); });
  // įkėlus tikruosius šriftus eilučių lūžiai pasikeičia, todėl skaidome iš naujo
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => setTimeout(resplit, 50));

  /* ---------- Animate on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); if (en.target.hasAttribute('data-count')) count(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  $$('[data-reveal], [data-stagger], [data-split], .hl, [data-count]').forEach(el => io.observe(el));
  // Mask Reveal: pradinis clip-path paslepia visą elementą, todėl naršyklė jo nelaiko matomu –
  // stebime tėvinį elementą ir atidengiame jame esančias kaukes
  const masks = new Map();
  $$('[data-mask]').forEach(el => { const p = el.parentElement; if (!masks.has(p)) masks.set(p, []); masks.get(p).push(el); });
  const maskIo = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { (masks.get(en.target) || []).forEach(m => m.classList.add('in')); maskIo.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
  masks.forEach((_, p) => maskIo.observe(p));

  /* ---------- Milestone skaitikliai ---------- */
  function count(el) {
    const to = parseFloat(el.dataset.count), dur = 1500, start = performance.now(), suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = to + suffix; return; }
    function step(now) { const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e) + suffix; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* ---------- Column parallax ---------- */
  const pxEls = $$('[data-px]');
  function parallax() {
    if (reduce || w.innerWidth < 900) return;
    const vh = w.innerHeight;
    pxEls.forEach(el => {
      const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      const c = r.top + r.height / 2 - vh / 2; el.style.transform = 'translate3d(0,' + (c * parseFloat(el.dataset.px) * -1).toFixed(1) + 'px,0)';
    });
  }
  pxEls.forEach(el => el.classList.add('px')); parallax();

  /* ---------- 3D tilt ---------- */
  if (!touch && !reduce) $$('[data-tilt]').forEach(el => {
    const max = parseFloat(el.dataset.tilt) || 5;
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = 'perspective(900px) rotateX(' + (-y * max).toFixed(2) + 'deg) rotateY(' + (x * max).toFixed(2) + 'deg) translateY(-4px)'; });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------- Scrolling Text: dubliuojame turinį ---------- */
  $$('.marquee__track').forEach(t => { t.innerHTML += t.innerHTML; });

  /* ---------- Hero video ---------- */
  $$('[data-hero-video]').forEach(v => {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
    const btn = $('[data-video-toggle]', v.closest('.hero') || d);
    if (btn) btn.addEventListener('click', () => { if (v.paused) { v.play(); btn.innerHTML = '<i class="ph ph-pause"></i>'; btn.setAttribute('aria-label', 'Sustabdyti vaizdo įrašą'); } else { v.pause(); btn.innerHTML = '<i class="ph ph-play"></i>'; btn.setAttribute('aria-label', 'Paleisti vaizdo įrašą'); } });
    if (reduce && btn) { btn.innerHTML = '<i class="ph ph-play"></i>'; }
  });

  /* ---------- DUK: vienu metu atidarytas vienas ---------- */
  $$('[data-accordion]').forEach(acc => $$('details', acc).forEach(dt => dt.addEventListener('toggle', () => { if (dt.open) $$('details', acc).forEach(o => { if (o !== dt) o.open = false; }); })));

  /* ---------- Skirtukai (formos) ---------- */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const useHash = list.hasAttribute('data-tabs-hash');
    const panelOf = t => d.getElementById(t.getAttribute('aria-controls'));
    function select(tab) { tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; const p = panelOf(t); if (p) p.hidden = !on; }); }
    const go = el => el && el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => {
        select(t);
        if (useHash) { history.replaceState(null, '', '#' + t.getAttribute('aria-controls')); if (w.innerWidth < 900) go(panelOf(t)); }
      });
      // klaviatūra: rodyklės kairėn / dešinėn, Home, End
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return; e.preventDefault();
        const n = tabs[(k + tabs.length) % tabs.length]; n.focus(); n.click();
      });
    });
    list.select = name => { const t = tabs.find(x => x.dataset.tab === name); if (t) select(t); };
    if (useHash) {
      // Skirtukai su nuorodomis: veiklos-sritys.html#naftos-ir-duju-pramone atidaro reikiamą sritį
      const byId = id => tabs.find(x => x.getAttribute('aria-controls') === id);
      const section = list.closest('section') || list;
      const fromHash = scroll => { const t = byId(decodeURIComponent(w.location.hash.slice(1))); if (t) { select(t); if (scroll) go(section); } };
      fromHash(true);
      w.addEventListener('hashchange', () => fromHash(true));
      d.addEventListener('click', e => {
        const a = e.target.closest('a[href*="#"]'); if (!a || a.hasAttribute('data-vbox')) return;
        const u = new URL(a.href, w.location.href); if (u.pathname !== w.location.pathname) return;
        const t = byId(decodeURIComponent(u.hash.slice(1))); if (!t) return;
        e.preventDefault(); select(t); history.replaceState(null, '', u.hash); go(section);
      });
    }
  });

  /* ---------- Formos: patikra ir sėkmės būsena (duomenys nesiunčiami) ---------- */
  $$('form[data-demo-form]').forEach(f => {
    f.setAttribute('novalidate', '');
    f.addEventListener('submit', e => {
      e.preventDefault(); let ok = true, first = null;
      $$('.field', f).forEach(fl => {
        const inp = $('input, select, textarea', fl); if (!inp || !inp.required) return;
        let bad = !inp.value.trim();
        if (!bad && inp.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value);
        if (inp.type === 'checkbox') bad = !inp.checked;
        fl.classList.toggle('is-invalid', bad); if (bad) { ok = false; first = first || inp; }
      });
      if (!ok) { first.focus(); toast('Užpildykite pažymėtus laukus.'); return; }
      f.classList.add('is-sent'); f.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
    $$('input, select, textarea', f).forEach(i => i.addEventListener('input', () => i.closest('.field') && i.closest('.field').classList.remove('is-invalid')));
    const again = $('[data-form-again]', f); again && again.addEventListener('click', () => { f.reset(); f.classList.remove('is-sent'); });
    $$('input[type="file"]', f).forEach(i => i.addEventListener('change', () => { const l = $('[data-file-name]', f); if (l) l.textContent = i.files[0] ? i.files[0].name : 'Prisegti CV (PDF, DOC)'; }));
  });

  /* ---------- Užpildymas pagal URL: ?tipas=subranga|personalo-nuoma|cv&sritis=... ---------- */
  const params = new URLSearchParams(w.location.search);
  const tipas = params.get('tipas'), sritis = params.get('sritis'), pozicija = params.get('pozicija');
  if (tipas || sritis || pozicija) {
    const list = $('.form-card [role="tablist"]') || $('[role="tablist"]');
    if (list && list.select) list.select(tipas === 'cv' ? 'darbuotojams' : 'klientams');
    const sel = $('select[name="paslauga"]'); if (sel && tipas && tipas !== 'cv') sel.value = tipas;
    const sr = $('select[name="sritis"]'); if (sr && sritis) sr.value = sritis;
    const pz = $('select[name="profesija"]'); if (pz && pozicija) pz.value = pozicija;
    const msg = $('textarea[name="zinute"]'); if (msg && pozicija && !msg.value) msg.value = 'Domina pozicija: ' + pozicija.replace(/-/g, ' ') + '.';
  }

  /* ---------- Šoninė navigacija: aktyvus skyrius ---------- */
  const spyLinks = $$('.side-nav a[href^="#"]');
  const spyTargets = spyLinks.map(a => d.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  function spy() {
    if (!spyTargets.length) return;
    let active = spyTargets[0];
    spyTargets.forEach(t => { if (t.getBoundingClientRect().top <= 140) active = t; });
    spyLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + active.id));
  }
  spy();

  /* ---------- Slapukai ---------- */
  const cookie = $('#cookie');
  if (cookie && !store.get('bcg-cookies')) { setTimeout(() => { cookie.hidden = false; }, 1200); $$('[data-cookie]', cookie).forEach(b => b.addEventListener('click', () => { store.set('bcg-cookies', b.dataset.cookie); cookie.hidden = true; })); }

  /* ---------- Žemėlapis (Leaflet + OSM), įkeliamas paspaudus ---------- */
  const mapBtn = $('[data-map-load]');
  if (mapBtn) mapBtn.addEventListener('click', () => {
    mapBtn.disabled = true; mapBtn.textContent = 'Įkeliama…';
    const css = d.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'; d.head.appendChild(css);
    const s = d.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    s.onload = () => {
      const el = $('#map'); const ph = $('.map__placeholder'); ph && (ph.hidden = true); el.hidden = false;
      const map = L.map(el, { scrollWheelZoom: false }).setView([55.7155, 21.1288], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
      const icon = L.divIcon({ className: '', html: '<div class="map__pin"></div>', iconSize: [34, 34], iconAnchor: [17, 34] });
      L.marker([55.7155, 21.1288], { icon }).addTo(map).bindPopup('<strong>Baltic Contracting Group · Skanlika</strong><br>Daukanto g. 34, Klaipėda').openPopup();
    };
    d.body.appendChild(s);
  });

  /* ---------- Video kortelės: groja užvedus (lietimui – kai matomos), lightbox spustelėjus ---------- */
  $$('video[data-hover-video]').forEach(v => {
    const zone = v.closest('[data-hover-zone]') || v.parentElement;
    let loaded = false;
    v.muted = true;
    const play = () => { if (reduce) return; if (!loaded) { loaded = true; v.load(); } const p = v.play(); if (p && p.catch) p.catch(() => {}); zone.classList.add('is-playing'); };
    const stop = () => { v.pause(); try { v.currentTime = 0; } catch (e) {} zone.classList.remove('is-playing'); };
    if (touch) {
      new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? play() : stop()), { threshold: .6 }).observe(zone);
    } else {
      zone.addEventListener('mouseenter', play); zone.addEventListener('mouseleave', stop);
      zone.addEventListener('focusin', play); zone.addEventListener('focusout', stop);
    }
  });
  const vbox = $('#vbox');
  if (vbox) {
    const vid = $('[data-vbox-video]', vbox), ttl = $('[data-vbox-title]', vbox), crd = $('[data-vbox-credit]', vbox), closeBtn = $('[data-vbox-close]', vbox);
    let lastFocus = null;
    function openBox(src, title, credit) {
      lastFocus = d.activeElement; ttl.textContent = title || ''; crd.textContent = credit || '';
      vid.src = src; vbox.hidden = false; d.body.classList.add('vbox-open');
      requestAnimationFrame(() => vbox.classList.add('is-open'));
      const p = vid.play(); if (p && p.catch) p.catch(() => {});
      closeBtn && closeBtn.focus();
    }
    function closeBox() {
      vbox.classList.remove('is-open'); d.body.classList.remove('vbox-open'); vid.pause();
      setTimeout(() => { vbox.hidden = true; vid.removeAttribute('src'); vid.load(); }, 350);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    $$('[data-vbox]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openBox(a.dataset.vbox || a.getAttribute('href'), a.dataset.vboxTitle, a.dataset.vboxCredit); }));
    closeBtn && closeBtn.addEventListener('click', closeBox);
    vbox.addEventListener('click', e => { if (e.target === vbox) closeBox(); });
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && !vbox.hidden) closeBox(); });
  }

  /* ---------- Video, kuris groja tik kai matomas (be garso, ciklu) ---------- */
  const ivVideos = $$('video[data-inview-video]');
  if (ivVideos.length && !reduce) {
    const vio = new IntersectionObserver(es => es.forEach(en => {
      const v = en.target;
      if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
      v.parentElement.classList.toggle('is-playing', en.isIntersecting);
    }), { threshold: .35 });
    ivVideos.forEach(v => { v.muted = true; vio.observe(v); });
  }

  /* ---------- Metai poraštėje ---------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
