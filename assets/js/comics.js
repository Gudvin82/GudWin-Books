(() => {
  const form = document.getElementById('comics-form');
  const result = document.getElementById('comics-result');
  const tts = document.getElementById('comics-tts');
  const status = document.getElementById('comics-status');

  if (!(form instanceof HTMLFormElement) || !result) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const genre = esc(fd.get('genre'));
    const synopsis = esc(fd.get('synopsis'));

    result.innerHTML = `\n      <h2>Результат генерации комикса</h2>\n      <p><strong>Жанр:</strong> ${genre}</p>\n      <p><strong>Синопсис:</strong> ${synopsis}</p>\n      <p>Страница 1: Завязка и главный конфликт.</p>\n      <p>Страница 2: Бой и неожиданный поворот.</p>\n      <p>Страница 3: Финал и крючок на продолжение.</p>\n    `;
  });

  tts?.addEventListener('click', () => {
    if (status) status.textContent = 'Озвучка комикса сгенерирована (demo mp3)';
  });
})();

function esc(v) {
  const s = typeof v === 'string' ? v.slice(0, 120) : '';
  return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[ch]));
}
