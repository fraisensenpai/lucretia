import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, FadeIn } from "./Section";

const tiers = [
  {
    name: "Bireysel Delege",
    badge: "Erken Kayıt",
    price: "000",
    period: "TL",
    description: "Erken kayıt döneminde bireysel başvuru için avantajlı ücret.",
    features: [
      "Tüm oturumlara erişim",
      "Kahvaltı ve öğle yemeği",
      "Katılım sertifikası",
      "Network etkinliklerine katılım",
    ],
    period_note: "Erken Dönem · Sınırlı Kontenjan",
    highlighted: false,
  },
  {
    name: "Delegasyon",
    badge: "En Az 5 Kişi",
    price: "000",
    period: "TL / kişi",
    description: "Okul veya kulüp adına gerçekleştirilen toplu başvurular için.",
    features: [
      "Grup için özel kayıt deneyimi",
      "Tüm oturumlara erişim",
      "Kahvaltı ve öğle yemeği",
      "Delegasyon sertifikası ve özel teşekkür",
    ],
    period_note: "Standart Dönem",
    highlighted: true,
  },
];

export const Pricing = () => {
  return (
    <Section id="pricing" className="bg-gradient-soft">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Kayıt Ücretleri</span>
        <h2 className="heading-lg mt-5">Sana Uygun Olanı Seç</h2>
        <p className="mt-5 body-lg">
          Bireysel veya delegasyon olarak katılabilirsin. Erken kayıt döneminde özel fırsatlar seni bekliyor.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {tiers.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.1}>
            <div
              className={`relative h-full rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                t.highlighted
                  ? "border-primary/40 bg-card shadow-elegant"
                  : "border-border bg-card shadow-card hover:shadow-elegant"
              }`}
            >
              {t.highlighted && (
                <div className="absolute -top-3 right-6">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-card">
                    <Sparkles className="h-3 w-3" /> Popüler
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{t.name}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {t.badge}
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-foreground">{t.price}</span>
                <span className="text-lg font-semibold text-muted-foreground">{t.period}</span>
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-primary">
                {t.period_note}
              </p>

              <p className="mt-4 text-sm text-muted-foreground">{t.description}</p>

              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={t.highlighted ? "hero" : "heroOutline"} className="mt-8 w-full" size="lg">
                <a href="#apply">Başvur</a>
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
