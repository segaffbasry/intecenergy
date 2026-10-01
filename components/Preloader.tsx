"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Mark } from "@/components/Logo";
import "@/components/motion";
import { reducedMotion } from "@/components/ui";

// Read once per page load: React runs effects twice in development, and the second run must still see the intro.
let pending: boolean | null = null;

/* Intro, once per browser session (sessionStorage "intec-intro"), after the reference's page transition: a curtain
   with the logo mark at its centre that lifts away to show the page.
     0.00–0.90s  the five drops of the INTEC swirl fly in from their own direction and settle into the mark
     0.50–1.40s  the mark turns a third of a turn while it gathers
     1.40–2.30s  the ink curtain lifts off the top edge; the mark travels with it and fades
   The hero starts its own entrance at 1.4s ("intro:done"), as the curtain starts to lift. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const root = document.documentElement;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      root.classList.remove("is-loading");
      try { sessionStorage.setItem("intec-intro", "1"); } catch { /* private mode */ }
      document.dispatchEvent(new Event("intro:done"));
    };
    const finish = () => { pending = false; handover(); el.style.display = "none"; };
    if (pending === null) pending = root.classList.contains("is-loading");
    if (!pending || reducedMotion()) { finish(); return; }
    el.style.display = "grid"; // held by the element itself, so the curtain keeps lifting after is-loading goes

    const drops = gsap.utils.toArray<SVGPathElement>(el.querySelectorAll("[data-drop]"));
    const mark = el.querySelector(".preloader-mark");
    const tl = gsap.timeline({ onComplete: finish });
    tl.set(mark, { autoAlpha: 1 })
      .fromTo(drops, { opacity: 0, x: (i) => Math.cos(i * 1.256) * 60, y: (i) => Math.sin(i * 1.256) * 60, scale: .6, transformOrigin: "50% 50%" },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: .9, ease: "intec", stagger: .06 }, 0)
      .fromTo(mark, { rotate: -120, scale: .85 }, { rotate: 0, scale: 1, duration: 1.3, ease: "power3.inOut" }, .1)
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: .9, ease: "power3.inOut" }, 1.4)
      .to(mark, { y: -120, opacity: 0, duration: .7, ease: "power3.in" }, 1.4)
      .add(handover, 1.4);

    const failsafe = window.setTimeout(finish, 3200);
    return () => { window.clearTimeout(failsafe); tl.kill(); gsap.set([el, mark, drops], { clearProps: "all" }); };
  }, []);

  return <div className="preloader" ref={ref} aria-hidden="true">
    <Mark className="preloader-mark" fill="var(--green)" />
  </div>;
}
