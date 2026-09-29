import { useEffect } from "react";

// Shared pointer-parallax + scroll-fade + text shine for the simple page
// heroes (About, Courses, Feedback, Contact ...), matching the treatment on
// the Placements page hero. Skipped for reduced-motion users; the pointer
// parallax only runs on hover-capable, fine-pointer devices.
export function useHeroMotion(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!hero || !motion.matches) return;

    hero.classList.add("motion-on");
    const cleanups = [() => hero.classList.remove("motion-on")];
    const listen = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (hover.matches) {
      let frame = 0;
      let pending = null;
      const paint = () => {
        frame = 0;
        const e = pending;
        if (!e) return;
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        hero.style.setProperty("--px", (x - 0.5).toFixed(3));
        hero.style.setProperty("--py", (y - 0.5).toFixed(3));
      };
      listen(
        hero,
        "pointermove",
        (e) => {
          pending = e;
          if (!frame) frame = requestAnimationFrame(paint);
        },
        { passive: true },
      );
      cleanups.push(() => cancelAnimationFrame(frame));
    }

    let scrollFrame = 0;
    const onScroll = () => {
      scrollFrame = 0;
      const r = hero.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      hero.style.setProperty("--hero-scroll", t.toFixed(3));
    };
    const scheduleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(onScroll);
    };
    listen(window, "scroll", scheduleScroll, { passive: true });
    listen(window, "resize", scheduleScroll, { passive: true });
    onScroll();
    cleanups.push(() => cancelAnimationFrame(scrollFrame));

    return () => cleanups.forEach((fn) => fn());
  }, [heroRef]);
}
