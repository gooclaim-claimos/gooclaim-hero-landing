import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface Props {
  label: string;
  hue?: string;
  className?: string;
  delay?: number;
}

export default function ComplianceBadge({
  label,
  hue = "#0d99ff",
  className,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2",
        "text-[12.5px] font-medium text-white/80",
        "glass",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex h-3.5 w-3.5 items-center justify-center"
      >
        <span
          className="absolute inset-0 rounded-full animate-pulse-soft"
          style={{ background: hue, opacity: 0.25, filter: "blur(2px)" }}
        />
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hue}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </span>
      {label}
    </motion.div>
  );
}
