import { useEffect } from "react";
import "./placement-motion.css";

const TILT = ".placement-stat-card, .certificate-card";
const MAGNETIC = ".placement-hero-actions .button, .eligibility-card .button";
const CURSOR_HOVER =
  "a, button, .placement-stat-card, .internship-reason-card, .eligibility-card, .certificate-card, .partner-card, .internship-quote";

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

      // Custom trailing cursor: a tight leader dot plus a ring that eases
      // behind it and swells over anything clickable.
      const dot = document.createElement("span");
      dot.className = "placement-cursor-dot";
      const ring = document.createElement("span");
      ring.className = "placement-cursor-ring";
      document.body.append(dot, ring);
      cleanups.push(() => {
        dot.remove();
        ring.remove();
      });
      let mouseX = 0;
      let mouseY = 0;
      let ringX = 0;
      let ringY = 0;
      let cursorSeen = false;
      let cursorFrame = 0;
      const stepCursor = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorFrame = requestAnimationFrame(stepCursor);
      };
      cursorFrame = requestAnimationFrame(stepCursor);
      cleanups.push(() => cancelAnimationFrame(cursorFrame));

      const paint = () => {
        frame = 0;
        const e = pending;
        if (!e) return;
        const target = e.target instanceof Element ? e.target : null;

        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorSeen) {
          cursorSeen = true;
          ringX = mouseX;
          ringY = mouseY;
          dot.classList.add("is-visible");
          ring.classList.add("is-visible");
        }
        const hovering = !!target?.closest(CURSOR_HOVER);
        dot.classList.toggle("is-hover", hovering);
        ring.classList.toggle("is-hover", hovering);

        if (hero && target && hero.contains(target)) {
          const r = hero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          hero.style.setProperty("--px", (x - 0.5).toFixed(3));
          hero.style.setProperty("--py", (y - 0.5).toFixed(3));
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
          tilt.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
        }

        const button = target?.closest(MAGNETIC);
        if (magnet && magnet !== button) reset(magnet, ["--bx", "--by"]);
        magnet = button;
        if (button) {
          const r = button.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          button.style.setProperty("--bx", `${(x * 0.12).toFixed(1)}px`);
          button.style.setProperty("--by", `${(y * 0.16).toFixed(1)}px`);
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
        cursorSeen = false;
        dot.classList.remove("is-visible");
        ring.classList.remove("is-visible");
      });

      cleanups.push(() => cancelAnimationFrame(frame));
    }

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
