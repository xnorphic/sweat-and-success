"use client";
import { useEffect, useRef, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe this element and all .reveal children
    const targets = [el, ...Array.from(el.querySelectorAll(".reveal, .red-bar, .red-bar-full"))];
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCounterAnimation(target: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = String(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
