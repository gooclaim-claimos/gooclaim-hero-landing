import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  HelmetProvider,
  type HelmetServerState,
} from "react-helmet-async";
import App from "./App";
import "./styles/globals.css";

export interface RenderResult {
  html: string;
  helmet: {
    title: string;
    meta: string;
    link: string;
    script: string;
  };
}

interface HelmetContext {
  helmet?: HelmetServerState;
}

// Render the React tree for a given URL into an HTML string + extracted helmet tags.
export function render(url: string): RenderResult {
  const helmetContext: HelmetContext = {};

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App skipRouter />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );

  const helmet = helmetContext.helmet;
  return {
    html,
    helmet: {
      title: helmet?.title.toString() ?? "",
      meta: helmet?.meta.toString() ?? "",
      link: helmet?.link.toString() ?? "",
      script: helmet?.script.toString() ?? "",
    },
  };
}
