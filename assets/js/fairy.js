(function () {
  const form = document.getElementById("fairy-form");
  const result = document.getElementById("fairy-result");
  const regenBtn = document.getElementById("fairy-regenerate");
  const ttsBtn = document.getElementById("fairy-tts");
  const progress = document.getElementById("fairy-progress");

  if (!(form instanceof HTMLFormElement) || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(form);

    const age = safeText(fd.get("age"));
    const theme = safeText(fd.get("theme"));
    const moral = safeText(fd.get("moral"));
    const length = safeText(fd.get("length"));
    const style = safeText(fd.get("style"));
    const idea = safeText(fd.get("idea"));

    result.innerHTML = "<p class=\"muted\">Генерируем сказку...</p>";

    window.setTimeout(() => {
      const storyTitle = `Сказка: ${idea || "Волшебная история"}`;
      result.innerHTML = `
        <h3>${storyTitle}</h3>
        <p><strong>Возраст:</strong> ${age} | <strong>Тема:</strong> ${theme} | <strong>Мораль:</strong> ${moral}</p>
        <p><strong>Длина:</strong> ${length} | <strong>Стиль:</strong> ${style}</p>
        <p>Глава 1. В долине света герой встречает тайну, которая меняет всё.</p>
        <p>Глава 2. Испытание показывает, что ${moral.toLowerCase()} важнее силы.</p>
        <p>Глава 3. Финал истории дарит добрый вывод для ребёнка.</p>
        <div class="story-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 10px;">
          <article class="story-grid-ill">Иллюстрация 1</article>
          <article class="story-grid-ill">Иллюстрация 2</article>
          <article class="story-grid-ill">Иллюстрация 3</article>
        </div>
      `;
    }, 900);
  });

  regenBtn?.addEventListener("click", () => {
    result.insertAdjacentHTML("beforeend", "<p class=\"muted\">Иллюстрации обновлены.</p>");
  });

  ttsBtn?.addEventListener("click", () => {
    animateProgress(progress);
  });
})();

function safeText(value) {
  const raw = typeof value === "string" ? value.trim().slice(0, 160) : "";
  return window.GW.escapeHtml(raw);
}

function animateProgress(progressNode) {
  if (!progressNode) return;
  let val = 0;
  progressNode.style.width = "0%";
  const timer = window.setInterval(() => {
    val += 6;
    progressNode.style.width = `${Math.min(val, 100)}%`;
    if (val >= 100) window.clearInterval(timer);
  }, 90);
}
