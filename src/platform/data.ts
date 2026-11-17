import { SAMPLE_CLAIM } from "@/data/sampleClaim";

export const CLAIM = SAMPLE_CLAIM.number;

export const STATS = [
  { k: "CHANNELS", v: "2 live", d: "WhatsApp · Email" },
  { k: "CMS / HELPDESK", v: "14+", d: "ServiceNow · Salesforce · Zendesk · Jira" },
  { k: "KNOWLEDGE", v: "30+", d: "SharePoint · Drive · Notion · Confluence" },
  { k: "MORE CHANNELS", v: "Early access", d: "Voice calls now · SMS next" },
];


export interface Step {
  title: string;
  tech: string;
  desc: string;
  did: string;
}

export const STEPS: Step[] = [
  { title: "Any data source", tech: "REST · SOAP · SFTP · Webhook · batch file", desc: "Opens the claim in your own claims system and reads where it actually stands — read-only, with its own encrypted credentials.", did: "Read from your claims system · read-only" },
  { title: "Any knowledge layer", tech: "Notion · Drive · SharePoint · S3 · policy PDFs", desc: "Finds what the answer has to rest on — the policy wording, the query letter already sent, the way this was handled last time.", did: "Query letter sent on day 6 · one document still open" },
  { title: "Any workflow", tech: "Declared once · versioned · switched on per tenant", desc: "Runs the workflow your team switched on in the Console — declared once and versioned, not rebuilt for each customer.", did: "Claim status · your switched-on workflow" },
  { title: "Every word checked", tech: "The Policy Gate · on every outbound message", desc: "Every value in the draft is matched back to the record it came from, and the wording is one your team approved. No match, nothing leaves.", did: "4 of 4 values matched to the record" },
  { title: "Any channel, any interaction", tech: "Messaging and email today · voice in early access", desc: "Leaves on the channel it arrived on, in the language it arrived in — and every channel lands on the same claim record and the same audit ledger.", did: "Sent on WhatsApp · in English" },
];

export interface Layer {
  name: string;
  tag: string;
  desc: string;
  points: string[];
  solves: string;
  /** The layer's own page under /platform, where one exists. */
  slug?: string;
}

export const LAYERS: Layer[] = [
  { name: "Channel Gateway", slug: "channel-gateway", tag: "Every claimant message starts here.", desc: "One inbound layer for every channel a customer actually uses — secure, tenant-scoped, ready out of the box.", points: ["WhatsApp", "Email", "Per-tenant routing", "Voice — early access", "SMS — next"], solves: "Channel fragmentation — customer on WhatsApp, agent on a portal, no unified view." },
  { name: "Workflow Engine", slug: "workflow-engine", tag: "Multi-agent claim reasoning.", desc: "Runs the workflows your team switches on, per claim — declared once, versioned and durable across days.", points: ["Per-claim reasoning", "Versioned workflows", "Per-tenant switches"], solves: "Rebuilding flows for every customer, and work that loses its place." },
  { name: "Truth Layer", slug: "truth-layer", tag: "Read your CMS, never write.", desc: "Reads any claims system by API, secure file drop or batch upload. Read-only — your system stays the source of truth.", points: ["API", "SFTP", "Batch upload", "Read-only"], solves: "Answers that were never checked against the actual claim." },
  { name: "Knowledge Layer", slug: "knowledge-layer", tag: "Your policy library, AI-searchable.", desc: "Your policy wording, letters and procedures — searchable, and quoted word for word when an answer rests on them.", points: ["SharePoint", "Drive", "Notion", "Policy PDFs"], solves: "One FAQ, written once, already out of date." },
  { name: "Outbound Engine", tag: "Pre-approved wording only.", desc: "Messaging and email out, templates only — in the member’s language, on the channel they used.", points: ["Templates only", "No free text", "Member’s language"], solves: "Agents improvising messages a regulator may later read." },
  { name: "Policy Gate", slug: "policy-gate", tag: "Compliant by architecture.", desc: "Every outbound value is matched to the record it came from. If the gate cannot be reached, nothing is sent.", points: ["Value matching", "Approved wording", "Fail closed"], solves: "An AI that writes a sentence and sends it." },
  { name: "Observability", tag: "Clocks · Dashboards · Reports.", desc: "Regulator clocks per claim, per-tenant dashboards, and turnaround reports built from the record.", points: ["Legal clocks", "Dashboards", "Regulator reports"], solves: "Breaches discovered after they become payments." },
];

export const LEDGER_TAGS = ["Append-only", "SHA-256 chained", "10-year retention", "Regulator export", "Consent native"];

export const LEDGER_ROWS: [string, string][] = [
  ["event", "Claim status shared with member"],
  ["customer", "Sample TPA"],
  ["claim", "hashed · 8c4f…e21a"],
  ["source", "Your claims system"],
  ["time", "14 Oct 2026 · 14:22:08 IST"],
];

export const TODAY = [
  { where: "WHATSAPP TOOL", what: "“Thanks, we will get back to you.”", gap: "Never read the claim" },
  { where: "YOUR CLAIMS SYSTEM", what: "Query raised on day 6", gap: "Nobody asked it" },
  { where: "EMAIL", what: "Query letter sent on day 6", gap: "A separate thread" },
  { where: "A SPREADSHEET", what: "Chased? Someone thinks so", gap: "Kept by hand" },
  { where: "THE LEGAL CLOCK", what: "In India, 15 days from submission", gap: "Lives in no system" },
];

export const WITH_GC = [
  { when: "Day 6", what: "Query raised", how: "Read from your claims system" },
  { when: "Day 6", what: "Query letter sent", how: "On the claim, not in an inbox" },
  { when: "Day 9", what: "Member told, in their language", how: "WhatsApp · approved wording" },
  { when: "Day 11", what: "Document received", how: "Upload link · checked on arrival" },
  { when: "Now", what: "4 days left of 15", how: "India’s IRDAI clock, from submission" },
];
