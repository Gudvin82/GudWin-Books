(function () {
  const form = document.getElementById("comics-form");
  const result = document.getElementById("comics-result");
  const rerenderBtn = document.getElementById("comics-rerender");
  const ttsBtn = document.getElementById("comics-tts");
  const progress = document.getElementById("comics-progress");

  if (!(form instanceof HTMLFormElement) || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(form);

    const genre = safeText(fd.get("genre"));
    const pages = safeText(fd.get("pages"));
    const style = safeText(fd.get("style"));
    const synopsis = safeText(fd.get("synopsis"));

    result.innerHTML = "<p class=\"muted\">Собираем сценарий комикса...</p>";

    window.setTimeout(() => {
      result.innerHTML = `
        <h3>${genre} / ${style}</h3>
        <p><strong>Страницы:</strong> ${pages} | <strong>Синопсис:</strong> ${synopsis}</p>
        <p>Страница 1: Завязка истории и главный конфликт.</p>
        <p>Страница 2: Погоня, динамика и клиффхэнгер.</p>
        <p>Страница 3: Развязка и крючок на продолжение.</p>
        <div class="story-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 10px;">
          <article class="story-grid-ill">Кадр A</article>
          <article class="story-grid-ill">Кадр B</article>
          <article class="story-grid-ill">Кадр C</article>
        </div>
      `;
    }, 900);
  });

  rerenderBtn?.addEventListener("click", () => {
    result.insertAdjacentHTML("beforeend", "<p class=\"muted\">Выбранный кадр перегенерирован.</p>");
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
    val += 7;
    progressNode.style.width = `${Math.min(val, 100)}%`;
    if (val >= 100) window.clearInterval(timer);
  }, 90);
}
