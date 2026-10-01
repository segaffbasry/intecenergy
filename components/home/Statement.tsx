"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Mark } from "@/components/Logo";
import { Button, reducedMotion } from "@/components/ui";
import { about } from "@/lib/content";

/* Wrap the live paragraph's bold phrases, then split everything into words for the scrubbed read-through. */
function words(body: string, strong: string[]) {
  const parts: { text: string; strong: boolean }[] = [];
  let rest = body;
  while (rest) {
    const hits = strong.map((s) => ({ s, i: rest.indexOf(s) })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i);
    if (!hits.length) { parts.push({ text: rest, strong: false }); break; }
    const { s, i } = hits[0];
    if (i) parts.push({ text: rest.slice(0, i), strong: false });
    parts.push({ text: s, strong: true });
    rest = rest.slice(i + s.length);
  }
  // Punctuation straight after a bold phrase (", boasting") stays glued to it, with no space before.
  const out: { w: string; strong: boolean; glue: boolean }[] = [];
  parts.forEach((p, n) => {
    const touching = n > 0 && !/\s$/.test(parts[n - 1].text) && !/^\s/.test(p.text);
    p.text.split(/(\s+)/).forEach((w, i) => {
      if (!w || /^\s+$/.test(w)) return;
      out.push({ w, strong: p.strong, glue: i === 0 && touching });
    });
  });
  return out;
}

/* "Proven Sustainable Solutions for a Brighter Future", set as the reference's statement scene (HomeSwirlTitles):
   one large paragraph on a colour field whose words brighten one by one as it scrolls through, with INTEC's swirl
   turning slowly behind it. The colour field is INTEC green where the reference uses its yellow. */
export default function Statement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".st-w", { opacity: .22 }, { opacity: 1, ease: "none", stagger: .1, scrollTrigger: { trigger: ".st-body", start: "top 80%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(".st-mark", { rotate: -40 }, { rotate: 80, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return <section className="statement on-dark" id="about" ref={ref}>
    <Mark className="st-mark" />
    <div className="wrap st-inner">
      <h2 className="label st-label" data-reveal="label">{about.title}</h2>
      <p className="st-body display" aria-label={about.body}>
        {words(about.body, about.strong).map((x, i) => <span key={i} aria-hidden="true">{x.glue || i === 0 ? "" : " "}<span className={`st-w${x.strong ? " is-strong" : ""}`}>{x.w}</span></span>)}
      </p>
      <div className="st-foot">
        <figure className="st-pic" data-reveal="image" data-parallax>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.image} alt="A cleaning robot driving along a row of solar panels at sunrise" loading="lazy" />
        </figure>
        <Button href={about.cta.href} tone="paper">{about.cta.label}</Button>
      </div>
    </div>
  </section>;
}
