import { Mic, Briefcase, Award, Users } from "lucide-react";
import { Section, FadeIn } from "./Section";

const items = [
  {
    icon: Mic,
    title: "Konuşmacılar",
    desc: "Alanında uzmanlaşmış 2 sporcu ve 2 girişimci ile interaktif oturumlar.",
  },
  {
    icon: Briefcase,
    title: "Kariyer Katkısı",
    desc: "Üniversite başvurularında avantaj sağlayacak network kurma, CV geliştirme ve liderlik kanıtı.",
  },
  {
    icon: Award,
    title: "Sertifika",
    desc: "Tüm katılımcılara özel, isimlerine düzenlenmiş katılım sertifikası.",
  },
  {
    icon: Users,
    title: "Hedef Kitle",
    desc: "150–200 lise öğrencisinden oluşan seçkin bir delege topluluğu.",
  },
];

export const Advantages = () => {
  return (
    <Section id="advantages" className="bg-gradient-soft">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Katılımcı Avantajları</span>
        <h2 className="heading-lg mt-5">Neden Lucretia '26?</h2>
        <p className="mt-5 body-lg">
          İlham verici konuşmacılar, güçlü bir network ve geleceğine yön verecek deneyimler.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <FadeIn key={it.title} delay={i * 0.08}>
            <div className="group relative h-full rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant hover:border-primary/30">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <it.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
