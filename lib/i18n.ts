export type Lang = "en" | "my";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "my", label: "မြန်မာ", short: "MM" },
];

type Dict = {
  brand: string;
  chat: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroSub: string;
  explore: string;
  swipe: string;
  bestTime: string;
  groupSize: string;
  custom: string;
  pax: (n: number) => string;
  perPerson: string;
  onRequest: string;
  travelDate: string;
  inquire: string;
  endTitle: string;
  endSub: string;
  endCta: string;
  rights: string;
  message: (trip: string, pax: number, date: string) => string;
  generalMessage: string;
};

export const DICT: Record<Lang, Dict> = {
  en: {
    brand: "Khayi ခရီး",
    chat: "Chat with us",
    heroEyebrow: "Malaysia Island Tours",
    heroTitle: "Escape to",
    heroAccent: "Malaysia's islands",
    heroSub: "Pick an island, choose your group size and send us a message on WhatsApp. We handle the rest.",
    explore: "Explore trips",
    swipe: "Swipe",
    bestTime: "Best time",
    groupSize: "Group size",
    custom: "Custom",
    pax: (n) => `${n} pax`,
    perPerson: "/ person",
    onRequest: "Ask for price",
    travelDate: "Travel date (optional)",
    inquire: "Inquire on WhatsApp",
    endTitle: "Not sure where to go?",
    endSub: "Tell us your dates and group size — we'll suggest the perfect island for you.",
    endCta: "Chat on WhatsApp",
    rights: "All rights reserved.",
    message: (trip, pax, date) =>
      `Hi! I'm interested in the *${trip}* trip.\n\n• Group size: ${pax} pax\n• Travel date: ${date || "Flexible"}\n\nPlease share the package details and price. Thank you!`,
    generalMessage: "Hi! I'd like to know more about your Malaysia island trips.",
  },
  my: {
    brand: "Khayi ခရီး",
    chat: "ဆက်သွယ်ရန်",
    heroEyebrow: "မလေးရှား ကျွန်းခရီးစဉ်များ",
    heroTitle: "အပန်းဖြေကြမယ်",
    heroAccent: "မလေးရှားကျွန်းများသို့",
    heroSub: "ကျွန်းကိုရွေးပါ၊ လူဦးရေကိုရွေးပြီး WhatsApp ဖြင့် ပို့လိုက်ရုံပါပဲ။ ကျန်တာ ကျွန်ုပ်တို့ စီစဉ်ပေးပါမယ်။",
    explore: "ခရီးစဉ်များ ကြည့်ရန်",
    swipe: "ဘေးသို့ ဆွဲပါ",
    bestTime: "သွားရန်အကောင်းဆုံး",
    groupSize: "လူဦးရေ",
    custom: "စိတ်ကြိုက်",
    pax: (n) => `${n} ယောက်`,
    perPerson: "/ တစ်ဦး",
    onRequest: "ဈေးနှုန်း မေးရန်",
    travelDate: "သွားမည့်ရက် (မဖြစ်မနေ မဟုတ်)",
    inquire: "WhatsApp ဖြင့် စုံစမ်းရန်",
    endTitle: "ဘယ်ကျွန်းသွားရမလဲ မသေချာဘူးလား?",
    endSub: "သွားမည့်ရက်နှင့် လူဦးရေကို ပြောပြပါ — သင့်အတွက် အကောင်းဆုံးကျွန်းကို အကြံပြုပေးပါမယ်။",
    endCta: "WhatsApp ဖြင့် မေးမြန်းရန်",
    rights: "မူပိုင်ခွင့် ရယူထားသည်။",
    message: (trip, pax, date) =>
      `မင်္ဂလာပါ! *${trip}* ခရီးစဉ်ကို စိတ်ဝင်စားပါတယ်။\n\n• လူဦးရေ: ${pax} ယောက်\n• သွားမည့်ရက်: ${date || "မသတ်မှတ်ရသေး"}\n\nခရီးစဉ်အသေးစိတ်နှင့် ဈေးနှုန်းကို ပြောပြပေးပါ။ ကျေးဇူးတင်ပါတယ်!`,
    generalMessage: "မင်္ဂလာပါ! မလေးရှားကျွန်း ခရီးစဉ်များအကြောင်း သိချင်ပါတယ်။",
  },
};
