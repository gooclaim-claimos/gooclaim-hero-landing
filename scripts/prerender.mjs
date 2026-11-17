import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = join(root, "dist");
const templatePath = join(distDir, "index.html");

const NOT_FOUND = "/__not-found";
const ROUTES = [
  "/",
  "/in",
  "/platform",
  "/orion",
  "/security",
  "/pricing",
  "/demo",
  "/compliance",
  "/privacy",
  "/terms",
  "/try",
  "/call",
  "/solutions/tpas",
  "/solutions/insurers",
  "/solutions/hospitals",
  "/solutions/health",
  "/platform/channel-gateway",
  "/platform/workflow-engine",
  "/platform/truth-layer",
  "/platform/knowledge-layer",
  "/platform/policy-gate",
  "/platform/audit-ledger",
  // Any unknown address renders the 404 page; written to dist/404.html, which
  // Vercel serves (with a 404 status) for every path it has no file for.
  NOT_FOUND,
];

async function main() {
  if (!existsSync(templatePath)) {
    console.error("dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  const template = readFileSync(templatePath, "utf-8");

  // Dynamic import of the built SSR bundle
  const ssrBundlePath = join(distDir, "..", "dist-ssr", "entry-server.js");
  if (!existsSync(ssrBundlePath)) {
    console.error(
      "dist-ssr/entry-server.js not found — run `vite build --ssr src/entry-server.tsx --outDir dist-ssr` first.",
    );
    process.exit(1);
  }

  const { render } = await import(ssrBundlePath);

  for (const route of ROUTES) {
    try {
      const { html, helmet } = render(route);

      const head =
        helmet.title + helmet.meta + helmet.link + helmet.script;

      const fullHtml = template
        .replace(
          /<title>[\s\S]*?<\/title>/,
          "",
        ) // drop fallback title; helmet will inject its own
        .replace(
          "</head>",
          `${head}\n  </head>`,
        )
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`,
        );

      const outDir =
        route === "/" || route === NOT_FOUND
          ? distDir
          : join(distDir, ...route.split("/").filter(Boolean));
      mkdirSync(outDir, { recursive: true });
      const outPath = join(outDir, route === NOT_FOUND ? "404.html" : "index.html");
      writeFileSync(outPath, fullHtml);
      console.log(
        `✓ prerendered ${route.padEnd(36)} → ${outPath.replace(distDir, "dist")}`,
      );
    } catch (err) {
      console.error(`✗ failed to render ${route}:`, err);
      process.exitCode = 1;
    }
  }

  console.log("\nDone.");
}

main();
