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
import { Loader2, LogOut, FileText, User, Users } from "lucide-react";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
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
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (data) setRole(data.role);
    setLoading(false);
    if (data?.role === "admin") fetchApplications();
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setApplications(data);
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

  if (loading) {
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
            <p className="mt-2 text-muted-foreground">Lütfen yetkili hesabınızla giriş yapın.</p>
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
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-destructive">Yetkisiz Erişim</h2>
        <p className="mt-2 text-muted-foreground">Bu sayfayı görüntülemek için admin yetkiniz yok.</p>
        <Button onClick={handleLogout} variant="outline" className="mt-4">
          Çıkış Yap
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Başvurular</h1>
            <p className="text-muted-foreground">Toplam {applications.length} başvuru bulundu.</p>
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
                  <TableHead>Email / Telefon</TableHead>
                  <TableHead>Detay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-xs">
                      {new Date(app.created_at).toLocaleDateString("tr-TR")}
                    </TableCell>
                    <TableCell>
                      {app.type === "individual" ? (
                        <span className="flex items-center gap-1 text-blue-500">
                          <User className="h-3 w-3" /> Bireysel
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-purple-500">
                          <Users className="h-3 w-3" /> Delegasyon
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell className="text-sm">{app.school}</TableCell>
                    <TableCell className="text-xs">
                      <div>{app.email}</div>
                      <div className="text-muted-foreground">{app.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => {
                        alert(JSON.stringify(app, null, 2));
                      }}>
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
