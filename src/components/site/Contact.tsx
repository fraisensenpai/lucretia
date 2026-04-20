import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { Section, FadeIn } from "./Section";
import { Logo } from "./Logo";

const coordinators = [
  { role: "Genel Koordinatör", name: "Şayan Rüya Varol", phone: "0544 547 6926" },
  { role: "Genel Koordinatör", name: "Suzan Almira Akgül", phone: "0530 488 8393" },
  { role: "Finans Başkanı", name: "Seda Kanmaz", phone: "0551 344 4697" },
  { role: "Finans Başkanı", name: "Elif Sena Kasapoğlu", phone: "0536 990 9177" },
];

const emails = ["lucretiazirve@gmail.com", "lucteriazirve@gmail.com"];

export const Contact = () => {
  return (
    <>
      <Section id="contact" className="bg-gradient-soft">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">İletişim</span>
          <h2 className="heading-lg mt-5">Bize Ulaşın</h2>
          <p className="mt-5 body-lg">
            Sorularınız ve işbirlikleri için aşağıdaki kanallardan bize ulaşabilirsiniz.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Map placeholder */}
          <FadeIn>
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative h-full grid place-items-center p-10 text-center">
                <div>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-elegant">
                    <MapPin className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">Etkinlik Lokasyonu</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    Etkinlik mekânı ve harita bilgisi yakında burada paylaşılacaktır.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact info */}
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold">E-posta</h3>
                </div>
                <ul className="space-y-2">
                  {emails.map((e) => (
                    <li key={e}>
                      <a
                        href={`mailto:${e}`}
                        className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
                      >
                        {e}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold">Koordinatörler</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {coordinators.map((c) => (
                    <li key={c.name} className="rounded-lg border border-border bg-background p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {c.role}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{c.name}</p>
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="mt-0.5 block text-xs text-muted-foreground hover:text-primary"
                      >
                        {c.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <footer className="border-t border-border bg-background">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Lucretia Aydınlık Zirvesi. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:bg-primary/5"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
