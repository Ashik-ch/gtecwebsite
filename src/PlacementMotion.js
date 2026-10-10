import { useEffect } from "react";
import "./placement-motion.css";

// Scroll effects for the placements page. Skipped for reduced-motion users.
export function usePlacementMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!root || !motion.matches) return;

    const cleanups = [];
    const listen = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    root.classList.add("motion-on");
    cleanups.push(() => root.classList.remove("motion-on"));

    // Scroll-linked hero parallax and journey progress.
    const hero = root.querySelector(".placement-modern-hero");
    const journeySection = root.querySelector(".journey-map-section");
    const journey = root.querySelector(".journey-steps");
    const steps = journey ? [...journey.querySelectorAll("article")] : [];
    const captions = [...root.querySelectorAll(".journey-caption")];
    const cinemaQuery = window.matchMedia("(min-width: 981px)");
    let scrollFrame = 0;
    let activeStep = -1;

    // Desktop: the journey card pins while the section scrolls past, and
    // progress is how far through that runway the reader is.
    const journeyProgress = (vh) => {
      const cinema = cinemaQuery.matches && journeySection;
      journeySection?.classList.toggle("journey-cinema", !!cinema);
      if (cinema) {
        const r = journeySection.getBoundingClientRect();
        const runway = Math.max(1, r.height - vh);
        return Math.min(1, Math.max(0, (-r.top + vh * 0.1) / runway) * 1.08);
      }
      const r = journey.getBoundingClientRect();
      return Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.6)));
    };

    const onScroll = () => {
      scrollFrame = 0;
      const vh = window.innerHeight;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
        hero.style.setProperty("--hero-scroll", t.toFixed(3));
      }
      if (journey) {
        const t = Math.min(1, journeyProgress(vh));
        const last = Math.max(1, steps.length - 1);
        journeySection.style.setProperty("--journey-progress", t.toFixed(4));
        steps.forEach((step, i) => {
          step.classList.toggle("is-reached", t >= i / last - 0.001);
        });
        const current = Math.min(last, Math.round(t * last));
        if (current !== activeStep) {
          activeStep = current;
          steps.forEach((step, i) => step.classList.toggle("is-active", i === current));
          captions.forEach((c, i) => c.classList.toggle("is-active", i === current));
        }
      }
    };
    const scheduleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(onScroll);
    };
    listen(window, "scroll", scheduleScroll, { passive: true });
    listen(window, "resize", scheduleScroll, { passive: true });
    listen(cinemaQuery, "change", scheduleScroll);
    onScroll();
    cleanups.push(() => {
      cancelAnimationFrame(scrollFrame);
      journeySection?.classList.remove("journey-cinema");
    });

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
