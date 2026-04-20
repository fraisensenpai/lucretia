import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Anasayfa" },
  { href: "#about", label: "Hakkımızda" },
  { href: "#program", label: "Program" },
  { href: "#pricing", label: "Ücretler" },
  { href: "#apply", label: "Başvuru" },
  { href: "#sponsors", label: "Sponsorluk" },
  { href: "#contact", label: "İletişim" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-primary/5"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="default">
            <a href="#apply">Hemen Başvur</a>
          </Button>
        </div>

        <button
          className="lg:hidden grid h-10 w-10 place-items-center rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild variant="hero" className="mt-3">
                <a href="#apply" onClick={() => setOpen(false)}>Hemen Başvur</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
