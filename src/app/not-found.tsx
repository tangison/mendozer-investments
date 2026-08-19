import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="site-container">
        <p className="eyebrow">404</p>
        <h1>This route is not part of the Mendozer site.</h1>
        <Link className="button button--primary" href="/">Return home <ArrowIcon /></Link>
      </div>
    </section>
  );
}
