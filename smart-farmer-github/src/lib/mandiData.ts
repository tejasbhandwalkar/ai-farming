import { MandiPriceItem } from './types';

export const MANDI_COMMODITIES = [
  { key: 'soybean', label_mr: 'सोयाबीन (Soybean)', label_hi: 'सोयाबीन (Soybean)', label_en: 'Soybean' },
  { key: 'cotton', label_mr: 'कापूस (Cotton)', label_hi: 'कपास (Cotton)', label_en: 'Cotton' },
  { key: 'onion', label_mr: 'कांदा (Onion)', label_hi: 'प्याज (Onion)', label_en: 'Onion' },
  { key: 'sugarcane', label_mr: 'ऊस (Sugarcane)', label_hi: 'गन्ना (Sugarcane)', label_en: 'Sugarcane' },
  { key: 'tomato', label_mr: 'टोमॅटो (Tomato)', label_hi: 'टमाटर (Tomato)', label_en: 'Tomato' },
  { key: 'wheat', label_mr: 'गहू (Wheat)', label_hi: 'गेहूं (Wheat)', label_en: 'Wheat' },
  { key: 'gram', label_mr: 'हरभरा / चणा (Gram)', label_hi: 'चना (Gram)', label_en: 'Gram (Chana)' },
  { key: 'tur', label_mr: 'तूर / अरहर (Tur)', label_hi: 'अरहर / तुअर (Tur)', label_en: 'Pigeon Pea (Tur)' },
  { key: 'maize', label_mr: 'मका (Maize)', label_hi: 'मक्का (Maize)', label_en: 'Maize' },
  { key: 'pomegranate', label_mr: 'डाळिंब (Pomegranate)', label_hi: 'अनार (Pomegranate)', label_en: 'Pomegranate' }
];

export const MANDI_MARKETS_DATA: MandiPriceItem[] = [
  {
    id: 'mandi-01',
    crop_en: 'Soybean',
    crop_mr: 'सोयाबीन',
    crop_hi: 'सोयाबीन',
    market: 'Latur APMC (लातूर मुख्य बाजार)',
    district: 'Latur',
    state: 'Maharashtra',
    variety: 'Yellow / पिवळा',
    min_price: 4400,
    max_price: 4950,
    modal_price: 4820,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 4720 },
      { date: '02 Nov', price: 4750 },
      { date: '03 Nov', price: 4790 },
      { date: '04 Nov', price: 4800 },
      { date: '05 Nov', price: 4810 },
      { date: '06 Nov', price: 4820 }
    ]
  },
  {
    id: 'mandi-02',
    crop_en: 'Soybean',
    crop_mr: 'सोयाबीन',
    crop_hi: 'सोयाबीन',
    market: 'Akola APMC (अकोला बाजार)',
    district: 'Akola',
    state: 'Maharashtra',
    variety: 'Local',
    min_price: 4350,
    max_price: 4880,
    modal_price: 4760,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 4680 },
      { date: '02 Nov', price: 4700 },
      { date: '03 Nov', price: 4720 },
      { date: '04 Nov', price: 4750 },
      { date: '05 Nov', price: 4740 },
      { date: '06 Nov', price: 4760 }
    ]
  },
  {
    id: 'mandi-03',
    crop_en: 'Onion',
    crop_mr: 'कांदा',
    crop_hi: 'प्याज',
    market: 'Lasalgaon APMC (लासलगाव - आशियातील सर्वात मोठी कांदा मंडी)',
    district: 'Nashik',
    state: 'Maharashtra',
    variety: 'Red Onion / लाल कांदा',
    min_price: 1800,
    max_price: 2950,
    modal_price: 2520,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 2350 },
      { date: '02 Nov', price: 2400 },
      { date: '03 Nov', price: 2450 },
      { date: '04 Nov', price: 2480 },
      { date: '05 Nov', price: 2500 },
      { date: '06 Nov', price: 2520 }
    ]
  },
  {
    id: 'mandi-04',
    crop_en: 'Onion',
    crop_mr: 'कांदा',
    crop_hi: 'प्याज',
    market: 'Pune APMC (पुणे कृषी उत्पन्न बाजार समिती - गुलटेकडी)',
    district: 'Pune',
    state: 'Maharashtra',
    variety: 'Medium / मध्यम',
    min_price: 1700,
    max_price: 2800,
    modal_price: 2400,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 2200 },
      { date: '02 Nov', price: 2280 },
      { date: '03 Nov', price: 2340 },
      { date: '04 Nov', price: 2380 },
      { date: '05 Nov', price: 2400 },
      { date: '06 Nov', price: 2400 }
    ]
  },
  {
    id: 'mandi-05',
    crop_en: 'Cotton',
    crop_mr: 'कापूस',
    crop_hi: 'कपास',
    market: 'Jalna APMC (जालना बाजार समिती)',
    district: 'Jalna',
    state: 'Maharashtra',
    variety: 'Medium Staple Bt',
    min_price: 6800,
    max_price: 7650,
    modal_price: 7420,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 7200 },
      { date: '02 Nov', price: 7280 },
      { date: '03 Nov', price: 7350 },
      { date: '04 Nov', price: 7390 },
      { date: '05 Nov', price: 7410 },
      { date: '06 Nov', price: 7420 }
    ]
  },
  {
    id: 'mandi-06',
    crop_en: 'Cotton',
    crop_mr: 'कापूस',
    crop_hi: 'कपास',
    market: 'Yavatmal APMC (यवतमाळ बाजार)',
    district: 'Yavatmal',
    state: 'Maharashtra',
    variety: 'Bt Cotton',
    min_price: 6700,
    max_price: 7550,
    modal_price: 7350,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 7150 },
      { date: '02 Nov', price: 7220 },
      { date: '03 Nov', price: 7300 },
      { date: '04 Nov', price: 7320 },
      { date: '05 Nov', price: 7340 },
      { date: '06 Nov', price: 7350 }
    ]
  },
  {
    id: 'mandi-07',
    crop_en: 'Tomato',
    crop_mr: 'टोमॅटो',
    crop_hi: 'टमाटर',
    market: 'Narayangaon APMC (नारायणगाव उपबाजार)',
    district: 'Pune',
    state: 'Maharashtra',
    variety: 'Hybrid Tomato',
    min_price: 1200,
    max_price: 2200,
    modal_price: 1850,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 1600 },
      { date: '02 Nov', price: 1700 },
      { date: '03 Nov', price: 1750 },
      { date: '04 Nov', price: 1800 },
      { date: '05 Nov', price: 1820 },
      { date: '06 Nov', price: 1850 }
    ]
  },
  {
    id: 'mandi-08',
    crop_en: 'Gram (Chana)',
    crop_mr: 'हरभरा / चणा',
    crop_hi: 'चना',
    market: 'Amravati APMC (अमरावती बाजार)',
    district: 'Amravati',
    state: 'Maharashtra',
    variety: 'Desi Chana',
    min_price: 5900,
    max_price: 6450,
    modal_price: 6280,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 6150 },
      { date: '02 Nov', price: 6200 },
      { date: '03 Nov', price: 6220 },
      { date: '04 Nov', price: 6250 },
      { date: '05 Nov', price: 6260 },
      { date: '06 Nov', price: 6280 }
    ]
  },
  {
    id: 'mandi-09',
    crop_en: 'Pigeon Pea (Tur)',
    crop_mr: 'तूर',
    crop_hi: 'अरहर / तुअर',
    market: 'Karanja APMC (कारंजा लाड)',
    district: 'Washim',
    state: 'Maharashtra',
    variety: 'Red Tur (लाल तूर)',
    min_price: 9800,
    max_price: 11400,
    modal_price: 10850,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 10500 },
      { date: '02 Nov', price: 10600 },
      { date: '03 Nov', price: 10720 },
      { date: '04 Nov', price: 10780 },
      { date: '05 Nov', price: 10800 },
      { date: '06 Nov', price: 10850 }
    ]
  },
  {
    id: 'mandi-10',
    crop_en: 'Pomegranate',
    crop_mr: 'डाळिंब',
    crop_hi: 'अनार',
    market: 'Solapur APMC (सोलापूर बाजार समिती)',
    district: 'Solapur',
    state: 'Maharashtra',
    variety: 'Bhagwa / भगवा',
    min_price: 6500,
    max_price: 14500,
    modal_price: 11200,
    updated_date: '2026-11-06',
    historical_trend: [
      { date: '01 Nov', price: 10800 },
      { date: '02 Nov', price: 10950 },
      { date: '03 Nov', price: 11000 },
      { date: '04 Nov', price: 11100 },
      { date: '05 Nov', price: 11150 },
      { date: '06 Nov', price: 11200 }
    ]
  }
];
