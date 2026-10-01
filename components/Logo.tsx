import { LOGO_VIEWBOX, MARK_VIEWBOX, green, mark, orange, type Shape } from "@/lib/logo";

function draw(shape: Shape, i: number) {
  if ("d" in shape) return <path key={i} d={shape.d} />;
  if ("points" in shape) return <polygon key={i} points={shape.points} />;
  const [x, y, width, height] = shape.rect;
  return <rect key={i} x={x} y={y} width={width} height={height} />;
}

/* INTEC's logo from its own vector file. `tone="color"` is the brand lock-up (green mark and TEC, orange IN and
   ENERGY SOLUTIONS); `tone="mono"` takes currentColor for every part. */
export function Logo({ tone = "color", title = "INTEC Energy Solutions", className = "" }: { tone?: "color" | "mono"; title?: string; className?: string }) {
  const g = tone === "color" ? "var(--green)" : "currentColor";
  const o = tone === "color" ? "var(--orange)" : "currentColor";
  return <svg className={`logo ${className}`} viewBox={LOGO_VIEWBOX} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} focusable="false">
    <g className="logo-mark" fill={g}>{mark.map((d, i) => <path key={i} d={d} data-drop={i} />)}</g>
    <g className="logo-tec" fill={g}>{green.map(draw)}</g>
    <g className="logo-in" fill={o}>{orange.map(draw)}</g>
  </svg>;
}

/* The swirl mark on its own: five drops turning around one centre. */
export function Mark({ className = "", fill = "currentColor" }: { className?: string; fill?: string }) {
  return <svg className={`mark ${className}`} viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false">
    <g fill={fill}>{mark.map((d, i) => <path key={i} d={d} data-drop={i} />)}</g>
  </svg>;
}
