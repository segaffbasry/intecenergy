import type { ReactNode } from "react";
import { brandIcons, type BrandIcon } from "@/lib/brand-icons";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Links that leave the page would open in a new tab; motion.tsx keeps them from navigating at all.
export const linkProps = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

export function Arrow({ size = 16, className = "arrow" }: { size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M1.5 8h12.5M9.5 3.5 14 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>;
}

export function Button({ href, children, tone = "ink", size, className = "", reveal = true, onClick }: {
  href: string; children: ReactNode; tone?: "ink" | "paper" | "orange" | "line"; size?: "sm"; className?: string; reveal?: boolean; onClick?: () => void;
}) {
  return <a href={href} className={`btn btn-${tone}${size ? ` btn-${size}` : ""} ${className}`} data-reveal={reveal ? "label" : undefined} onClick={onClick} {...linkProps(href)}>
    <span>{children}</span><span className="btn-dot"><Arrow size={14} /></span>
  </a>;
}

export function SocialIcon({ icon, size = 18 }: { icon: BrandIcon; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false"><path d={brandIcons[icon]} fill="currentColor" /></svg>;
}

/* Two-line headline in the live site's pattern: a light first phrase, then the key phrase in the stronger weight. */
export function Pair({ parts }: { parts: string[] }) {
  return <><span className="pair-a">{parts[0]}</span>{" "}<span className="pair-b">{parts[1]}</span></>;
}
