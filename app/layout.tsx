import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/chrome";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";
import "@/styles/chrome.css";
import "@/styles/home.css";

// Title and description are the live homepage's own (in-tecenergy.com, Rank Math).
export const metadata: Metadata = {
  title: "INTEC Energy Solutions - Leading EPC & Development Services",
  description: "INTEC Energy Solutions - Leading Engineering, Procurement, Construction (EPC), Development, BESS, Operations & Maintenance services.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#0e1311" };

/* `js` is set before first paint (unless reduced motion is requested) so reveal targets can start hidden without a
   flash. The preloader plays once per browser session: on a repeat visit `is-loading` is never added. */
const boot = "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('intec-intro'))d.classList.add('is-loading')}catch(e){d.classList.add('is-loading')}}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/sora-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero-poster.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body><Shell>{children}</Shell></body>
    </html>
  );
}
