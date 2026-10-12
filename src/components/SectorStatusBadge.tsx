import { STATUS_HUE, STATUS_LABEL, type SectorStatus } from "@/data/sectors";

export default function SectorStatusBadge({ status, className = "" }: { status: SectorStatus; className?: string }) {
  const hue = STATUS_HUE[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-display text-[10px] uppercase tracking-wider2 ${className}`}
      style={{ color: hue, borderColor: `${hue}55`, background: `${hue}14` }}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "animate-pulse" : ""}`}
        style={{ background: hue }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
