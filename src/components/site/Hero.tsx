import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-hero"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Lise Öğrencileri için Zirve · 2026
          </span>

          <h1 className="heading-xl mt-6 text-foreground">
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              LUCRETIA
            </span>
            <span className="mt-2 block">AYDINLIK ZİRVESİ '26</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl font-semibold text-primary-deep">
            Spor ve Girişimcilikte Aydınlık Yarınlara…
          </p>

          <p className="mt-5 mx-auto max-w-2xl body-lg">
            Lise öğrencileri için ilham verici hikayeler, deneyim aktarımı ve
            network imkânı sunan zirve.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#apply">
                Başvuru Yap <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="#program">Programı İncele</a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> 2026
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Türkiye
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="inline-flex items-center gap-2">
              150–200 Katılımcı
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
