"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Arrow, Pair, linkProps, reducedMotion } from "@/components/ui";
import { services } from "@/lib/content";

const CYCLE = 6; // seconds each service stays up while nobody is choosing

/* "Leading Provider of Innovative Energy Solutions": the live site's six service cards, set as the reference's
   Approach block (Discover / Develop / Deploy): a list of names beside one large picture. The active name opens to
   its line and link, its picture wipes in over the last one, and a thin orange bar shows the time until the next.
   It advances on its own only while on screen, and stops for good once someone hovers, focuses or clicks a name. */
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const [under, setUnder] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const st = ScrollTrigger.create({ trigger: el, start: "top 70%", end: "bottom 30%", onToggle: (self) => setVisible(self.isActive) });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!auto || !visible || reducedMotion()) return;
    const bar = ref.current?.querySelector<HTMLElement>(`[data-svc="${active}"] .svc-timer i`);
    const tween = bar ? gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: CYCLE, ease: "none" }) : null;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % services.items.length), CYCLE * 1000);
    return () => { window.clearTimeout(timer); tween?.kill(); if (bar) gsap.set(bar, { scaleX: 0 }); };
  }, [active, auto, visible]);

  // The newest picture wipes up over the previous one.
  useEffect(() => {
    const el = ref.current; if (!el || prev.current === active) return;
    setUnder(prev.current);
    prev.current = active;
    const pic = el.querySelector<HTMLElement>(`[data-pic="${active}"]`); if (!pic || reducedMotion()) return;
    const img = pic.querySelector("img");
    gsap.fromTo(pic, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "intec" });
    if (img) gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "intec" });
  }, [active]);

  const choose = (i: number) => { setAuto(false); setActive(i); };

  return <section className="services" id="services" ref={ref}>
    <div className="wrap">
      <h2 className="h2 services-title" data-reveal="heading"><Pair parts={services.title} /></h2>
      <div className="services-grid">
        <ul className="svc-list">
          {services.items.map((s, i) => <li key={s.key} className={`svc${i === active ? " is-active" : ""}`} data-svc={i} data-reveal="card"
            onMouseEnter={() => choose(i)}>
            <button className="svc-head" aria-expanded={i === active} aria-controls={`svc-${s.key}`} onClick={() => choose(i)} onFocus={() => choose(i)}>
              <span className="svc-name">{s.name.join(" ")}</span>
              <span className="svc-short label">{s.short}</span>
            </button>
            <div className="svc-body" id={`svc-${s.key}`}>
              <div>
                <p>{s.body}</p>
                <a href={s.href} className="svc-more" {...linkProps(s.href)}><span className="u-link">{services.more}</span><Arrow size={14} /></a>
              </div>
            </div>
            <span className="svc-timer" aria-hidden="true"><i /></span>
          </li>)}
        </ul>
        <div className="svc-pics" data-reveal="image">
          {services.items.map((s, i) => <figure key={s.key} className={`svc-pic${i === active ? " is-active" : i === under ? " is-under" : ""}`} data-pic={i} aria-hidden={i !== active}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt="" loading={i === 0 ? "eager" : "lazy"} />
            <figcaption className="svc-pic-cap label">{s.short}</figcaption>
          </figure>)}
        </div>
      </div>
    </div>
  </section>;
}
