"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Pair, linkProps } from "@/components/ui";
import { projects } from "@/lib/content";

/* "Highlighted Projects": the live carousel's six references as a row of large cards that can be dragged, swiped,
   scrolled sideways or stepped with the arrows. The capacity is the headline of each card, the way the reference
   leads with its figures. */
export default function Projects() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  useEffect(() => {
    const el = track.current; if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Mouse drag (touch and trackpads scroll natively). A drag of more than 6px swallows the click that follows.
    let down = false, moved = false, startX = 0, startLeft = 0;
    const onDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft; el.classList.add("is-grabbing"); };
    const onMove = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 6) moved = true; el.scrollLeft = startLeft - dx; };
    const onUp = () => { down = false; el.classList.remove("is-grabbing"); };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update); window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector("li"); const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * .8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return <section className="projects" id="projects">
    <div className="wrap projects-head">
      <h2 className="h2" data-reveal="heading"><Pair parts={projects.title} /></h2>
      <div className="projects-arrows" data-reveal="label">
        <button onClick={() => step(-1)} disabled={edge.start} aria-label="Previous projects"><Arrow className="arrow is-back" /></button>
        <button onClick={() => step(1)} disabled={edge.end} aria-label="Next projects"><Arrow /></button>
      </div>
    </div>
    <ul className="projects-track" ref={track} data-lenis-prevent-touch>
      {projects.items.map((p) => <li key={p.name} className="project" data-reveal="card">
        <a href={p.href} {...linkProps(p.href)} draggable={false}>
          <figure className="project-pic">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" loading="lazy" draggable={false} />
          </figure>
          <div className="project-text">
            <p className="project-cap display">{p.capacity}</p>
            <h3 className="project-name">{p.name}</h3>
            <span className="project-more"><span>{projects.cta}</span><Arrow size={14} /></span>
          </div>
        </a>
      </li>)}
    </ul>
  </section>;
}
