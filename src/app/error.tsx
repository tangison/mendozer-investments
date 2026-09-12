"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";

/**
 * Route-level error boundary (HTTP 500 and unexpected client errors).
 * Error boundaries are client components, so the robots noindex guard for
 * this state comes from the server response status itself, not metadata.
 */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="not-found">
      <div className="site-container">
        <p className="eyebrow">Something went wrong</p>
        <h1>This page could not be loaded.</h1>
        <p style={{ maxWidth: "46ch" }}>
          The rest of the site is still available. Try the page again, or return to the Mendozer Investments home page.
        </p>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <button className="button button--primary" onClick={reset} type="button">
            Try again
          </button>
          <Link className="text-link" href="/">
            Return home <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
