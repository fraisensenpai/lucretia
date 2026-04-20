import { useState } from "react";
import { User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, FadeIn } from "./Section";
import { toast } from "@/hooks/use-toast";

type TabKey = "individual" | "delegation";

const Field = ({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-primary">*</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export const Apply = () => {
  const [tab, setTab] = useState<TabKey>("individual");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Başvurun alındı!",
      description: "En kısa sürede e-posta yoluyla seninle iletişime geçeceğiz.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section id="apply" className="bg-background">
      <FadeIn className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Başvuru Formları</span>
        <h2 className="heading-lg mt-5">Aramıza Katıl</h2>
        <p className="mt-5 body-lg">
          Bireysel olarak veya delegasyon ile başvurunu hemen oluştur.
        </p>
      </FadeIn>

      <FadeIn className="mt-12 mx-auto max-w-3xl">
        {/* Custom tabs */}
        <div className="mb-8 grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/40 p-1.5">
          {[
            { key: "individual" as TabKey, icon: User, label: "Bireysel Delege" },
            { key: "delegation" as TabKey, icon: Users, label: "Delegasyon" },
          ].map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-card text-primary shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-card"
        >
          {tab === "individual" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Ad Soyad" required>
                <Input required placeholder="Adınız Soyadınız" />
              </Field>
              <Field label="E-posta" required>
                <Input required type="email" placeholder="ornek@mail.com" />
              </Field>
              <Field label="Telefon" required>
                <Input required type="tel" placeholder="05XX XXX XX XX" />
              </Field>
              <Field label="TC Kimlik No" required>
                <Input required inputMode="numeric" maxLength={11} placeholder="11 hane" />
              </Field>
              <Field label="Okul" required>
                <Input required placeholder="Okulunuzun adı" />
              </Field>
              <Field label="Sınıf Düzeyi" required>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hazirlik">Hazırlık</SelectItem>
                    <SelectItem value="9">9. Sınıf</SelectItem>
                    <SelectItem value="10">10. Sınıf</SelectItem>
                    <SelectItem value="11">11. Sınıf</SelectItem>
                    <SelectItem value="12">12. Sınıf</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Geçmiş Deneyimleriniz (Exp)" required>
                  <Textarea required rows={4} placeholder="Daha önce katıldığınız zirveler, kulüpler, projeler..." />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Zirveye Katılma Motivasyonunuz" required hint="En az 100 kelime bekliyoruz.">
                  <Textarea required rows={6} minLength={400} placeholder="Bizi etkilemeye hazır mısın?" />
                </Field>
              </div>

              <Field label="Alerjik / Rahatsızlık Durumu">
                <Input placeholder="Varsa belirtiniz" />
              </Field>
              <Field label="Referans">
                <Input placeholder="Sizi yönlendiren kişi/kurum" />
              </Field>

              <div className="sm:col-span-2 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <Checkbox id="photo-i" required className="mt-0.5" />
                <Label htmlFor="photo-i" className="text-sm text-foreground/90 leading-relaxed cursor-pointer">
                  Etkinlik süresince fotoğraf ve video çekimine izin veriyorum.{" "}
                  <span className="text-primary font-semibold">*</span>
                </Label>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="text-sm font-semibold text-primary">Delegasyon Başkanı Bilgileri</p>
              </div>
              <Field label="Ad Soyad" required>
                <Input required placeholder="Başkanın adı soyadı" />
              </Field>
              <Field label="TC Kimlik No" required>
                <Input required inputMode="numeric" maxLength={11} placeholder="11 hane" />
              </Field>
              <Field label="Telefon" required>
                <Input required type="tel" placeholder="05XX XXX XX XX" />
              </Field>
              <Field label="Okul" required>
                <Input required placeholder="Okul adı" />
              </Field>
              <Field label="E-posta" required>
                <Input required type="email" placeholder="ornek@mail.com" />
              </Field>
              <Field label="Kişi Sayısı" required hint="En az 5 kişi">
                <Input required type="number" min={5} placeholder="5+" />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Üye Listesi" required hint="Format: Ad Soyad - Okul - Sınıf - Telefon (her üye yeni satırda)">
                  <Textarea required rows={6} placeholder="1) Ad Soyad - Okul - Sınıf - Telefon&#10;2) ..." />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Üyelerin Deneyimleri (Özet)" required>
                  <Textarea required rows={4} placeholder="Üyelerin geçmiş zirve / kulüp / proje deneyimleri" />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Delegasyon Motivasyonu" required hint="En az 100 kelime bekliyoruz.">
                  <Textarea required rows={6} minLength={400} placeholder="Delegasyonunuzun zirveye katılma amacı" />
                </Field>
              </div>

              <Field label="Üyelerin Alerji Durumları">
                <Input placeholder="İsimle birlikte belirtiniz" />
              </Field>
              <Field label="Referans">
                <Input placeholder="Sizi yönlendiren kişi/kurum" />
              </Field>

              <div className="sm:col-span-2 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <Checkbox id="photo-d" required className="mt-0.5" />
                <Label htmlFor="photo-d" className="text-sm text-foreground/90 leading-relaxed cursor-pointer">
                  Tüm üyelerin fotoğraf ve video çekimine izni vardır.{" "}
                  <span className="text-primary font-semibold">*</span>
                </Label>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              Başvurunuz değerlendirme sürecine alınacak ve e-posta ile bilgilendirileceksiniz.
            </p>
            <Button type="submit" variant="hero" size="lg">
              Başvuruyu Gönder
            </Button>
          </div>
        </form>
      </FadeIn>
    </Section>
  );
};
