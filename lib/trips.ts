import type { Lang } from "./i18n";

// Admin WhatsApp number (digits only, with country code).
export const WHATSAPP_NUMBER = "601139594048";

// next/image doesn't prefix basePath for unoptimized static images, so do it here.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** A group-size option. `price` is RM per person; `null` shows "Ask for price". */
export type Package = { pax: number; price: number | null };

// Default group sizes used by every trip. Edit here to change them site-wide,
// or give a trip its own `packages` list below to override.
// e.g. [{ pax: 2, price: 1500 }, { pax: 4, price: 1200 }, { pax: 8, price: 990 }]
export const DEFAULT_PACKAGES: Package[] = [
  { pax: 1, price: null },
  { pax: 3, price: null },
  { pax: 6, price: null },
  { pax: 10, price: null },
];

export type Trip = {
  id: string;
  name: string;
  image: string;
  /** Group sizes & prices for this trip (shown in this order). */
  packages: Package[];
  i18n: Record<
    Lang,
    {
      name: string;
      region: string;
      tagline: string;
      description: string;
      highlights: string[];
      season: string;
    }
  >;
};

export const TRIPS: Trip[] = [
  {
    id: "pangkor",
    name: "Pangkor Island",
    image: `${BASE}/trips/pangkor.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Pangkor Island",
        region: "Perak",
        tagline: "Golden sunsets & fishing-village charm",
        description:
          "A laid-back island with calm beaches, fresh seafood and some of the best sunsets on Malaysia's west coast.",
        highlights: ["Teluk Nipah beach", "Island hopping", "Fresh seafood"],
        season: "All year",
      },
      my: {
        name: "ပန်ကော်ကျွန်း",
        region: "ပေရ ပြည်နယ်",
        tagline: "ရွှေရောင်နေဝင်ချိန်နှင့် ငါးဖမ်းရွာလေး",
        description:
          "အေးချမ်းသော ကမ်းခြေများ၊ လတ်ဆတ်သော ပင်လယ်စာများနှင့် မလေးရှားအနောက်ဘက်ကမ်းရိုးတန်း၏ အလှဆုံးနေဝင်ချိန်ကို ခံစားနိုင်သော ကျွန်းလေး။",
        highlights: ["တလုတ်နီပါး ကမ်းခြေ", "ကျွန်းလှည့်ခရီး", "လတ်ဆတ်သော ပင်လယ်စာ"],
        season: "တစ်နှစ်ပတ်လုံး",
      },
    },
  },
  {
    id: "redang",
    name: "Pulau Redang",
    image: `${BASE}/trips/redang.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Pulau Redang",
        region: "Terengganu",
        tagline: "Crystal-clear water & white sand",
        description:
          "Turquoise lagoons, powder-white beaches and a protected marine park — a snorkeller's paradise.",
        highlights: ["Snorkelling", "Marine park", "Sea turtles"],
        season: "Mar – Oct",
      },
      my: {
        name: "ရီဒန်ကျွန်း",
        region: "တရင်ဂနူ ပြည်နယ်",
        tagline: "ကြည်လင်သောရေပြင်နှင့် သဲဖြူကမ်းခြေ",
        description:
          "စိမ်းပြာရောင် ရေပြင်၊ ဖြူဖွေးသော သဲသောင်ပြင်နှင့် ကာကွယ်ထားသော ပင်လယ်ဥယျာဉ် — ရေငုပ်ကြည့်ရှုသူတို့၏ နိဗ္ဗာန်ဘုံ။",
        highlights: ["ရေငုပ်ကြည့်ရှုခြင်း", "ပင်လယ်ဥယျာဉ်", "ပင်လယ်လိပ်များ"],
        season: "မတ် – အောက်တိုဘာ",
      },
    },
  },
  {
    id: "kapas",
    name: "Kapas Island",
    image: `${BASE}/trips/kapas.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Kapas Island",
        region: "Terengganu",
        tagline: "A quiet hideaway under the palms",
        description:
          "Small, peaceful and car-free. Swim, kayak and snorkel along soft beaches lined with coconut palms.",
        highlights: ["Kayaking", "Snorkelling", "Quiet beaches"],
        season: "Mar – Oct",
      },
      my: {
        name: "ကပတ်စ်ကျွန်း",
        region: "တရင်ဂနူ ပြည်နယ်",
        tagline: "အုန်းပင်များအောက်က တိတ်ဆိတ်သော ကျွန်းလေး",
        description:
          "ကားမရှိ၊ ငြိမ်းချမ်းသော ကျွန်းငယ်လေး။ အုန်းပင်တန်းနှင့် ကမ်းခြေတစ်လျှောက် ရေကူး၊ လှေလှော်၊ ရေငုပ်ကြည့်ရှုနိုင်ပါသည်။",
        highlights: ["လှေလှော်ခြင်း", "ရေငုပ်ကြည့်ရှုခြင်း", "တိတ်ဆိတ်သော ကမ်းခြေ"],
        season: "မတ် – အောက်တိုဘာ",
      },
    },
  },
  {
    id: "tioman",
    name: "Tioman Island",
    image: `${BASE}/trips/tioman.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Tioman Island",
        region: "Pahang",
        tagline: "Where the jungle meets the reef",
        description:
          "Rainforest-covered peaks, waterfalls and world-class diving, all on one island in the South China Sea.",
        highlights: ["Diving", "Jungle trekking", "Waterfalls"],
        season: "Mar – Oct",
      },
      my: {
        name: "တီအိုမန်ကျွန်း",
        region: "ပါဟန် ပြည်နယ်",
        tagline: "တောအုပ်နှင့် သန္တာကျောက်တန်း ဆုံရာ",
        description:
          "မိုးသစ်တောဖုံးသော တောင်ထိပ်များ၊ ရေတံခွန်များနှင့် ကမ္ဘာ့အဆင့်မီ ရေငုပ်နေရာများ တစ်ကျွန်းတည်းမှာ။",
        highlights: ["ရေငုပ်ခြင်း", "တောလမ်းလျှောက်", "ရေတံခွန်များ"],
        season: "မတ် – အောက်တိုဘာ",
      },
    },
  },
  {
    id: "langkawi",
    name: "Langkawi Island",
    image: `${BASE}/trips/langkawi.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Langkawi Island",
        region: "Kedah",
        tagline: "Sky bridges, mangroves & duty-free",
        description:
          "Ride the cable car to the Sky Bridge, cruise the mangroves and relax on wide sandy beaches.",
        highlights: ["Sky Bridge", "Mangrove tour", "Duty-free shopping"],
        season: "Nov – Apr",
      },
      my: {
        name: "လန်ကာဝီကျွန်း",
        region: "ကီဒါ ပြည်နယ်",
        tagline: "ကောင်းကင်တံတား၊ လမုတော နှင့် အခွန်ကင်းဈေး",
        description:
          "ကေဘယ်ကားဖြင့် Sky Bridge သို့တက်၊ လမုတောများကို လှေဖြင့်လှည့်ပတ်ပြီး ကျယ်ပြန့်သော သဲကမ်းခြေတွင် အနားယူပါ။",
        highlights: ["Sky Bridge", "လမုတော ခရီး", "အခွန်ကင်း ဈေးဝယ်"],
        season: "နိုဝင်ဘာ – ဧပြီ",
      },
    },
  },
  {
    id: "pangkor-laut",
    name: "Pangkor Laut Island",
    image: `${BASE}/trips/pangkor-laut.jpg`,
    packages: DEFAULT_PACKAGES,
    i18n: {
      en: {
        name: "Pangkor Laut Island",
        region: "Perak",
        tagline: "A private island escape",
        description:
          "An exclusive resort island with overwater villas, rainforest trails and the secluded Emerald Bay.",
        highlights: ["Overwater villas", "Emerald Bay", "Spa & relax"],
        season: "All year",
      },
      my: {
        name: "ပန်ကော်လောက်ကျွန်း",
        region: "ပေရ ပြည်နယ်",
        tagline: "သီးသန့်ကျွန်းပေါ်က အပန်းဖြေခရီး",
        description:
          "ရေပေါ်ဗီလာများ၊ မိုးသစ်တောလမ်းများနှင့် တိတ်ဆိတ်သော Emerald Bay ပါဝင်သည့် သီးသန့်အပန်းဖြေကျွန်း။",
        highlights: ["ရေပေါ်ဗီလာ", "Emerald Bay", "စပါ နှင့် အနားယူ"],
        season: "တစ်နှစ်ပတ်လုံး",
      },
    },
  },
];

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
