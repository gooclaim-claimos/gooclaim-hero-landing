/**
 * The share images (1200×630) every link to Gooclaim shows on LinkedIn,
 * WhatsApp, Slack and X — drawn as HTML in the Design System's look (warm
 * stage, mesh glows, Inter, the real logo) and screenshotted.
 *
 *   npx -y -p playwright-core@1.56.1 node scripts/og-images.mjs
 *   (set CHROMIUM=/path/to/chromium if Playwright has no browser installed)
 *
 * Writes public/og-home-v3.png and og-{india,portal,console}-v2.png. A changed image gets a
 * NEW name (-v3 …): LinkedIn and WhatsApp cache a preview by its URL.
 * Portal and Console link to the portal/console images on www.gooclaim.com.
 */
import { chromium } from 'playwright-core';
const LOGO = 'https://assets.gooclaim.com/gooclaim/brand/logo-v3.png';
const cards = {
  home: { tag: null, file: 'og-home-v3', eyebrow: 'GOOCLAIM OS IS A CLAIM OS · FOR TPAS, INSURERS & HOSPITALS', h1: 'Built for every claim.', h2: 'Every channel. Every CMS.', grad: 'linear-gradient(90deg,#1D4ED8 0%,#0891B2 100%)', ey: '#1D4ED8', chips: [['#1D4ED8','Regulator clocks'],['#047857','Consent before a word'],['#B45309','Immutable audit ledger']], foot: 'gooclaim.com' },
  india: { tag: null, eyebrow: 'GOOCLAIM OS IN INDIA · FOR INDIA’S TPAS AND INSURERS', h1: 'Built for every claim.', h2: 'Every channel. Every CMS.', grad: 'linear-gradient(90deg,#1D4ED8 0%,#0891B2 100%)', ey: '#1D4ED8', chips: [['#1D4ED8','IRDAI clocks · 1 h · 3 h · 15 days'],['#047857','DPDP consent gate'],['#B45309','Immutable audit ledger']], foot: 'gooclaim.com/in' },
  portal: { tag: ['PORTAL','#4338CA','#EEF2FF'], eyebrow: 'GOOCLAIM PORTAL · FOR YOUR CLAIMS TEAM', h1: 'Your knowledge, data & team,', h2: 'in one place.', grad: 'linear-gradient(90deg,#4338CA 0%,#0891B2 100%)', ey: '#4338CA', chips: [['#4338CA','Knowledge base'],['#1D4ED8','Data & connectors'],['#B45309','Team & access']], foot: 'gooclaim.com' },
  console: { tag: ['CONSOLE','#1D4ED8','#EEF3FF'], eyebrow: 'GOOCLAIM CONSOLE · PLATFORM OPERATIONS', h1: 'Run the platform,', h2: 'with full visibility.', grad: 'linear-gradient(90deg,#1D4ED8 0%,#0891B2 100%)', ey: '#1D4ED8', chips: [['#047857','Live platform health'],['#1D4ED8','Audit ledger'],['#B45309','Operational mode']], foot: 'gooclaim.com' },
};
const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#FAFAF9;font-family:Inter,sans-serif;color:#0C0A09}
.stage{position:absolute;inset:16px;border-radius:36px;background:#F3F5FA;border:1px solid #E4E8F1;overflow:hidden;padding:56px 64px;display:flex;flex-direction:column}
.g{position:absolute;border-radius:999px}
.mono{font-family:'JetBrains Mono',monospace}
.chip{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.82);border:1px solid rgba(12,10,9,.08);font-size:19px;font-weight:500;box-shadow:0 20px 50px rgba(30,58,138,.10)}
.dot{width:9px;height:9px;border-radius:99px}</style></head><body>
<div class="stage">
<div class="g" style="width:720px;height:720px;left:-240px;top:-330px;background:radial-gradient(circle,rgba(199,210,254,.85) 0%,rgba(199,210,254,0) 65%)"></div>
<div class="g" style="width:640px;height:640px;right:-220px;bottom:-300px;background:radial-gradient(circle,rgba(165,243,252,.70) 0%,rgba(165,243,252,0) 65%)"></div>
<div class="g" style="width:420px;height:420px;right:14%;top:-190px;background:radial-gradient(circle,rgba(147,197,253,.60) 0%,rgba(147,197,253,0) 65%)"></div>
<div style="position:relative;display:flex;align-items:center;gap:14px">
<img src="${LOGO}" style="width:44px;height:44px">
<span style="font-size:30px;font-weight:600;letter-spacing:-.02em">Gooclaim${c.tag ? '' : ' <span style="color:#78716C">OS</span>'}</span>
${c.tag ? `<span class="mono" style="font-size:15px;letter-spacing:.08em;padding:6px 14px;border-radius:999px;background:${c.tag[2]};color:${c.tag[1]}">${c.tag[0]}</span>` : ''}
</div>
<div style="position:relative;margin-top:auto">
<div class="mono" style="font-size:17px;letter-spacing:.08em;color:${c.ey}">${c.eyebrow}</div>
<div style="margin-top:16px;font-size:76px;line-height:1.02;font-weight:500;letter-spacing:-.05em">${c.h1}<br><span style="background-image:${c.grad};-webkit-background-clip:text;background-clip:text;color:transparent">${c.h2}</span></div>
<div style="display:flex;gap:12px;margin-top:34px;flex-wrap:wrap">${c.chips.map(([col,t]) => `<span class="chip"><span class="dot" style="background:${col}"></span>${t}</span>`).join('')}</div>
</div>
<div class="mono" style="position:absolute;right:64px;top:66px;font-size:15px;letter-spacing:.08em;color:#78716C">${c.foot.toUpperCase()}</div>
</div></body></html>`;
// CHROMIUM = path to a Chromium / headless shell (Playwright's cache has one).
const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
for (const [k, c] of Object.entries(cards)) {
  await p.setContent(html(c), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `public/${c.file ?? `og-${k}-v2`}.png` });
  console.log(k);
}
await b.close();
