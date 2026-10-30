import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * The visitor's country, for the home page's "you seem to be in…" banner. Vercel
 * puts the two-letter code in `x-vercel-ip-country`; only that code is returned.
 * The IP address is never read, logged or kept. Never cached: the answer is per visitor.
 */
export default function handler(req: IncomingMessage, res: ServerResponse) {
  const raw = req.headers["x-vercel-ip-country"];
  const country = typeof raw === "string" && /^[A-Z]{2}$/.test(raw) ? raw : null;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");
  res.end(JSON.stringify({ country }));
}
