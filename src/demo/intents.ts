/**
 * What the visitor asked, for the scripted messaging demo. These are a website
 * simulation on fixed sample data — the product itself has the model read the
 * member's words; nothing here is how Gooclaim OS understands a message.
 */
export type Intent = "yes" | "no" | "bye" | "hindi" | "english" | "upload" | "docs" | "payment" | "human" | "status" | "other";

/** Try it page: what a typed message asks for. */
export function tryIntent(raw: string): Intent {
  const s = (raw || "").toLowerCase();
  if (/^\s*(yes|y|haan|han|ha|ji|ok|okay|sure|हाँ|हां|जी)\b/.test(s) || /^\s*(हाँ|हां|जी)/.test(raw)) return "yes";
  if (/^\s*(no|nahi|nahin|नहीं)\b/.test(s) || /^\s*नहीं/.test(raw)) return "no";
  if (/(bye|thank|dhanyavad|dhanyavaad|shukriya|that'?s all|bas|धन्यवाद|शुक्रिया)/.test(s) || /(धन्यवाद|शुक्रिया)/.test(raw)) return "bye";
  if (/(hindi|हिंदी|हिन्दी)/.test(s) || /(हिंदी|हिन्दी)/.test(raw)) return "hindi";
  if (/(english|angrezi)/.test(s)) return "english";
  if (/(upload|bhej|send (the )?file)/.test(s)) return "upload";
  if (/(document|docs|pending|paper|kaagaz|kagaz|dastavez|summary|दस्तावेज़|दस्तावेज|कागज़)/.test(s) || /(दस्तावेज|कागज़)/.test(raw)) return "docs";
  if (/(paid|payment|paisa|paise|amount|money|settle|भुगतान|पैसा|पैसे)/.test(s) || /(भुगतान|पैस)/.test(raw)) return "payment";
  if (/(person|human|agent|someone|baat|executive|व्यक्ति|बात)/.test(s) || /(व्यक्ति|बात)/.test(raw)) return "human";
  if (/(status|claim|kya hua|kahan|kab|where|update|स्थिति|क्लेम|कहाँ|कब)/.test(s) || /(स्थिति|क्लेम|कहाँ|कब)/.test(raw)) return "status";
  return "other";
}
