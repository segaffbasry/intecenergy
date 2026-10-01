"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo, Mark } from "@/components/Logo";
import { focusOverlay, usePageMotion } from "@/components/motion";
import { Arrow, Button, SocialIcon, linkProps, reducedMotion } from "@/components/ui";
import { evaluate, footer, languages, nav, socials } from "@/lib/content";

/* Full-screen menu (all widths): the live site's six groups as an accordion on the left, the swirl turning slowly on
   the right. In: an ink panel wipes down, then items rise in one after another; reverse() plays the way out. */
function Menu({ open, close, trigger }: { open: boolean; close: () => void; trigger: HTMLElement | null }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [group, setGroup] = useState<number | null>(0);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ paused: true, defaults: { ease: "intec" }, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8, ease: "power3.inOut" }, 0)
      .fromTo(el.querySelectorAll("[data-menu-in]"), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .9, stagger: .05 }, .35);
    timeline.current = tl;
    return () => { tl.kill(); timeline.current = null; };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 50 : 1).play();
      return focusOverlay(el, close, trigger);
    }
    if (tl.progress() > 0) tl.timeScale(reducedMotion() ? 50 : 1.8).reverse();
  }, [open, close, trigger]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top">
      <a href="#top" className="brand" onClick={close} aria-label="INTEC Energy Solutions, back to the top"><Logo tone="mono" title="" /></a>
      <button className="menu-close" onClick={close}><span>Close</span><span className="menu-x" aria-hidden="true" /></button>
    </div>
    <div className="menu-body">
      <nav className="menu-groups" aria-label="INTEC site">
        {nav.map((g, i) => <div key={g.label} className={`menu-group${group === i ? " is-open" : ""}`} data-menu-in>
          <button className="menu-group-head" aria-expanded={group === i} aria-controls={`menu-group-${i}`} onClick={() => setGroup(group === i ? null : i)}>
            <span>{g.label}</span><span className="menu-plus" aria-hidden="true" />
          </button>
          <div className="menu-group-links" id={`menu-group-${i}`}>
            <ul>{g.links.map((l) => <li key={l.href + l.label}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
          </div>
        </div>)}
      </nav>
      <div className="menu-aside" aria-hidden="true"><Mark className="menu-mark" /></div>
    </div>
    <div className="menu-foot" data-menu-in>
      <Button href={evaluate.href} tone="orange" size="sm" reveal={false}>{evaluate.label}</Button>
      <ul className="menu-langs">{languages.map((l) => <li key={l.href}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
      <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} {...linkProps(s.href)} aria-label={`INTEC on ${s.name}`}><SocialIcon icon={s.icon} /></a></li>)}</ul>
    </div>
  </div>;
}

/* Floating glass pill (the reference's header and the hero layout the client liked on star.regendigital.co):
   logo left, the live site's six menus in the middle with hover panels, language and "Let's Evaluate" on the right.
   It slides away on the way down and comes back on the way up. */
function Header() {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const bar = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      el.classList.toggle("is-scrolled", y > 40);
      if (y < 160) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      el.classList.toggle("is-hidden", delta > 0 && !document.documentElement.classList.contains("overlay-open"));
      last = y;
    };
    const reveal = () => el.classList.remove("is-hidden");
    el.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); };
  }, []);

  return <>
    <header className="site-header" ref={bar}>
      <div className="pill">
        <a href="#top" className="brand" aria-label="INTEC Energy Solutions, back to the top"><Logo title="" /></a>
        <nav className="pill-nav" aria-label="Main">
          <ul>
            {nav.map((g) => <li key={g.label} className="pill-item">
              <a href={g.href} className="pill-link" {...linkProps(g.href)}>{g.label}</a>
              <div className="pill-panel">
                <ul>{g.links.map((l) => <li key={l.href + l.label}><a href={l.href} {...linkProps(l.href)}><span>{l.label}</span><Arrow size={12} /></a></li>)}</ul>
              </div>
            </li>)}
          </ul>
        </nav>
        <div className="pill-actions">
          <div className="pill-item pill-lang">
            <a href={languages[0].href} className="pill-link" {...linkProps(languages[0].href)}>{languages[0].label}</a>
            <div className="pill-panel pill-panel-end">
              <ul>{languages.map((l) => <li key={l.href}><a href={l.href} {...linkProps(l.href)}><span>{l.label}</span></a></li>)}</ul>
            </div>
          </div>
          <a href={evaluate.href} className="pill-cta" {...linkProps(evaluate.href)}>{evaluate.label}</a>
          <button className="pill-menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={(e) => { setTrigger(e.currentTarget); setOpen(true); }}>
            <span className="sr-only">Menu</span><span className="pill-lines" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
    </header>
    <Menu open={open} close={close} trigger={trigger} />
  </>;
}

/* The live footer's content (statement, three link columns, newsletter, ISO certificates, legal row, socials),
   laid out the reference's way: ink ground, one big line, and the logo set large along the bottom. */
function Footer() {
  return <footer className="site-footer on-dark">
    <div className="wrap">
      <div className="footer-top">
        <p className="footer-line h2" data-reveal="heading">{footer.line[0]}<br /><span className="accent">{footer.line[1]}</span></p>
        <form className="newsletter" onSubmit={(e) => e.preventDefault()} data-reveal="label">
          <label htmlFor="newsletter-email" className="label">{footer.newsletter.title}</label>
          <div className="newsletter-row">
            <input id="newsletter-email" type="email" placeholder={footer.newsletter.placeholder} autoComplete="off" />
            <button type="submit" className="btn btn-paper btn-sm"><span>{footer.newsletter.button}</span><span className="btn-dot"><Arrow size={14} /></span></button>
          </div>
        </form>
      </div>
      <div className="footer-grid">
        {footer.columns.map((c) => <div key={c.title} className="footer-col" data-reveal="card">
          <h2 className="label">{c.title}</h2>
          <ul>{c.links.map((l) => <li key={l.label}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
        </div>)}
        <div className="footer-col footer-certs" data-reveal="card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {footer.certificates.map((c) => <img key={c.src} src={c.src} alt={c.alt} className={c.invert ? "is-invert" : undefined} loading="lazy" />)}
        </div>
      </div>
      <div className="footer-logo" aria-hidden="true"><Logo tone="mono" title="" /></div>
      <div className="footer-bar">
        <p>{footer.copyright}</p>
        <ul className="footer-legal">{footer.legal.map((l) => <li key={l.label}><a href={l.href} className="u-link" {...linkProps(l.href)}>{l.label}</a></li>)}</ul>
        <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} {...linkProps(s.href)} aria-label={`INTEC on ${s.name}`}><SocialIcon icon={s.icon} size={16} /></a></li>)}</ul>
      </div>
    </div>
  </footer>;
}

export function Shell({ children }: { children: ReactNode }) {
  usePageMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" tabIndex={-1} />
    <Header />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer />
  </>;
}
