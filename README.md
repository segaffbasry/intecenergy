# INTEC Energy Solutions, demo homepage

A private demo redesign of the in-tecenergy.com homepage, styled after breakthroughenergy.org. Next.js 16, GSAP and Lenis.

- **Copy:** kept word for word from the live homepage in `lib/content.ts`. Date ranges say "to" because these demos use no en or em dashes.
- **Brand:** the logo comes from INTEC's own vector pack (`public/brand/logo.svg`, split into parts in `lib/logo.ts`). It uses green #008149 and orange #e67325 on ink #0e1311 and paper #f6f7f2. The fonts are Sora and Manrope, the same pair as the live site, self-hosted.
- **Media:** `npm run media` rebuilds `public/media` from `_scrape/raw` (gitignored). The hero is the live site's Vimeo loop. The film is "INTEC Energy Solutions EN" from INTEC's YouTube channel. The map pins are the live map's 26 markers (`lib/markers.json`).
- **Copied interaction:** Breakthrough Energy's opening scene, in `components/home/Hero.tsx`. The film grows from a rounded window to full screen as you scroll, and the headline changes colour where the window edge crosses it.
- **Demo rules:** noindex, PostHog EU (`lib/posthog.ts`) and no added UI. Links keep their real URLs but are blocked from navigating (`components/motion.tsx`).

```bash
npm install
npm run dev   # http://127.0.0.1:3032
```
