import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Advantages } from "@/components/site/Advantages";
import { Program } from "@/components/site/Program";
import { Pricing } from "@/components/site/Pricing";
import { Apply } from "@/components/site/Apply";
import { Sponsorship } from "@/components/site/Sponsorship";
import { Contact } from "@/components/site/Contact";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Lucretia Aydınlık Zirvesi '26 — Spor ve Girişimcilikte Aydınlık Yarınlara";
    const desc =
      "Lise öğrencileri için ilham verici hikayeler, deneyim aktarımı ve network imkanı sunan Lucretia Aydınlık Zirvesi '26 — Hemen başvur.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Advantages />
      <Program />
      <Pricing />
      <Apply />
      <Sponsorship />
      <Contact />
    </main>
  );
};

export default Index;
