import { Section, FadeIn } from "./Section";

const schedule = [
  { time: "08.30 – 09.45", title: "Kayıt / Kahvaltı" },
  { time: "09.45 – 10.15", title: "Açılış Konferansı" },
  { time: "10.15 – 11.05", title: "1. Oturum" },
  { time: "11.25 – 12.15", title: "2. Oturum" },
  { time: "12.35 – 13.25", title: "3. Oturum" },
  { time: "13.25 – 14.45", title: "Öğle Arası" },
  { time: "14.45 – 15.35", title: "4. Oturum" },
  { time: "15.55 – 16.45", title: "5. Oturum" },
  { time: "16.45 – 17.45", title: "Kapanış" },
];

export const Program = () => {
  return (
    <Section id="program" className="bg-background">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Etkinlik Akışı</span>
        <h2 className="heading-lg mt-5">Program</h2>
        <p className="mt-5 body-lg">
          Yoğun, ilham veren ve özenle planlanmış bir gün.
        </p>
      </FadeIn>

      <div className="mt-16 mx-auto max-w-3xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent sm:-translate-x-1/2" />

          <ul className="space-y-8">
            {schedule.map((s, i) => (
              <FadeIn key={s.time} delay={i * 0.04}>
                <li className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 sm:items-center">
                  {/* Dot */}
                  <span className="absolute left-4 top-2 sm:left-1/2 sm:-translate-x-1/2 grid h-4 w-4 place-items-center">
                    <span className="absolute h-4 w-4 rounded-full bg-primary/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-primary shadow-[0_0_0_3px_hsl(var(--background))]" />
                  </span>

                  {/* Time — left on desktop */}
                  <div className={`sm:text-right ${i % 2 === 0 ? "" : "sm:order-2 sm:text-left"}`}>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {s.time}
                    </span>
                  </div>
                  {/* Title */}
                  <div className={`mt-2 sm:mt-0 ${i % 2 === 0 ? "" : "sm:order-1 sm:text-right"}`}>
                    <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
