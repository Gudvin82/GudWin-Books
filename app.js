const revealBlocks = document.querySelectorAll(".reveal");
const resultBox = document.getElementById("resultBox");
const generateStoryBtn = document.getElementById("generateStory");
const storyIdeaInput = document.getElementById("storyIdea");
const ageInput = document.getElementById("age");
const styleInput = document.getElementById("style");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

revealBlocks.forEach((block) => observer.observe(block));

generateStoryBtn?.addEventListener("click", () => {
  const idea = storyIdeaInput?.value?.trim();
  if (!idea) {
    alert("Введите идею сюжета");
    return;
  }

  const age = ageInput?.value ?? "6–8";
  const style = styleInput?.value ?? "Акварельная сказка";

  resultBox.innerHTML = `
    <h4>Готово: «${idea}»</h4>
    <p>Возраст: ${age}</p>
    <p>Стиль: ${style}</p>
    <p>Глава 1: Герой отправился навстречу тайне, где каждая звезда подсказывала путь.</p>
    <p>Глава 2: Испытание дружбы помогло раскрыть главное волшебство этой истории.</p>
    <p>Глава 3: Финал с доброй моралью и спокойным завершением перед сном.</p>
  `;
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash")?.setAttribute("aria-hidden", "true");
  }, 3200);
});
