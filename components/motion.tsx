"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { reducedMotion } from "@/components/ui";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitLines } from "@/lib/split";

// Registered at module load so section effects can build timelines on "intec" straight away.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // The same expo-style ease-out as --ease in globals.css.
  CustomEase.create("intec", "0.16,1,0.3,1");
}

/* The reveal set: one small fixed set of moves, used the same way everywhere.
   label    small text, buttons: 14px rise and fade
   heading  headlines: 36px rise and fade, as one phrase
   text     paragraphs: words rise out of a mask, a beat per line
   card     cards and list rows: batched rise and fade, 0.08s apart
   image    pictures open from the bottom edge while the picture inside settles from 1.12 to 1
   Each plays once, on the reference's long ease-out. [data-parallax] adds a gentle drift to the media inside. */
export function usePageMotion() {
  useEffect(() => {
    const reduced = reducedMotion();
    const root = document.documentElement;

    /* Links never leave the page (standing rule for these private demos): hrefs stay real, but a capture-phase
       guard cancels any click or middle-click on a link that does not start with "#". */
    const stayOnPage = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (link && !link.getAttribute("href")!.startsWith("#")) event.preventDefault();
    };
    document.addEventListener("click", stayOnPage, true);
    document.addEventListener("auxclick", stayOnPage, true);

    /* Smooth scroll on the GSAP ticker, so ScrollTrigger reads the same frame (the reference runs Lenis too). */
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (root.classList.contains("is-loading")) lenis.stop();
    }
    const start = () => getLenis()?.start();
    document.addEventListener("intro:done", start);

    // In-page anchors go through Lenis and move focus to the target.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#top" ? null : document.querySelector<HTMLElement>(hash);
      if (hash !== "#top" && !target) return;
      event.preventDefault();
      if (lenis) { lenis.start(); lenis.scrollTo(target ?? 0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) }); }
      else (target ?? document.body).scrollIntoView();
      target?.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    const splits: { revert: () => void }[] = [];
    const mark = () => document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-shown", ""));
    const ctx = gsap.context(() => {
      if (reduced) { mark(); return; }
      const all = (kind: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${kind}"]:not([data-hero] [data-reveal])`);

      all("label").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 14 });
        ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "intec", clearProps: "transform" }) });
      });

      all("heading").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 36 });
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "intec", clearProps: "transform" }) });
      });

      all("text").forEach((el) => {
        const split = splitLines(el);
        splits.push(split);
        gsap.set(split.words, { yPercent: 110 });
        ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => {
          split.lines.forEach((line, i) => gsap.to(line, { yPercent: 0, duration: 1.1, ease: "intec", delay: i * .07 }));
        } });
      });

      const cards = all("card");
      gsap.set(cards, { opacity: 0, y: 32 });
      ScrollTrigger.batch(cards, { start: "top 94%", once: true, onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "intec", stagger: .08, clearProps: "transform" }) });

      all("image").forEach((el) => {
        const media = el.querySelector("img, video");
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        if (media) gsap.set(media, { scale: 1.12 });
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => {
          gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "intec", clearProps: "clipPath" });
          if (media) gsap.to(media, { scale: 1, duration: 1.6, ease: "intec", clearProps: "transform" });
        } });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const media = el.querySelector("img, video"); if (!media) return;
        gsap.fromTo(media, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "bottom top" } });
      });
      mark();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", stayOnPage, true);
      document.removeEventListener("auxclick", stayOnPage, true);
      document.removeEventListener("click", onClick);
      document.removeEventListener("intro:done", start);
      window.removeEventListener("load", refresh);
      ctx.revert();
      splits.forEach((split) => split.revert());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy(); setLenis(null);
    };
  }, []);
}

/* Traps focus inside an overlay, closes on Escape, pauses the page scroll and returns focus to the trigger. */
export function focusOverlay(container: HTMLElement, close: () => void, trigger?: HTMLElement | null) {
  const previous = trigger ?? (document.activeElement as HTMLElement);
  getLenis()?.stop();
  document.documentElement.classList.add("overlay-open");
  const focusable = () => Array.from(container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, video[controls], [tabindex='0']")).filter((el) => el.offsetParent !== null);
  focusable()[0]?.focus({ preventScroll: true });
  const handleKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "Tab") {
      const items = focusable(); const first = items[0]; const last = items[items.length - 1];
      if (!first) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener("keydown", handleKey);
  return () => {
    document.removeEventListener("keydown", handleKey);
    document.documentElement.classList.remove("overlay-open");
    getLenis()?.start();
    previous?.focus({ preventScroll: true });
  };
}
