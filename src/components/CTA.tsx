import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function CTA({
  href = "#",
  children,
  variant = "primary",
  className,
  onClick,
}: Props) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold tracking-tight transition-all duration-300";

  if (variant === "primary") {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(
          base,
          "bg-white text-ink-950 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]",
          className,
        )}
      >
        <span className="relative z-10">{children}</span>
        <Arrow />
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        base,
        "text-white/85 glass hover:text-white hover:-translate-y-0.5 hover:border-white/20",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <Arrow />
    </a>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
