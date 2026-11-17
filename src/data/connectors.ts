/**
 * The connectors the site may name, each one real in code: every data source
 * here is a source in airweave-fork (`backend/airweave/platform/sources/`,
 * release/dev), which runs as Gooclaim's Data Sources; WhatsApp and email are
 * Gooclaim's own member channels. A tool with an icon but no source there
 * (Oracle, MySQL, Elastic, Mailchimp, Facebook, Calendly) is left out — the
 * site never names a connector we cannot run.
 *
 * Icons are copied unchanged from airweave-fork
 * `frontend/src/components/icons/apps/` into public/connectors/ (empty
 * `<script/>` tags stripped). Some marks are black or white and have a
 * variant for the other theme, exactly as airweave's own getAppIconUrl uses
 * them.
 */
export interface Connector {
  id: string;
  name: string;
  /** Icon file for the dark theme, when the default one disappears on dark. */
  dark?: string;
  /** Icon file for the light theme, when the default one disappears on light. */
  light?: string;
  /** A wordmark, not a square glyph: drawn wider so it is legible. */
  wide?: boolean;
  /**
   * A one-colour mark with no variant for the other theme: "white" = a dark
   * mark that sits on a white tile in the dark theme; "dark" = a white mark
   * (ServiceNow ships white) that sits on a dark tile in the light theme.
   */
  tile?: "white" | "dark";
  /** The artwork is a wordmark centred on a square canvas: crop the empty top and bottom when shown. */
  crop?: boolean;
}

const C = (id: string, name: string, v: Partial<Pick<Connector, "dark" | "light" | "wide" | "tile" | "crop">> = {}): Connector => ({ id, name, ...v });

/** Channels members reach us on (Gooclaim's own, not a Data Source). */
export const CHANNEL_CONNECTORS: Connector[] = [C("whatsapp", "WhatsApp"), C("gmail", "Gmail"), C("outlook_mail", "Outlook")];

/** Data Sources a tenant can connect: knowledge, helpdesk, CRM, work tools. */
export const SOURCE_CONNECTORS: Connector[] = [
  C("sharepoint", "SharePoint"),
  C("google_drive", "Google Drive"),
  C("onedrive", "OneDrive"),
  C("dropbox", "Dropbox"),
  C("box", "Box", { wide: true }),
  C("s3", "Amazon S3"),
  C("notion", "Notion", { dark: "notion-light" }),
  C("confluence", "Confluence"),
  C("document360", "Document360", { wide: true, tile: "white" }),
  C("google_docs", "Google Docs"),
  C("google_slides", "Google Slides"),
  C("word", "Word"),
  C("powerpoint", "PowerPoint"),
  C("onenote", "OneNote"),
  C("coda", "Coda"),
  C("slab", "Slab", { light: "slab-light", wide: true }),
  C("slite", "Slite", { wide: true, tile: "white" }),
  C("airtable", "Airtable"),
  C("servicenow", "ServiceNow", { wide: true, tile: "dark" }),
  C("salesforce", "Salesforce"),
  C("zendesk", "Zendesk", { dark: "zendesk-light" }),
  C("freshdesk", "Freshdesk"),
  C("intercom", "Intercom"),
  C("hubspot", "HubSpot"),
  C("zoho_crm", "Zoho CRM", { wide: true }),
  C("pipedrive", "Pipedrive"),
  C("attio", "Attio", { dark: "attio-light" }),
  C("apollo", "Apollo", { dark: "apollo-light", wide: true, crop: true }),
  C("jira", "Jira"),
  C("linear", "Linear", { dark: "linear-light" }),
  C("asana", "Asana"),
  C("monday", "monday.com"),
  C("clickup", "ClickUp", { dark: "clickup-light" }),
  C("trello", "Trello"),
  C("todoist", "Todoist"),
  C("slack", "Slack"),
  C("teams", "Microsoft Teams"),
  C("zoom", "Zoom"),
  C("fireflies", "Fireflies"),
  C("google_calendar", "Google Calendar"),
  C("outlook_calendar", "Outlook Calendar"),
  C("calcom", "Cal.com", { light: "calcom-light", wide: true }),
  C("github", "GitHub", { dark: "github-light" }),
  C("gitlab", "GitLab"),
  C("bitbucket", "Bitbucket"),
  C("stripe", "Stripe"),
  C("shopify", "Shopify"),
];

export const ALL_CONNECTORS: Connector[] = [...CHANNEL_CONNECTORS, ...SOURCE_CONNECTORS];
