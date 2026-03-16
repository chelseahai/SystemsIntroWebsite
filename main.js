document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const canvas = document.getElementById("hero-3d-canvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    resizeCanvas();

    let t = 0;
    function draw() {
      if (!ctx) return;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2 + 10);
      ctx.strokeStyle = "rgba(223, 190, 250, 0.9)";
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.9;

      const layers = 14;
      const baseRadius = Math.min(width, height) * 0.18;

      for (let i = 0; i < layers; i++) {
        const phase = t * 0.015 + i * 0.3;
        const radius =
          baseRadius +
          Math.sin(phase) * 14 +
          (i / layers) * (height * 0.08);
        const points = 40;

        ctx.beginPath();
        for (let j = 0; j <= points; j++) {
          const angle = (j / points) * Math.PI * 2;
          const deform =
            Math.sin(angle * 3 + phase * 1.5) * 6 +
            Math.cos(angle * 5 - phase) * 3;
          const r = radius + deform;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * (r * 0.55) - i * 4;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.restore();
      t += 1.2;
      requestAnimationFrame(draw);
    }

    function resizeCanvas() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx2 = canvas.getContext("2d");
      if (ctx2) ctx2.scale(dpr, dpr);
    }

    window.addEventListener("resize", resizeCanvas);
    draw();
  }
});
