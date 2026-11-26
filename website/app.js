/* Agent Skills Suite — vitrine
   Amélioration progressive : sans JavaScript, tout le contenu reste lisible
   (scénarios et méthodes d'installation affichés les uns sous les autres). */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* Onglets accessibles (WAI-ARIA APG : flèches, Début, Fin) */
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
  Array.prototype.forEach.call(document.querySelectorAll('.tabs'), setupTabs);

  /* Copie dans le presse-papiers, avec un retour honnête */
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
    btn.hidden = false;
    btn.setAttribute('aria-label', 'Copier : ' + btn.getAttribute('data-copy'));
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy')).then(function () {
        toast('Copié dans le presse-papiers');
      }, function () {
        toast('Copie impossible : sélectionnez le texte à la main');
      });
    });
  });

  /* Niveau de rigueur du profil */
  var seg = document.querySelector('.seg');
  if (seg) {
    var radios = Array.prototype.slice.call(seg.querySelectorAll('[role="radio"]'));
    var descs = document.querySelectorAll('[data-level-desc]');
    var label = document.getElementById('profile-level');
    var names = { legere: 'légère', standard: 'standard', stricte: 'stricte' };
    function setLevel(index, focus) {
      var level = radios[index].getAttribute('data-level');
      radios.forEach(function (r, i) {
        r.setAttribute('aria-checked', i === index ? 'true' : 'false');
        r.tabIndex = i === index ? 0 : -1;
      });
      Array.prototype.forEach.call(descs, function (d) {
        d.classList.toggle('is-on', d.getAttribute('data-level-desc') === level);
      });
      if (label) label.textContent = names[level];
      if (focus) radios[index].focus();
    }
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

  /* Thème : suit le système, bascule manuelle mémorisée si le stockage est disponible */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    function current() {
      var forced = root.getAttribute('data-theme');
      if (forced) return forced;
      return media && media.matches ? 'dark' : 'light';
    }
    function refreshLabel() {
      themeBtn.setAttribute('aria-label', current() === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre');
    }
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ass-theme', next); } catch (e) { /* stockage indisponible : choix valable pour cette visite */ }
      refreshLabel();
    });
    if (media && media.addEventListener) media.addEventListener('change', refreshLabel);
    themeBtn.hidden = false;
    refreshLabel();
  }
})();
