import LegalShell from "@/components/LegalShell";
import SEOHead from "@/components/SEOHead";
import { SEO_PRIVACY } from "@/lib/seo";

export default function Privacy() {
  return (
    <LegalShell eyebrow="Legal · Privacy" title="Privacy Notice" updated="30 Oct 2026">
      <SEOHead seo={SEO_PRIVACY} path="/privacy" />
      <p>
        Gooclaim OS is a Claim OS used by insurers and third-party
        administrators (TPAs) in India. This notice explains what personal
        data we handle, why, who sees it, how long we keep it and how to
        exercise your rights under the{" "}
        <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>{" "}
        and the <strong>DPDP Rules, 2025</strong>, as they come into force.
      </p>

      <div className="callout">
        <strong>One-line summary</strong>
        If you are a claimant, your insurer or TPA decides how your data is
        used and we process it only on their instructions. If you visit this
        website or ask us for a walkthrough, we decide — and we use what you give us
        only to contact you about Gooclaim OS. We do not sell personal data
        and we do not use it to train AI models.
      </div>

      <h2>1. Who we are</h2>
      <p>
        Gooclaim Technologies Private Limited (&ldquo;Gooclaim&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a company incorporated in India
        with its registered office in Bengaluru. We build and operate the
        Gooclaim OS platform and this website, gooclaim.com.
      </p>

      <h2>2. Our two roles under the DPDP Act</h2>
      <ul>
        <li>
          <strong>For claimants and policyholders, we are a Data
          Processor.</strong> The insurer or TPA handling your claim is the{" "}
          <strong>Data Fiduciary</strong>: it decides what data is processed
          and why, and its own privacy notice is the one that governs your
          data. Gooclaim OS processes that data only on its instructions, under
          a contract with it. Sections 3 to 9 describe how.
        </li>
        <li>
          <strong>For visitors to gooclaim.com and people who ask us for a
          walkthrough, we are the Data Fiduciary.</strong> Section 10 describes
          that data.
        </li>
      </ul>

      <h2>3. Claimant data we process</h2>
      <p>On behalf of your insurer or TPA, and only what a workflow needs:</p>
      <ul>
        <li>
          <strong>Identity and contact</strong> — name, mobile number, email
          address, policy number, member ID and claim reference.
        </li>
        <li>
          <strong>Claim information</strong> — the claim&rsquo;s status, the
          documents it still needs, the reason for a query, deduction or
          decision, and its regulatory clock, as recorded in your
          insurer&rsquo;s or TPA&rsquo;s own claims system.
        </li>
        <li>
          <strong>Documents you upload</strong> through a secure upload link,
          such as a discharge summary or bills. These can contain health
          information.
        </li>
        <li>
          <strong>Your conversation</strong> with the insurer or TPA on
          WhatsApp, email or any other channel they turn on, including any
          complaint you raise.
        </li>
        <li>
          <strong>Consent and verification records</strong> — when you gave or
          withdrew consent, and whether a one-time code was verified (the code
          itself is not kept in the conversation record).
        </li>
        <li>
          <strong>Technical data</strong> — message times, delivery receipts
          and language preference.
        </li>
      </ul>
      <p>
        Aadhaar, PAN, card and bank numbers are masked before a conversation
        is stored, and identifying details are masked or hashed in our
        internal logs.
      </p>

      <h2>4. Why we process it</h2>
      <ul>
        <li>To tell you the status of your claim, with the source and date.</li>
        <li>To ask for, collect and check the documents your claim needs.</li>
        <li>
          To explain a query, deduction or decision, using wording your
          insurer or TPA has approved.
        </li>
        <li>To record and track a complaint, and send you its outcome.</li>
        <li>To confirm it is you before sharing anything personal.</li>
        <li>
          To help your insurer or TPA meet IRDAI timelines and reporting, and
          to keep an audit record of what was done and said.
        </li>
      </ul>

      <h2>5. Consent, and the one exception</h2>
      <p>
        No conversation about your claim goes ahead until you have given
        consent, and that consent is recorded. You can withdraw it at any time
        on the channel where you gave it; once withdrawn, the conversation
        stops.
      </p>
      <p>
        The one exception is a notice your insurer or TPA is obliged by IRDAI
        to send you — for example, a request for a document your claim still
        needs. Such a notice goes only to the contact registered on your
        policy, carries claim information only and nothing promotional, and is
        never sent if you refused or withdrew consent.
      </p>

      <h2>6. How messages to you are made</h2>
      <p>
        You receive only messages your insurer or TPA has approved. Before any
        message is sent, every value in it is checked against your
        insurer&rsquo;s or TPA&rsquo;s record. AI models help us understand
        your question and choose the right approved message; they do not write
        free-text replies to you. Every AI call goes through our own model
        gateway, and your data is not used to train any model.
      </p>

      <h2>7. Who sees your data</h2>
      <ul>
        <li>
          The insurer or TPA handling your claim, and only its staff whose role
          allows it.
        </li>
        <li>
          Service providers we use to run the platform, under contract with us:
          cloud hosting, storage, encryption keys and email delivery (Amazon
          Web Services), WhatsApp delivery (Meta&rsquo;s WhatsApp Business
          Platform), and AI models (Anthropic, OpenAI and Mistral AI), reached
          only through our own model gateway.
        </li>
        <li>Regulators, courts and authorities, where the law requires it.</li>
      </ul>
      <p>
        Each insurer&rsquo;s or TPA&rsquo;s data is kept apart from every
        other&rsquo;s. We do not sell personal data.
      </p>

      <h2>8. How long we keep it</h2>
      <p>
        There is no single answer, and we would rather give you the real one.
        Everything below turns on one question:{" "}
        <strong>is this part of a claim record?</strong> If it is, it is kept
        for years. If it is not, it is deleted in months.
      </p>

      <p>
        <strong>Kept for ten years</strong> — from the last activity on the
        claim. IRDAI requires your insurer or TPA to keep insurance records
        under a retention policy approved by its own board, rather than fixing
        a period itself. Ten years is the default Gooclaim OS applies, and they
        may set it higher:
      </p>
      <ul>
        <li>documents you upload for a claim;</li>
        <li>
          a conversation that is part of a claim or a complaint — including
          what we asked you for and what we told you;
        </li>
        <li>
          the audit record of what the platform did on that claim: every
          automated decision, every message sent, every consent change.
        </li>
      </ul>

      <p>
        <strong>Deleted after 90 days:</strong>
      </p>
      <ul>
        <li>
          a conversation that turns out not to belong to any claim or complaint
          — if you write to us and there is no case, it does not become a
          record;
        </li>
        <li>an upload link once it has been used or has expired;</li>
        <li>
          the platform&rsquo;s own operational logs, which carry no compliance
          obligation.
        </li>
      </ul>

      <p>
        <strong>Deleted after 30 days:</strong> a file that was refused or held
        — if we could not accept your upload, we do not keep it.
      </p>

      <p>
        Two things can change these periods. Your insurer or TPA may choose to
        keep claim records <em>longer</em> than ten years, up to thirty — never
        shorter. And a legal hold, such as a court case or a regulator&rsquo;s
        order, stops every deletion until it is lifted.
      </p>

      <p>
        When an insurer or TPA stops using Gooclaim OS, its data is returned or
        deleted as its contract says, except where a law requires it to be kept
        longer.
      </p>

      <h2>9. Your rights as a claimant</h2>
      <p>Under the DPDP Act you have the right to:</p>
      <ul>
        <li>get a summary of your personal data and how it is processed (section 11);</li>
        <li>have it corrected, completed, updated or erased (section 12);</li>
        <li>have a grievance addressed (section 13);</li>
        <li>nominate someone to act for you if you die or cannot act (section 14);</li>
        <li>withdraw consent at any time.</li>
      </ul>
      <p>
        Because your insurer or TPA is the Data Fiduciary, please send these
        requests to them first. If you cannot reach them, write to{" "}
        <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a> and we
        will pass your request to them and help them answer it. Erasure may be
        limited where a claim record has to be kept — under your insurer&rsquo;s or
        TPA&rsquo;s IRDAI records policy, or a legal hold. If your grievance is not resolved, you may
        complain to the <strong>Data Protection Board of India</strong>.
      </p>
      <p>
        If we become aware of a breach affecting your data, we tell your
        insurer or TPA without delay, so that it can inform you and the Data
        Protection Board as the DPDP Rules require.
      </p>

      <h2>10. Website visitors and walkthrough requests</h2>
      <p>For this data, Gooclaim is the Data Fiduciary.</p>
      <ul>
        <li>
          <strong>What we collect</strong> — when you ask for a walkthrough: your
          name, work email, company, and, if you choose to give them, your role
          and monthly claim volume; if you book a time, the slot you pick and
          any notes you add; plus which button on the site you used and
          the campaign tags in the link that brought you here (such as{" "}
          <code>utm_source</code>). These tags are read from the link itself;
          we do not set cookies to track you.
        </li>
        <li>
          <strong>Why</strong> — to reply to you, arrange a walkthrough and
          keep you informed about Gooclaim OS. We do not use it for anything
          else and we do not sell or share it for marketing.
        </li>
        <li>
          <strong>Where it goes</strong> — the website runs on Vercel; walkthrough
          requests are kept in a Google Sheet in our Google account and emails
          are sent through Resend. If you pick a time, the booking is handled
          by Cal.com and added to our Google Calendar. These providers may
          process data outside India.
        </li>
        <li>
          <strong>How long</strong> — until you ask us to remove it, or when we
          no longer need it to contact you about Gooclaim OS.
        </li>
        <li>
          <strong>Your rights</strong> — the same as in section 9. Write to{" "}
          <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a> to
          see, correct or delete your entry, or to stop hearing from us.
        </li>
      </ul>

      <h2>11. Cookies and analytics on this website</h2>
      <p>
        This website shows no advertising and runs no advertising trackers. It
        uses Vercel Web Analytics and Speed Insights to count page views and
        measure page speed in aggregate; they do not use cookies to identify
        you. To suggest the page for your country, the home page reads only
        your country from your connection; we do not read or keep your IP
        address, and we do not store your country. If you close that
        suggestion, your browser remembers it so it does not appear again.
        The Gooclaim OS platform signs users in with short-lived tokens.
      </p>

      <h2>12. Security</h2>
      <ul>
        <li>Encryption in transit (TLS 1.2 or higher) and at rest.</li>
        <li>
          Each insurer&rsquo;s or TPA&rsquo;s data isolated at every layer. The tenant
          is taken from the signed-in session alone, and a cross-tenant request
          is refused and recorded.
        </li>
        <li>
          Staff sign-in supports multi-factor authentication, and each person
          sees only what their role allows.
        </li>
        <li>An append-only, tamper-evident audit ledger of what the platform does.</li>
        <li>
          A responsible-disclosure channel at{" "}
          <a href="mailto:security@gooclaim.com">security@gooclaim.com</a>.
        </li>
      </ul>

      <h2>13. Where data is processed</h2>
      <p>
        Gooclaim OS runs on Amazon Web Services. The hosting region is agreed
        with each insurer or TPA in its contract and can be an India region.
        The AI model providers named in section 7 may process data outside
        India. Any transfer outside India is made only as section 16 of the
        DPDP Act allows — never to a country the Government of India has
        restricted — and with contractual safeguards.
      </p>

      <h2>14. Children</h2>
      <p>
        This website and our walkthrough requests are not meant for anyone under 18. Where
        a claim concerns a child, the insurer or TPA deals with the parent or
        lawful guardian, as the DPDP Act requires.
      </p>

      <h2>15. Changes to this notice</h2>
      <p>
        We will update this notice when our practices or the law change. The
        &ldquo;Last updated&rdquo; date at the top always shows the latest
        version.
      </p>

      <h2>16. Grievance officer and contact</h2>
      <p>
        For any question or grievance about personal data, write to our
        Grievance Officer at{" "}
        <a href="mailto:contact@gooclaim.com">contact@gooclaim.com</a>. We will
        acknowledge it within three business days and respond within the time
        the DPDP Rules allow. If you are not satisfied, you may complain to
        the Data Protection Board of India.
      </p>
    </LegalShell>
  );
}
