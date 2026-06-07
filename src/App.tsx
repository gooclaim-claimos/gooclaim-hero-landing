import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Compliance from "./pages/Compliance";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import UseCase from "./pages/UseCase";
import Module from "./pages/Module";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/use-cases/:slug" element={<UseCase />} />
        <Route path="/platform/:slug" element={<Module />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

interface AppProps {
  skipRouter?: boolean;
  children?: ReactNode;
}

export default function App({ skipRouter, children }: AppProps = {}) {
  if (skipRouter) {
    return <>{children ?? <AppRoutes />}</>;
  }
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
