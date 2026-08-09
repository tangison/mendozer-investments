"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { siteConfig } from "@/brand/site-config";
import { sectors } from "@/content/site-content";

type SubmissionState = "idle" | "opening" | "error";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const organisation = String(data.get("organisation") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const sector = String(data.get("sector") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Website enquiry${sector ? ` — ${sector}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Organisation: ${organisation || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Sector: ${sector || "Not specified"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    try {
      const configuredEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
      if (configuredEndpoint) {
        const response = await fetch(configuredEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, organisation, email, phone, sector, message }),
        });
        if (!response.ok) throw new Error("Contact endpoint failed");
        setSubmissionState("opening");
        form.reset();
        return;
      }

      // Intentional static-site fallback: opens an addressed message without collecting visitor data on-site.
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmissionState("opening");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label>
          <span>Name <b aria-hidden="true">*</b></span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label>
          <span>Organisation</span>
          <input autoComplete="organization" name="organisation" type="text" />
        </label>
        <label>
          <span>Email <b aria-hidden="true">*</b></span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Phone</span>
          <input autoComplete="tel" name="phone" type="tel" />
        </label>
      </div>
      <label>
        <span>Relevant sector</span>
        <select defaultValue="" name="sector">
          <option value="">Select a sector</option>
          {sectors.map((sector) => <option key={sector.slug} value={sector.title}>{sector.title}</option>)}
          <option value="Group enquiry">Group enquiry</option>
        </select>
      </label>
      <label>
        <span>How can we help? <b aria-hidden="true">*</b></span>
        <textarea name="message" required rows={6} />
      </label>
      <div className="contact-form__bottom">
        <button className="button button--primary" type="submit">Prepare email enquiry <ArrowIcon /></button>
        <p id="contact-form-note">Your email app will open with this message addressed to Mendozer.</p>
      </div>
      <p aria-live="polite" className={`contact-form__status contact-form__status--${submissionState}`}>
        {submissionState === "opening" ? "Your email enquiry is ready. If your mail app did not open, use the email link above." : null}
        {submissionState === "error" ? "We could not prepare the enquiry. Please email contact@mendozer.com directly." : null}
      </p>
    </form>
  );
}
