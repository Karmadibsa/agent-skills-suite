/* Agent Skills Suite — vitrine
   Amélioration progressive : sans JavaScript, ou avec prefers-reduced-motion, tout le contenu est affiché
   dans son état final et reste lisible. Les effets ne modifient que des variables CSS lues par transform,
   la couleur ou les contours ; aucun texte n'est rendu illisible pendant une animation. */
(function () {
  'use strict';
  var root = document.documentElement;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false, addEventListener: null }; };
  var motionQuery = mq('(prefers-reduced-motion: reduce)');
  var reduced = motionQuery.matches;

  /* La classe .js n'est posée qu'ici : si ce fichier ne se charge pas, la page reste en mode statique lisible. */
  root.classList.add('js');
  root.classList.toggle('static', reduced);

  /* Écrit une variable CSS seulement si sa valeur change (évite des recalculs de style inutiles). */
  function setVar(el, name, value) {
    var v = value.toFixed(3);
    var key = '_' + name;
    if (el[key] === v) return;
    el[key] = v;
    el.style.setProperty(name, v);
  }

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
    var label = btn.getAttribute('data-label');
    if (!label && targetId) {
      var item = btn.closest('details');
      var name = item ? item.querySelector('.t-name') : null;
      label = name ? 'Copier le prompt du skill ' + name.textContent.trim() : 'Copier le prompt';
    }
    btn.setAttribute('aria-label', label || 'Copier : ' + getText());
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
  var seg = document.querySelector('.profile-text .seg');
  if (seg) {
    var radios = Array.prototype.slice.call(seg.querySelectorAll('[role="radio"]'));
    var descs = document.querySelectorAll('[data-level-desc]');
    var levelLabel = document.getElementById('profile-level');
    var names = { legere: 'légère', standard: 'standard', stricte: 'stricte' };
    var setLevel = function (index, focus) {
      var level = radios[index].getAttribute('data-level');
      radios.forEach(function (r, i) {
        r.setAttribute('aria-checked', i === index ? 'true' : 'false');
        r.tabIndex = i === index ? 0 : -1;
      });
      Array.prototype.forEach.call(descs, function (d) { d.classList.toggle('is-on', d.getAttribute('data-level-desc') === level); });
      if (levelLabel) levelLabel.textContent = names[level];
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

  /* ---------- Version des prompts : skills installés ou lien GitHub ---------- */
  var modeSeg = document.querySelector('[data-prompt-mode]');
  if (modeSeg) {
    var REPO = 'https://github.com/Karmadibsa/agent-skills-suite/blob/main/skills/';
    var prompts = Array.prototype.map.call(document.querySelectorAll('.track .prompt-full'), function (el) {
      return { el: el, original: el.textContent };
    });
    var hint = document.querySelector('[data-mode-hint]');
    var modeRadios = Array.prototype.slice.call(modeSeg.querySelectorAll('[role="radio"]'));
    var toWeb = function (text) {
      return text.replace(/^Utilise le skill ([a-z-]+)(.*)$/m, function (_, name, rest) {
        return 'Lis ' + REPO + name + '/SKILL.md (et les fiches de son dossier references/ quand il te le demande), puis applique ce skill' + rest;
      });
    };
    var setMode = function (index, focus) {
      var web = modeRadios[index].getAttribute('data-mode') === 'web';
      modeRadios.forEach(function (r, i) {
        r.setAttribute('aria-checked', i === index ? 'true' : 'false');
        r.tabIndex = i === index ? 0 : -1;
      });
      prompts.forEach(function (pr) { pr.el.textContent = web ? toWeb(pr.original) : pr.original; });
      if (hint) hint.textContent = web
        ? 'Les prompts commencent par le lien GitHub du skill : votre assistant le lit en ligne, aucune installation nécessaire.'
        : 'Les prompts commencent par « Utilise le skill… » : votre assistant trouve le skill dans votre projet.';
      if (focus) modeRadios[index].focus();
    };
    modeRadios.forEach(function (r, i) {
      r.addEventListener('click', function () { setMode(i, false); });
      r.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % modeRadios.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + modeRadios.length) % modeRadios.length;
        if (next !== null) { e.preventDefault(); setMode(next, true); }
      });
    });
    modeSeg.closest('.prompt-mode').hidden = false;
    setMode(0, false);
  }

  /* ---------- Thème ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var lightQuery = mq('(prefers-color-scheme: light)');
    var current = function () {
      var forced = root.getAttribute('data-theme');
      if (forced) return forced;
      return lightQuery.matches ? 'light' : 'dark';
    };
    var refresh = function () {
      var mode = current();
      themeBtn.setAttribute('data-mode', mode);
      themeBtn.setAttribute('aria-label', mode === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre');
    };
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ass-theme', next); } catch (e) { /* choix valable pour cette visite */ }
      refresh();
    });
    if (lightQuery.addEventListener) lightQuery.addEventListener('change', refresh);
    themeBtn.hidden = false;
    refresh();
  }

  /* ---------- Scènes pilotées par le scroll ---------- */
  var hero = document.querySelector('[data-scene]');
  var track = document.querySelector('[data-track]');
  var wide = mq('(min-width: 961px)');
  var ticking = false;

  /* Mise en cache : pour chaque section épinglée, ses scénarios et leurs éléments animés. */
  var pins = Array.prototype.map.call(document.querySelectorAll('[data-pin]'), function (section) {
    var scenarios = Array.prototype.map.call(section.querySelectorAll('.scenario'), function (sc) {
      return {
        el: sc,
        steps: Array.prototype.map.call(sc.querySelectorAll('[data-at]'), function (el) {
          return { el: el, at: parseFloat(el.getAttribute('data-at')) };
        }),
        before: sc.querySelector('.pane-before'),
        after: sc.querySelector('.pane-after')
      };
    });
    var stepper = section.querySelector('.stepper');
    return {
      section: section,
      scenarios: scenarios,
      stepper: stepper,
      stepButtons: stepper ? Array.prototype.slice.call(stepper.querySelectorAll('[data-step]')) : []
    };
  });

  function pinActive() { return !reduced && wide.matches; }

  function applyScenario(sc, p) {
    sc.steps.forEach(function (s) { setVar(s.el, '--r', clamp((p - s.at) / 0.06, 0, 1)); });
    if (sc.before) setVar(sc.before, '--s', clamp((p - 0.32) / 0.14, 0, 1));
    if (sc.after) setVar(sc.after, '--a', clamp((p - 0.48) / 0.1, 0, 1));
  }

  function updateStepper(pin, p, active) {
    if (!pin.stepper) return;
    pin.stepper.hidden = !active;
    var idx = p < 0.4 ? 0 : (p < 0.55 ? 1 : 2);
    pin.stepButtons.forEach(function (b, i) {
      if (i === idx) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    setVar(root, '--page', clamp(window.scrollY / Math.max(1, root.scrollHeight - vh), 0, 1));

    var active = pinActive();
    pins.forEach(function (pin) {
      pin.section.classList.toggle('is-pinned', active);
      var p = 1;
      if (active) {
        var r = pin.section.getBoundingClientRect();
        p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      }
      pin.scenarios.forEach(function (sc) { if (!sc.el.hidden) applyScenario(sc, p); });
      updateStepper(pin, p, active);
    });

    if (reduced) {
      if (hero) setVar(hero, '--p', 0);
      if (track) setVar(track, '--t', 1);
      return;
    }
    if (hero) {
      var hr = hero.getBoundingClientRect();
      if (hr.bottom > 0) setVar(hero, '--p', clamp(-hr.top / Math.max(1, hr.height), 0, 1));
    }
    if (track) {
      var tr = track.getBoundingClientRect();
      setVar(track, '--t', clamp((vh * 0.6 - tr.top) / Math.max(1, tr.height), 0, 1));
    }
  }
  function requestTick() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  /* Défilement animé maison (le défilement doux natif n'est pas fiable partout), instantané en mouvement réduit. */
  var scrollAnim = null;
  function scrollToY(target) {
    if (scrollAnim) cancelAnimationFrame(scrollAnim);
    var start = window.scrollY, dist = target - start, t0 = null, dur = 450;
    if (reduced || Math.abs(dist) < 2) { window.scrollTo(0, target); return; }
    var stop = function () { if (scrollAnim) cancelAnimationFrame(scrollAnim); scrollAnim = null; window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); };
    window.addEventListener('wheel', stop, { passive: true, once: true });
    window.addEventListener('touchstart', stop, { passive: true, once: true });
    var stepFn = function (ts) {
      if (t0 === null) t0 = ts;
      var k = clamp((ts - t0) / dur, 0, 1);
      var e = 1 - Math.pow(1 - k, 3);
      window.scrollTo(0, start + dist * e);
      if (k < 1) scrollAnim = requestAnimationFrame(stepFn); else stop();
    };
    scrollAnim = requestAnimationFrame(stepFn);
  }

  /* Barre d'étapes : aller directement à un moment de la démo, au clic comme au clavier. */
  pins.forEach(function (pin) {
    pin.stepButtons.forEach(function (b) {
      b.addEventListener('click', function () {
        var s = pin.section;
        var target = s.getBoundingClientRect().top + window.scrollY + (s.offsetHeight - window.innerHeight) * parseFloat(b.getAttribute('data-step'));
        scrollToY(target);
      });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.tabs'), setupTabs);
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  if (wide.addEventListener) wide.addEventListener('change', requestTick);

  /* La préférence « réduire les animations » peut changer pendant la visite. */
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', function (e) {
      reduced = e.matches;
      root.classList.toggle('static', reduced);
      if (reduced) Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { el.classList.add('is-in'); });
      requestTick();
    });
  }
  update();

  /* Pointeur : inclinaison de la pile (souris uniquement, pas au toucher) */
  var stack = document.querySelector('.stack');
  if (stack && hero && mq('(hover: hover) and (pointer: fine)').matches) {
    var raf = null, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (e) {
      if (reduced) return;
      var r = hero.getBoundingClientRect();
      tx = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1);
      ty = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
      if (!raf) raf = requestAnimationFrame(function () {
        raf = null;
        setVar(stack, '--mx', tx);
        setVar(stack, '--my', ty);
      });
    });
    hero.addEventListener('pointerleave', function () {
      setVar(stack, '--mx', 0);
      setVar(stack, '--my', 0);
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
