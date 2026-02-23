(function () {
  const splash = document.getElementById("splash");
  if (splash) {
    window.setTimeout(() => {
      splash.classList.add("hidden");
      splash.setAttribute("aria-hidden", "true");
    }, 3600);
  }

  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.16 },
  );
  revealEls.forEach((el) => io.observe(el));

  document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
    const tabs = tabsRoot.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-target");
        if (!targetId) return;

        tabs.forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");

        const container = tabsRoot.parentElement;
        if (!container) return;
        const panels = container.querySelectorAll(".tab-panel");
        panels.forEach((panel) => panel.classList.remove("active"));

        const target = container.querySelector(`#${CSS.escape(targetId)}`);
        if (target) target.classList.add("active");
      });
    });
  });

  initParticles();
})();

function initParticles() {
  const canvas = document.getElementById("magic-particles");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  const particles = Array.from({ length: 54 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2 + 0.7,
    s: Math.random() * 0.0008 + 0.0002,
    glow: Math.random() * 0.4 + 0.4,
  }));

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y -= p.s;
      if (p.y < -0.05) {
        p.y = 1.05;
        p.x = Math.random();
      }
      const x = p.x * width;
      const y = p.y * height;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 210, 110, ${p.glow})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.GW = {
  escapeHtml,
};
