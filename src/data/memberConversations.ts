/**
 * The sample conversations in "What your member sees" — one per channel, in
 * each of the three languages Gooclaim OS answers in today (English, Hindi,
 * Hinglish). Sample member, sample claim, never real data.
 *
 * Each follows its channel's real check: a WhatsApp number is verified by the
 * platform, so consent is enough; an email address or a caller ID proves
 * nothing, so email and calls also send a code to the registered mobile.
 *
 * 🔴 The voice lines follow the voice agent's own rules (gooclaim-voice
 * `turn/prompt.py`, November 2026): same language as the caller, a claim named
 * only by its last four digits, no promise about time or money. Numbers are
 * said in the call's language — Hindi numbers in Hindi, English numbers in
 * English and Hinglish. Voice answers come from the claim, not from approved
 * templates, so a voice line never lights "Never free text".
 *
 * `note` is a caption for the visitor and stays in English in every language.
 */

export type Channel = "whatsapp" | "email" | "voice";
export type Lang = "en" | "hi" | "hinglish";

export interface Message {
  from: "member" | "os";
  text: string;
  /** What the OS did before it could send this — shown under the bubble. */
  note?: string;
  /** The label of the upload button, in the message's language. */
  link?: string;
  /** The guarantees this message demonstrates; lights those points as it arrives. */
  points?: string[];
}

export const LANGS: { key: Lang; label: string; spoken: string; htmlLang: string }[] = [
  { key: "en", label: "English", spoken: "English", htmlLang: "en" },
  { key: "hi", label: "हिन्दी", spoken: "Hindi", htmlLang: "hi" },
  { key: "hinglish", label: "Hinglish", spoken: "Hinglish", htmlLang: "hi-Latn" },
];

const CONSENT = ["Consent first"];
const VERIFIED = ["Verified"];
const ANSWER = ["Source & date", "Never free text"];
const VOICE_ANSWER = ["Source & date", "Facts only"];

export const CONVERSATIONS: Record<Channel, Record<Lang, Message[]>> = {
  whatsapp: {
    en: [
      { from: "member", text: "Hi, what's the status of my claim?" },
      { from: "os", text: "Hello! Before we look at your claim, may we use your details to help you with it? Reply YES to continue.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "Yes" },
      { from: "os", text: "The latest status of your claim CLM-24817 (as per your insurer's records, updated 3 Oct 2026): Documents pending. We still need your discharge summary — upload it securely here:", link: "Upload documents", note: "Registered number · source and date", points: ANSWER },
      { from: "member", text: "Uploaded ✓ discharge_summary.pdf" },
      { from: "os", text: "Received, thank you. We'll pass it to your claims team and let you know when it's checked.", note: "Approved template" },
    ],
    hi: [
      { from: "member", text: "नमस्ते, मेरे क्लेम का स्टेटस क्या है?" },
      { from: "os", text: "नमस्ते! आपका क्लेम देखने से पहले, क्या हम आपकी मदद के लिए आपकी जानकारी का उपयोग कर सकते हैं? आगे बढ़ने के लिए हाँ लिखें।", points: CONSENT, note: "Consent first" },
      { from: "member", text: "हाँ" },
      { from: "os", text: "आपके क्लेम CLM-24817 का ताज़ा स्टेटस (आपके बीमाकर्ता के रिकॉर्ड के अनुसार, 3 अक्टूबर 2026 को अपडेट): दस्तावेज़ बाकी हैं। हमें अभी आपकी डिस्चार्ज समरी चाहिए — इसे यहाँ सुरक्षित रूप से अपलोड करें:", link: "दस्तावेज़ अपलोड करें", note: "Registered number · source and date", points: ANSWER },
      { from: "member", text: "अपलोड कर दिया ✓ discharge_summary.pdf" },
      { from: "os", text: "मिल गया, धन्यवाद। हम इसे आपकी क्लेम टीम को भेज देंगे और जाँच होते ही आपको बताएँगे।", note: "Approved template" },
    ],
    hinglish: [
      { from: "member", text: "Hi, mere claim ka status kya hai?" },
      { from: "os", text: "Hello! Aapka claim dekhne se pehle, kya hum aapki madad ke liye aapki details use kar sakte hain? Aage badhne ke liye YES reply karein.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "Yes" },
      { from: "os", text: "Aapke claim CLM-24817 ka latest status (aapke insurer ke records ke hisaab se, 3 Oct 2026 ko update hua): Documents pending. Humein abhi aapki discharge summary chahiye — yahan securely upload karein:", link: "Documents upload karein", note: "Registered number · source and date", points: ANSWER },
      { from: "member", text: "Upload kar diya ✓ discharge_summary.pdf" },
      { from: "os", text: "Mil gaya, thank you. Hum ise aapki claims team ko bhej denge aur check hote hi aapko bata denge.", note: "Approved template" },
    ],
  },
  email: {
    en: [
      { from: "member", text: "Hello, could you tell me the status of my hospital claim?" },
      { from: "os", text: "Dear member, before we look at your claim, may we use your details to help you with it? Please reply YES along with your registered mobile number.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "YES — my mobile is 98•••••21." },
      { from: "os", text: "Thank you. Your claim details are private, so we've sent a 6-digit code to your registered mobile ending ••21. Please reply with the code.", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "The code is 482913." },
      { from: "os", text: "The latest status of your claim CLM-24817 (as per your insurer's records, updated 3 Oct 2026): Documents pending. We still need your discharge summary — upload it securely here:", link: "Upload documents", note: "Source and date · checked before sending", points: ANSWER },
    ],
    hi: [
      { from: "member", text: "नमस्ते, क्या आप मेरे अस्पताल क्लेम का स्टेटस बता सकते हैं?" },
      { from: "os", text: "प्रिय सदस्य, आपका क्लेम देखने से पहले, क्या हम आपकी मदद के लिए आपकी जानकारी का उपयोग कर सकते हैं? कृपया अपने रजिस्टर्ड मोबाइल नंबर के साथ हाँ लिखकर जवाब दें।", points: CONSENT, note: "Consent first" },
      { from: "member", text: "हाँ — मेरा मोबाइल 98•••••21 है।" },
      { from: "os", text: "धन्यवाद। आपके क्लेम की जानकारी निजी है, इसलिए हमने ••21 पर ख़त्म होने वाले आपके रजिस्टर्ड मोबाइल पर 6 अंकों का कोड भेजा है। कृपया वह कोड लिखकर जवाब दें।", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "कोड 482913 है।" },
      { from: "os", text: "आपके क्लेम CLM-24817 का ताज़ा स्टेटस (आपके बीमाकर्ता के रिकॉर्ड के अनुसार, 3 अक्टूबर 2026 को अपडेट): दस्तावेज़ बाकी हैं। हमें अभी आपकी डिस्चार्ज समरी चाहिए — इसे यहाँ सुरक्षित रूप से अपलोड करें:", link: "दस्तावेज़ अपलोड करें", note: "Source and date · checked before sending", points: ANSWER },
    ],
    hinglish: [
      { from: "member", text: "Hello, kya aap mere hospital claim ka status bata sakte hain?" },
      { from: "os", text: "Dear member, aapka claim dekhne se pehle, kya hum aapki madad ke liye aapki details use kar sakte hain? Please apne registered mobile number ke saath YES reply karein.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "YES — mera mobile 98•••••21 hai." },
      { from: "os", text: "Thank you. Aapke claim ki details private hain, isliye humne aapke registered mobile (ending ••21) par 6-digit code bheja hai. Please woh code reply karein.", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "Code 482913 hai." },
      { from: "os", text: "Aapke claim CLM-24817 ka latest status (aapke insurer ke records ke hisaab se, 3 Oct 2026 ko update hua): Documents pending. Humein abhi aapki discharge summary chahiye — yahan securely upload karein:", link: "Documents upload karein", note: "Source and date · checked before sending", points: ANSWER },
    ],
  },
  voice: {
    en: [
      { from: "member", text: "Hi, I want to know the status of my claim." },
      { from: "os", text: "Sure. Before I look at your claim, may I use your details to help you with it? Please say yes to continue.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "Yes." },
      { from: "os", text: "Thank you. I've sent a 6-digit code to your registered mobile ending 21. Please read it out.", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "Four, eight, two, nine, one, three." },
      { from: "os", text: "That's confirmed. As per your insurer's records, updated 3 October, your claim ending 4817 is waiting for one document — the discharge summary. I've sent a secure upload link to your registered mobile.", points: VOICE_ANSWER, note: "From the claim · source and date" },
    ],
    hi: [
      { from: "member", text: "नमस्ते, मुझे अपने क्लेम का स्टेटस जानना है।" },
      { from: "os", text: "ज़रूर। आपका क्लेम देखने से पहले, क्या आपकी मदद के लिए आपकी जानकारी का उपयोग किया जा सकता है? आगे बढ़ने के लिए कृपया हाँ कहिए।", points: CONSENT, note: "Consent first" },
      { from: "member", text: "हाँ।" },
      { from: "os", text: "धन्यवाद। आपके रजिस्टर्ड मोबाइल पर, जिसके आख़िरी अंक इक्कीस हैं, छह अंकों का कोड भेजा गया है। कृपया उसे बोलकर बताइए।", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "चार, आठ, दो, नौ, एक, तीन।" },
      { from: "os", text: "पुष्टि हो गई। आपके बीमाकर्ता के रिकॉर्ड के अनुसार, तीन अक्टूबर को अपडेट: आपका क्लेम, जिसके आख़िरी अंक चार, आठ, एक, सात हैं, एक दस्तावेज़ के लिए रुका है — डिस्चार्ज समरी। आपके रजिस्टर्ड मोबाइल पर अपलोड लिंक भेज दिया गया है।", points: VOICE_ANSWER, note: "From the claim · source and date" },
    ],
    hinglish: [
      { from: "member", text: "Hello, mujhe apne claim ka status jaanna hai." },
      { from: "os", text: "Zaroor. Aapka claim dekhne se pehle, kya aapki madad ke liye aapki details use kar sakte hain? Aage badhne ke liye please yes boliye.", points: CONSENT, note: "Consent first" },
      { from: "member", text: "Haan, yes." },
      { from: "os", text: "Thank you. Aapke registered mobile, ending 21, par ek 6-digit code bheja hai. Please woh code bol dijiye.", points: VERIFIED, note: "Verified before any detail" },
      { from: "member", text: "Four, eight, two, nine, one, three." },
      { from: "os", text: "Confirm ho gaya. Aapke insurer ke records ke hisaab se, 3 October ko update: aapka claim ending 4817 ek document ke liye ruka hai — discharge summary. Upload link aapke registered mobile par bhej diya hai.", points: VOICE_ANSWER, note: "From the claim · source and date" },
    ],
  },
};
