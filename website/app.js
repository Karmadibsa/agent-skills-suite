"use strict";
(function () {
  const statusLabels = { todo: "À faire", blocked: "Bloqué", done: "Terminé" };
  const rank = { high: 0, normal: 1, low: 2 };
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  function initPanel(panel) {
    const tasks = Array.from(panel.querySelectorAll("[data-task]"));
    const search = panel.querySelector("[data-search]");
    const filter = panel.querySelector("[data-filter]");
    const live = panel.querySelector(".demo-status");
    const nextName = panel.querySelector("[data-next-name]");
    const nextNote = panel.querySelector("[data-next-note]");
    const nextButton = panel.querySelector("[data-next-action]");
    function render() {
      const term = normalize(search.value);
      const counts = { todo: 0, blocked: 0, done: 0 };
      let visible = 0;
      tasks.forEach(task => {
        const state = task.dataset.state;
        counts[state]++;
        const matches = (!term || normalize(task.dataset.name + " " + task.dataset.area).includes(term)) &&
          (filter.value === "all" || filter.value === state);
        task.hidden = !matches;
        if (matches) visible++;
        task.classList.remove("task-todo", "task-blocked", "task-done");
        task.classList.add("task-" + state);
        task.querySelector(".task-status").textContent = statusLabels[state];
        const action = task.querySelector("[data-task-action]");
        if (action) {
          const label = state === "done" ? "Rouvrir" : "Terminer";
          action.textContent = label;
          action.setAttribute("aria-label", label + " : " + task.dataset.name);
        }
      });
      Object.keys(counts).forEach(state => {
        const element = panel.querySelector('[data-count="' + state + '"]');
        if (element) element.textContent = counts[state];
      });
      panel.querySelector("[data-summary]").textContent = counts.done + " tâche" + (counts.done !== 1 ? "s terminées" : " terminée") + " sur " + tasks.length;
      panel.querySelector("[data-empty]").hidden = visible > 0;
      if (nextName && nextNote && nextButton) {
        const next = tasks.filter(task => task.dataset.state === "todo").sort((a, b) => rank[a.dataset.priority] - rank[b.dataset.priority])[0];
        nextName.textContent = next ? next.dataset.name : "Aucune tâche disponible";
        nextNote.textContent = next ? (next.dataset.priority === "high" ? "Priorité haute" : next.dataset.priority === "low" ? "Priorité basse" : "Priorité normale") + " · " + next.dataset.area : counts.blocked ? "Une dépendance reste à résoudre." : "Toutes les tâches sont terminées.";
        nextButton.disabled = !next;
        nextButton.dataset.target = next ? next.dataset.task : "";
        nextButton.setAttribute("aria-label", next ? "Terminer : " + next.dataset.name : "Aucune tâche disponible");
      }
      return visible;
    }
    function update(task, trigger) {
      if (!task || task.dataset.state === "blocked") return;
      const name = task.dataset.name;
      task.dataset.state = task.dataset.state === "done" ? "todo" : "done";
      const state = task.dataset.state;
      render();
      if ((task.hidden && task.contains(document.activeElement)) || (trigger && trigger.disabled)) panel.querySelector("[data-reset]").focus();
      live.textContent = name + (state === "done" ? " : tâche terminée." : " : tâche rouverte.");
    }
    panel.querySelectorAll("[data-task-action]").forEach(button => {
      button.addEventListener("click", () => update(button.closest("[data-task]"), button));
    });
    if (nextButton) nextButton.addEventListener("click", () => update(tasks.find(task => task.dataset.task === nextButton.dataset.target), nextButton));
    function filterChanged() {
      const count = render();
      live.textContent = count + " tâche" + (count === 1 ? "" : "s") + " affichée" + (count === 1 ? "" : "s") + ".";
    }
    search.addEventListener("input", filterChanged);
    filter.addEventListener("change", filterChanged);
    panel.querySelector("[data-reset]").addEventListener("click", () => {
      tasks.forEach(task => { task.dataset.state = task.dataset.initial; });
      search.value = "";
      filter.value = "all";
      render();
      live.textContent = "Démonstration réinitialisée.";
    });
    render();
  }
  panels.forEach(initPanel);
  const comparison = document.getElementById("comparison");
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      comparison.dataset.view = view;
      panels.forEach(panel => { panel.hidden = view !== "both" && panel.dataset.panel !== view; });
      document.querySelectorAll("[data-view]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    });
  });
  async function copyText(value, status, fallback) {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Presse-papiers indisponible");
      await navigator.clipboard.writeText(value);
      status.textContent = "Copié dans le presse-papiers.";
    } catch (_) {
      if (fallback) { fallback.focus(); fallback.select(); }
      status.textContent = "Copie automatique indisponible. Sélectionnez et copiez le texte manuellement.";
    }
  }
  document.querySelector("[data-copy]").addEventListener("click", () => copyText(document.getElementById("clone-command").textContent, document.getElementById("copy-clone-status")));
  const form = document.getElementById("feedback-form");
  const content = document.getElementById("feedback-content");
  const draft = document.getElementById("feedback-draft");
  const feedbackCopy = document.getElementById("feedback-copy");
  const feedbackStatus = document.getElementById("feedback-status");
  content.addEventListener("input", () => content.setCustomValidity(""));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const value = content.value.trim();
    if (!value) {
      content.setCustomValidity("Décrivez votre retour avant de continuer.");
      content.reportValidity();
      return;
    }
    const type = document.getElementById("feedback-type").value;
    const context = document.getElementById("feedback-context").value;
    draft.value = "## " + type + " — " + context + "\n\n" + value;
    draft.hidden = false;
    feedbackCopy.disabled = false;
    document.getElementById("feedback-hint").textContent = "Relisez ce texte avant de le copier dans un ticket. Rien n’a été envoyé.";
    feedbackStatus.textContent = "Aperçu prêt.";
    draft.focus();
  });
  form.addEventListener("input", () => {
    if (!draft.hidden) {
      draft.hidden = true;
      draft.value = "";
      feedbackCopy.disabled = true;
      document.getElementById("feedback-hint").textContent = "Le formulaire a changé. Préparez un nouvel aperçu avant de publier.";
      feedbackStatus.textContent = "";
    }
  });
  feedbackCopy.addEventListener("click", () => copyText(draft.value, feedbackStatus, draft));
  document.documentElement.classList.add("js-ready");
})();
