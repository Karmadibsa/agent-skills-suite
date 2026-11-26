const CLI_COMMANDS = {
  suite: "npx skills add Karmadibsa/agent-skills-suite",
  "project-discovery-validation": "npx skills add Karmadibsa/agent-skills-suite --skill project-discovery-validation",
  "product-spec-docs": "npx skills add Karmadibsa/agent-skills-suite --skill product-spec-docs",
  "ux-ui-design": "npx skills add Karmadibsa/agent-skills-suite --skill ux-ui-design",
  "api-data-architecture": "npx skills add Karmadibsa/agent-skills-suite --skill api-data-architecture",
  "clean-code-security": "npx skills add Karmadibsa/agent-skills-suite --skill clean-code-security",
  "qa-perf-observability": "npx skills add Karmadibsa/agent-skills-suite --skill qa-perf-observability",
  "full-project-audit": "npx skills add Karmadibsa/agent-skills-suite --skill full-project-audit"
};
const BEFORE_AFTER_SCENARIOS = [
  {
    id: "budget-local-first",
    title: "1. Budget Local-First",
    subtitle: "Suivi financier local sans serveur ni abonnement (0 €/mois)",
    before: {
      tagline: "Avant — Réponse générique non cadrée",
      description: "Sans cadre, un agent propose souvent un backend distant, une base cloud et des écrans superflus pour un besoin local simple.",
      issues: [
        "Coût et complexité serveur inutiles pour un outil personnel local",
        "Exposition inutile de données financières hors de l'appareil",
        "Dépendance à un service tiers dès le démarrage"
      ],
      codeSnippet: "app.post('/api/transactions', async (req, res) => {\n  await db.query('INSERT INTO transactions VALUES ($1, $2)', [req.body.amount, req.body.category]);\n  res.status(201).json({ ok: true });\n});"
    },
    after: {
      tagline: "Après — Avec Agent Skills Suite",
      jtbdKano: "Cadrage : suivre ses dépenses clairement en gardant la maîtrise de ses données locales.",
      critique: "Contre-argument : éviter un serveur dès le départ ; garder le stockage local et l'export ouvert (JSON / CSV).",
      alternative: "Alternative simple : moteur de règles isolé, montants en centimes/décimaux exacts et sauvegarde avant mise à jour.",
      safeguards: [
        "Données : typage exact (pas de FLOAT sur l'argent), dates UTC, sauvegarde avant migration",
        "Sécurité : validation stricte aux frontières, zéro secret en dur, RGPD",
        "QA : tests unitaires sur les règles de calcul et cas limites"
      ]
    }
  },
  {
    id: "habit-tracker",
    title: "2. Suivi d'Activité sans Culpabilité",
    subtitle: "Accompagnement souple respectant l'autonomie",
    before: {
      tagline: "Avant — Réponse générique non cadrée",
      description: "Par complaisance, l'IA ajoute souvent des séries punitives et des relances insistantes qui découragent après une pause.",
      issues: [
        "Effet punitif après un jour manqué",
        "Complexité inutile dès la première version",
        "Absence de critère clair pour évaluer l'utilité réelle"
      ],
      codeSnippet: "if (missedDays > 0) {\n  streak = 0;\n  showAlert('Votre série est remise à zéro.');\n}"
    },
    after: {
      tagline: "Après — Avec Agent Skills Suite",
      jtbdKano: "Cadrage : favoriser la régularité durable sans pression ni culpabilisation.",
      critique: "Contre-argument : les pénalités rigides favorisent l'abandon ; privilégier un suivi souple et réversible.",
      alternative: "Alternative simple : vue hebdomadaire lisible, réglages discrets et reprise sans blocage.",
      safeguards: [
        "UX/UI : autonomie préservée, états clairs, accessibilité WCAG 2.2 AA",
        "Données : export et effacement maîtrisés",
        "QA : tests des cas limites et navigation clavier"
      ]
    }
  },
  {
    id: "ops-dashboard",
    title: "3. Tableau de Bord Opérationnel",
    subtitle: "Priorité à l'action utile et à la sobriété",
    before: {
      tagline: "Avant — Réponse générique non cadrée",
      description: "L'IA empile souvent des cartes décoratives, des rafraîchissements en boucle et des éléments non vérifiés.",
      issues: [
        "Information dispersée sans action claire",
        "Requêtes répétitives lorsque l'onglet est inactif",
        "Contrôles non testés en conditions d'erreur"
      ],
      codeSnippet: "setInterval(() => {\n  fetch('/api/status').catch(() => {});\n}, 1000);"
    },
    after: {
      tagline: "Après — Avec Agent Skills Suite",
      jtbdKano: "Cadrage : faire ressortir immédiatement ce qui demande une action ou une vérification.",
      critique: "Contre-argument : trop d'indicateurs dilue l'attention ; mettre en pause les tâches d'arrière-plan quand l'onglet est caché.",
      alternative: "Alternative simple : liste d'actions filtrable, gestion claire des erreurs et sobriété RGESN.",
      safeguards: [
        "Performance & Sobriété : Core Web Vitals (p75), pause en arrière-plan, zéro requête N+1",
        "Observabilité : logs JSON structurés sans données personnelles",
        "QA : tests E2E ciblant les rôles ARIA + axe-core"
      ]
    }
  }
];
const SKILLS_CATALOG = [
  {
    id: "project-discovery-validation",
    category: "cadrage",
    name: "00 — project-discovery-validation",
    shortDesc: "Analyse de l'existant, validation critique, contre-argument, alternative plus simple et roadmap.",
    standards: ["JTBD & Kano", "Anti-complaisance", "Preuves [N1]–[N6]"]
  },
  {
    id: "product-spec-docs",
    category: "cadrage",
    name: "01 — product-spec-docs",
    shortDesc: "Cahier des charges exécutable, statuts verrouillés, BDD/Gherkin, ADR, Changelog et lots atomiques.",
    standards: ["ISO/IEC/IEEE 29148", "BDD / Gherkin", "ADR & SemVer"]
  },
  {
    id: "ux-ui-design",
    category: "design",
    name: "02 — ux-ui-design",
    shortDesc: "Ergonomie, accessibilité WCAG 2.2 AA, mobile/desktop, filtrage, anti-slop et retour local.",
    standards: ["WCAG 2.2 AA", "WAI-ARIA", "Bug ou idée ?"]
  },
  {
    id: "api-data-architecture",
    category: "design",
    name: "03 — api-data-architecture",
    shortDesc: "Modélisation relationnelle/locale, migrations sûres, contrats API RFC 9457 et RGPD.",
    standards: ["Local-First / SQL", "RFC 9457", "RGPD"]
  },
  {
    id: "clean-code-security",
    category: "qualite",
    name: "04 — clean-code-security",
    shortDesc: "Architecture KISS, sécurité OWASP, zéro fichier mort et scripts de lancement local.",
    standards: ["KISS", "OWASP / ASVS", "start.bat / start.sh"]
  },
  {
    id: "qa-perf-observability",
    category: "qualite",
    name: "05 — qa-perf-observability",
    shortDesc: "Tests unitaires, intégration et E2E accessibles, Core Web Vitals, RGESN et logs sans PII.",
    standards: ["Playwright & ARIA", "Core Web Vitals", "Zero PII logs"]
  },
  {
    id: "full-project-audit",
    category: "qualite",
    name: "06 — full-project-audit",
    shortDesc: "Audit 360° en lecture seule (P0–P3, preuves tracées, KISS & Table Rase) et lots de remédiation.",
    standards: ["Lecture seule", "P0–P3", "Table Rase"]
  }
];
function readStorage(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (_) { return false; }
}
class AppState {
  constructor() {
    this.theme = readStorage("ais_theme") || "light";
    if (!["light", "dark", "system"].includes(this.theme)) this.theme = "light";
    this.activeCliKey = "suite";
    this.activeScenarioId = BEFORE_AFTER_SCENARIOS[0].id;
    this.activeScenarioTab = "after";
    this.activeSkillCategory = "all";
    this.feedbacks = [];
    try {
      const entries = JSON.parse(readStorage("ais_feedbacks") || "[]");
      if (Array.isArray(entries)) this.feedbacks = entries.filter(entry => entry && typeof entry.content === "string" && typeof entry.zone === "string" && ["bug", "idea"].includes(entry.type));
    } catch (_) { /* invalid local data: start with an empty list */ }
  }
  saveFeedbacks() {
    return writeStorage("ais_feedbacks", JSON.stringify(this.feedbacks));
  }
  setTheme(theme) {
    this.theme = theme;
    writeStorage("ais_theme", theme);
    this.applyTheme();
  }
  applyTheme() {
    const effectiveTheme = this.theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : this.theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
  }
}
const state = new AppState();
function $(selector, context = document) {
  return context.querySelector(selector);
}
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function copyToClipboard(text, triggerBtn) {
  const done = () => {
    if (!triggerBtn) return;
    const prev = triggerBtn.textContent;
    triggerBtn.textContent = "Copié";
    setTimeout(() => {
      triggerBtn.textContent = prev;
    }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, onDone) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    if (document.execCommand("copy")) onDone();
    else window.alert("Copie indisponible. Copiez le texte manuellement.");
  } finally {
    document.body.removeChild(ta);
  }
}
function initCliModule() {
  const selectEl = $("#cli-command-select");
  const codeEl = $("#cli-command-code");
  const copyBtn = $("#cli-copy-btn");
  if (!selectEl || !codeEl || !copyBtn) return;
  const update = (key) => {
    state.activeCliKey = key;
    const cmd = CLI_COMMANDS[key] || CLI_COMMANDS.suite;
    codeEl.innerHTML = `<span class="cli-dollar">$</span> ${escapeHtml(cmd)}`;
  };
  selectEl.addEventListener("change", (e) => update(e.target.value));
  copyBtn.addEventListener("click", () => {
    copyToClipboard(CLI_COMMANDS[state.activeCliKey] || CLI_COMMANDS.suite, copyBtn);
  });
  update(state.activeCliKey);
}
function initBeforeAfterModule() {
  const selector = $("#scenario-selector");
  const tabBefore = $("#tab-btn-before");
  const tabAfter = $("#tab-btn-after");
  const container = $("#demo-content-container");
  if (!selector || !tabBefore || !tabAfter || !container) return;
  selector.innerHTML = BEFORE_AFTER_SCENARIOS.map(
    (s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.title)}</option>`
  ).join("");
  selector.value = state.activeScenarioId;
  const render = () => {
    const scenario = BEFORE_AFTER_SCENARIOS.find((s) => s.id === state.activeScenarioId) || BEFORE_AFTER_SCENARIOS[0];
    const isAfter = state.activeScenarioTab === "after";
    tabAfter.classList.toggle("is-active", isAfter);
    tabAfter.setAttribute("aria-selected", String(isAfter));
    tabBefore.classList.toggle("is-active", !isAfter);
    tabBefore.setAttribute("aria-selected", String(!isAfter));
    if (!isAfter) {
      const b = scenario.before;
      container.innerHTML = `
        <article class="comparison-card before">
          <div class="comparison-header">
            <h3>${escapeHtml(scenario.subtitle)}</h3>
            <span class="comparison-badge">${escapeHtml(b.tagline)}</span>
          </div>
          <p>${escapeHtml(b.description)}</p>
          <ul class="comparison-list">
            ${b.issues.map((i) => `<li class="comparison-item">${escapeHtml(i)}</li>`).join("")}
          </ul>
          <pre class="cli-box" style="margin-top:14px;padding:12px;"><code>${escapeHtml(b.codeSnippet)}</code></pre>
        </article>
      `;
    } else {
      const a = scenario.after;
      container.innerHTML = `
        <article class="comparison-card after">
          <div class="comparison-header">
            <h3>${escapeHtml(scenario.subtitle)}</h3>
            <span class="comparison-badge">${escapeHtml(a.tagline)}</span>
          </div>
          <p>${escapeHtml(a.jtbdKano)}</p>
          <p>${escapeHtml(a.critique)}</p>
          <p>${escapeHtml(a.alternative)}</p>
          <ul class="comparison-list">
            ${a.safeguards.map((sg) => `<li class="comparison-item">${escapeHtml(sg)}</li>`).join("")}
          </ul>
        </article>
      `;
    }
  };
  selector.addEventListener("change", (e) => {
    state.activeScenarioId = e.target.value;
    render();
  });
  tabBefore.addEventListener("click", () => {
    state.activeScenarioTab = "before";
    render();
  });
  tabAfter.addEventListener("click", () => {
    state.activeScenarioTab = "after";
    render();
  });
  render();
}
function initSkillsExplorerModule() {
  const buttons = $$(".skill-filter-btn");
  const container = $("#skills-grid-container");
  if (!container) return;
  const render = () => {
    const items = SKILLS_CATALOG.filter(
      (s) => state.activeSkillCategory === "all" || s.category === state.activeSkillCategory
    );
    container.innerHTML = items.map((s) => `
      <article class="skill-card">
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.shortDesc)}</p>
        <div class="skill-tags">
          ${s.standards.map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </article>
    `).join("");
  };
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      state.activeSkillCategory = btn.getAttribute("data-category") || "all";
      render();
    });
  });
  render();
}
function initThemeAndMotion() {
  state.applyTheme();
  const themeSelect = $("#theme-select");
  if (themeSelect) {
    themeSelect.value = state.theme;
    themeSelect.addEventListener("change", (e) => state.setTheme(e.target.value));
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-revealed"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => observer.observe(el));
  }
  const quickBtn = $("#quick-feedback-btn");
  const modal = $("#feedback-modal");
  const closeBtn = $("#btn-close-modal");
  const scrollBtn = $("#btn-scroll-to-feedback");
  if (quickBtn && modal) {
    quickBtn.addEventListener("click", () => {
      if (typeof modal.showModal === "function" && !modal.open) {
        modal.showModal();
      }
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      if (modal.open) modal.close();
      quickBtn?.focus();
    });
  }
  if (scrollBtn && modal) {
    scrollBtn.addEventListener("click", () => {
      if (modal.open) modal.close();
      const section = $("#retours");
      if (section) section.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      $("#feedback-content")?.focus();
    });
  }
}
function initFeedbackModule() {
  const form = $("#feedback-form");
  const typeEl = $("#feedback-type");
  const zoneEl = $("#feedback-zone");
  const contentEl = $("#feedback-content");
  const listEl = $("#feedback-list");
  const copyBtn = $("#feedback-copy-summary-btn");
  const downloadBtn = $("#feedback-download-btn");
  const clearBtn = $("#feedback-clear-all-btn");
  if (!form || !listEl) return;
  const render = () => {
    if (state.feedbacks.length === 0) {
      listEl.innerHTML = `<p style="color:var(--muted);margin:0;">Aucun retour enregistré pour le moment.</p>`;
      return;
    }
    listEl.innerHTML = state.feedbacks.map((item, idx) => `
      <div class="feedback-item">
        <div class="feedback-item-header">
          <span class="feedback-tag ${item.type === "bug" ? "bug" : "idea"}">${item.type === "bug" ? "Bug" : "Idée"}</span>
          <span class="feedback-date">${escapeHtml(item.zone)}</span>
          <button type="button" class="delete-btn" data-index="${idx}" aria-label="Supprimer ce retour">✕</button>
        </div>
        <p style="margin:0;">${escapeHtml(item.content)}</p>
      </div>
    `).join("");
    $$(".delete-btn", listEl).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        state.feedbacks.splice(idx, 1);
        state.saveFeedbacks();
        render();
      });
    });
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = contentEl.value.trim();
    if (!content) return;
    state.feedbacks.unshift({
      type: typeEl.value,
      zone: zoneEl.value.trim() || "Général",
      content,
      timestamp: new Date().toISOString()
    });
    const saved = state.saveFeedbacks();
    render();
    if (!saved) window.alert("Stockage local indisponible. Le retour reste en mémoire pour cette session : exportez-le avant de quitter.");
    form.reset();
  });
  const buildMarkdown = () => {
    if (!state.feedbacks.length) return "# Retours locaux\n\nAucun retour enregistré.";
    return "# Retours locaux\n\n" + state.feedbacks.map(
      (f) => `- **${f.type === "bug" ? "Bug" : "Idée"}** (${f.zone}) : ${f.content}`
    ).join("\n");
  };
  copyBtn?.addEventListener("click", () => copyToClipboard(buildMarkdown(), copyBtn));
  downloadBtn?.addEventListener("click", () => {
    const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "retours-locaux.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  clearBtn?.addEventListener("click", () => {
    state.feedbacks = [];
    state.saveFeedbacks();
    render();
  });
  render();
}
document.addEventListener("DOMContentLoaded", () => {
  initCliModule();
  initBeforeAfterModule();
  initSkillsExplorerModule();
  initThemeAndMotion();
  initFeedbackModule();
});
