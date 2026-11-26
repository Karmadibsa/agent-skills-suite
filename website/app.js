/**
 * Agent Skills Suite - Dynamic Showcase Engine
 * File: website/app.js
 * Architecture: Vanilla ES Modules / Zero External Dependencies
 */
// =============================================================================
// DATA STORE & CONFIGURATION
// =============================================================================
const CLI_COMMANDS = {
  suite: "npx agent-skills-suite init --full",
  "project-discovery-validation": "npx agent-skills-suite add project-discovery-validation",
  "product-spec-docs": "npx agent-skills-suite add product-spec-docs",
  "ux-ui-design": "npx agent-skills-suite add ux-ui-design",
  "api-data-architecture": "npx agent-skills-suite add api-data-architecture",
  "clean-code-security": "npx agent-skills-suite add clean-code-security",
  "qa-perf-observability": "npx agent-skills-suite add qa-perf-observability",
  "full-project-audit": "npx agent-skills-suite add full-project-audit"
};
const BEFORE_AFTER_SCENARIOS = [
  {
    id: "budget-local-first",
    title: "1. Budget Local-First",
    subtitle: "Gestion de finances personnelles locales et portables (0 €/mois)",
    before: {
      tagline: "Simulation illustrative — IA sans cadre (Slop)",
      description: "Sans cadrage préalable, une IA génère souvent un backend distant et un abonnement dès le premier jet pour un simple suivi de budget personnel.",
      issues: [
        "Complexité serveur/abonnement non justifiée pour un usage personnel local",
        "Risque d'exposition inutile de données financières personnelles",
        "Dépendance immédiate à un service tiers payant",
        "Gestion incomplète du mode hors ligne"
      ],
      codeSnippet: "// Exemple illustratif d'approche non cadrée\napp.post('/api/transactions', async (req, res) => {\n  const { amount, category } = req.body;\n  await db.query('INSERT INTO transactions VALUES ($1, $2)', [amount, category]);\n  res.status(201).json({ ok: true });\n});"
    },
    after: {
      tagline: "Simulation illustrative — Avec Agent Skills Suite",
      jtbdKano: "JTBD : Suivre ses dépenses en 30 sec en gardant la maîtrise de ses données. Kano : socle fiable = calcul exact & export ouvert ; différenciant = fonctionnement 100 % local sans frais.",
      critique: "Contre-argument & alternative 3× plus simple : éviter un serveur dès le départ ; privilégier un stockage local (SQLite / IndexedDB) avec sauvegarde et export JSON/CSV.",
      alternative: "Application Local-First avec règles métier isolées, montants en centimes/décimaux exacts, export ouvert et zéro coût fixe.",
      safeguards: [
        "Données : typage exact (pas de FLOAT sur l'argent), dates UTC, sauvegarde avant migration",
        "Sécurité : validation stricte des entrées, zéro secret en dur, conformité RGPD",
        "QA : tests unitaires sur les règles de calcul et cas limites"
      ]
    }
  },
  {
    id: "habit-tracker",
    title: "2. Suivi d'Activité sans Culpabilité",
    subtitle: "Accompagnement d'habitudes respectueux de l'autonomie",
    before: {
      tagline: "Simulation illustrative — IA sans cadre (Slop)",
      description: "Une IA complaisante propose souvent des mécaniques punitives (« série perdue », relances culpabilisantes) qui découragent après un simple imprévu.",
      issues: [
        "Culpabilisation en cas d'absence ponctuelle ou de fatigue",
        "Réduction d'un parcours long à un compteur binaire fragile",
        "Relances répétitives pouvant nuire à l'expérience",
        "Absence de critère d'invalidation clair (falsifiabilité)"
      ],
      codeSnippet: "// Exemple illustratif de mécanique punitive à éviter\nif (missedDays > 0) {\n  streak = 0;\n  notifyUser('Votre série de 30 jours est remise à zéro.');\n}"
    },
    after: {
      tagline: "Simulation illustrative — Avec Agent Skills Suite",
      jtbdKano: "JTBD : Maintenir une régularité durable sans pression anxiogène. Kano : autonomie, clarté et suivi souple plutôt que pénalité rigide.",
      critique: "Contre-argument : les séries punitives provoquent l'abandon après le premier échec ; préférer une vision souple et réversible.",
      alternative: "Suivi hebdomadaire lisible, paramètres optionnels et retour apaisé après une pause.",
      safeguards: [
        "Ergonomie : respect de l'autonomie, charge cognitive limitée, accessibilité WCAG 2.2 AA",
        "Données : contrôle local des préférences et export des données",
        "QA : tests des états vides, erreurs et parcours clavier"
      ]
    }
  },
  {
    id: "ops-dashboard",
    title: "3. Tableau de Bord Opérationnel",
    subtitle: "Vue d'action claire et sobre sans surcharge visuelle",
    before: {
      tagline: "Simulation illustrative — IA sans cadre (Slop)",
      description: "Une génération non encadrée empile souvent des cartes KPI décoratives, des appels répétitifs inutiles et des éléments non testés.",
      issues: [
        "Surcharge visuelle avec indicateurs peu actionnables",
        "Requêtes répétitives inutiles lorsque l'onglet n'est pas actif",
        "Boutons ou filtres décoratifs sans comportement réel",
        "Absence de vérification de la stabilité d'affichage"
      ],
      codeSnippet: "// Exemple illustratif de rafraîchissement non maîtrisé\nsetInterval(() => {\n  fetch('/api/metrics').catch(() => {});\n}, 1000);"
    },
    after: {
      tagline: "Simulation illustrative — Avec Agent Skills Suite",
      jtbdKano: "JTBD : Identifier immédiatement la prochaine action utile. Kano : actions claires, réactivité et sobriété plutôt que décorations.",
      critique: "Contre-argument : multiplier les widgets ralentit la prise de décision ; limiter aux informations utiles et mettre en pause quand l'onglet est masqué.",
      alternative: "Vue orientée action avec filtres utiles, états chargement/vide/erreur complets et sobriété RGESN.",
      safeguards: [
        "Performance & Sobriété : respect des Core Web Vitals (p75), pause en arrière-plan, zéro requête N+1",
        "Observabilité : logs structurés JSON sans données personnelles (Zero PII)",
        "QA : tests E2E Playwright ciblant les rôles ARIA + axe-core"
      ]
    }
  }
];
const SKILLS_CATALOG = [
  {
    id: "project-discovery-validation",
    category: "cadrage",
    name: "Skill 00 — project-discovery-validation",
    shortDesc: "Cadrage produit, analyse de l'existant, validation scientifique, contre-argument et roadmap.",
    deliverables: ["Analyse existant & JTBD / Kano", "Contre-argument & alternative 3× plus simple", "Roadmap par jalons & AGENTS.md initial"],
    standards: ["Anti-complaisance IA", "Preuves [N1]–[N6]", "Prototypes HTML + « Bug ou idée ? »"]
  },
  {
    id: "product-spec-docs",
    category: "cadrage",
    name: "Skill 01 — product-spec-docs",
    shortDesc: "Cahier des charges exécutable, statuts verrouillés, BDD/Gherkin, ADR, Changelog et lots atomiques.",
    deliverables: ["00 — LIRE EN PREMIER & glossaire métier", "Personas, User Stories INVEST & scénarios Gherkin", "Règles métier, 8 cas limites, ADR & lots atomiques"],
    standards: ["ISO/IEC/IEEE 29148", "Keep a Changelog & SemVer", "Documentation duale Utilisateur vs IA"]
  },
  {
    id: "ux-ui-design",
    category: "design",
    name: "Skill 02 — ux-ui-design",
    shortDesc: "Ergonomie cognitive, accessibilité WCAG 2.2 AA, mobile/desktop, anti-slop et module « Bug ou idée ? ».",
    deliverables: ["Layouts clairs & filtrage intelligent", "États vide/chargement/erreur & autonomie", "Module local « Bug ou idée ? » (export .zip)"],
    standards: ["WCAG 2.2 AA & WAI-ARIA", "Chasse au slop IA", "Respect de prefers-reduced-motion"]
  },
  {
    id: "api-data-architecture",
    category: "design",
    name: "Skill 03 — api-data-architecture",
    shortDesc: "Modélisation relationnelle/locale, migrations sûres, contrats API RFC 9457 et RGPD.",
    deliverables: ["Schéma normalisé (3NF/BCNF) & migrations up/down", "Contrats OpenAPI / RFC 9457 & pagination bornée", "Chiffrement, anonymisation & export JSON/CSV"],
    standards: ["Local-First vs Client-Serveur", "Typage financier exact & UTC", "RGPD Art. 5/6/17/20/25/28/32"]
  },
  {
    id: "clean-code-security",
    category: "qualite",
    name: "Skill 04 — clean-code-security",
    shortDesc: "Architecture modulaire KISS, sécurité OWASP, hygiène Git (zéro fichier mort) et scripts 1-commande.",
    deliverables: ["Découplage domaine/UI & erreurs structurées", "Verrous OWASP & gestion des secrets (.env.example)", "Scripts racine start.bat / start.sh & .gitattributes"],
    standards: ["Principe KISS & Rule of Three", "OWASP Top 10 / ASVS & CWE", "Zéro fichier *_old / *_backup"]
  },
  {
    id: "qa-perf-observability",
    category: "qualite",
    name: "Skill 05 — qa-perf-observability",
    shortDesc: "Pyramide des tests ISTQB, tests E2E Playwright accessibles, Core Web Vitals, RGESN et logs sans PII.",
    deliverables: ["Tests unitaires, intégration & E2E (rôles ARIA)", "Budgets performance & résilience offline", "Logs structurés JSON sans PII & Error Boundaries"],
    standards: ["ISTQB & axe-core", "Core Web Vitals (p75) & RGESN 2024", "Zero PII dans les logs"]
  },
  {
    id: "full-project-audit",
    category: "qualite",
    name: "Skill 06 — full-project-audit (Transverse)",
    shortDesc: "Audit 360° en lecture seule (P0–P3, CVSS v4.0, KISS & Table Rase) et plan de remédiation par lots.",
    deliverables: ["Rapport d'audit avec preuves fichier:ligne", "Perspective Table Rase (coûts vs risques)", "Plan de remédiation en lots atomiques"],
    standards: ["Mode lecture seule & anti-prompt-injection", "Distinction exécuté vs supposé", "Profils conditionnels"]
  }
];
// =============================================================================
// APP STATE MANAGEMENT
// =============================================================================
class AppState {
  constructor() {
    this.theme = localStorage.getItem("ais_theme") || "system";
    this.activeCliKey = "suite";
    this.activeScenarioId = BEFORE_AFTER_SCENARIOS[0].id;
    this.activeScenarioTab = "after";
    this.activeSkillCategory = "all";
    this.feedbacks = JSON.parse(localStorage.getItem("ais_feedbacks") || "[]");
  }
  saveFeedbacks() {
    localStorage.setItem("ais_feedbacks", JSON.stringify(this.feedbacks));
  }
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem("ais_theme", theme);
    this.applyTheme();
  }
  applyTheme() {
    const root = document.documentElement;
    root.setAttribute("data-theme", this.theme);
    let effectiveTheme = this.theme;
    if (this.theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (effectiveTheme === "dark") {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
    }
  }
}
const state = new AppState();
// =============================================================================
// DOM UTILITIES & HELPERS
// =============================================================================
function $(selector, context = document) {
  return context.querySelector(selector);
}
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
function copyToClipboard(text, triggerBtn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showCopiedState(triggerBtn)).catch(() => fallbackCopy(text, triggerBtn));
  } else {
    fallbackCopy(text, triggerBtn);
  }
}
function fallbackCopy(text, triggerBtn) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showCopiedState(triggerBtn);
  } finally {
    document.body.removeChild(ta);
  }
}
function showCopiedState(triggerBtn) {
  if (!triggerBtn) return;
  const originalText = triggerBtn.getAttribute("data-original-text") || triggerBtn.innerHTML;
  if (!triggerBtn.getAttribute("data-original-text")) {
    triggerBtn.setAttribute("data-original-text", originalText);
  }
  triggerBtn.classList.add("copied");
  triggerBtn.innerHTML = `<span aria-hidden="true">✓</span><span>Copié</span>`;
  setTimeout(() => {
    triggerBtn.innerHTML = originalText;
    triggerBtn.classList.remove("copied");
  }, 2000);
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
// =============================================================================
// MODULE 1: CLI SELECTOR & COPY
// =============================================================================
function initCliModule() {
  const selectEl = moveElement("#cli-command-select");
  const codeEl = moveElement("#cli-command-code");
  const copyBtn = moveElement("#cli-copy-btn");
  if (!selectEl || !codeEl || !copyBtn) return;
  function updateCliDisplay(key) {
    state.activeCliKey = key;
    const command = CLI_COMMANDS[key] || CLI_COMMANDS.suite;
    codeEl.innerHTML = `<span class="cli-prompt">$</span>${escapeHtml(command)}`;
  }
  selectEl.addEventListener("change", (e) => {
    updateCliDisplay(e.target.value);
  });
  copyBtn.addEventListener("click", () => {
    const command = CLI_COMMANDS[state.activeCliKey] || CLI_COMMANDS.suite;
    copyToClipboard(command, copyBtn);
  });
  updateCliDisplay(state.activeCliKey);
}
// =============================================================================
// MODULE 2: INTERACTIVE BEFORE/AFTER DEMO
// =============================================================================
function initBeforeAfterModule() {
  const scenarioSelector = moveElement("#scenario-selector");
  const tabBeforeBtn = moveElement("#tab-btn-before");
  const tabAfterBtn = moveElement("#tab-btn-after");
  const demoContainer = moveElement("#demo-content-container");
  if (!scenarioSelector || !tabBeforeBtn || !tabAfterBtn || !demoContainer) return;
  scenarioSelector.innerHTML = BEFORE_AFTER_SCENARIOS.map(sc =>
    `<option value="${escapeHtml(sc.id)}">${escapeHtml(sc.title)}</option>`
  ).join("");
  scenarioSelector.value = state.activeScenarioId;
  function renderScenarioContent() {
    const scenario = BEFORE_AFTER_SCENARIOS.find(s => s.id === state.activeScenarioId) || BEFORE_AFTER_SCENARIOS[0];
    const isAfter = state.activeScenarioTab === "after";
    tabAfterBtn.classList.toggle("active", isAfter);
    tabAfterBtn.setAttribute("aria-selected", String(isAfter));
    tabBeforeBtn.classList.toggle("active", !isAfter);
    tabBeforeBtn.setAttribute("aria-selected", String(!isAfter));
    if (!isAfter) {
      const b = scenario.before;
      demoContainer.innerHTML = `
        <article class="comparison-card before">
          <div class="comparison-header">
            <h3>${escapeHtml(scenario.subtitle)}</h3>
            <span class="comparison-badge">${escapeHtml(b.tagline)}</span>
          </div>
          <p>${escapeHtml(b.description)}</p>
          <ul class="comparison-list">
            ${b.issues.map(iss => `<li class="comparison-item"><span aria-hidden="true">•</span><span>${escapeHtml(iss)}</span></li>`).join("")}
          </ul>
          <pre style="margin-top:1rem;padding:1rem;border-radius:8px;background:var(--bg-code);color:#f8fafc;overflow-x:auto;"><code>${escapeHtml(b.codeSnippet)}</code></pre>
        </article>
      `;
    } else {
      const a = scenario.after;
      demoContainer.innerHTML = `
        <article class="comparison-card after">
          <div class="comparison-header">
            <h3>${escapeHtml(scenario.subtitle)}</h3>
            <span class="comparison-badge">${escapeHtml(a.tagline)}</span>
          </div>
          <p><strong>Cadrage :</strong> ${escapeHtml(a.jtbdKano)}</p>
          <p style="margin-top:0.5rem;"><strong>Contre-argument :</strong> ${escapeHtml(a.critique)}</p>
          <p style="margin-top:0.5rem;"><strong>Alternative simplifiée :</strong> ${escapeHtml(a.alternative)}</p>
          <ul class="comparison-list">
            ${a.safeguards.map(sg => `<li class="comparison-item"><span aria-hidden="true">✓</span><span>${escapeHtml(sg)}</span></li>`).join("")}
          </ul>
        </article>
      `;
    }
  }
  scenarioSelector.addEventListener("change", (e) => {
    state.activeScenarioId = e.target.value;
    renderScenarioContent();
  });
  tabBeforeBtn.addEventListener("click", () => {
    state.activeScenarioTab = "before";
    renderScenarioContent();
  });
  tabAfterBtn.addEventListener("click", () => {
    state.activeScenarioTab = "after";
    renderScenarioContent();
  });
  renderScenarioContent();
}
// =============================================================================
// MODULE 3: FILTERABLE SKILLS EXPLORER
// =============================================================================
function initSkillsExplorerModule() {
  const filterBtns = $$(".skill-filter-btn");
  const gridContainer = moveElement("#skills-grid-container");
  if (!gridContainer) return;
  function renderSkills() {
    const filtered = SKILLS_CATALOG.filter(skill => {
      if (state.activeSkillCategory === "all") return true;
      return skill.category === state.activeSkillCategory;
    });
    gridContainer.innerHTML = filtered.map(skill => `
      <article class="skill-card" data-category="${escapeHtml(skill.category)}">
        <h4>${escapeHtml(skill.name)}</h4>
        <p>${escapeHtml(skill.shortDesc)}</p>
        <div class="skill-tags">
          ${skill.standards.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}
        </div>
      </article>
    `).join("");
  }
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      state.activeSkillCategory = btn.getAttribute("data-category") || "all";
      renderSkills();
    });
  });
  renderSkills();
}
// =============================================================================
// MODULE 4: INTERSECTION OBSERVER, THEME & MODAL DIALOG
// =============================================================================
function initThemeAndAnimations() {
  state.applyTheme();
  const themeToggleSelect = moveElement("#theme-select");
  if (themeToggleSelect) {
    themeToggleSelect.value = state.theme;
    themeToggleSelect.addEventListener("change", (e) => {
      state.setTheme(e.target.value);
    });
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (state.theme === "system") {
      state.applyTheme();
    }
  });
  const animatedElements = $$(".reveal-on-scroll");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    animatedElements.forEach(el => el.classList.add("is-revealed"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
  }
  const quickBtn = moveElement("#quick-feedback-btn");
  const modal = moveElement("#feedback-modal");
  const overlay = moveElement("#drawer-overlay");
  const closeBtn = moveElement("#btn-close-modal");
  const scrollBtn = moveElement("#btn-scroll-to-feedback");
  function closeModal() {
    if (!modal || !overlay) return;
    modal.classList.remove("active");
    if (typeof modal.close === "function" && modal.open) modal.close();
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    if (quickBtn) quickBtn.focus();
  }
  if (quickBtn && modal && overlay) {
    quickBtn.addEventListener("click", () => {
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      modal.classList.add("active");
      if (typeof modal.showModal === "function" && !modal.open) modal.showModal();
      if (closeBtn) closeBtn.focus();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      closeModal();
      const target = moveElement("#feedback-module");
      if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      const contentField = moveElement("#feedback-content");
      if (contentField) contentField.focus();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
// =============================================================================
// MODULE 5: FEEDBACK MODULE ("Bug ou idée ?")
// =============================================================================
function initFeedbackModule() {
  const form = moveElement("#feedback-form");
  const typeSelect = moveElement("#feedback-type");
  const zoneInput = moveElement("#feedback-zone");
  const contentInput = moveElement("#feedback-content");
  const listContainer = moveElement("#feedback-list");
  const copySummaryBtn = moveElement("#feedback-copy-summary-btn");
  const downloadBtn = moveElement("#feedback-download-btn");
  const clearAllBtn = moveElement("#feedback-clear-all-btn");
  if (!form || !listContainer) return;
  function renderFeedbacks() {
    if (state.feedbacks.length === 0) {
      listContainer.innerHTML = `<p>Aucun retour enregistré localement pour le moment.</p>`;
      return;
    }
    listContainer.innerHTML = state.feedbacks.map((item, index) => `
      <div class="feedback-item">
        <div class="feedback-item-header">
          <span class="feedback-tag ${item.type === 'bug' ? 'bug' : 'idea'}">
            ${item.type === 'bug' ? 'Bug' : 'Idée'}
          </span>
          <span class="feedback-date">${escapeHtml(item.zone)} · ${new Date(item.timestamp).toLocaleString("fr-FR")}</span>
          <button type="button" class="delete-btn" data-index="${index}" aria-label="Supprimer ce retour">✕</button>
        </div>
        <p>${escapeHtml(item.content)}</p>
      </div>
    `).join("");
    $$(".delete-btn", listContainer).forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        state.feedbacks.splice(idx, 1);
        state.saveFeedbacks();
        renderFeedbacks();
      });
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = typeSelect.value;
    const zone = zoneInput.value.trim() || "Général";
    const content = contentInput.value.trim();
    if (!content) return;
    state.feedbacks.unshift({
      type,
      zone,
      content,
      timestamp: new Date().toISOString()
    });
    state.saveFeedbacks();
    renderFeedbacks();
    contentInput.value = "";
    zoneInput.value = "";
  });
  function generateMarkdownSummary() {
    if (state.feedbacks.length === 0) return "Aucun retour enregistré.";
    let md = `# Synthèse des retours locaux — Agent Skills Suite\n\n`;
    state.feedbacks.forEach(item => {
      const label = item.type === "bug" ? "Bug" : "Idée";
      md += `- **[${label}] (${item.zone})** : ${item.content}\n`;
    });
    return md;
  }
  if (copySummaryBtn) {
    copySummaryBtn.addEventListener("click", () => {
      copyToClipboard(generateMarkdownSummary(), copySummaryBtn);
    });
  }
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const blob = new Blob([generateMarkdownSummary()], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `retours-agent-skills-suite-${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (state.feedbacks.length === 0) return;
      state.feedbacks = [];
      state.saveFeedbacks();
      renderFeedbacks();
    });
  }
  renderFeedbacks();
}
// =============================================================================
// INITIALIZATION ENTRY POINT
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initCliModule();
  initBeforeAfterModule();
  initSkillsExplorerModule();
  initThemeAndAnimations();
  initFeedbackModule();
});
