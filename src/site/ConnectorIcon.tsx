import type { Connector } from "@/data/connectors";

/**
 * A connector's real mark. When a mark needs a different file per theme, both
 * are rendered and CSS shows the right one, so the prerender is right in both.
 */
export default function ConnectorIcon({ c, size = 18 }: { c: Connector; size?: number }) {
  const w = c.wide ? Math.round(size * 2.6) : size;
  const img = (file: string, className?: string) => (
    <img key={file} className={[className, c.tile ? `gc-icon-tile-${c.tile}` : ""].filter(Boolean).join(" ") || undefined} src={`/connectors/${file}.svg`} alt="" width={w} height={size} loading="lazy" decoding="async" style={{ width: w, height: size, objectFit: c.crop ? "cover" : "contain", flex: "none" }} />
  );
  if (c.dark) return <>{img(c.id, "only-light")}{img(c.dark, "only-dark")}</>;
  if (c.light) return <>{img(c.light, "only-light")}{img(c.id, "only-dark")}</>;
  return img(c.id);
}
