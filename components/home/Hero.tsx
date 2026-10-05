"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/ui";
import { hero } from "@/lib/content";

/* The live hero's five phrases, rolled up one after another instead of typed (client feedback 5 Oct). The list
   ends with a copy of the first phrase: after rolling onto it, the roller snaps back to the real first one with the
   transition off, so the loop never runs backwards. Both copies of the headline read the same step. */
const HOLD = 2600; // ms each phrase stays up
function useRoller(count: number, run: boolean) {
  const [step, setStep] = useState(0);
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (!run || reducedMotion()) return;
    const timer = window.setInterval(() => { setSnap(false); setStep((n) => n + 1); }, HOLD);
    return () => window.clearInterval(timer);
  }, [run]);
  useEffect(() => {
    if (step < count) return;
    const t = window.setTimeout(() => { setSnap(true); setStep(0); }, 900); // after the roll onto the copy finishes
    return () => window.clearTimeout(t);
  }, [step, count]);
  return { step, snap };
}

/* Clip rectangle of the film, as insets in % of the screen [top, right, bottom, left] and a corner radius in px. */
type Box = [number, number, number, number, number];
const startBox = (): Box => (window.innerWidth < 768 ? [13, 5, 44, 5, 14] : [15, 4, 15, 46, 18]);
const fullBox: Box = [0, 0, 0, 0, 0];
const mix = (a: Box, b: Box, t: number) => a.map((v, i) => v + (b[i] - v) * t) as Box;
const clip = ([t, r, b, l, radius]: Box) => `inset(${t}% ${r}% ${b}% ${l}% round ${radius}px)`;

/* THE COPIED INTERACTION: breakthroughenergy.org's opening scene (HomeHero). The headline sits on a plain ground
   while the film plays inside a rounded window; scrolling grows the window until it fills the screen. The headline
   exists twice, ink on the ground and white inside the window, so the letters change colour exactly where the
   window's edge crosses them. Here the window starts on the right half (top on phones) and the headline sits
   bottom-left, so the crossing runs through the rolling line. Sticky, scrubbed to scroll, 100vh of travel. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const roll = useRoller(hero.words.length, live);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const media = el.querySelector<HTMLElement>(".hero-media")!;
    const film = el.querySelector<HTMLVideoElement>("video")!;
    if (window.innerWidth < 768 && film.dataset.small) { film.src = film.dataset.small; }
    void film.play().catch(() => {});

    if (reducedMotion()) { media.style.clipPath = clip(startBox()); setLive(true); return; }

    let progress = 0, intro = 0;
    const paint = () => { media.style.clipPath = clip(mix(mix([50, 50, 50, 50, 18], startBox(), intro), fullBox, progress)); };
    paint();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom bottom", scrub: true,
        onUpdate: (self) => { progress = gsap.parseEase("power1.inOut")(self.progress); paint(); },
        onRefresh: paint,
      });
      gsap.fromTo(film, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true } });
    }, el);

    const words = el.querySelectorAll(".hero-line > span");
    gsap.set(words, { yPercent: 110 });
    const play = () => {
      setLive(true);
      const state = { v: 0 };
      gsap.to(state, { v: 1, duration: 1.6, ease: "expo.inOut", onUpdate: () => { intro = state.v; paint(); } });
      gsap.to(words, { yPercent: 0, duration: 1.3, ease: "intec", stagger: .08, delay: .5 });
      gsap.fromTo(el.querySelectorAll("[data-hero-in]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "intec", delay: 1.1 });
    };
    const root = document.documentElement;
    if (root.classList.contains("is-loading")) document.addEventListener("intro:done", play, { once: true });
    else play();
    const resize = () => paint();
    window.addEventListener("resize", resize);
    return () => { ctx.revert(); document.removeEventListener("intro:done", play); window.removeEventListener("resize", resize); };
  }, []);

  const headline = (copy: boolean) => <h1 className="hero-title" aria-hidden={copy || undefined} aria-label={copy ? undefined : `${hero.lead} ${hero.words.join(", ")}`}>
    <span className="hero-line hero-lead"><span>{hero.lead.replace(/ (\S+)$/, "\u00a0$1") /* keep "with our" together when it wraps */}</span></span>
    <span className="hero-line hero-roll"><span>
      <span className={`hero-roll-list${roll.snap ? " is-snap" : ""}`} style={{ transform: `translateY(${-roll.step * 100 / (hero.words.length + 1)}%)` }}>
        {[...hero.words, hero.words[0]].map((w, i) => <span key={i} className="hero-roll-item">{w}</span>)}
      </span>
    </span></span>
  </h1>;

  return <section className="hero" ref={ref} data-hero>
    <div className="hero-sticky">
      <div className="hero-ground">{headline(false)}</div>
      <div className="hero-media">
        <video muted loop playsInline autoPlay preload="auto" poster={hero.poster} src={hero.video} data-small={hero.videoSmall} aria-hidden="true" />
        <div className="hero-shade" />
        {headline(true)}
      </div>
      <div className="hero-cue" data-hero-in aria-hidden="true"><span /></div>
    </div>
  </section>;
}
