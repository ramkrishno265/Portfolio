import { useEffect } from "react";

const SIZE = 64;
const C = SIZE / 2;

export default function useAnimatedFavicon({
  letter = "R",
  awayTitle = "👋 Come back!",
} = {}) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");

    // Shob icon link-e ekshathe set kora hobe (age svg/png thakle jate conflict na hoy)
    let links = Array.from(document.querySelectorAll("link[rel~='icon']"));
    if (links.length === 0) {
      const link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
      links = [link];
    }
    links.forEach((l) => {
      l.type = "image/png";
    });

    const originalTitle = document.title;

    const draw = (progress, away, blinkOn) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Background circle
      const g = ctx.createLinearGradient(0, 0, SIZE, SIZE);
      g.addColorStop(0, "#2563eb");
      g.addColorStop(1, "#0ea5e9");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(C, C, C - 1, 0, Math.PI * 2);
      ctx.fill();

      // Ring track
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.beginPath();
      ctx.arc(C, C, C - 8, 0, Math.PI * 2);
      ctx.stroke();

      // Ring progress (shurute ekta chhoto dot dekhabe)
      const start = -Math.PI / 2;
      const sweep = Math.max(progress, 0.02) * Math.PI * 2;
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(C, C, C - 8, start, start + sweep);
      ctx.stroke();

      // Letter
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px system-ui, -apple-system, 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(letter, C, C + 2);

      // Away notification dot
      if (away && blinkOn) {
        ctx.beginPath();
        ctx.arc(SIZE - 15, 15, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(SIZE - 15, 15, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
      }
    };

    let shown = 0; // ekhon ring-e ja dekhachhe
    let target = 1; // shurute 1 (intro sweep), pore scroll-er value
    let introDone = false;
    let away = document.hidden;
    let tick = 0;
    let lastKey = "";

    const readScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      target = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
    };

    const render = () => {
      tick += 1;
      shown += (target - shown) * 0.2;
      if (Math.abs(target - shown) < 0.002) shown = target;

      const blinkOn = tick % 2 === 0;
      const key = `${shown.toFixed(3)}|${away}|${away ? blinkOn : ""}`;
      if (key === lastKey) return; // kichu change na hole redraw korbe na
      lastKey = key;

      draw(shown, away, blinkOn);
      const url = canvas.toDataURL("image/png");
      links.forEach((l) => {
        l.href = url;
      });
    };

    const onScroll = () => {
      if (introDone) readScroll();
    };

    const onVisibility = () => {
      away = document.hidden;
      if (awayTitle) document.title = away ? awayTitle : originalTitle;
      lastKey = "";
      render();
    };

    const introTimer = setTimeout(() => {
      introDone = true;
      readScroll();
    }, 900);

    const interval = setInterval(render, 90);
    render();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(interval);
      clearTimeout(introTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = originalTitle;
    };
  }, [letter, awayTitle]);
}