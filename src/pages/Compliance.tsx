import LegalShell from "@/components/LegalShell";
import SEOHead from "@/components/SEOHead";
import { SEO_COMPLIANCE } from "@/lib/seo";

export default function Compliance() {
  return (
    <LegalShell
      eyebrow="Legal · Compliance"
      title="Compliance"
      updated="07 Jun 2026"
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
          <strong>IRDAI Master Circular on Protection of Policyholders&rsquo;
          Interests (29 May 2024)</strong> — including the 1-hour cashless
          admission approval and 3-hour discharge mandate.
        </li>
        <li>
          <strong>IRDAI PPHI Circular (Sept 2024)</strong> — daily penalty
          framework (Bank Rate + 2%) for delayed cashless and discharge.
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
        <li>
          <strong>TRAI DLT framework</strong> — registered template, sender ID
          and consent records for outbound communications.
        </li>
      </ul>

      <h2>2. The control map</h2>
      <p>
        Each regulatory obligation is enforced by a specific Gooclaim OS
        control. None are advisory — they are platform-enforced.
      </p>

      <h3>2.1 Consent gate (DPDP, IT Act)</h3>
      <p>
        Every workflow begins with an explicit consent check. No claim
        message proceeds without a recorded <code>CONSENT_GIVEN</code> state
        against the claimant. Consent withdrawal is honored within one
        business day and immutably logged.
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
        SHA-256-chained audit ledger. Records are retained for seven years
        and can be exported in IRDAI-required format on demand.
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
        are hashed in all internal logs. Raw values are never written to
        log lines, never sent to language models, and never persisted
        outside the encrypted application database.
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
        templates per channel and language. The approval workflow is
        explicit; rollback to the last approved version is one click.
      </p>

      <h3>2.8 SLA observability (IRDAI 1hr / 3hr mandate)</h3>
      <p>
        Per-tenant dashboards track time-to-acknowledge, time-to-decision and
        time-to-discharge against the regulatory clock. Breaches trigger
        alerts and feed the audit ledger; nothing about SLA performance is
        unobserved.
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
          Continuous vulnerability scanning across container images and
          dependencies.
        </li>
        <li>
          Static analysis, secret scanning and policy checks on every code
          change before merge.
        </li>
        <li>
          Responsible-disclosure channel at{" "}
          <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>{" "}
          with a published acknowledgement window.
        </li>
      </ul>

      <h2>4. Data residency and retention</h2>
      <p>
        Production data is processed in India unless an engaging Customer
        explicitly chooses otherwise. Audit ledger events are retained for
        seven years in line with IRDAI record-keeping requirements.
        Operational data (conversation content, claim metadata) is retained
        only as long as the Customer instructs, after which it is purged or
        returned per the engagement&rsquo;s data-processing terms.
      </p>

      <h2>5. Sub-processors</h2>
      <p>
        Gooclaim OS uses a small, audited set of sub-processors for hosting,
        channel delivery, telephony, observability and email. Each
        sub-processor is bound by a data-processing agreement and is reviewed
        annually. A live list is available to Customers under the MSA.
      </p>

      <h2>6. Independent assurance roadmap</h2>
      <p>
        We are pursuing independent assurance commensurate with our scale and
        regulatory exposure:
      </p>
      <ul>
        <li>
          <strong>ISO/IEC 27001</strong> — information security management
          system certification (in progress).
        </li>
        <li>
          <strong>SOC 2 Type II</strong> — controls report covering security,
          availability and confidentiality (planned).
        </li>
        <li>
          <strong>Annual VAPT</strong> — application and infrastructure
          penetration testing by independent firms.
        </li>
        <li>
          <strong>DPDP readiness review</strong> — annual independent review
          against DPDP Act and forthcoming rules.
        </li>
      </ul>

      <h2>7. Incident response</h2>
      <p>
        We maintain an incident-response playbook covering detection,
        containment, eradication, recovery and post-incident review. Security
        incidents involving personal data are reported to the Data Fiduciary
        (the engaging insurer or TPA) within the timelines required by DPDP
        and the MSA, and to regulators where applicable. The current playbook
        version is available to Customers under NDA.
      </p>

      <h2>8. Responsible AI posture</h2>
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

      <h2>9. Customer responsibilities</h2>
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

      <h2>10. Contact</h2>
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
          acknowledged within 3 business days, substantive response within 15
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
