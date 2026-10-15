import LegalShell from "@/components/LegalShell";
import SEOHead from "@/components/SEOHead";
import { SEO_COMPLIANCE } from "@/lib/seo";

export default function Compliance() {
  return (
    <LegalShell
      eyebrow="Legal · Compliance"
      title="Compliance"
      updated="13 Oct 2026"
    >
      <SEOHead seo={SEO_COMPLIANCE} path="/compliance" />
      <p>
        Gooclaim OS is built for India&rsquo;s insurance regulatory regime —
        from IRDAI&rsquo;s 1-hour / 3-hour cashless mandate to the DPDP Act
        2023. Compliance is wired into the platform&rsquo;s architecture, not
        bolted on as policy. This page maps each obligation to the control
        that enforces it.
      </p>

      <div className="callout">
        <strong>One-line summary</strong>
        Every automated decision emits an immutable audit event. Every
        outbound message passes a 4-tier safety check. Every workflow starts
        with an explicit DPDP consent gate. No exceptions, no overrides.
      </div>

      <h2>1. Regulatory coverage</h2>
      <p>
        Gooclaim OS supports Customers (insurers and TPAs) in meeting
        obligations under:
      </p>
      <ul>
        <li>
          <strong>IRDAI Master Circular on Health Insurance Business (29 May
          2024)</strong> — the 1-hour cashless authorisation and 3-hour
          discharge mandate.
        </li>
        <li>
          <strong>IRDAI Master Circular on Protection of Policyholders&rsquo;
          Interests (5 Sep 2024)</strong> — 15 days to settle a claim from its
          submission, interest at bank rate + 2% a year from the day of
          intimation when it is settled late, and no claim closed for want of
          documents.
        </li>
        <li>
          <strong>IRDAI records rules</strong> — claim records,
          correspondence included, kept under the Customer&rsquo;s own
          board-approved retention policy, which those rules require it to
          hold. Gooclaim OS defaults to ten years.
        </li>
        <li>
          <strong>IRDAI Internal Ombudsman Guidelines 2025</strong> —
          mandatory internal grievance handling with audit-grade records.
        </li>
        <li>
          <strong>Digital Personal Data Protection Act, 2023 (DPDP)</strong> —
          lawful basis, consent, processor obligations, data principal
          rights.
        </li>
        <li>
          <strong>Information Technology Act, 2000 — Sections 43A and
          72A</strong> — reasonable security practices and protection of
          personal information.
        </li>
      </ul>

      <h2>2. The control map</h2>
      <p>
        Each regulatory obligation is enforced by a specific Gooclaim OS
        control. None are advisory — they are platform-enforced.
      </p>

      <h3>2.1 Consent gate (DPDP, IT Act)</h3>
      <p>
        Every conversation begins with an explicit consent check. No claim
        detail is shared in a conversation without a recorded{" "}
        <code>CONSENT_GIVEN</code> state against the claimant. The one
        exception is a notice the insurer or TPA is obliged by IRDAI to send —
        such as a request for documents a claim still needs — which goes only
        to the contact registered on the policy, carries claim information
        only, and is never sent to anyone who refused or withdrew consent.
        Consent withdrawal is honored within one business day and immutably
        logged.
      </p>

      <h3>2.2 Policy Gate (IRDAI, IT Act, brand-safety)</h3>
      <p>
        Every outbound message passes a 4-tier safety check before delivery —
        exact-template match, semantic safety check, personal-data redaction,
        and source verification. Free text never reaches a customer.
      </p>

      <h3>2.3 Audit ledger (IRDAI, Ombudsman, DPDP)</h3>
      <p>
        Every automated decision, every outbound message, every consent
        change, every policy-gate outcome is written to an append-only,
        SHA-256-chained audit ledger. Events that belong to a claim are
        retained for ten years, operational events for 90 days (see
        &sect;&nbsp;4), and both can be exported on demand.
      </p>

      <h3>2.4 Per-tenant isolation (DPDP, IT Act)</h3>
      <p>
        Multi-tenant data is isolated at every layer — credentials,
        knowledge sources, audit events, dashboards. One tenant&rsquo;s data
        is never accessible to another, even by Gooclaim engineers under
        normal operations.
      </p>

      <h3>2.5 Personal data hygiene (IT Act, DPDP)</h3>
      <p>
        Phone numbers, names, claim identifiers and other identifying fields
        are masked or hashed in internal logs — raw values are never written
        to log lines. Aadhaar, PAN, card and bank numbers are masked before a
        conversation is stored. Every language-model call goes through our
        own model gateway, and no Customer or claimant data is used to train
        a model.
      </p>

      <h3>2.6 Operational mode (IRDAI, business continuity)</h3>
      <p>
        Every workflow can be set to <code>OPERATIONAL</code>,{" "}
        <code>RESTRICTED</code> or <code>SUSPENDED</code> per tenant. The
        kill-switch is intended for incident response — for example, pausing
        outbound during a CMS outage — and is itself an audited action.
      </p>

      <h3>2.7 Templates-only output (IRDAI, brand-safety)</h3>
      <p>
        Outbound to claimants is restricted to pre-approved, versioned
        templates per channel and language, each approved by the Customer
        before it is enabled.
      </p>

      <h3>2.8 IRDAI clocks and turnaround reporting</h3>
      <p>
        Every claim carries its IRDAI clock — 1 hour for cashless
        authorisation, 3 hours for discharge, 15 days to settle — with the
        interest at stake when it runs late, shown to the Customer&rsquo;s
        team as the claim moves. Complaints carry their own clock. The
        quarterly NL-48 turnaround report is built from the same record, and
        a filed copy is frozen with its SHA-256.
      </p>

      <h2>3. Security architecture</h2>
      <ul>
        <li>Encryption in transit (TLS 1.2+) and at rest.</li>
        <li>Short-lived signed tokens for service-to-service authentication.</li>
        <li>Per-tenant credential vaults, encrypted at the field level.</li>
        <li>
          Zero-trust between internal services — no implicit network trust.
        </li>
        <li>
          Static analysis, dependency and secret scanning in the release
          process.
        </li>
        <li>
          Responsible-disclosure channel at{" "}
          <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>.
        </li>
      </ul>

      <h2>4. Data residency and retention</h2>
      <p>
        Production data is processed in India unless an engaging Customer
        explicitly chooses otherwise.
      </p>
      <p>
        Retention is not one period. It turns on whether something is part of a
        claim record:
      </p>
      <ul>
        <li>
          <strong>Ten years</strong>, from the last activity on the claim —
          claim documents, a conversation that belongs to a claim or complaint,
          and the audit ledger events for that claim. IRDAI requires a Customer
          to hold a board-approved records and archival policy rather than
          fixing a period itself, so ten years is our default: a Customer may
          set it <em>higher</em>, up to thirty years, and cannot set it lower.
        </li>
        <li>
          <strong>90 days</strong> — conversation content that belongs to no
          claim or complaint, expired or used upload links, and operational
          ledger events that carry no compliance obligation.
        </li>
        <li>
          <strong>30 days</strong> — the bytes of a file that was refused or
          held and never became a claim document.
        </li>
      </ul>
      <p>
        A legal hold — a court case, a regulator&rsquo;s order — suspends every
        deletion until the Customer lifts it. Beyond these periods, data is
        purged or returned per the engagement&rsquo;s data-processing terms.
      </p>

      <h2>5. Sub-processors</h2>
      <p>
        Gooclaim OS uses a small set of sub-processors: cloud hosting and
        email delivery, WhatsApp delivery, and AI models reached only through
        our own model gateway. Each
        sub-processor is bound by a data-processing agreement and is reviewed
        annually. A live list is available to Customers under the MSA.
      </p>

      <h2>6. Incident response</h2>
      <p>
        We maintain an incident-response playbook covering detection,
        containment, eradication, recovery and post-incident review. Security
        incidents involving personal data are reported to the Data Fiduciary
        (the engaging insurer or TPA) without delay, so that it can inform the
        people affected and the Data Protection Board of India within the
        timelines the DPDP Rules set, and as the MSA requires. The current playbook
        version is available to Customers under NDA.
      </p>

      <h2>7. Responsible AI posture</h2>
      <ul>
        <li>
          Large language models are used for internal reasoning, not for
          free-text responses to claimants.
        </li>
        <li>
          The Policy Gate validates every outbound for brand-safety,
          regulatory and factual grounding before delivery.
        </li>
        <li>
          We never use Customer or claimant data to train external,
          third-party models.
        </li>
        <li>
          Model providers are kept behind an internal model gateway so
          providers can be swapped without changing application code.
        </li>
        <li>
          Every model invocation that influences a customer-visible outcome
          is written to the audit ledger.
        </li>
      </ul>

      <h2>8. Customer responsibilities</h2>
      <p>
        Compliance is a shared model. Gooclaim OS provides platform-level
        controls; the engaging Customer remains responsible for:
      </p>
      <ul>
        <li>
          Maintaining a lawful basis under DPDP for each claimant
          interaction.
        </li>
        <li>
          Approving templates before they are enabled in production.
        </li>
        <li>
          Responding to claimant grievances and regulator requests within
          applicable timelines.
        </li>
        <li>
          Keeping API credentials and operator accounts secure.
        </li>
      </ul>

      <h2>9. Contact</h2>
      <ul>
        <li>
          <strong>Compliance questions</strong> →{" "}
          <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a>
        </li>
        <li>
          <strong>Security disclosures</strong> →{" "}
          <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>
        </li>
        <li>
          <strong>Grievance officer (DPDP)</strong> →{" "}
          <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a> ·
          acknowledged within 3 business days, answered within the time the
          DPDP Rules allow
        </li>
        <li>
          Read alongside this page — <a href="/privacy">Privacy Notice</a> and{" "}
          <a href="/terms">Terms of Service</a>. The three are meant to be
          read together.
        </li>
      </ul>
    </LegalShell>
  );
}
