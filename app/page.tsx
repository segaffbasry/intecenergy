import Preloader from "@/components/Preloader";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Services from "@/components/home/Services";
import Footprint from "@/components/home/Footprint";
import Projects from "@/components/home/Projects";
import Film from "@/components/home/Film";
import Partners from "@/components/home/Partners";
import News from "@/components/home/News";
import Career from "@/components/home/Career";

// The live homepage's sections, in the live order (the statement is the live "Proven Sustainable Solutions" block).
export default function Home() {
  return <>
    <Preloader />
    <Hero />
    <Services />
    <Statement />
    <Footprint />
    <Projects />
    <Film />
    <Partners />
    <News />
    <Career />
  </>;
}
