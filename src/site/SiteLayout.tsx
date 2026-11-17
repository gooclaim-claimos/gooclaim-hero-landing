import { type ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

/** Every page: the shared header, the page, the shared footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", lineHeight: 1.5 }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
