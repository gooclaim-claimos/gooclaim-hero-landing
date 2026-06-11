import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * Dev-only middleware so the same `api/waitlist.ts` file Vercel runs in
 * production also serves /api/waitlist locally without needing `vercel dev`.
 */
function apiDevRoutes(): Plugin {
  return {
    name: "api-dev-routes",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/waitlist") return next();
        try {
          const mod = await server.ssrLoadModule("/api/waitlist.ts");
          const handler = mod.default as (
            req: typeof req,
            res: typeof res,
          ) => Promise<void> | void;
          await handler(req, res);
        } catch (e) {
          console.error("[api/waitlist] dev handler error:", e);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: "dev_handler_error" }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Make .env.local values available to the Node process running the dev
  // middleware (Vite normally only exposes VITE_*-prefixed vars to client code).
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevRoutes()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
    server: { port: 5174, strictPort: true },
    ssr: {
      noExternal: ["react-helmet-async", "react-fast-compare", "invariant"],
    },
  };
});
