/**
 * scroll-reveal.ts — Varied Animation System
 * Each section now owns its unique animation language.
 * This file only provides utility helpers; per-section scripts handle their own reveals.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fallback: any remaining .reveal-element that hasn't been claimed
 * by a component-specific animation gets a simple opacity entrance (no y-shift).
 * This keeps backwards-compat for stray uses without the "every section fades the same" problem.
 */
const unclaimed = document.querySelectorAll(".reveal-element:not([data-anim])") as NodeListOf<HTMLElement>;

if (!prefersReduced) {
  unclaimed.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });
} else {
  unclaimed.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}
