"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { focusOverlay } from "@/components/motion";
import { Pair, SocialIcon, linkProps, reducedMotion } from "@/components/ui";
import { film, socials } from "@/lib/content";

/* "Play the power of INTEC Energy Solutions": the live block that opens the company film, set as the reference's
   quote scene (HomeQuote with its "Open video modal"). A muted preview loops in a wide frame that opens out to the
   page edges as it scrolls up; the play button opens the full film, with sound, in a full-screen player. */
export default function Film() {
  const ref = useRef<HTMLElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".film-frame", { clipPath: "inset(0% 7% 0% 7% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: ".film-frame", start: "top 95%", end: "top 15%", scrub: true } });
      gsap.fromTo(".film-frame video", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".film-frame", start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const box = modal.current, video = player.current; if (!box || !video) return;
    if (!open) { video.pause(); return; }
    const release = focusOverlay(box, close, trigger);
    video.currentTime = 0;
    void video.play().catch(() => {});
    if (!reducedMotion()) gsap.fromTo(box, { opacity: 0 }, { opacity: 1, duration: .5, ease: "intec" });
    return release;
  }, [open, close, trigger]);

  return <section className="film" id="film" ref={ref}>
    <div className="wrap film-head">
      <h2 className="h1" data-reveal="heading"><Pair parts={film.title} /></h2>
      <div className="film-follow" data-reveal="label">
        <p className="label">{film.follow}</p>
        <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} {...linkProps(s.href)} aria-label={`INTEC on ${s.name}`}><SocialIcon icon={s.icon} size={16} /></a></li>)}</ul>
      </div>
    </div>
    <div className="film-frame">
      <video muted loop playsInline autoPlay preload="metadata" poster={film.poster} src={film.loop} aria-hidden="true" />
      <button className="film-play" onClick={(e) => { setTrigger(e.currentTarget); setOpen(true); }} aria-haspopup="dialog">
        <span className="film-play-dot" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
        <span className="sr-only">Play the INTEC Energy Solutions film</span>
      </button>
    </div>
    <div className={`film-modal${open ? " is-open" : ""}`} ref={modal} role="dialog" aria-modal="true" aria-label="INTEC Energy Solutions film" aria-hidden={!open} inert={!open} data-lenis-prevent>
      <button className="film-close" onClick={close}><span>Close</span><span className="menu-x" aria-hidden="true" /></button>
      <video ref={player} controls playsInline preload="none" poster={film.poster} src={open ? film.video : undefined} />
    </div>
  </section>;
}
