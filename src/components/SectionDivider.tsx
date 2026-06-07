export default function SectionDivider() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto h-px w-full max-w-[1280px]"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(125,196,255,0.22) 50%, transparent 100%)",
      }}
    />
  );
}
