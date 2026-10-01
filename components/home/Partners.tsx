import { Pair } from "@/components/ui";
import { partners } from "@/lib/content";

/* "Our Partners": the live carousel's 22 logos in two rows drifting in opposite directions, quiet greys that take
   their own colours on hover. Each row is the list twice over so the loop has no seam; hover pauses it. */
export default function Partners() {
  const half = Math.ceil(partners.logos.length / 2);
  const rows = [partners.logos.slice(0, half), partners.logos.slice(half)];
  return <section className="partners" id="partners">
    <div className="wrap">
      <h2 className="h2" data-reveal="heading"><Pair parts={partners.title} /></h2>
    </div>
    <div className="marquee" data-reveal="label">
      {rows.map((row, r) => <div key={r} className={`marquee-row${r ? " is-reverse" : ""}`}>
        <ul className="marquee-track">
          {[...row, ...row].map((logo, i) => <li key={i} aria-hidden={i >= row.length || undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={i < row.length ? logo.name : ""} loading="lazy" />
          </li>)}
        </ul>
      </div>)}
    </div>
  </section>;
}
