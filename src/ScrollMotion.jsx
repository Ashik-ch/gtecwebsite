import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./scroll-motion.css";

// Scroll stays native. Only visible artwork is updated, once per animation frame.
export default function ScrollMotion() {
  const { pathname } = useLocation();
  const progressRef = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function setup() {
      dispose();
      if (preference.matches || !window.IntersectionObserver) return;
      const root = document.querySelector("main");
      if (!root) return;
      const active = new Set();
      const seen = new WeakSet();
      const observed = new WeakSet();
      const animations = new Set();
      const artwork = new Set();
      let frame = 0;
      let pageHeight = document.documentElement.scrollHeight;
      let viewportHeight = window.innerHeight;
      const header = document.querySelector(".site-header");
      const revealSelector =
        ".reveal, .hero-content > *, .benefits > div, .story-card, .team-section > div, .faq-heading, .faq-list > details, .cta-section > div:not(.cta-art), .enquiry-form, .vision-grid > article, .facility-grid > article, .detail-section, .gio-finder, .page-hero h1, .page-hero p, .course-detail-top > div";
      const artSelector =
        ".gio-welcome, .page-gio, .cta-art, .gallery-photo img, .about-image > img";

      function paint() {
        frame = 0;
        const y = window.scrollY;
        const ratio = Math.min(
          1,
          Math.max(0, y / Math.max(1, pageHeight - viewportHeight)),
        );
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${ratio})`;
        header?.classList.toggle("scrolled", y > 60);
        // Gather geometry before writing styles to avoid repeated layout work.
        const positions = [...active]
          .filter((el) => el.isConnected)
          .map((el) => {
            const rect = el.getBoundingClientRect();
            const t = Math.max(
              -1,
              Math.min(
                1,
                (viewportHeight / 2 - rect.top - rect.height / 2) /
                  viewportHeight,
              ),
            );
            return [el, t];
          });
        for (const [el, t] of positions) {
          const distance = window.innerWidth < 600 ? 12 : 24;
          el.style.setProperty(
            "--scroll-drift",
            `${(t * distance).toFixed(2)}px`,
          );
          el.style.setProperty("--scroll-turn", `${(t * 3).toFixed(2)}deg`);
        }
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(paint);
      };
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || seen.has(entry.target)) continue;
            const el = entry.target;
            seen.add(el);
            revealObserver.unobserve(el);
            const siblings = [...el.parentElement.children].filter((child) =>
              child.matches(revealSelector),
            );
            const delay = Math.min(Math.max(0, siblings.indexOf(el)), 4) * 70;
            const photo = el.matches(
              ".about-image, .gallery-photo, .career-visual",
            );
            if (typeof el.animate !== "function") continue;
            const animation = el.animate(
              [
                {
                  opacity: 0,
                  translate: `0 ${photo ? 32 : 22}px`,
                  ...(photo ? { scale: ".97" } : {}),
                },
                {
                  opacity: 1,
                  translate: "0 0",
                  ...(photo ? { scale: "1" } : {}),
                },
              ],
              {
                duration: photo ? 950 : 750,
                delay,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.onfinish = () => {
              animations.delete(animation);
              animation.cancel();
            };
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
      );

      const artObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target);
            else active.delete(entry.target);
          }
          schedule();
        },
        { rootMargin: "80px 0px" },
      );

      function discover() {
        root.querySelectorAll(revealSelector).forEach((el) => {
          if (observed.has(el)) return;
          observed.add(el);
          revealObserver.observe(el);
        });
        root.querySelectorAll(artSelector).forEach((el) => {
          if (artwork.has(el)) return;
          artwork.add(el);
          el.classList.add("scroll-art");
          artObserver.observe(el);
        });
        for (const el of artwork)
          if (!el.isConnected) {
            artwork.delete(el);
            active.delete(el);
            artObserver.unobserve(el);
          }
        pageHeight = document.documentElement.scrollHeight;
        schedule();
      }
      const mutations = new MutationObserver(discover);
      mutations.observe(root, { childList: true, subtree: true });
      const resize = new ResizeObserver(() => {
        pageHeight = document.documentElement.scrollHeight;
        viewportHeight = window.innerHeight;
        schedule();
      });
      resize.observe(document.body);
      const onResize = () => {
        viewportHeight = window.innerHeight;
        schedule();
      };
      const onFocus = () => {
        animations.forEach((animation) => animation.finish());
      };
      root.addEventListener("focusin", onFocus);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      discover();

      dispose = () => {
        cancelAnimationFrame(frame);
        revealObserver.disconnect();
        artObserver.disconnect();
        mutations.disconnect();
        resize.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", onResize);
        root.removeEventListener("focusin", onFocus);
        animations.forEach((animation) => animation.cancel());
        artwork.forEach((el) => {
          el.classList.remove("scroll-art");
          el.style.removeProperty("--scroll-drift");
          el.style.removeProperty("--scroll-turn");
        });
        header?.classList.remove("scrolled");
        if (progressRef.current)
          progressRef.current.style.transform = "scaleX(0)";
      };
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      dispose();
      preference.removeEventListener("change", setup);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
