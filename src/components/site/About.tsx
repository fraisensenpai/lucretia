import { Quote } from "lucide-react";
import { Section, FadeIn } from "./Section";

const quotes = [
  {
    label: "Vizyon",
    text: "Dinlenmemek üzere yürümeye karar verenler asla ve asla yorulmazlar.",
    sub: "Azim, kararlılık ve sürekli gelişim ruhu.",
  },
  {
    label: "Misyon",
    text: "Umutsuz durumlar yoktur. Umutsuz insanlar vardır. Ben hiçbir zaman umudumu yitirmedim.",
    author: "M. Kemal Atatürk",
    sub: "Motivasyon ve yeni ufuklar.",
  },
];

export const About = () => {
  return (
    <Section id="about" className="bg-background">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
        <FadeIn>
          <span className="eyebrow">Hakkımızda</span>
          <h2 className="heading-lg mt-5">Lucretia Nedir?</h2>
          <p className="mt-6 body-lg">
            İsmini Latince <span className="font-semibold text-foreground">"aydınlık"</span> anlamına
            gelen kelimeden alan <span className="font-semibold text-foreground">Lucretia</span>,
            spor ve girişimcilik alanlarındaki fikirleri, deneyimleri ve ilham verici hikâyeleri
            bir araya getirerek gençlerin daha aydınlık yarınlar için desteklenmesini amaçlayan
            bir lise öğrenci zirvesidir.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "150–200", v: "Katılımcı" },
              { k: "4+", v: "Konuşmacı" },
              { k: "5", v: "Oturum" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                <div className="text-2xl font-extrabold text-primary">{s.k}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid gap-5">
          {quotes.map((q, i) => (
            <FadeIn key={q.label} delay={0.1 + i * 0.1}>
              <article className="group relative rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="absolute -top-3 left-7">
                  <span className="rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-card">
                    {q.label}
                  </span>
                </div>
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-3 text-lg font-medium leading-relaxed text-foreground">
                  "{q.text}"
                </p>
                {q.author && (
                  <p className="mt-3 text-sm font-semibold text-primary">— {q.author}</p>
                )}
                <p className="mt-3 text-sm text-muted-foreground">{q.sub}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
};
