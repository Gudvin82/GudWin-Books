(() => {
  const form = document.getElementById('fairy-form');
  const result = document.getElementById('fairy-result');
  const tts = document.getElementById('fairy-tts');
  const status = document.getElementById('fairy-status');

  if (!(form instanceof HTMLFormElement) || !result) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const age = esc(fd.get('age'));
    const theme = esc(fd.get('theme'));
    const moral = esc(fd.get('moral'));

    result.innerHTML = `\n      <h2>Результат генерации сказки</h2>\n      <p><strong>Возраст:</strong> ${age} | <strong>Тема:</strong> ${theme} | <strong>Мораль:</strong> ${moral}</p>\n      <p>Глава 1: Герой отправился в путь через волшебный лес.</p>\n      <p>Глава 2: Доброта помогла пройти главное испытание.</p>\n      <p>Глава 3: Финал с мягкой моралью для ребёнка.</p>\n    `;
  });

  tts?.addEventListener('click', () => {
    if (status) status.textContent = 'Озвучка сгенерирована (demo mp3)';
  });
})();

function esc(v) {
  const s = typeof v === 'string' ? v.slice(0, 120) : '';
  return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[ch]));
}
