import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, LogOut, FileText, User, Users, Mail, Phone, School, GraduationCap, Info } from "lucide-react";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkRole(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkRole(session.user.id);
      else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (data) setRole(data.role);
    } catch (err) {
      console.error("Role check error:", err);
    } finally {
      setLoading(false);
      // If we are logged in, we can try to fetch, even if role check fails 
      // (RLS will protect the data anyway)
      fetchApplications();
    }
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setApplications(data);
    else if (error) console.error("Fetch error:", error);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        title: "Giriş başarısız",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading && !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Admin Girişi</h2>
            <p className="mt-2 text-muted-foreground">Başvuruları yönetmek için giriş yapın.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-posta</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Şifre</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Giriş Yap"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Başvurular</h1>
            <p className="text-muted-foreground">Toplam {applications.length} başvuru listeleniyor.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>Okul</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      Henüz başvuru bulunmuyor veya yetkiniz yok.
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="text-xs">
                        {new Date(app.created_at).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        {app.type === "individual" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500">
                            <User className="h-3 w-3" /> Bireysel
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-500">
                            <Users className="h-3 w-3" /> Delegasyon
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{app.full_name}</TableCell>
                      <TableCell className="text-sm">{app.school}</TableCell>
                      <TableCell className="text-xs">
                        <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {app.email}</div>
                        <div className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" /> {app.phone}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)}>
                          <FileText className="mr-2 h-4 w-4" /> Detaylar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedApp?.type === "individual" ? <User className="h-5 w-5" /> : <Users className="h-5 w-5" />}
              Başvuru Detayı
            </DialogTitle>
            <DialogDescription>
              {selectedApp?.full_name} tarafından {new Date(selectedApp?.created_at).toLocaleString("tr-TR")} tarihinde yapıldı.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">TC Kimlik No</p>
                <p className="text-sm font-medium">{selectedApp?.tc_no}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Okul / Sınıf</p>
                <p className="text-sm font-medium">{selectedApp?.school} {selectedApp?.grade && `- ${selectedApp.grade}`}</p>
              </div>
            </div>

            {selectedApp?.type === "delegation" && (
              <div className="space-y-1 rounded-lg bg-primary/5 p-3">
                <p className="text-xs font-bold uppercase text-primary">Delegasyon Bilgisi</p>
                <p className="text-sm font-medium">Kişi Sayısı: {selectedApp?.member_count}</p>
                <div className="mt-2 text-xs whitespace-pre-wrap text-muted-foreground border-t border-primary/10 pt-2">
                  {selectedApp?.member_list}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Deneyimler</p>
              <p className="text-sm leading-relaxed">{selectedApp?.experience}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Motivasyon</p>
              <p className="text-sm leading-relaxed">{selectedApp?.motivation}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Alerji / Rahatsızlık</p>
                <p className="text-sm">{selectedApp?.allergy || "Belirtilmemiş"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Referans</p>
                <p className="text-sm">{selectedApp?.reference || "Yok"}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
