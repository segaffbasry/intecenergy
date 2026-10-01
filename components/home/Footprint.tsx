"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Button, Pair, reducedMotion } from "@/components/ui";
import { footprint } from "@/lib/content";

const format = (v: number, decimals: number) => v.toFixed(decimals);

/* "Our Global Footprint" with the live counters, set as the reference's numbers scene (HomeGraph): a dark field,
   the figures counting up in large type. The live map comes with its 26 pins at their live positions; each pin
   shows its country and capacity on hover or focus, as on the live site. */
export default function Footprint() {
  const ref = useRef<HTMLElement>(null);
  const [tip, setTip] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-count]");
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const to = Number(n.dataset.count), decimals = Number(n.dataset.decimals);
        const state = { v: 0 };
        n.textContent = format(0, decimals);
        ScrollTrigger.create({ trigger: n, start: "top 92%", once: true, onEnter: () => gsap.to(state, { v: to, duration: 2.2, ease: "power3.out", onUpdate: () => { n.textContent = format(state.v, decimals); } }) });
      });
      gsap.fromTo(".fp-pin", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: "back.out(2)", stagger: { each: .04, from: "random" }, scrollTrigger: { trigger: ".fp-map", start: "top 75%", once: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return <section className="footprint on-dark" id="footprint" ref={ref}>
    <div className="wrap">
      <div className="fp-head">
        <h2 className="h2" data-reveal="heading"><Pair parts={footprint.title} /></h2>
        <p className="fp-hint" data-reveal="label">{footprint.hint}</p>
      </div>
      <div className="fp-map" onMouseLeave={() => setTip(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/map-dark.png" alt="World map of INTEC project locations" loading="lazy" />
        {footprint.markers.map((m, i) => <button key={i} className={`fp-pin${tip === i ? " is-on" : ""}`} style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-label={`${m.country}: ${m.value}`} onMouseEnter={() => setTip(i)} onFocus={() => setTip(i)} onBlur={() => setTip(null)}>
          <span className="fp-tip" role="tooltip"><span>{m.country}</span><strong>{m.value}</strong></span>
        </button>)}
      </div>
      <ul className="fp-stats">
        {footprint.stats.map((s) => <li key={s.label} data-reveal="card">
          <p className="fp-num display"><span data-count={s.value} data-decimals={s.decimals}>{format(s.value, s.decimals)}</span><span className={`fp-suffix${/[a-z]/i.test(s.suffix) && s.suffix.length > 4 ? " fp-word" : ""}`}>{s.suffix}</span></p>
          <p className="fp-label">{s.label}</p>
        </li>)}
      </ul>
      <div className="fp-cta"><Button href={footprint.cta.href} tone="paper">{footprint.cta.label}</Button></div>
    </div>
  </section>;
}
