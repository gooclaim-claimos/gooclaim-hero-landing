import { SAMPLE_CLAIM, sampleDates } from "@/data/sampleClaim";

export type ChatLang = "en" | "hi" | "hing";

export interface ChatLines {
  consent: string;
  reask: string;
  declined: string;
  ready: string;
  status: string;
  statusDone: string;
  docs: string;
  docsDone: string;
  received: string;
  payment: string;
  /** After the summary is in: nothing is waiting on the member any more. */
  paymentDone: string;
  human: string;
  fallback: string;
  chips0: string[];
  chipsC: string[];
  chips1: string[];
  ph: string;
}

const N = SAMPLE_CLAIM.number;

/**
 * The messaging agent's approved wording for the sample claim. Dates are read
 * when called — only from a handler, after the visitor starts — so they are
 * always relative to today and never part of the prerendered page.
 */
export function chatLines(lang: ChatLang, now?: Date): ChatLines {
  if (lang === "hi") {
    const d = sampleDates(now, "hi");
    return {
      consent: "नमस्ते! आपके क्लेम की जानकारी देखने से पहले, क्या हम आपकी जानकारी का उपयोग कर सकते हैं? जारी रखने के लिए YES लिखें।",
      reask: "आपकी जानकारी सुरक्षित रखने के लिए पहले आपकी सहमति ज़रूरी है। जारी रखने के लिए YES, रोकने के लिए NO लिखें।",
      declined: "ठीक है — हम आपकी जानकारी का उपयोग नहीं करेंगे। जारी रखने के लिए कभी भी YES लिखें।",
      ready: `धन्यवाद। आप अपने रजिस्टर्ड नंबर से लिख रहे हैं, इसलिए आपकी पहचान हो गई है।\nक्लेम ${N} में मैं आपकी क्या मदद करूँ?`,
      status: `आपका क्लेम ${N} (आपके बीमाकर्ता के रिकॉर्ड के अनुसार, ${d.updated} को अपडेट): दस्तावेज़ बाकी हैं।\nहमें अभी आपकी डिस्चार्ज समरी चाहिए।`,
      statusDone: `आपका क्लेम ${N} (बीमाकर्ता के रिकॉर्ड के अनुसार, आज अपडेट): जाँच में है।\nसभी दस्तावेज़ मिल गए हैं। फ़ैसला होते ही हम आपको बताएँगे।`,
      docs: `एक दस्तावेज़ बाकी है: डिस्चार्ज समरी।\nआपका क्लेम फ़ॉर्म, आइटमाइज़्ड फ़ाइनल बिल, भुगतान की रसीदें, फ़ार्मेसी बिल और जाँच रिपोर्ट ${d.submitted} को मिल गए थे। समरी यहाँ सुरक्षित रूप से अपलोड करें:`,
      docsDone: "कोई दस्तावेज़ बाकी नहीं है। आपकी डिस्चार्ज समरी आज मिल गई।",
      received: "मिल गया, धन्यवाद। फ़ाइल पढ़ी जा सकती है और आपके क्लेम से मेल खाती है। हमने इसे आपकी क्लेम टीम को भेज दिया है।",
      payment: `${N} पर अभी कोई भुगतान नहीं हुआ है। भुगतान बीमाकर्ता के फ़ैसले के बाद होगा, जो ऊपर वाले दस्तावेज़ का इंतज़ार कर रहा है।`,
      paymentDone: `${N} पर अभी कोई भुगतान नहीं हुआ है। सभी दस्तावेज़ मिल गए हैं; भुगतान बीमाकर्ता के फ़ैसले के बाद होगा।`,
      human: "मैंने कारण के साथ आपकी क्लेम टीम को सूचित कर दिया है। एक व्यक्ति इसी चैट पर जवाब देगा।",
      fallback: "मैं आपके क्लेम की स्थिति, बाकी दस्तावेज़, भुगतान, या किसी व्यक्ति से बात कराने में मदद कर सकता हूँ।",
      chips0: ["मेरे क्लेम की स्थिति क्या है?", "कौन से दस्तावेज़ बाकी हैं?"],
      chipsC: ["YES", "NO"],
      chips1: ["क्लेम की स्थिति", "बाकी दस्तावेज़", "भुगतान हुआ?", "किसी व्यक्ति से बात"],
      ph: "संदेश लिखें…",
    };
  }
  const d = sampleDates(now, "en");
  if (lang === "hing") {
    return {
      consent: "Namaste! Aapka claim dekhne se pehle, kya hum aapki details use kar sakte hain? Continue karne ke liye YES likhiye.",
      reask: "Aapki details safe rakhne ke liye pehle aapki consent chahiye. Continue ke liye YES, rokne ke liye NO likhiye.",
      declined: "Theek hai — hum aapki details use nahi karenge. Kabhi bhi YES likh kar continue kar sakte hain.",
      ready: `Dhanyavaad. Aap registered number se likh rahe hain, toh aap verified hain.\nClaim ${N} mein kya help karun?`,
      status: `Aapka claim ${N} (insurer ke records ke hisaab se, ${d.updated} ko update): Documents pending hain.\nHumein abhi aapki discharge summary chahiye.`,
      statusDone: `Aapka claim ${N} (insurer ke records ke hisaab se, aaj update): Review mein hai.\nSaare documents mil gaye hain. Decision aate hi batayenge.`,
      docs: `Ek document pending hai: discharge summary.\nAapka claim form, itemised final bill, payment receipts, pharmacy bills aur investigation reports ${d.submitted} ko mil gaye the. Summary yahan securely upload kariye:`,
      docsDone: "Koi document pending nahi hai. Aapki discharge summary aaj mil gayi.",
      received: "Mil gaya, thank you. File readable hai aur aapke claim se match karti hai. Humne ise aapki claims team ko bhej diya hai.",
      payment: `${N} par abhi koi payment nahi hua hai. Payment insurer ke decision ke baad hoga, jo upar wale document ka wait kar raha hai.`,
      paymentDone: `${N} par abhi koi payment nahi hua hai. Saare documents mil gaye hain; payment insurer ke decision ke baad hoga.`,
      human: "Maine reason ke saath aapki claims team ko flag kar diya hai. Ek person isi chat par reply karega.",
      fallback: "Main claim status, pending documents, payment, ya kisi person se baat karwane mein help kar sakta hoon.",
      chips0: ["Mera claim kahan tak pahuncha?", "Kaunse documents pending hain?"],
      chipsC: ["YES", "NO"],
      chips1: ["Claim status", "Pending documents", "Payment hua?", "Kisi person se baat"],
      ph: "Message likhiye…",
    };
  }
  return {
    consent: "Hello! Before we look at your claim, may we use your details to help you with it? Reply YES to continue.",
    reask: "To keep your details safe, we need your consent first. Reply YES to continue, or NO to stop.",
    declined: "Okay — we won’t use your details. You can reply YES at any time to continue.",
    ready: `Thank you. You’re writing from your registered number, so you’re verified.\nHow can I help with claim ${N}?`,
    status: `Claim ${N} (as per your insurer’s records, updated ${d.updated}): Documents pending.\nWe still need your discharge summary.`,
    statusDone: `Claim ${N} (as per your insurer’s records, updated today): Under review.\nAll documents received. We’ll tell you when there is a decision.`,
    docs: `One document is still pending: discharge summary.\nYour claim form, itemised final bill, payment receipts, pharmacy bills and investigation reports were received on ${d.submitted}. Upload the summary securely here:`,
    docsDone: "No documents are pending. Your discharge summary was received today.",
    received: "Received, thank you. The file is readable and matches your claim. We’ve passed it to your claims team.",
    payment: `No payment has been made on ${N} yet. Payment follows the insurer’s decision, which is waiting on the document above.`,
    paymentDone: `No payment has been made on ${N} yet. All documents are in; payment follows the insurer’s decision.`,
    human: "I’ve flagged this for your claims team with the reason. A person will reply on this chat.",
    fallback: "I can help with your claim status, pending documents, payment, or connect you to a person.",
    chips0: ["What’s my claim status?", "Which documents are pending?"],
    chipsC: ["YES", "NO"],
    chips1: ["Claim status", "Pending documents", "Has it been paid?", "Talk to a person"],
    ph: "Type a message…",
  };
}
