import type { IncomingMessage, ServerResponse } from "node:http";

interface Payload {
  name?: string;
  work_email?: string;
  company?: string;
  role?: string;
  monthly_claim_volume?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function send(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage & { body?: unknown }): Promise<Payload> {
  if (req.body && typeof req.body === "object") return req.body as Payload;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body) as Payload; } catch { return {}; }
  }
  return await new Promise<Payload>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer | string) => {
      data += typeof chunk === "string" ? chunk : chunk.toString("utf8");
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data) as Payload); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!
  ));
}

const SITE_URL = process.env.SITE_URL || "https://www.gooclaim.com";
const LOGO_URL = process.env.LOGO_URL || `${SITE_URL}/logo-gooclaim.png`;

/** Hidden preview-pane text that shows in inbox lists before the user opens the email. */
function preheader(text: string): string {
  return `<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all">${esc(text)}</div>`;
}

function shell(args: {
  preheaderText: string;
  bodyHtml: string;
  footerHtml: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Gooclaim</title>
<!--[if mso]><style>table,td,div,h1,p{font-family:Arial,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">
${preheader(args.preheaderText)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7">
  <tr>
    <td align="center" style="padding:40px 16px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:14px;border:1px solid #e6e8ec;overflow:hidden">
        <!-- Header -->
        <tr>
          <td style="padding:24px 32px;border-bottom:1px solid #eef0f3">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="vertical-align:middle">
                  <img src="${LOGO_URL}" width="28" height="28" alt="Gooclaim" style="display:inline-block;vertical-align:middle;border:0;border-radius:6px">
                  <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:17px;font-weight:600;color:#0f172a;letter-spacing:-0.01em">Gooclaim <span style="color:#94a3b8;font-weight:500">OS</span></span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
${args.bodyHtml}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px 24px;border-top:1px solid #eef0f3;background-color:#fafbfc">
${args.footerHtml}
          </td>
        </tr>
      </table>
      <!-- Sub-footer -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">
        <tr>
          <td align="center" style="padding:18px 16px 0;color:#94a3b8;font-size:12px;line-height:1.6">
            Gooclaim · Bengaluru, India<br>
            The operating system for India&rsquo;s claims industry.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function notifyHtml(p: Required<Payload>): string {
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const rows: Array<[string, string]> = [
    ["Name", p.name],
    ["Work email", p.work_email],
    ["Company", p.company],
    ["Role", p.role || "—"],
    ["Monthly volume", p.monthly_claim_volume || "—"],
    ["Source", p.source],
    ["Submitted", `${submittedAt} IST`],
  ];

  const tableRows = rows
    .map(
      ([k, v], i) => `
              <tr>
                <td style="padding:${i === 0 ? "0" : "12px"} 0 12px 0;width:140px;color:#6b7280;font-size:13px;font-weight:500;vertical-align:top${i === rows.length - 1 ? "" : ";border-bottom:1px solid #f1f3f5"}">${esc(k)}</td>
                <td style="padding:${i === 0 ? "0" : "12px"} 0 12px 0;color:#0f172a;font-size:14px;vertical-align:top${i === rows.length - 1 ? "" : ";border-bottom:1px solid #f1f3f5"}">${
                  k === "Work email"
                    ? `<a href="mailto:${esc(v)}" style="color:#0d99ff;text-decoration:none">${esc(v)}</a>`
                    : esc(v)
                }</td>
              </tr>`,
    )
    .join("");

  const bodyHtml = `
            <div style="display:inline-block;padding:4px 10px;background-color:#eff8ff;color:#0d99ff;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;border-radius:999px;margin-bottom:14px">New signup</div>
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#0f172a;letter-spacing:-0.01em;line-height:1.3">${esc(p.name)} · ${esc(p.company)}</h1>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14.5px;line-height:1.55">Joined the Gooclaim OS waitlist.</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eef0f3;border-radius:10px;padding:6px 16px">${tableRows}
            </table>

            <p style="margin:22px 0 0;color:#6b7280;font-size:13px;line-height:1.6">Reply to this email to reach ${esc(p.name.split(" ")[0] || "them")} directly — replies route to <span style="color:#0f172a">${esc(p.work_email)}</span>.</p>`;

  const footerHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color:#94a3b8;font-size:12px">Internal notification · do not forward</td>
              </tr>
            </table>`;

  return shell({
    preheaderText: `${p.name} from ${p.company} · ${p.work_email}${p.monthly_claim_volume ? ` · ${p.monthly_claim_volume} claims/mo` : ""}`,
    bodyHtml,
    footerHtml,
  });
}

function notifyText(p: Required<Payload>): string {
  return [
    "New Gooclaim OS waitlist signup",
    "",
    `Name:          ${p.name}`,
    `Work email:    ${p.work_email}`,
    `Company:       ${p.company}`,
    `Role:          ${p.role || "—"}`,
    `Monthly vol:   ${p.monthly_claim_volume || "—"}`,
    `Source:        ${p.source}`,
    "",
    "Reply to this email to reach them directly.",
  ].join("\n");
}

function userHtml(name: string): string {
  const firstName = (name || "").split(" ")[0] || "there";

  const bodyHtml = `
            <div style="display:inline-block;padding:4px 10px;background-color:#ecfdf5;color:#059669;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;border-radius:999px;margin-bottom:14px">You&rsquo;re on the list</div>
            <h1 style="margin:0 0 18px;font-size:24px;font-weight:600;color:#0f172a;letter-spacing:-0.015em;line-height:1.25">Hi ${esc(firstName)} — welcome to Gooclaim.</h1>

            <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.65">Thanks for signing up. We&rsquo;re rolling out Gooclaim OS in small waves with TPAs and insurers — focusing on operations where we can actually move the needle on TAT, channel coverage, and IRDAI audit posture.</p>

            <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.65">When we&rsquo;re ready for your operation, someone from our team will reach out personally — not a templated drip campaign. Usually within a week.</p>

            <div style="margin:24px 0;padding:18px 20px;background-color:#f9fafb;border:1px solid #eef0f3;border-radius:10px">
              <div style="font-size:11px;font-weight:600;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:10px">While you wait</div>
              <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6">Reply to this email with the workflow you&rsquo;d most want to see in your demo — cashless claim status, pending docs, query reasons, or IRDAI exports. It helps us tailor the walkthrough to your operation.</p>
            </div>

            <p style="margin:24px 0 6px;color:#374151;font-size:15px;line-height:1.65">— Kumar Mayank</p>
            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.55">Founder, Gooclaim</p>`;

  const footerHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color:#6b7280;font-size:12.5px;line-height:1.6">
                  <a href="mailto:contact@gooclaim.com" style="color:#0d99ff;text-decoration:none">contact@gooclaim.com</a>
                  &nbsp;·&nbsp;
                  <a href="${SITE_URL}" style="color:#0d99ff;text-decoration:none">gooclaim.com</a>
                </td>
                <td align="right" style="color:#94a3b8;font-size:11.5px">IRDAI · DPDP · SHA-256 audit</td>
              </tr>
            </table>`;

  return shell({
    preheaderText: "We're rolling out in small waves. Someone from our team will reach out personally — usually within a week.",
    bodyHtml,
    footerHtml,
  });
}

function userText(name: string): string {
  const firstName = (name || "").split(" ")[0] || "there";
  return [
    `Hi ${firstName} — welcome to Gooclaim.`,
    "",
    "Thanks for signing up. We're rolling out Gooclaim OS in small waves with",
    "TPAs and insurers, focusing on operations where we can actually move the",
    "needle on TAT, channel coverage, and IRDAI audit posture.",
    "",
    "When we're ready for your operation, someone from our team will reach out",
    "personally — not a templated drip. Usually within a week.",
    "",
    "While you wait: reply to this email with the workflow you'd most want to",
    "see in your demo (cashless claim status, pending docs, query reasons, or",
    "IRDAI exports). It helps us tailor the walkthrough.",
    "",
    "— Kumar Mayank",
    "Founder, Gooclaim",
    "",
    `${SITE_URL} · contact@gooclaim.com`,
  ].join("\n");
}

async function sendEmail(args: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${args.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        ...(args.text ? { text: args.text } : {}),
        ...(args.replyTo ? { reply_to: args.replyTo } : {}),
      }),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return { ok: false, error: `resend ${r.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

async function writeToSheets(webhookUrl: string, secret: string, p: Required<Payload>): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(webhookUrl, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, ...p }),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return { ok: false, error: `sheets ${r.status}: ${text.slice(0, 200)}` };
    }
    const data = (await r.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!data?.ok) return { ok: false, error: data?.error || "sheets returned non-ok" };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; method?: string },
  res: ServerResponse,
) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    send(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  let body: Payload;
  try {
    body = await readJson(req);
  } catch {
    send(res, 400, { ok: false, error: "invalid_json" });
    return;
  }

  const name = (body.name || "").trim().slice(0, 120);
  const work_email = (body.work_email || "").trim().toLowerCase().slice(0, 200);
  const company = (body.company || "").trim().slice(0, 200);
  const role = (body.role || "").trim().slice(0, 120);
  const monthly_claim_volume = (body.monthly_claim_volume || "").trim().slice(0, 60);
  const source = (body.source || "hero-landing").trim().slice(0, 60);

  if (!name) return send(res, 400, { ok: false, error: "name_required" });
  if (!EMAIL_RE.test(work_email)) return send(res, 400, { ok: false, error: "invalid_email" });
  if (!company) return send(res, 400, { ok: false, error: "company_required" });

  const payload: Required<Payload> = { name, work_email, company, role, monthly_claim_volume, source };

  const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL;
  const SHEETS_SHARED_SECRET = process.env.SHEETS_SHARED_SECRET;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "admin@gooclaim.com";
  const FROM_EMAIL = process.env.FROM_EMAIL || "Gooclaim Waitlist <waitlist@gooclaim.com>";
  const REPLY_TO = process.env.REPLY_TO || NOTIFY_EMAIL;

  if (!SHEETS_WEBHOOK_URL || !SHEETS_SHARED_SECRET || !RESEND_API_KEY) {
    send(res, 500, { ok: false, error: "server_misconfigured" });
    return;
  }

  const sheets = await writeToSheets(SHEETS_WEBHOOK_URL, SHEETS_SHARED_SECRET, payload);
  if (!sheets.ok) {
    console.error("[waitlist] sheets write failed:", sheets.error);
  }

  const [notify, confirm] = await Promise.all([
    sendEmail({
      apiKey: RESEND_API_KEY,
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New waitlist signup · ${name} (${company})`,
      html: notifyHtml(payload),
      text: notifyText(payload),
      replyTo: work_email,
    }),
    sendEmail({
      apiKey: RESEND_API_KEY,
      from: FROM_EMAIL,
      to: work_email,
      subject: "Welcome to Gooclaim — you're on the waitlist",
      html: userHtml(name),
      text: userText(name),
      replyTo: REPLY_TO,
    }),
  ]);

  if (!notify.ok) console.error("[waitlist] notify email failed:", notify.error);
  if (!confirm.ok) console.error("[waitlist] confirm email failed:", confirm.error);

  if (!sheets.ok && !notify.ok) {
    send(res, 502, { ok: false, error: "downstream_failure" });
    return;
  }

  send(res, 200, { ok: true });
}
