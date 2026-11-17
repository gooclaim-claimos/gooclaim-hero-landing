import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * POST /api/voice-call {turnstile_token, language} → one 30-second call with the
 * real voice agent, for the /call page.
 *
 * This function is the only public door. It proves a person is asking
 * (Cloudflare Turnstile, verified here with the secret), then asks
 * gooclaim-tenant-config server-to-server with a shared secret. tenant-config
 * holds the limits (calls a day for the whole site, calls a day per visitor),
 * picks the tenant's labelled test member and opens the session; the voice
 * service cuts the call at the limit and makes no AI call after it.
 *
 * Env (Vercel): TURNSTILE_SECRET_KEY, GOOCLAIM_VOICE_DEMO_URL (tenant-config's
 * base URL), GOOCLAIM_WEBSITE_VOICE_SECRET. Any of them missing = the feature
 * is off and the page says so; nothing is ever called without all three.
 */

interface Body {
  turnstile_token?: unknown;
  language?: unknown;
}

const LANGUAGES = new Set(["en", "hi"]);
/** Turnstile tokens are issued for these hostnames only. */
const HOSTS = new Set(["www.gooclaim.com", "gooclaim.com", "localhost"]);
const TIMEOUT_MS = 10_000;

function send(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage & { body?: unknown }): Promise<Body> {
  if (req.body && typeof req.body === "object") return req.body as Body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body) as Body; } catch { return {}; }
  }
  return await new Promise<Body>((resolve) => {
    let data = "";
    req.on("data", (chunk: Buffer | string) => {
      data += typeof chunk === "string" ? chunk : chunk.toString("utf8");
      if (data.length > 8192) req.destroy();
    });
    req.on("end", () => {
      try { resolve(data ? (JSON.parse(data) as Body) : {}); } catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

/** The visitor's address as Vercel saw it (its edge sets x-real-ip; first forwarded hop otherwise). */
function clientIp(req: IncomingMessage): string {
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real) return real.slice(0, 64);
  const fwd = req.headers["x-forwarded-for"];
  const first = (Array.isArray(fwd) ? fwd[0] : fwd || "").split(",")[0].trim();
  return first.slice(0, 64);
}

async function turnstileOk(secret: string, token: string, ip: string): Promise<boolean> {
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const out = (await r.json()) as { success?: boolean; hostname?: string };
    return out.success === true && HOSTS.has(String(out.hostname || ""));
  } catch {
    return false;
  }
}

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });

  const secret = process.env.TURNSTILE_SECRET_KEY || "";
  const base = (process.env.GOOCLAIM_VOICE_DEMO_URL || "").replace(/\/+$/, "");
  const shared = process.env.GOOCLAIM_WEBSITE_VOICE_SECRET || "";
  if (!secret || !base || !shared) return send(res, 503, { error: "not_configured" });

  const body = await readJson(req);
  const token = typeof body.turnstile_token === "string" ? body.turnstile_token.slice(0, 2048) : "";
  const language = typeof body.language === "string" && LANGUAGES.has(body.language) ? body.language : "en";
  if (!token) return send(res, 400, { error: "verification_required" });

  const ip = clientIp(req);
  if (!(await turnstileOk(secret, token, ip))) return send(res, 403, { error: "verification_failed" });

  let r: Response;
  try {
    r = await fetch(`${base}/v1/public/voice-demo/browser-call`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Gooclaim-Website-Secret": shared },
      body: JSON.stringify({ language, client_ip: ip }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return send(res, 503, { error: "agent_unavailable" });
  }

  if (r.status === 429) {
    const detail = ((await r.json().catch(() => ({}))) as { detail?: string }).detail;
    return send(res, 429, { error: detail === "ip_limit" ? "ip_limit" : "daily_limit" });
  }
  // 404 = the route is off or the secret is wrong: to the visitor, simply not available.
  if (!r.ok) return send(res, 503, { error: "agent_unavailable" });

  const out = (await r.json().catch(() => null)) as
    | { session_id?: string; conversation_token?: string | null; limit_s?: number; test_code?: string }
    | null;
  if (!out?.conversation_token || !out.session_id) return send(res, 503, { error: "agent_unavailable" });
  return send(res, 200, {
    session_id: out.session_id,
    conversation_token: out.conversation_token,
    limit_s: typeof out.limit_s === "number" ? out.limit_s : 30,
    test_code: typeof out.test_code === "string" ? out.test_code : "",
  });
}
