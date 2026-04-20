import { Crown, Medal, Award, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, FadeIn } from "./Section";

const tiers = [
  {
    icon: Crown,
    name: "Altın Sponsorluk",
    range: "25.000 TL ve üzeri",
    accent: "from-amber-500/20 to-amber-300/10",
    iconColor: "text-amber-600",
  },
  {
    icon: Medal,
    name: "Gümüş Sponsorluk",
    range: "15.000 TL – 25.000 TL",
    accent: "from-slate-400/20 to-slate-200/10",
    iconColor: "text-slate-500",
  },
  {
    icon: Award,
    name: "Bronz Sponsorluk",
    range: "5.000 TL – 15.000 TL",
    accent: "from-orange-400/20 to-orange-200/10",
    iconColor: "text-orange-600",
  },
  {
    icon: Gift,
    name: "Katkısal Sponsorluk",
    range: "Ürün veya hizmet desteği",
    accent: "from-primary/20 to-primary-glow/10",
    iconColor: "text-primary",
  },
];

export const Sponsorship = () => {
  return (
    <Section id="sponsors" className="bg-background">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Sponsorluk</span>
        <h2 className="heading-lg mt-5">Geleceğe Birlikte Yatırım Yapalım</h2>
        <p className="mt-5 body-lg">
          Sponsorluk paketlerimizle gençlerin aydınlık yarınlarına katkıda bulunun.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.07}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant hover:border-primary/30">
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${t.accent} blur-2xl`} />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-card border border-border shadow-sm">
                  <t.icon className={`h-6 w-6 ${t.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{t.name}</h3>
                <p className="mt-2 text-sm font-semibold text-primary">{t.range}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-14 text-center">
        <Button asChild variant="hero" size="xl">
          <a href="#contact">
            Sponsor Olmak İçin İletişime Geçin <ArrowRight className="h-5 w-5" />
          </a>
        </Button>
      </FadeIn>
    </Section>
  );
};
