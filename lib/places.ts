import type { Lang } from "./i18n";

// Same reason as in trips.ts: next/image doesn't prefix basePath for unoptimized images.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Photo attribution, required by most Wikimedia Commons licences. */
export type Credit = { author: string; license: string; source: string };

export type Place = {
  image: string;
  credit: Credit;
  i18n: Record<Lang, { name: string; description: string }>;
};

export type IslandGuide = {
  heroCredit: Credit;
  i18n: Record<Lang, { gettingThere: string }>;
  places: Place[];
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
const img = (name: string) => `${BASE}/places/${name}.jpg`;

/** Guides keyed by trip id (see TRIPS in trips.ts). */
export const GUIDES: Record<string, IslandGuide> = {
  pangkor: {
    heroCredit: { author: "ogwen", license: "CC BY-SA 3.0", source: commons("Sunset on Pangkor Island - panoramio.jpg") },
    i18n: {
      en: { gettingThere: "Ferry from Lumut jetty, about 35 minutes." },
      my: { gettingThere: "လူးမွတ် (Lumut) ဆိပ်ကမ်းမှ ကူးတို့သင်္ဘောဖြင့် ၃၅ မိနစ်ခန့်။" },
    },
    places: [
      {
        image: img("pangkor-teluk-nipah"),
        credit: { author: "ogwen", license: "CC BY-SA 3.0", source: commons("Palau Giam from Teluk Nipah - panoramio.jpg") },
        i18n: {
          en: {
            name: "Teluk Nipah",
            description:
              "Pangkor's favourite beach: calm, shallow water facing tiny Pulau Giam — perfect for swimming and sunsets. Hornbills often fly over at dusk.",
          },
          my: {
            name: "တလုတ်နီပါး ကမ်းခြေ",
            description:
              "ပန်ကော်၏ လူကြိုက်အများဆုံး ကမ်းခြေ။ ရေတိမ်ပြီး လှိုင်းငြိမ်သဖြင့် ရေကူးရန်နှင့် နေဝင်ချိန်ကြည့်ရန် အကောင်းဆုံးဖြစ်သည်။ ညနေခင်းတွင် အောင်လောင်ငှက်များကိုလည်း မကြာခဏ တွေ့ရတတ်သည်။",
          },
        },
      },
      {
        image: img("pangkor-dutch-fort"),
        credit: { author: "Michael", license: "Public domain", source: commons("Dutch Fort Entrance.jpg") },
        i18n: {
          en: {
            name: "Dutch Fort",
            description:
              "Brick ruins of a fort the Dutch built in 1670 to control the tin trade — a short, easy stop full of history.",
          },
          my: {
            name: "ဒတ်ချ် ရဲတိုက်ဟောင်း",
            description:
              "၁၆၇၀ ပြည့်နှစ်တွင် ဒတ်ချ်တို့ ခဲမဖြူကုန်သွယ်ရေးကို ထိန်းချုပ်ရန် တည်ဆောက်ခဲ့သော အုတ်ရဲတိုက် အပျက်အစီး။ သမိုင်းဝင် နေရာလေး ဖြစ်သည်။",
          },
        },
      },
      {
        image: img("pangkor-fu-lin-kong"),
        credit: { author: "Arne Müseler", license: "CC BY-SA 3.0 de", source: commons("Foo Lin Kong Temple 1.jpg") },
        i18n: {
          en: {
            name: "Fu Lin Kong Temple",
            description:
              "A colourful hillside Taoist temple with ornate rooftops, a mini Great Wall of China and views over the sea.",
          },
          my: {
            name: "ဖူလင်ကောင်း ဘုရားကျောင်း",
            description:
              "တောင်စောင်းပေါ်ရှိ အရောင်စုံ တရုတ်ဘုရားကျောင်း။ အလှဆင်ထားသော ခေါင်မိုးများ၊ တရုတ်မဟာတံတိုင်း ပုံစံငယ်နှင့် ပင်လယ်ရှုခင်းများ ပါဝင်သည်။",
          },
        },
      },
      {
        image: img("pangkor-town"),
        credit: { author: "Michael", license: "Public domain", source: commons("Boats at Pangkor Island.jpg") },
        i18n: {
          en: {
            name: "Pangkor Town & fishing villages",
            description:
              "Walk the waterfront villages on stilts, watch the fishing boats come in and pick up Pangkor's famous dried seafood.",
          },
          my: {
            name: "ပန်ကော်မြို့ နှင့် ငါးဖမ်းရွာများ",
            description:
              "ရေပေါ်တိုင်ထူအိမ်ရွာများကို လမ်းလျှောက်ကြည့်ရှုပြီး ငါးဖမ်းလှေများ ဆိုက်ကပ်ပုံကို ကြည့်ပါ။ နာမည်ကြီး ပင်လယ်စာခြောက်များကိုလည်း ဝယ်ယူနိုင်သည်။",
          },
        },
      },
    ],
  },

  redang: {
    heroCredit: { author: "Mukherjeesaikat", license: "CC BY-SA 3.0", source: commons("Redang Sea Beach.jpg") },
    i18n: {
      en: { gettingThere: "Ferry from Merang or Shahbandar jetty, Kuala Terengganu — about 1 to 1.5 hours." },
      my: { gettingThere: "ကွာလာတရင်ဂနူ Merang သို့မဟုတ် Shahbandar ဆိပ်ကမ်းမှ ကူးတို့ဖြင့် ၁ နာရီမှ ၁ နာရီခွဲခန့်။" },
    },
    places: [
      {
        image: img("redang-pasir-panjang"),
        credit: { author: "Singaporean", license: "Public domain", source: commons("Pasir Panjang.JPG") },
        i18n: {
          en: {
            name: "Pasir Panjang (Long Beach)",
            description:
              "Redang's longest stretch of powder-white sand and turquoise water, lined with resorts and beach cafés.",
          },
          my: {
            name: "ပါဆီပန်ဂျန် (Long Beach)",
            description:
              "ရီဒန်၏ အရှည်ဆုံး ဖြူဖွေးသော သဲကမ်းခြေ။ စိမ်းပြာရောင် ရေပြင်နှင့် ကမ်းခြေတစ်လျှောက် အပန်းဖြေစခန်းများ၊ ကော်ဖီဆိုင်များ ရှိသည်။",
          },
        },
      },
      {
        image: img("redang-pulau-lima"),
        credit: { author: "Azreey", license: "CC BY-SA 4.0", source: commons("Pulau Redang - White sandy beach.jpg") },
        i18n: {
          en: {
            name: "Pulau Lima",
            description:
              "The little island just off Long Beach — a favourite snorkelling spot with coral, colourful reef fish and sometimes baby sharks.",
          },
          my: {
            name: "ပူလောလီမာ ကျွန်းငယ်",
            description:
              "ကမ်းခြေရှေ့ရှိ ကျွန်းငယ်လေး။ သန္တာကျောက်တန်းများ၊ အရောင်စုံငါးများနှင့် ငါးမန်းပေါက်ငယ်များကိုပင် တွေ့နိုင်သော ရေငုပ်ကြည့်ရှုရန် နေရာ။",
          },
        },
      },
      {
        image: img("redang-marine-park"),
        credit: { author: "Casarher", license: "CC BY-SA 4.0", source: commons("Pulau Redang, Isla Redang, Redang Island.jpg") },
        i18n: {
          en: {
            name: "Redang Marine Park",
            description:
              "A protected group of islands with clear water and healthy coral reefs. Green and hawksbill turtles nest on its beaches.",
          },
          my: {
            name: "ရီဒန် ပင်လယ်ဥယျာဉ်",
            description:
              "ကာကွယ်ထားသော ကျွန်းစုလေး။ ကြည်လင်သောရေနှင့် သန္တာကျောက်တန်းများ ရှိပြီး ပင်လယ်လိပ်များ ကမ်းခြေပေါ်တွင် ဥချကြသည်။",
          },
        },
      },
    ],
  },

  kapas: {
    heroCredit: { author: "Tim Parkinson", license: "CC BY 2.0", source: commons("Beach @ Pulau Kapas, Malaysia (234435536).jpg") },
    i18n: {
      en: { gettingThere: "Boat from Marang jetty, about 15 minutes." },
      my: { gettingThere: "မာရန် (Marang) ဆိပ်ကမ်းမှ လှေဖြင့် ၁၅ မိနစ်ခန့်။" },
    },
    places: [
      {
        image: img("kapas-beach"),
        credit: { author: "WorldTravleerAndPhotoTaker", license: "CC BY-SA 4.0", source: commons("Kapas Island, Marang District, Terengganu, Malaysia trees.jpg") },
        i18n: {
          en: {
            name: "Kapas beaches",
            description:
              "Soft sand and leaning coconut palms along the west coast — the water is clear enough to snorkel straight from shore.",
          },
          my: {
            name: "ကပတ်စ် ကမ်းခြေများ",
            description:
              "အနောက်ဘက်ကမ်းတစ်လျှောက် နူးညံ့သောသဲနှင့် ကိုင်းညွတ်နေသော အုန်းပင်များ။ ကမ်းခြေမှပင် ရေငုပ်ကြည့်ရှုနိုင်လောက်အောင် ရေကြည်သည်။",
          },
        },
      },
      {
        image: img("kapas-gemia"),
        credit: { author: "Nurul Syahirah Nazarudin", license: "CC BY-SA 4.0", source: commons("Pulau Gemia.jpg") },
        i18n: {
          en: {
            name: "Pulau Gemia",
            description:
              "Kapas's tiny neighbour with bright turquoise water — an easy boat hop for snorkelling and photos.",
          },
          my: {
            name: "ဂျမီယာ ကျွန်းငယ်",
            description:
              "ကပတ်စ်အနီးရှိ ကျွန်းငယ်လေး။ စိမ်းပြာရောင် ရေပြင်လှပပြီး လှေဖြင့်ခဏသွားကာ ရေငုပ်ကြည့်ရှုရန်၊ ဓာတ်ပုံရိုက်ရန် ကောင်းသည်။",
          },
        },
      },
      {
        image: img("kapas-kayak"),
        credit: { author: "WorldTravleerAndPhotoTaker", license: "CC BY-SA 4.0", source: commons("Kapas Island, Marang District, Terengganu, Malaysia boats.jpg") },
        i18n: {
          en: {
            name: "Kayak & paddleboard",
            description:
              "No cars and no crowds — rent a kayak or paddleboard and explore the quiet coves around the island.",
          },
          my: {
            name: "ကယက်လှေ နှင့် ရပ်လှော်ပြား",
            description:
              "ကားမရှိ၊ လူမစည်ကား — ကယက်လှေ သို့မဟုတ် ရပ်လှော်ပြား ငှားပြီး ကျွန်းပတ်လည်ရှိ တိတ်ဆိတ်သော ပင်လယ်ကွေ့လေးများကို စူးစမ်းပါ။",
          },
        },
      },
    ],
  },

  tioman: {
    heroCredit: { author: "Arne Müseler", license: "CC BY-SA 3.0 de", source: commons("Tioman 1.jpg") },
    i18n: {
      en: { gettingThere: "Ferry from Mersing or Tanjung Gemok, about 1.5 to 2 hours." },
      my: { gettingThere: "မာဆင်း (Mersing) သို့မဟုတ် Tanjung Gemok မှ ကူးတို့ဖြင့် ၁ နာရီခွဲမှ ၂ နာရီခန့်။" },
    },
    places: [
      {
        image: img("tioman-salang"),
        credit: { author: "Yousha Bin Younus", license: "CC BY 3.0", source: commons("Salang, Tioman - panoramio.jpg") },
        i18n: {
          en: {
            name: "Salang Bay",
            description:
              "A lively bay in the north with clear water, coral close to shore and relaxed beach bars at sunset.",
          },
          my: {
            name: "ဆာလန် ပင်လယ်အော်",
            description:
              "မြောက်ဘက်ရှိ စည်ကားသော ပင်လယ်အော်။ ကမ်းနားအနီးမှာပင် သန္တာများရှိပြီး နေဝင်ချိန်တွင် ကမ်းခြေဆိုင်လေးများ၌ အနားယူနိုင်သည်။",
          },
        },
      },
      {
        image: img("tioman-air-batang"),
        credit: { author: "Jake.sparrow22", license: "Public domain", source: commons("The view from Air Batang Bay jetty, Tioman.jpg") },
        i18n: {
          en: {
            name: "Air Batang (ABC)",
            description:
              "A laid-back village of beach chalets joined by a jungle path, with a long jetty that's perfect for a swim.",
          },
          my: {
            name: "အဲယားဘတန် (ABC)",
            description:
              "တောလမ်းလေးဖြင့် ဆက်သွယ်ထားသော ကမ်းခြေတဲအိမ်ငယ်များရှိ အေးချမ်းသည့်ရွာ။ ရှည်လျားသော ဆိပ်ခံတံတားမှ ရေကူးရန် ကောင်းသည်။",
          },
        },
      },
      {
        image: img("tioman-beaches"),
        credit: { author: "Peter Gronemann", license: "CC BY 2.0", source: commons("Tioman island (3678622941).jpg") },
        i18n: {
          en: {
            name: "Beaches & jungle peaks",
            description:
              "Wide sandy bays backed by rainforest-covered mountains — go trekking, find waterfalls and spot monkeys and monitor lizards.",
          },
          my: {
            name: "ကမ်းခြေများ နှင့် တောင်တန်းများ",
            description:
              "မိုးသစ်တောဖုံးသော တောင်တန်းများ နောက်ခံရှိ ကျယ်ပြန့်သော သဲကမ်းခြေများ — တောလမ်းလျှောက်ခြင်း၊ ရေတံခွန်ရှာခြင်းနှင့် မျောက်များကို ကြည့်ရှုနိုင်သည်။",
          },
        },
      },
    ],
  },

  langkawi: {
    heroCredit: { author: "Anton Zelenov", license: "CC BY-SA 3.0", source: commons("Langkawi beach.jpg") },
    i18n: {
      en: { gettingThere: "Ferry from Kuala Perlis or Kuala Kedah (about 1 to 1.5 hours), or a short domestic flight." },
      my: { gettingThere: "ကွာလာပါလစ် သို့မဟုတ် ကွာလာကီဒါ မှ ကူးတို့ဖြင့် (၁ နာရီမှ ၁ နာရီခွဲခန့်) သို့မဟုတ် ပြည်တွင်းလေယာဉ်ဖြင့်။" },
    },
    places: [
      {
        image: img("langkawi-skycab"),
        credit: { author: "Ss6sam6", license: "CC BY-SA 4.0", source: commons("Cable car in Langkawi Island.jpg") },
        i18n: {
          en: {
            name: "SkyCab cable car",
            description:
              "One of the steepest cable car rides in the world, climbing over rainforest to the top of Gunung Mat Cincang.",
          },
          my: {
            name: "SkyCab ကေဘယ်ကား",
            description:
              "ကမ္ဘာ့အမတ်စောက်ဆုံး ကေဘယ်ကားများထဲမှ တစ်ခု။ မိုးသစ်တောပေါ်မှ ဖြတ်ပြီး Mat Cincang တောင်ထိပ်အထိ တက်သွားသည်။",
          },
        },
      },
      {
        image: img("langkawi-sky-bridge"),
        credit: { author: "Engin Akyurt", license: "CC0", source: commons("Langkawi Sky Bridge (November 2016).jpg") },
        i18n: {
          en: {
            name: "Langkawi Sky Bridge",
            description:
              "A curved suspension bridge about 660 m above sea level, with sweeping views of the Andaman Sea and the islands.",
          },
          my: {
            name: "လန်ကာဝီ Sky Bridge",
            description:
              "ပင်လယ်ရေမျက်နှာပြင်အထက် မီတာ ၆၆၀ ခန့်ရှိ ကွေးညွတ်သော ဆွဲကြိုးတံတား။ အန်ဒမန်ပင်လယ်နှင့် ကျွန်းများကို အပြည့်အဝ မြင်ရသည်။",
          },
        },
      },
      {
        image: img("langkawi-cenang"),
        credit: { author: "CyberTroopers", license: "CC BY-SA 4.0", source: commons("Pantai Cenang 1.jpg") },
        i18n: {
          en: {
            name: "Pantai Cenang",
            description:
              "Langkawi's liveliest beach — water sports, cafés, night markets and beautiful sunsets.",
          },
          my: {
            name: "ပန်တိုင်ချနန် ကမ်းခြေ",
            description:
              "လန်ကာဝီ၏ အစည်ကားဆုံး ကမ်းခြေ — ရေကစားနည်းများ၊ ကော်ဖီဆိုင်များ၊ ညဈေးများနှင့် လှပသော နေဝင်ချိန်။",
          },
        },
      },
      {
        image: img("langkawi-kilim"),
        credit: { author: "Leonardo0511", license: "CC BY-SA 4.0", source: commons("Langkawi Mangrove Forest.jpg") },
        i18n: {
          en: {
            name: "Kilim mangrove tour",
            description:
              "Cruise through mangrove forests and limestone cliffs, watch eagles feeding and visit a bat cave.",
          },
          my: {
            name: "ကီလင် လမုတော ခရီး",
            description:
              "လမုတောများနှင့် ထုံးကျောက်ချောက်ကမ်းပါးများကြား လှေစီးပါ။ လင်းယုန်များ အစာစားပုံကို ကြည့်ရှုပြီး လင်းနို့ဂူသို့ လည်ပတ်နိုင်သည်။",
          },
        },
      },
      {
        image: img("langkawi-eagle-square"),
        credit: { author: "Bernard Spragg", license: "CC0", source: commons("Eagle Square Langkawi. (11130066275).jpg") },
        i18n: {
          en: {
            name: "Eagle Square",
            description:
              "The giant eagle statue by Kuah jetty — Langkawi's symbol and a must-have photo.",
          },
          my: {
            name: "လင်းယုန် ရင်ပြင်",
            description:
              "ကွာ (Kuah) ဆိပ်ကမ်းအနီးရှိ ကြီးမားသော လင်းယုန်ရုပ်တု — လန်ကာဝီ၏ အမှတ်သင်္ကေတ ဖြစ်ပြီး ဓာတ်ပုံရိုက်ရမည့် နေရာ။",
          },
        },
      },
    ],
  },

  "pangkor-laut": {
    heroCredit: { author: "Azreey", license: "CC BY-SA 3.0", source: commons("Pangkor Laut - Pool view.JPG") },
    i18n: {
      en: { gettingThere: "Resort boat from Marina Island near Lumut, about 20 minutes." },
      my: { gettingThere: "လူးမွတ်အနီး Marina Island မှ အပန်းဖြေစခန်း လှေဖြင့် ၂၀ မိနစ်ခန့်။" },
    },
    places: [
      {
        image: img("pangkorlaut-villas"),
        credit: { author: "Unknown", license: "Public domain", source: commons("Pangkor Laut Resort, Malaysia.jpg") },
        i18n: {
          en: {
            name: "Overwater villas",
            description:
              "Villas on stilts over the sea — watch the sunrise from your own balcony with the jungle behind you.",
          },
          my: {
            name: "ရေပေါ် ဗီလာများ",
            description:
              "ပင်လယ်ပြင်ပေါ် တိုင်ထူဆောက်ထားသော ဗီလာများ — နောက်ခံ တောအုပ်နှင့်အတူ ကိုယ်ပိုင်ဝရန်တာမှ နေထွက်ချိန်ကို ကြည့်ရှုပါ။",
          },
        },
      },
      {
        image: img("pangkorlaut-island"),
        credit: { author: "Gryffindor", license: "Public domain", source: commons("Pangkor Laut Island pano.jpg") },
        i18n: {
          en: {
            name: "A private island",
            description:
              "Just off Pangkor, the whole island is a single resort wrapped in ancient rainforest, with quiet bays like Emerald Bay.",
          },
          my: {
            name: "သီးသန့် ကျွန်း",
            description:
              "ပန်ကော်ကျွန်းအနီးရှိ ကျွန်းတစ်ကျွန်းလုံးသည် အပန်းဖြေစခန်း တစ်ခုတည်း ဖြစ်ပြီး ရှေးဟောင်း မိုးသစ်တောနှင့် Emerald Bay ကဲ့သို့ တိတ်ဆိတ်သော ပင်လယ်ကွေ့များ ရှိသည်။",
          },
        },
      },
    ],
  },
};
