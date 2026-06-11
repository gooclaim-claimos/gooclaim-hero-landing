import { type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /** When true (or when href is omitted), renders a <button> instead of <a>. */
  asButton?: boolean;
}

export default function CTA({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  asButton,
}: Props) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold tracking-tight transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-white text-ink-950 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
      : "text-white/85 glass hover:text-white hover:-translate-y-0.5 hover:border-white/20";

  const renderAsButton = asButton || !href;

  if (renderAsButton) {
    return (
      <button type="button" onClick={onClick} className={cn(base, styles, className)}>
        <span className="relative z-10">{children}</span>
        <Arrow />
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={cn(base, styles, className)}>
      <span className="relative z-10">{children}</span>
      <Arrow />
    </a>
  );
}

export function Arrow() {
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
