import { Button } from "@/components/ui";
import { career } from "@/lib/content";

/* "Career at INTEC": the live block's team photograph beside its copy and "Apply Now", on an INTEC green field. */
export default function Career() {
  return <section className="career" id="career">
    <div className="career-grid">
      <figure className="career-pic" data-reveal="image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={career.image} alt="INTEC engineers in hard hats and workwear on a solar site" loading="lazy" />
      </figure>
      <div className="career-card on-dark">
        <p className="label" data-reveal="label">{career.eyebrow}</p>
        <h2 className="h2" data-reveal="heading">{career.title}</h2>
        <p className="career-body" data-reveal="text">{career.body}</p>
        <p className="career-tag" data-reveal="label">{career.tag}</p>
        <Button href={career.cta.href} tone="orange">{career.cta.label}</Button>
      </div>
    </div>
  </section>;
}
