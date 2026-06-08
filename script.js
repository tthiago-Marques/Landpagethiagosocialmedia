const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--cursor-x", `${event.clientX}px`);
  root.style.setProperty("--cursor-y", `${event.clientY}px`);
});

const cards = document.querySelectorAll(
  ".service-card, .feature-card, .scope-list article, .process-timeline article, .principle-card, .portfolio-tile, .profile-glass, .work-card, .result-card"
);

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

const viewsCounter = document.querySelector(".views-counter");

if (viewsCounter) {
  const target = Number(viewsCounter.dataset.target || "160995");
  const formatter = new Intl.NumberFormat("pt-BR");
  const duration = 2600;
  const pause = 1200;

  const animateCounter = () => {
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      viewsCounter.textContent = formatter.format(value);

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(animateCounter, pause);
    };

    requestAnimationFrame(tick);
  };

  animateCounter();
}
