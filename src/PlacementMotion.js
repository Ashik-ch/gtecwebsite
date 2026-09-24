import { useEffect } from "react";
import "./placement-motion.css";

const SPOTLIGHT =
  ".placement-stat-card, .internship-reason-card, .eligibility-card, .certificate-card, .partner-card, .internship-quote";
const TILT = ".placement-stat-card, .certificate-card";
const MAGNETIC = ".placement-hero-actions .button, .eligibility-card .button";

// Pointer and scroll effects for the placements page. Everything is skipped
// for reduced-motion users; pointer effects only run on hover-capable devices.
export function usePlacementMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!root || !motion.matches) return;

    const cleanups = [];
    const listen = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    root.classList.add("motion-on");
    cleanups.push(() => root.classList.remove("motion-on"));

    // Pointer-driven effects, batched into one frame.
    if (hover.matches) {
      const hero = root.querySelector(".placement-modern-hero");
      let pending = null;
      let frame = 0;
      let tilted = null;
      let magnet = null;

      const reset = (el, props) => props.forEach((p) => el.style.removeProperty(p));

      const paint = () => {
        frame = 0;
        const e = pending;
        if (!e) return;
        const target = e.target instanceof Element ? e.target : null;

        if (hero && target && hero.contains(target)) {
          const r = hero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          hero.style.setProperty("--hx", `${(x * 100).toFixed(1)}%`);
          hero.style.setProperty("--hy", `${(y * 100).toFixed(1)}%`);
          hero.style.setProperty("--px", (x - 0.5).toFixed(3));
          hero.style.setProperty("--py", (y - 0.5).toFixed(3));
        }

        const card = target?.closest(SPOTLIGHT);
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        const tilt = target?.closest(TILT);
        if (tilted && tilted !== tilt) {
          reset(tilted, ["--rx", "--ry"]);
          tilted.classList.remove("is-tilting");
        }
        tilted = tilt;
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          tilt.classList.add("is-tilting");
          tilt.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
        }

        const button = target?.closest(MAGNETIC);
        if (magnet && magnet !== button) reset(magnet, ["--bx", "--by"]);
        magnet = button;
        if (button) {
          const r = button.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          button.style.setProperty("--bx", `${(x * 0.22).toFixed(1)}px`);
          button.style.setProperty("--by", `${(y * 0.3).toFixed(1)}px`);
        }
      };

      // The wrapper is display: contents, so listen on the window instead.
      listen(window, "pointermove", (e) => {
        pending = e;
        if (!frame) frame = requestAnimationFrame(paint);
      }, { passive: true });

      listen(document.documentElement, "pointerleave", () => {
        if (tilted) {
          reset(tilted, ["--rx", "--ry"]);
          tilted.classList.remove("is-tilting");
        }
        if (magnet) reset(magnet, ["--bx", "--by"]);
        tilted = magnet = null;
      });

      cleanups.push(() => cancelAnimationFrame(frame));
    }

    // Scroll-linked hero parallax and journey progress.
    const hero = root.querySelector(".placement-modern-hero");
    const journey = root.querySelector(".journey-steps");
    const steps = journey ? [...journey.querySelectorAll("article")] : [];
    let scrollFrame = 0;

    const onScroll = () => {
      scrollFrame = 0;
      const vh = window.innerHeight;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
        hero.style.setProperty("--hero-scroll", t.toFixed(3));
      }
      if (journey) {
        const r = journey.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.6)));
        journey.style.setProperty("--journey-progress", t.toFixed(3));
        steps.forEach((step, i) => {
          step.classList.toggle("is-reached", t >= i / Math.max(1, steps.length - 1) - 0.001);
        });
      }
    };
    const scheduleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(onScroll);
    };
    listen(window, "scroll", scheduleScroll, { passive: true });
    listen(window, "resize", scheduleScroll, { passive: true });
    onScroll();
    cleanups.push(() => cancelAnimationFrame(scrollFrame));

    // Count the hero stat numbers up the first time they appear.
    if (window.IntersectionObserver) {
      const counters = [...root.querySelectorAll(".placement-stat-card strong")];
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            countUp(entry.target);
          }
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => observer.observe(el));
      cleanups.push(() => observer.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}

function countUp(el) {
  const text = el.textContent;
  const match = text.match(/^(\d+)(\s.*)?$/);
  if (!match) return;
  const end = Number(match[1]);
  const rest = match[2] || "";
  const duration = 1100;
  const start = performance.now();
  const tick = (now) => {
    if (!el.isConnected) return;
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${Math.round(end * eased)}${rest}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  };
  requestAnimationFrame(tick);
}
