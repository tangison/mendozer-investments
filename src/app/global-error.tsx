"use client";

/**
 * Global error boundary: catches errors outside the route-level boundary,
 * including the root layout. It owns its own <html> and <body>, so it stays
 * on brand even when the shell itself has failed. Rendered for HTTP 500.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f8fc", color: "#1c4e89", fontFamily: "Arial, sans-serif" }}>
        <main style={{ maxWidth: "46rem", margin: "0 auto", padding: "8rem 1.5rem 4rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Something went wrong</p>
          <h1 style={{ fontSize: "2.5rem", lineHeight: 1.05, margin: "1rem 0 1.5rem" }}>This page could not be loaded.</h1>
          <p style={{ maxWidth: "46ch", lineHeight: 1.65, color: "#2b2f36" }}>
            The rest of the site is still available. Try the page again, or return to the Mendozer Investments home page.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center", marginTop: "2rem" }}>
            <button
              onClick={reset}
              type="button"
              style={{ background: "#0b1e3d", border: 0, borderRadius: "9999px", color: "#ffffff", cursor: "pointer", font: "inherit", fontWeight: 500, padding: "0.9rem 1.6rem" }}
            >
              Try again
            </button>
            {/* A hard anchor is deliberate here: if the app has crashed, the client router cannot be trusted to route. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ color: "#1c4e89", fontWeight: 500 }}>Return home</a>
          </div>
        </main>
      </body>
    </html>
  );
}
