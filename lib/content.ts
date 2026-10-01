/* Every word on the page comes from the live homepage, in-tecenergy.com (scraped 1 October 2026), kept verbatim.
   The one deliberate change: en dashes in date ranges are written as "to" (house rule for these demos). Links keep the
   live site's real URLs; a click guard in components/motion.tsx stops them navigating. */
import markers from "./markers.json";

const SITE = "https://in-tecenergy.com";

export type Link = { label: string; href: string };

export const nav: { label: string; href: string; links: Link[] }[] = [
  {
    label: "Corporate", href: `${SITE}/corporate/about-intec-energy`, links: [
      { label: "About INTEC", href: `${SITE}/corporate/about-intec-energy` },
      { label: "Strengths & Values", href: `${SITE}/corporate/strengths-and-values` },
      { label: "Our History", href: `${SITE}/corporate/history-of-intec` },
      { label: "ESG", href: `${SITE}/corporate/esg/` },
      { label: "HSQE", href: `${SITE}/corporate/hsqe/` },
      { label: "Management Team", href: `${SITE}/corporate/management-team` },
    ],
  },
  {
    label: "References", href: `${SITE}/global-footprint/`, links: [
      { label: "All Projects", href: `${SITE}/global-footprint/` },
      { label: "Project Insight", href: `${SITE}/project-insights/` },
      { label: "Ground Mounted", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_ground_mounted/` },
      { label: "BESS", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_bess/` },
      { label: "Rooftop", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_rooftop/` },
      { label: "Carport", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_carport/` },
      { label: "Greenhouse", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_greenhouse/` },
      { label: "Floating Systems", href: `${SITE}/global-footprint/jsf/jet-engine:ref_query_new_en/meta/yeni_project_type_en:en_p_floating/` },
    ],
  },
  {
    label: "Services", href: `${SITE}/services/`, links: [
      { label: "EPC", href: `${SITE}/services/epc/` },
      { label: "BESS", href: `${SITE}/services/bess` },
      { label: "Development", href: `${SITE}/services/project-development` },
      { label: "O&M", href: `${SITE}/services/operation-maintenance/` },
      { label: "Consultancy", href: `${SITE}/services/consultancy` },
      { label: "New Energy Solutions", href: `${SITE}/services/new-energy-solutions` },
    ],
  },
  {
    label: "Media", href: `${SITE}/media/news-events/`, links: [
      { label: "News & Events", href: `${SITE}/media/news-events/` },
      { label: "Blog Posts", href: `${SITE}/media/blog-posts/` },
      { label: "Media Relations", href: `${SITE}/media/media-relations/` },
    ],
  },
  {
    label: "Career", href: `${SITE}/work-at-intec/`, links: [
      { label: "Work at INTEC", href: `${SITE}/work-at-intec/` },
      { label: "Job Opportunities", href: `${SITE}/job-opportunities/` },
    ],
  },
  {
    label: "Contact Us", href: `${SITE}/contact/global-offices`, links: [
      { label: "Global Offices", href: `${SITE}/contact/global-offices` },
      { label: "Contact Form", href: `${SITE}/contact/contact-form` },
    ],
  },
];

export const evaluate: Link = { label: "Let's Evaluate", href: `${SITE}/evaluate-your-property/` };
export const languages: Link[] = [
  { label: "Global", href: `${SITE}/` },
  { label: "Deutsch", href: `${SITE}/de/` },
  { label: "Français", href: `${SITE}/fr/` },
];

export const hero = {
  lead: "We power the future with our",
  // The live hero's typed headline (bdt-animated-heading "strings"), trimmed of stray spaces.
  words: ["EPC Expertise", "Development Services", "BESS Solutions", "Operations and Maintenance", "New Energy Solutions"],
  poster: "/media/hero-poster.jpg",
  video: "/media/hero.mp4",
  videoSmall: "/media/hero-sm.mp4",
};

export const about = {
  title: "Proven Sustainable Solutions for a Brighter Future",
  body: "With over a decade of success, INTEC has evolved into a global leader in EPC Services, boasting an installed and secured 5 GW track record. Our focus on green energy drives us to go further, now offering comprehensive Project Development services and investing in New Energy Solutions.",
  // Phrases the live paragraph sets in bold.
  strong: ["EPC Services", "5 GW", "Project Development", "New Energy Solutions"],
  cta: { label: "More About INTEC", href: `${SITE}/corporate/about-intec-energy` },
  image: "/media/about.jpg",
};

export const services = {
  title: ["Leading Provider of", "Innovative Energy Solutions"],
  items: [
    { key: "epc", name: ["EPC", "Services"], short: "EPC", body: "INTEC offers end-to-end EPC services, ensuring seamless project execution from conception to completion.", href: `${SITE}/services/epc/`, image: "/media/svc-epc.jpg" },
    { key: "bess", name: ["Battery Energy", "Storage Systems"], short: "BESS", body: "INTEC combines the latest battery and inverter technology with best-in-class engineering capabilities.", href: `${SITE}/services/bess`, image: "/media/svc-bess.jpg" },
    { key: "development", name: ["Project", "Development"], short: "Development", body: "INTEC provides strategic insights and expert guidance, ensuring the development of enduring turnkey solutions.", href: `${SITE}/services/project-development`, image: "/media/svc-development.jpg" },
    { key: "om", name: ["Operations &", "Maintenance"], short: "O&M", body: "INTEC delivers long-term efficiency and sustainability for facilities through professional care and maintenance.", href: `${SITE}/services/operation-maintenance/`, image: "/media/svc-om.jpg" },
    { key: "consultancy", name: ["Consultancy", "Expertise"], short: "Consultancy", body: "INTEC guides clients through complex challenges with expert insights and strategic roadmaps.", href: `${SITE}/services/consultancy`, image: "/media/svc-consultancy.jpg" },
    { key: "new-energy", name: ["New Energy", "Solutions"], short: "New Energy Solutions", body: "INTEC is leading the way in the future of renewable energy by pioneering innovative solutions.", href: `${SITE}/services/new-energy-solutions`, image: "/media/svc-new-energy.jpg" },
  ],
  more: "Read More",
};

export type Marker = { x: number; y: number; country: string; value: string };

export const footprint = {
  title: ["Our Global", "Footprint"],
  hint: "Hover to pins to see project totals for each countries",
  // Pin positions and tooltips are the live map's own (bdt-marker items over INTEC-project-map_20241031.png).
  markers: (markers as Marker[]).map((m) => ({ ...m, value: m.value.replace(/\s*Detail$/, "") })),
  cta: { label: "Explore more References", href: `${SITE}/references/` },
  // The counters' final values on the live page.
  stats: [
    { value: 5.0, decimals: 1, suffix: " GW", label: "Total Capacity" },
    { value: 200, decimals: 0, suffix: "+", label: "Projects" },
    { value: 20, decimals: 0, suffix: "+", label: "Countries" },
    { value: 9.0, decimals: 2, suffix: " Million", label: "Energy Production - MWh/yr" },
    { value: 4.0, decimals: 2, suffix: " Million", label: "CO2 Emissions Save - Tons/yr" },
  ],
};

export const projects = {
  title: ["Highlighted", "Projects"],
  cta: "Explore Details",
  items: [
    { name: "United Kingdom Project", capacity: "25.18 MWp", href: `${SITE}/references/united-kingdom-project/`, image: "/media/p-uk.jpg" },
    { name: "Brecks PV Project - United Kingdom", capacity: "46.5 MWp", href: `${SITE}/references/brecks-pv-project-united-kingdom/`, image: "/media/p-brecks.jpg" },
    { name: "Lachendorf PV Project", capacity: "50.00 MWp", href: `${SITE}/references/lachendorf-project/`, image: "/media/p-lachendorf.jpg" },
    { name: "Bad Wildungen BESS Project", capacity: "40.70 MWh", href: `${SITE}/references/bad-wildungen-bess-project/`, image: "/media/p-bad-wildungen.jpg" },
    { name: "Woolooga BESS Project", capacity: "642 MWh", href: `${SITE}/references/australia-project-bess/`, image: "/media/p-woolooga.jpg" },
    { name: "Kowhai PV Project", capacity: "168.00 MWp", href: `${SITE}/references/new-zealand-project/`, image: "/media/p-kowhai.jpg" },
  ],
};

export const film = {
  title: ["Play the power of", "INTEC Energy Solutions"],
  // "INTEC Energy Solutions EN", the company film on INTEC's YouTube channel.
  video: "/media/film.mp4",
  loop: "/media/film-loop.mp4",
  poster: "/media/film-poster.jpg",
  follow: "Follow Us",
};

export const socials = [
  { name: "Linkedin", icon: "linkedin", href: "https://www.linkedin.com/company/intec-energy-solutions/" },
  { name: "Xing", icon: "xing", href: "https://www.xing.com/pages/intec-energy-solutions" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/intecenergysolutions/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/intecenergysolutions" },
  { name: "X-twitter", icon: "x", href: "https://twitter.com/intec_energy" },
  { name: "Youtube", icon: "youtube", href: "https://www.youtube.com/@intecenergysolutions" },
] as const;

export const partners = {
  title: ["Our", "Partners"],
  // The live carousel's 22 logos, in its order.
  logos: [
    ["Ref_0000_Stonewin.png", "Stonewin"],
    ["Ref_0007_luxcara.png", "Luxcara"],
    ["Ref_0006_mirova_transparant_logo.840x0-1.png", "Mirova"],
    ["Ref_0005_pfalzsolar_gmbh_logo.png", "Pfalzsolar"],
    ["Ref_0004_ranui-gen.png", "Ranui Generation"],
    ["Ref_0003_Sonnedix_logo.svg.png", "Sonnedix"],
    ["Ref_0002_Vattenfall_logo2.svg.png", "Vattenfall"],
    ["Ref_0001_61fa9155223f7.png", "Ikaros Solar"],
    ["Ref_0021_67cedcc0b7c76.png", "Münch Energie"],
    ["Ref_0020_2336e62adf7fa4ffa6ebd5e1695789.png", "Partner"],
    ["Ref_0019_1361803.png", "RWE"],
    ["Ref_0018_alight.png", "Alight"],
    ["Ref_0017_aukera.png", "Aukera"],
    ["Ref_0016_bay.wa_.png", "BayWa r.e."],
    ["Ref_0015_BeGreen_logoTagline.png", "BeGreen"],
    ["Ref_0014_BP-Logo.png", "bp"],
    ["Ref_0013_csm_LTM3NTk5Njc0LnBuZyIsInciOjc3MX0_614a653988.png", "Tauron"],
    ["Ref_0012_Hofor.png", "HOFOR"],
    ["Ref_0011_images.png", "Kelag"],
    ["Ref_0010_lightsouce-bp-main-logo.png", "Lightsource bp"],
    ["Ref_0009_Logo_Neoen.svg.png", "Neoen"],
    ["Ref_0008_lucia-conde.png", "Lucia Conde"],
  ].map(([file, name]) => ({ src: `/brand/partners/${file}`, name })),
};

export const news = {
  title: ["Explore our latest", "News & Events"],
  eventsLabel: "Upcoming Events",
  events: [
    { name: "Oceania Power Summit", booth: "Booth : 11", date: "7 to 8 October, 2026", place: "Pullman Auckland, New Zealand" },
    { name: "All Energy Australia", booth: "Booth : S135", date: "28 to 29 October, 2026", place: "Melbourne, Australia" },
    { name: "Intersolar Europe 2027", booth: "Booth : A4.240", date: "8 to 10 June, 2027", place: "Messe München, Munich, Germany" },
  ],
  posts: [
    { date: "July 1, 2026", tag: "News", title: "INTEC Energy Solutions to deliver 171 MWp Solar Farm project in Glorit, North Auckland, New Zealand", excerpt: "INTEC Energy Solutions (INTEC) has been awarded the lead engineering,", href: `${SITE}/glorit-solar-farm-new-zealand/`, image: "/media/news.jpg" },
    { date: "June 19, 2026", tag: "News", title: "INTEC Energy Solutions to Deliver 20 MWp Solar Project in Löberitz, Germany for VSB Group", excerpt: "INTEC Energy Solutions is pleased to announce the signing of", href: `${SITE}/loberitz-solar-project-germany/`, image: "/media/news.jpg" },
  ],
  readMore: "Read More",
  more: { label: "Explore more", href: `${SITE}/media/blog-posts/` },
};

export const career = {
  eyebrow: "Design your future",
  title: "Career at INTEC",
  body: "Shape the future of energy in a dynamic, global environment. INTEC offers exciting opportunities to make a real difference.",
  tag: "#teamintec",
  cta: { label: "Apply Now", href: `${SITE}/work-at-intec/` },
  image: "/media/career.jpg",
};

export const footer = {
  line: ["Proven Sustainable Solutions", "for a Brighter Future"],
  columns: [
    { title: "Corporate", links: [
      { label: "About INTEC", href: `${SITE}/corporate/about-intec-energy` },
      { label: "References", href: `${SITE}/global-footprint/` },
      { label: "Management Team", href: `${SITE}/corporate/management-team` },
      { label: "ESG", href: `${SITE}/corporate/esg/` },
    ] },
    { title: "Services", links: [
      { label: "EPC", href: `${SITE}/services/epc/` },
      { label: "Development", href: `${SITE}/services/project-development/` },
      { label: "BESS", href: `${SITE}/services/bess` },
      { label: "O&M", href: `${SITE}/services/operation-maintenance/` },
      { label: "Consultancy", href: `${SITE}/services/consultancy` },
      { label: "New Energy Solutions", href: `${SITE}/services/new-energy-solutions` },
    ] },
    { title: "Explore", links: [
      { label: "News & Events", href: `${SITE}/media/news-events/` },
      { label: "Blog Posts", href: `${SITE}/media/blog-posts/` },
      { label: "Media Relations", href: `${SITE}/media/media-relations/` },
      { label: "Job Opportunities", href: `${SITE}/job-opportunities/` },
    ] },
  ],
  newsletter: { title: "Join Our Newsletter", placeholder: "Enter your email address...", button: "Join Now" },
  certificates: [
    { src: "/brand/cert-1.png", alt: "BSI: ISO 9001, ISO 14001 and ISO 45001 certified", invert: true },
    { src: "/brand/cert-2.png", alt: "PCC cert: ISO 9001, ISO 14001 and ISO 45001 certificates", invert: false },
    { src: "/brand/cert-3.png", alt: "Bureau Veritas certified: ISO 9001, ISO 14001 and ISO 45001", invert: false },
  ],
  copyright: "© 2026 INTEC Energy. All Rights Reserved.",
  legal: [
    { label: "Legal Notice", href: `${SITE}/legal-notice/` },
    { label: "Privacy Policy", href: `${SITE}/privacy-policy/` },
    { label: "Terms of Use", href: `${SITE}/terms-of-use/` },
    { label: "Disclaimer", href: `${SITE}/disclaimer` },
  ],
};
