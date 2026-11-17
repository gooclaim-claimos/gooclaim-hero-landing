/**
 * Gooclaim's published mark (gooclaim-infra platform/brand/gooclaim/logo-v3.png),
 * served from the brand CDN. A published logo name is never replaced: a new
 * logo gets a new file name, and this URL moves to it.
 */
export const LOGO_URL = "https://assets.gooclaim.com/gooclaim/brand/logo-v3.png";

export default function Logo({ size }: { size: number }) {
  return <img src={LOGO_URL} alt="" width={size} height={size} decoding="async" style={{ width: size, height: size, display: "block", flex: "none" }} />;
}
