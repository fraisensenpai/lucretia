import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-card">
        <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-primary-deep">LUCRETIA</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Aydınlık Zirvesi '26</span>
      </span>
    </a>
  );
};
