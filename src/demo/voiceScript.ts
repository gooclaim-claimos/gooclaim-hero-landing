import { SAMPLE_CLAIM } from "@/data/sampleClaim";
import type { CallLang } from "./speech";

export interface VoiceLines {
  greet: string;
  ok: string;
  bad: string;
  status: string;
  statusDone: string;
  docs: string;
  payment: string;
  human: string;
  lang: string;
  other: string;
  bye: string;
  trialEnd: string;
}

const EN_DIGITS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const HI_DIGITS = ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ"];

/** The claim's last four, read digit by digit in the call's language. */
function lastFourSpoken(words: string[]): string {
  return [...SAMPLE_CLAIM.lastFour].map((d) => words[Number(d)]).join(", ");
}

/** The voice agent's lines, in the call's language. Voice reads only the last four of the claim number. */
export function voiceLines(lang: CallLang): VoiceLines {
  if (lang === "hi") {
    return {
      greet: "क्लेम हेल्पलाइन पर कॉल करने के लिए धन्यवाद। यह तीस सेकंड का ट्रायल है। आपकी जानकारी सुरक्षित रखने के लिए, मैंने आपके रजिस्टर्ड मोबाइल पर 6 अंकों का कोड भेजा है। कृपया उसे पढ़िए।",
      ok: "धन्यवाद, पुष्टि हो गई। आज मैं आपकी क्या मदद करूँ?",
      bad: "यह कोड मेल नहीं खाता। कृपया स्क्रीन पर दिखा 6 अंकों का कोड पढ़िए।",
      status: `आपका क्लेम, जिसके आख़िरी अंक ${lastFourSpoken(HI_DIGITS)} हैं, अभी जाँच में है। एक दस्तावेज़ बाकी है — डिस्चार्ज समरी।`,
      statusDone: "आपका क्लेम अभी जाँच में है। सभी दस्तावेज़ मिल गए हैं।",
      docs: "डिस्चार्ज समरी बाकी है। आपके रजिस्टर्ड मोबाइल पर अपलोड लिंक भेज दिया गया है।",
      payment: "अभी कोई भुगतान नहीं हुआ है। भुगतान बीमाकर्ता के फ़ैसले के बाद होगा।",
      human: "मैंने कारण के साथ आपकी क्लेम टीम को सूचित कर दिया है। एक व्यक्ति आपसे संपर्क करेगा।",
      lang: "ज़रूर, अब मैं हिंदी में बात करूँगा। मैं आपकी क्या मदद करूँ?",
      other: "मैं आपके क्लेम की स्थिति, बाकी दस्तावेज़ या भुगतान के बारे में बता सकता हूँ।",
      bye: "कॉल करने के लिए धन्यवाद। यह कॉल आपके क्लेम पर रिकॉर्ड है। नमस्ते।",
      trialEnd: "आपका तीस सेकंड का ट्रायल पूरा हुआ। Gooclaim आज़माने के लिए धन्यवाद।",
    };
  }
  return {
    greet: "Thank you for calling the claims helpline. This is a 30-second trial. To keep your details safe, I’ve sent a 6-digit code to your registered mobile. Could you read it out?",
    ok: "Thank you, that’s confirmed. How can I help today?",
    bad: "That code doesn’t match. Please read the 6-digit code shown on your screen.",
    status: `Your claim ending ${lastFourSpoken(EN_DIGITS)} is under review. One document is still needed: the discharge summary.`,
    statusDone: "Your claim is under review. All documents have been received.",
    docs: "The discharge summary is still needed. I’ve sent an upload link to your registered mobile.",
    payment: "No payment has been made yet. Payment follows the insurer’s decision.",
    human: "I’ve flagged this for your claims team with the reason. A person will get back to you.",
    lang: "Sure, I’ll continue in English. How can I help?",
    other: "I can tell you your claim status, pending documents or payment. What would you like to know?",
    bye: "Thank you for calling. This call is recorded on your claim. Goodbye.",
    trialEnd: "That’s the end of your 30-second trial. Thank you for trying Gooclaim.",
  };
}

/** The one-time code shown on screen; the agent accepts it once its first four digits are heard. */
export const SAMPLE_OTP = "482913";
export const OTP_MATCH = "4829";
