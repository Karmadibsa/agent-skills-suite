/* Agent Skills Suite — vitrine
   Amélioration progressive : sans JavaScript, ou avec prefers-reduced-motion, tout le contenu est affiché
   dans son état final. Les effets ne modifient que des propriétés CSS (transform, opacity) via des variables. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = root.classList.contains('static');
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* ---------- Onglets (WAI-ARIA APG) ---------- */
  function setupTabs(list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(index, focus) {
      tabs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[i]) panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
      requestTick();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    list.hidden = false;
    select(0, false);
  }

  /* ---------- Copie ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) resolve(); else reject(new Error('copie refusée'));
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('.copy-btn'), function (btn) {
    var targetId = btn.getAttribute('data-copy-target');
    var getText = function () {
      if (targetId) { var el = document.getElementById(targetId); return el ? el.textContent.trim() : ''; }
      return btn.getAttribute('data-copy');
    };
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', targetId ? btn.textContent.trim() + ' ' + targetId.replace('p-', '') : 'Copier : ' + getText());
    }
    btn.hidden = false;
    btn.addEventListener('click', function () {
      copyText(getText()).then(function () {
        toast(targetId ? 'Prompt copié : remplacez les crochets puis collez-le' : 'Copié dans le presse-papiers');
      }, function () {
        toast('Copie impossible : sélectionnez le texte à la main');
      });
    });
  });

  /* ---------- Niveau de rigueur ---------- */
  var seg = document.querySelector('.seg');
  if (seg) {
    var radios = Array.prototype.slice.call(seg.querySelectorAll('[role="radio"]'));
    var descs = document.querySelectorAll('[data-level-desc]');
    var label = document.getElementById('profile-level');
    var names = { legere: 'légère', standard: 'standard', stricte: 'stricte' };
    var setLevel = function (index, focus) {
      var level = radios[index].getAttribute('data-level');
      radios.forEach(function (r, i) {
        r.setAttribute('aria-checked', i === index ? 'true' : 'false');
        r.tabIndex = i === index ? 0 : -1;
      });
      Array.prototype.forEach.call(descs, function (d) { d.classList.toggle('is-on', d.getAttribute('data-level-desc') === level); });
      if (label) label.textContent = names[level];
      if (focus) radios[index].focus();
    };
    radios.forEach(function (r, i) {
      r.addEventListener('click', function () { setLevel(i, false); });
      r.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % radios.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + radios.length) % radios.length;
        if (next !== null) { e.preventDefault(); setLevel(next, true); }
      });
    });
    seg.hidden = false;
    setLevel(1, false);
  }

  /* ---------- Thème ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
    var current = function () {
      var forced = root.getAttribute('data-theme');
      if (forced) return forced;
      return media && media.matches ? 'light' : 'dark';
    };
    var refresh = function () { themeBtn.setAttribute('aria-label', current() === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'); };
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ass-theme', next); } catch (e) { /* choix valable pour cette visite */ }
      refresh();
    });
    if (media && media.addEventListener) media.addEventListener('change', refresh);
    themeBtn.hidden = false;
    refresh();
  }

  /* ---------- Scènes pilotées par le scroll ---------- */
  var hero = document.querySelector('[data-scene]');
  var pins = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var track = document.querySelector('[data-track]');
  var wide = window.matchMedia ? window.matchMedia('(min-width: 961px)') : { matches: true };
  var ticking = false;

  function pinActive() { return !reduced && wide.matches; }

  function applyPin(section, p) {
    Array.prototype.forEach.call(section.querySelectorAll('[data-at]'), function (el) {
      var at = parseFloat(el.getAttribute('data-at'));
      el.style.setProperty('--r', clamp((p - at) / 0.06, 0, 1).toFixed(3));
    });
    Array.prototype.forEach.call(section.querySelectorAll('.pane-before'), function (el) {
      el.style.setProperty('--s', clamp((p - 0.32) / 0.14, 0, 1).toFixed(3));
    });
    Array.prototype.forEach.call(section.querySelectorAll('.pane-after'), function (el) {
      el.style.setProperty('--a', clamp((p - 0.48) / 0.1, 0, 1).toFixed(3));
    });
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var doc = document.documentElement;
    root.style.setProperty('--page', clamp(window.scrollY / Math.max(1, doc.scrollHeight - vh), 0, 1).toFixed(4));
    if (reduced) return;

    if (hero) {
      var hr = hero.getBoundingClientRect();
      hero.style.setProperty('--p', clamp(-hr.top / Math.max(1, hr.height), 0, 1).toFixed(4));
    }

    var active = pinActive();
    pins.forEach(function (section) {
      section.classList.toggle('is-pinned', active);
      if (!active) { applyPin(section, 1); return; }
      var r = section.getBoundingClientRect();
      var p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      applyPin(section, p);
    });

    if (track) {
      var tr = track.getBoundingClientRect();
      track.style.setProperty('--t', clamp((vh * 0.6 - tr.top) / Math.max(1, tr.height), 0, 1).toFixed(4));
    }
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  Array.prototype.forEach.call(document.querySelectorAll('.tabs'), setupTabs);
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  if (wide.addEventListener) wide.addEventListener('change', requestTick);
  update();

  /* Pointeur : inclinaison de la pile (souris uniquement, pas au toucher) */
  var stack = document.querySelector('.stack');
  if (stack && hero && !reduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var raf = null, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1);
      ty = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
      if (!raf) raf = requestAnimationFrame(function () {
        raf = null;
        stack.style.setProperty('--mx', tx.toFixed(3));
        stack.style.setProperty('--my', ty.toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', function () {
      stack.style.setProperty('--mx', '0');
      stack.style.setProperty('--my', '0');
    });
  }

  /* Révélations : ce qui est déjà visible au chargement s'affiche sans animation */
  var reveals = document.querySelectorAll('.reveal');
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    Array.prototype.forEach.call(reveals, function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in', 'no-anim');
      else io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }
})();
