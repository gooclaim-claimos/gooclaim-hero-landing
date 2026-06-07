import LegalShell from "@/components/LegalShell";
import SEOHead from "@/components/SEOHead";
import { SEO_PRIVACY } from "@/lib/seo";

export default function Privacy() {
  return (
    <LegalShell eyebrow="Legal · Privacy" title="Privacy Notice" updated="07 Jun 2026">
      <SEOHead seo={SEO_PRIVACY} path="/privacy" />
      <p>
        Gooclaim OS is an Insurance AI Operating System built for TPAs and
        insurers in India. We process personal data on behalf of our tenants
        (TPAs and insurers) under the{" "}
        <strong>Digital Personal Data Protection Act, 2023 (DPDP)</strong> and
        applicable IRDAI regulations. This notice explains what we collect,
        why, who sees it, and your rights.
      </p>

      <div className="callout">
        <strong>One-line summary</strong>
        Gooclaim OS is a data processor for the insurer or TPA you are
        interacting with. We act only on their lawful instructions, never use
        your data to train external models, and always require explicit
        consent before any claim workflow begins.
      </div>

      <h2>1. Who we are</h2>
      <p>
        Gooclaim Technologies Private Limited (&ldquo;Gooclaim&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a company incorporated in India
        with its registered office in Bengaluru. We operate the Gooclaim OS
        platform on behalf of insurance ecosystem partners.
      </p>

      <h2>2. Our role under DPDP</h2>
      <p>
        Under DPDP terminology, we act as a <strong>Data Processor</strong> for
        the TPA or insurer (the <strong>Data Fiduciary</strong>) that engages
        us. The Data Fiduciary determines what data is collected and why;
        Gooclaim OS executes those instructions through an audited, multi-agent
        runtime.
      </p>

      <h2>3. Data we process</h2>
      <p>To run claim communication and coordination workflows, we may process:</p>
      <ul>
        <li>
          Identifiers — name, phone number, email, claim reference, policy
          number, member ID (always hashed in our logs).
        </li>
        <li>
          Claim context — claim status, requested documents, conversation
          history across WhatsApp, voice, SMS, email and web.
        </li>
        <li>
          Health-related information shared by the claimant for the limited
          purpose of progressing the claim.
        </li>
        <li>
          Channel metadata — message timestamps, delivery receipts, device
          locale, language preference.
        </li>
        <li>
          Consent records — every consent grant and withdrawal, immutably
          logged.
        </li>
      </ul>

      <h2>4. Why we process it</h2>
      <ul>
        <li>To answer claim status queries on behalf of the insurer or TPA.</li>
        <li>
          To request and collect pending documents needed to progress a claim.
        </li>
        <li>
          To explain rejection reasons or next-step actions using approved,
          pre-reviewed templates only.
        </li>
        <li>
          To meet regulatory obligations — including the IRDAI 1-hour
          admission / 3-hour discharge cashless mandate.
        </li>
        <li>
          To produce immutable audit records for ombudsman and regulator review.
        </li>
      </ul>

      <h2>5. Consent gate</h2>
      <p>
        No claim workflow runs without an explicit <code>CONSENT_GIVEN</code>{" "}
        signal recorded against the claimant. Consent can be withdrawn at any
        time through the same channel it was given. Withdrawal is honored
        within one business day and the audit ledger reflects every state
        change.
      </p>

      <h2>6. Free-text never leaves the platform</h2>
      <p>
        Gooclaim OS sends only pre-approved templates to claimants. Every
        outbound message passes a 4-tier safety check — exact-template match,
        semantic safety, personal-data redaction, and source verification —
        before it leaves the platform. Large language models are used for
        internal reasoning, not for free-text responses to customers.
      </p>

      <h2>7. Who sees your data</h2>
      <ul>
        <li>
          The TPA or insurer that engaged Gooclaim OS for your claim, under
          their existing privacy obligations.
        </li>
        <li>
          Sub-processors used for channel delivery (e.g. WhatsApp Cloud API),
          telephony, hosting infrastructure, and observability. These are
          bound by data-processing agreements.
        </li>
        <li>
          Regulators, ombudsmen and courts where required by law.
        </li>
      </ul>
      <p>
        We do not sell personal data. We do not use claimant data to train any
        third-party models. Multi-tenant data is strictly isolated; one
        tenant&rsquo;s data is never accessible to another.
      </p>

      <h2>8. Security</h2>
      <ul>
        <li>Encryption in transit (TLS 1.2+) and at rest.</li>
        <li>Per-tenant credential isolation and encrypted credential storage.</li>
        <li>
          Personal data hashed in all internal logs — phone, name and claim
          identifiers are never logged in plaintext.
        </li>
        <li>
          Zero-trust between internal services with short-lived machine tokens.
        </li>
        <li>
          Immutable, SHA-256-chained audit ledger of every automated decision.
        </li>
        <li>
          Continuous vulnerability scanning and a responsible-disclosure
          channel at{" "}
          <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>.
        </li>
      </ul>

      <h2>9. Retention</h2>
      <p>
        Audit ledger events are retained for <strong>7 years</strong> in line
        with IRDAI record-keeping requirements. Conversation content and PII
        are retained only as long as the engaging insurer or TPA instructs us
        to retain them, after which the data is purged or returned.
      </p>

      <h2>10. Your rights under DPDP</h2>
      <ul>
        <li>Right to access the personal data we hold about you.</li>
        <li>Right to correction and erasure (subject to regulatory holds).</li>
        <li>Right to grievance redressal and right to nominate.</li>
        <li>Right to withdraw consent at any time.</li>
      </ul>
      <p>
        Because we act as a processor, requests are typically routed through
        the TPA or insurer that handles your claim. If you cannot reach them,
        write to <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a>{" "}
        and we will coordinate with the Data Fiduciary on your behalf.
      </p>

      <h2>11. International transfers</h2>
      <p>
        Production data is processed in India unless an engaging tenant
        explicitly chooses otherwise. Where transfers occur, they happen only
        to jurisdictions notified by the Government of India for DPDP
        transfers, with contractual safeguards in place.
      </p>

      <h2>12. Cookies on this website</h2>
      <p>
        This marketing website (gooclaim.com) uses only essential cookies for
        page-state and basic analytics. No advertising trackers run on this
        site. The Gooclaim OS platform itself does not rely on cookies for
        claim processing — authentication uses short-lived signed tokens.
      </p>

      <h2>13. Changes to this notice</h2>
      <p>
        We will update this notice when our practices change. The
        &ldquo;Last updated&rdquo; date at the top will always reflect the
        most recent revision. Material changes will be highlighted on the
        marketing site for at least 30 days.
      </p>

      <h2>14. Grievance officer</h2>
      <p>
        Per the DPDP Act, you may contact our Grievance Officer at{" "}
        <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a>. We will
        acknowledge within three business days and respond substantively
        within fifteen.
      </p>
    </LegalShell>
  );
}
