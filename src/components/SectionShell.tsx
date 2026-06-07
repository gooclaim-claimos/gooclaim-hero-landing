import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  paddedY?: boolean;
}

export default function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  paddedY = true,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate w-full",
        paddedY && "py-24 sm:py-32 lg:py-40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        {(eyebrow || title || intro) && (
          <header className="mb-14 max-w-3xl sm:mb-18 lg:mb-20">
            {eyebrow && (
              <div className="mb-5 font-mono text-[11px] uppercase tracking-wider2 text-white/45">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-balance font-display text-[34px] font-semibold leading-[1.05] tracking-tighter text-white sm:text-[44px] lg:text-[56px]">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 max-w-2xl text-balance text-[15.5px] leading-relaxed text-white/60 sm:text-[16.5px]">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
