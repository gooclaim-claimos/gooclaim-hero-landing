/**
 * The languages this platform answers in, and the ones it only reads.
 *
 * 🔴 Both lists are taken from the code, not from a deck:
 *   - answered  → `gooclaim-gateway/config/languages.yml` (`supported`, active)
 *   - read      → `gooclaim_shared.enums.detected_language.LANGUAGES`
 *     (the nine with `serves: None`, each with its own script — the native
 *     names below are copied from that file character for character)
 *
 * Nothing here claims a language the platform cannot actually handle. A member
 * writing in one of the nine is TOLD so in their own language rather than
 * answered in the wrong one, which is the behaviour this section shows.
 */

export interface ServedLanguage {
  code: "EN" | "HI" | "HI_EN";
  /** English name — the label a visitor reads. */
  name: string;
  /** The name in its own script. */
  native: string;
  /** What the member sent, in this language. */
  inbound: string;
  /** How the reply goes out, in this language. */
  outbound: string;
  /** The last stamp, which names the language the reply left in. */
  sentStamp: string;
}

export interface ReadLanguage {
  code: string;
  name: string;
  native: string;
  /** Right-to-left script — Urdu is the only one here. */
  rtl?: boolean;
}

/** `config/languages.yml` → supported, active: true. Default is HI_EN. */
export const SERVED: ServedLanguage[] = [
  {
    code: "EN",
    name: "English",
    native: "English",
    inbound: "What is happening with CLM-2487? It has been 9 days.",
    outbound:
      "Your claim CLM-2487 is with the medical team. We are still waiting on the discharge summary — please send it using this link.",
    sentStamp: "Sent on WhatsApp · in English",
  },
  {
    code: "HI",
    name: "Hindi",
    native: "हिन्दी",
    inbound: "मेरे क्लेम CLM-2487 का क्या हुआ? नौ दिन हो गए।",
    outbound:
      "आपका क्लेम CLM-2487 मेडिकल टीम के पास है। हमें अभी डिस्चार्ज समरी चाहिए — इस लिंक से भेज दीजिए।",
    sentStamp: "Sent on WhatsApp · in Hindi",
  },
  {
    code: "HI_EN",
    name: "Hinglish",
    native: "Hinglish",
    inbound: "CLM-2487 ka kya hua? 9 din ho gaye.",
    outbound:
      "Aapka claim CLM-2487 medical team ke paas hai. Discharge summary abhi bhi chahiye — is link se bhej dijiye.",
    sentStamp: "Sent on WhatsApp · in Hinglish",
  },
];

/**
 * Read, but not answered in — yet. Each has its own script, which is why the
 * detector can tell it apart from Hindi at all.
 *
 * Marathi, Bhojpuri, Maithili, Konkani, Sanskrit and Assamese are deliberately
 * NOT here: they share a script with Hindi or Bengali, and a wrong "we do not
 * serve your language" is a closed door on a service that was available.
 */
export const READ_ONLY: ReadLanguage[] = [
  { code: "TA", name: "Tamil", native: "தமிழ்" },
  { code: "TE", name: "Telugu", native: "తెలుగు" },
  { code: "KN", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ML", name: "Malayalam", native: "മലയാളം" },
  { code: "BN", name: "Bengali", native: "বাংলা" },
  { code: "GU", name: "Gujarati", native: "ગુજરાતી" },
  { code: "PA", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "OR", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "UR", name: "Urdu", native: "اردو", rtl: true },
];
