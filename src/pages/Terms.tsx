import LegalShell from "@/components/LegalShell";
import SEOHead from "@/components/SEOHead";
import { SEO_TERMS } from "@/lib/seo";

export default function Terms() {
  return (
    <LegalShell eyebrow="Legal · Terms" title="Terms of Service" updated="07 Jun 2026">
      <SEOHead seo={SEO_TERMS} path="/terms" />
      <p>
        These terms govern access to the marketing website at gooclaim.com and
        any preview, pilot or production access to the Gooclaim OS platform.
        Commercial use of the platform is additionally governed by the signed
        Master Services Agreement (&ldquo;MSA&rdquo;) between Gooclaim and the
        engaging insurer or TPA. Where these terms and the MSA conflict, the
        MSA controls.
      </p>

      <div className="callout">
        <strong>One-line summary</strong>
        Gooclaim OS is an operating system for insurance communication. We
        provide the platform, your team configures workflows and templates,
        and the regulated entity (insurer or TPA) remains the data fiduciary
        and the decision-maker for every claim.
      </div>

      <h2>1. Parties</h2>
      <p>
        &ldquo;Gooclaim&rdquo; means Gooclaim Technologies Private Limited,
        India. &ldquo;Customer&rdquo; means the insurer, TPA, or other
        regulated entity that signs an MSA to use Gooclaim OS in production.
        &ldquo;Visitor&rdquo; means anyone using this marketing website.
      </p>

      <h2>2. What the platform does</h2>
      <p>
        Gooclaim OS is a multi-tenant agentic claim communication and
        coordination platform. It connects to a Customer&rsquo;s claims
        management systems, knowledge sources, and customer channels
        (WhatsApp, voice, SMS, email, web), and orchestrates workflows like
        claim status, document collection and reason-for-rejection responses.
      </p>

      <h2>3. What the platform is not</h2>
      <ul>
        <li>
          <strong>Not the insurer.</strong> Underwriting, claim decisioning,
          and policy interpretation always remain with the regulated Customer.
        </li>
        <li>
          <strong>Not a free-text generator.</strong> Outbound to claimants is
          template-only and routed through the L5 Policy Gate before delivery.
        </li>
        <li>
          <strong>Not a payment gateway.</strong> We integrate with payment
          rails operated by licensed providers — we never custody funds.
        </li>
        <li>
          <strong>Not a CMS replacement.</strong> We read from existing claim
          systems; we do not displace systems of record.
        </li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to use Gooclaim OS or this website to:</p>
      <ul>
        <li>Violate any law or regulation, including IRDAI and DPDP rules.</li>
        <li>
          Send communications to people who have not provided lawful consent
          via the platform.
        </li>
        <li>
          Bypass the Policy Gate, the consent gate, the audit ledger, or any
          rate-limit or safety control.
        </li>
        <li>
          Reverse engineer, scrape, or attempt to extract source code or model
          weights from the platform.
        </li>
        <li>Impersonate any other tenant or claimant.</li>
        <li>
          Introduce malware, conduct denial-of-service attempts, or otherwise
          interfere with platform availability.
        </li>
      </ul>

      <h2>5. Customer responsibilities</h2>
      <ul>
        <li>
          Maintain a lawful basis (including DPDP consent) for every claimant
          contact processed through Gooclaim OS.
        </li>
        <li>
          Review and approve every outbound template before it is enabled in
          production.
        </li>
        <li>
          Keep credentials and API tokens confidential and rotate them on the
          schedule set in the MSA.
        </li>
        <li>
          Respond to claimant grievances and regulatory requests within
          applicable timelines.
        </li>
      </ul>

      <h2>6. Pilot and preview access</h2>
      <p>
        Pilot, sandbox or preview access is provided strictly for evaluation,
        without warranty, on an as-is basis. Pilot access does not constitute
        a commercial license to use Gooclaim OS in production. Production use
        requires an executed MSA.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        Gooclaim retains all intellectual property rights in the platform —
        including agent designs, the audit ledger format, the policy-gate
        tiers and all underlying software. Customer retains all rights in its
        own data, templates and configurations. Nothing in these terms grants
        either party rights in the other&rsquo;s trademarks.
      </p>

      <h2>8. Confidentiality</h2>
      <p>
        Each party will protect the other&rsquo;s confidential information
        using at least the same care it uses for its own, and not less than
        reasonable care. This obligation survives termination.
      </p>

      <h2>9. Security and privacy</h2>
      <p>
        Security practices and personal-data handling are described in the{" "}
        <a href="/privacy">Privacy Notice</a>, which is incorporated into
        these terms by reference. Security disclosures should be sent to{" "}
        <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>.
      </p>

      <h2>10. Service availability</h2>
      <p>
        Production service levels, support windows, and incident response are
        defined in the MSA. The marketing website and pilot environments are
        offered on a best-effort basis without an availability commitment.
      </p>

      <h2>11. Disclaimer of warranties</h2>
      <p>
        Except as expressly stated in the MSA, the platform is provided
        &ldquo;as is&rdquo; without warranties of any kind, whether express,
        implied or statutory, including merchantability, fitness for a
        particular purpose and non-infringement.
      </p>

      <h2>12. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, neither party will be liable
        for indirect, incidental, special, consequential or punitive damages.
        Direct-damage caps, indemnities and exceptions (including for breach
        of confidentiality and for personal-data incidents) are set in the
        MSA.
      </p>

      <h2>13. Termination</h2>
      <p>
        Pilot or preview access may be terminated by either party on notice.
        Production termination follows the MSA. On termination, Gooclaim will
        return or destroy Customer personal data per the MSA, subject to
        regulatory retention obligations.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts at Bengaluru,
        Karnataka shall have exclusive jurisdiction, subject to any
        arbitration clause set out in the MSA.
      </p>

      <h2>15. Changes</h2>
      <p>
        We may update these terms. Material changes affecting production
        Customers are notified per the MSA. For Visitors, the &ldquo;Last
        updated&rdquo; date above will always reflect the current version.
      </p>

      <h2>16. Contact</h2>
      <p>
        For commercial questions, write to{" "}
        <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a>. For
        security disclosures, write to{" "}
        <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>.
      </p>
    </LegalShell>
  );
}
