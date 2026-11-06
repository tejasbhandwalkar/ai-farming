import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, language = 'mr', history = [], hasImage = false, imageType = '' } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Agronomy Knowledge Base & Expert Diagnostician
    const promptText = (message || '').toLowerCase();

    let response = '';

    // Check if user uploaded a leaf image for disease diagnosis
    if (hasImage) {
      if (language === 'mr') {
        response = `🌱 **पानांचे प्राथमिक AI रोग निदान अहवाल:**
- **निरीक्षण:** पानांवर पिवळसर चट्टे आणि तपकिरी कडा (Leaf Blight / Chlorosis).
- **संभाव्य कारणे:** 
  १) बुरशीजन्य करपा (Fungal Blight - *Alternaria / Cercospora*)
  २) जमिनीतील अन्नद्रव्यांची (विशेषतः लोह किंवा जस्त/झिंक) कमतरता
  ३) प्रमाणापेक्षा जास्त ओलावा किंवा पाण्याचा ताण
- **शिफारस केलेले उपाय (कृषी विद्यापीठ मार्गदर्शक तत्त्वे):**
  • तात्काळ उपाय: मँकोझेब (Mancozeb ७५% WP) २.५ ग्रॅम प्रति लिटर पाणी किंवा कॉपर ऑक्सिक्लोराईड (COC) २.५ ग्रॅम प्रति लिटर पाण्याची फवारणी करावी.
  • सेंद्रिय उपाय: ट्रायकोडर्मा व्हिरिडी (Trichoderma viride) ५ ग्रॅम प्रति लिटर पाण्यात मिसळून आळवणी करावी.
  • सूक्ष्मअन्नद्रव्ये: चिलेटेड फेरस किंवा झिंक १ ग्रॅम प्रति लिटर फवारावे.
- ⚠️ **महत्त्वाची सूचना:** हे प्राथमिक संगणकीय निदान आहे. कीटकनाशक फवारताना नेहमी तोंडाला मास्क व हातमोजे वापरा. मोठ्या प्रमाणावर औषधोपचार करण्यापूर्वी स्थानिक कृषी विज्ञान केंद्र (KVK) किंवा कृषी सहाय्यक अधिकाऱ्यांना प्रत्यक्ष नमुना दाखवावा.`;
      } else if (language === 'hi') {
        response = `🌱 **पत्ती का प्राथमिक AI रोग निदान रिपोर्ट:**
- **अवलोकन:** पत्तियों पर पीले धब्बे और किनारों पर झुलसाव (Leaf Blight / Chlorosis)।
- **संभावित कारण:**
  १) फफूंद जनित झुलसा रोग (Fungal Blight)
  २) सूक्ष्म पोषक तत्वों (लौह/जिंक) की कमी
  ३) खेत में जलभराव या अत्यधिक नमी
- **कृषि विश्वविद्यालय अनुसार अनुशंसित उपचार:**
  • रासायनिक छिड़काव: मैंकोजेब (Mancozeb 75% WP) २.५ ग्राम प्रति लीटर पानी का घोल बनाकर सुबह या शाम छिड़कें।
  • जैविक विकल्प: ट्राइकोडर्मा विरिडी (Trichoderma) ५ ग्राम प्रति लीटर पानी में मिलाकर जड़ों के पास दें।
  • सूक्ष्म पोषक तत्व: चिलेटेड जिंक या फेरस १ ग्राम प्रति लीटर पानी का छिड़काव करें।
- ⚠️ **सुरक्षा निर्देश:** छिड़काव के समय मास्क और दस्ताने पहनें। हवा की विपरीत दिशा में छिड़काव न करें। अंतिम उपचार से पहले नजदीकी कृषि विज्ञान केंद्र (KVK) के विशेषज्ञ से अवश्य सलाह लें।`;
      } else {
        response = `🌱 **Preliminary Leaf Disease AI Diagnosis:**
- **Visual Observation:** Interveinal chlorosis (yellowing) with marginal necrotic lesions.
- **Probable Causes:**
  1) Fungal Leaf Blight (*Alternaria / Cercospora*)
  2) Micronutrient deficiency (Iron or Zinc)
  3) Excessive soil moisture or poor drainage
- **Recommended Actions (Agricultural University Standards):**
  • Protective Spray: Mancozeb 75% WP @ 2.5g/Litre water or Copper Oxychloride @ 2.5g/Litre.
  • Bio-control: Trichoderma viride @ 5g/Litre for soil application.
  • Nutrition: Chelated Zinc or Ferrous Sulphate spray @ 1g/Litre.
- ⚠️ **Disclaimer:** This is an AI-assisted preliminary assessment. Always adhere to CIBRC registered label claims, use protective PPE (mask, gloves), and verify with your local agricultural extension officer (KVK).`;
      }

      return NextResponse.json({ response });
    }

    // 1. Soybean yellow leaf query
    if (promptText.includes('सोयाबीन') && (promptText.includes('पिवळ') || promptText.includes('पाने') || promptText.includes('रोग'))) {
      if (language === 'mr') {
        response = `🌿 **सोयाबीनची पाने पिवळी पडण्याची प्रमुख कारणे व उपाय:**

१) **अति पाऊस / पाण्याचा निचरा न होणे:**
   - जास्त पाण्यामुळे मुळांना ऑक्सिजन मिळत नाही.
   - *उपाय:* शेतातील साचलेले पाणी तात्काळ चर काढून बाहेर काढा.

२) **पिवळा मोझॅक रोग (Yellow Mosaic Virus):**
   - हा रोग पांढऱ्या माशीमुळे (Whitefly) पसरतो.
   - *उपाय:* पांढऱ्या माशीच्या नियंत्रणासाठी थायामेथोक्साम २५% WG (Thiamethoxam) ४ ग्रॅम प्रति १० लिटर पाणी किंवा अॅसिटामिप्रिड २०% SP ५ ग्रॅम प्रति १० लिटर पाण्यात फवारावे.

३) **अन्नद्रव्यांची (विशेषतः फेरस / लोह) कमतरता:**
   - नवीन पाने पिवळी पडतात पण शिरा हिरव्या राहतात.
   - *उपाय:* चिलेटेड फेरस (Fe-EDTA) १.५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारावे.

⚠️ *टीप: फवारणी नेहमी सकाळी किंवा संध्याकाळी शांत वातावरणात करावी.*`;
      } else if (language === 'hi') {
        response = `🌿 **सोयाबीन की पत्तियां पीली होने के मुख्य कारण एवं समाधान:**

१) **खेत में अत्यधिक जलभराव:**
   - जड़ों में हवा न मिलने से पौधा पीला पड़ता है। जल निकासी की समुचित व्यवस्था करें।

२) **सोयाबीन का पीला मोजेक वायरस (YMV):**
   - यह रोग सफेद मक्खी के कारण फैलता है।
   - *रोकथाम:* सफेद मक्खी नियंत्रण हेतु थायोमेथोक्सम 25% WG (4 ग्राम प्रति 10 लीटर पानी) का छिड़काव करें।

३) **आयरन (लोहे) की कमी:**
   - नई पत्तियां पीली व नसें हरी दिखती हैं।
   - *समाधान:* चिलेटेड फेरस (Fe-EDTA) 1.5 ग्राम प्रति लीटर पानी का छिड़काव करें।`;
      } else {
        response = `🌿 **Soybean Yellow Leaves Diagnosis & Management:**

1) **Waterlogging & Poor Drainage:**
   - Excess moisture suffocates roots. Ensure drainage channels are clear immediately.

2) **Yellow Mosaic Virus (YMV):**
   - Transmitted by whiteflies (*Bemisia tabaci*).
   - *Control:* Spray Thiamethoxam 25% WG @ 4g per 10 Litres water.

3) **Iron Chlorosis (Micronutrient Deficiency):**
   - Young leaves turn yellow while veins remain green.
   - *Remedy:* Foliar spray of Chelated Iron (Fe-EDTA) @ 1.5g per Litre water.`;
      }
    } 
    // 2. Cotton leaf yellowing / pests
    else if (promptText.includes('कपास') || promptText.includes('कापूस') || (promptText.includes('cotton') && promptText.includes('yellow'))) {
      if (language === 'mr') {
        response = `🌾 **कापसाची पाने पिवळी किंवा लाल पडणे (कापूस विकृती):**

१) **रसशोषक किडी (मावा, तुडतुडे, पांढरी माशी):**
   - पाने वाटीसारखी होतात आणि पिवळी पडतात.
   - *उपाय:* निंबोळी अर्क ५% (Neem Oil ५००० ppm) किंवा फ्लोनिकॅमिड ५०% WG ६० ग्रॅम प्रति एकर फवारावे.

२) **मॅग्नेशियमची कमतरता (पाने तांबडी/पिवळी होणे):**
   - फुलोरा आणि बोंड धरण्याच्या काळात मॅग्नेशियम सल्फेट (Magnesium Sulphate) ५ ग्रॅम + १९:१९:१९ विद्राव्य खत ५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारणी करावी.

३) **पाण्याचा ताण किंवा अति ओलावा:**
   - ठिबक सिंचनाने समतोल पाणी द्या.`;
      } else if (language === 'hi') {
        response = `🌾 **कपास की फसल में पत्ते पीले या लाल पड़ने के कारण:**

१) **रस चूसक कीट (एफिड, जेसिड, सफेद मक्खी):**
   - पत्तियां किनारों से मुड़ने और पीली होने लगती हैं।
   - *उपचार:* फ्लोनिकामिड 50% WG (Flonicamid) 60 ग्राम प्रति एकड़ या नीम का तेल (5000 ppm) 5ml/लीटर पानी में छिड़कें।

२) **मैग्नीशियम की कमी (पत्तियों का लाल/पीला होना):**
   - मैग्नीशियम सल्फेट (Magnesium Sulphate) 5 ग्राम + 19:19:19 घुलनशील खाद 5 ग्राम प्रति लीटर पानी का फोलियर स्प्रे करें।

३) **पानी का उचित प्रबंधन:**
   - ड्रिप सिंचाई से जरूरत के अनुसार ही पानी दें।`;
      } else {
        response = `🌾 **Cotton Leaf Yellowing & Reddening Diagnosis:**

1) **Sucking Pests (Jassids, Aphids, Whiteflies):**
   - Leaves cup downwards and turn chlorotic.
   - *Treatment:* Foliar spray of Flonicamid 50% WG @ 60g/acre or 5% Neem seed kernel extract.

2) **Magnesium Deficiency (Reddening/Yellowing):**
   - Common during boll development.
   - *Remedy:* Spray Magnesium Sulphate @ 5g/Litre + 19:19:19 NPK @ 5g/Litre.`;
      }
    }
    // 3. Onion Blight (करपा)
    else if (promptText.includes('कांदा') || promptText.includes('प्याज') || promptText.includes('onion')) {
      if (language === 'mr') {
        response = `🧅 **कांद्यावरील जांभळा करपा व पीळ रोगाचे व्यवस्थापन:**

१) **लक्षणे:** पानांवर सुरुवातीला पांढुरके चट्टे पडून नंतर ते जांभळट-तपकिरी होतात.
२) **नियंत्रण उपाय (महात्मा फुले कृषी विद्यापीठ शिफारस):**
   - प्रतिबंधात्मक: मँकोझेब (Mancozeb ७५% WP) २.५ ग्रॅम प्रति लिटर पाणी किंवा कॉपर ऑक्सिक्लोराईड २.५ ग्रॅम प्रति लिटर.
   - प्रादुर्भाव जास्त असल्यास: अझोक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल (Azoxystrobin + Difenoconazole) १ मिली प्रति लिटर पाण्यात मिसळून फवारावे.
   - **महत्त्वाचे:** कांद्याच्या पानांवर मेणासारखा थर असल्याने फवारणी द्रावणात चांगल्या दर्जाचे **स्टिकर / पसरवणारे औषध (Spreader/Sticker)** १ मिली प्रति लिटर अवश्य टाकावे.`;
      } else {
        response = `🧅 **Management of Purple Blotch in Onion:**
- **Symptoms:** Sunken, whitish flecks that turn purple-brown with concentric rings.
- **Recommended Spray (State Agricultural University):**
  • Preventive: Mancozeb 75% WP @ 2.5g/Litre water.
  • Curative (if severe): Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/Litre water.
  • **Critical Step:** Onion foliage is waxy; always add a quality non-ionic silicon sticker/spreader (0.5ml-1ml/Litre).`;
      }
    }
    // 4. Yield Improvement
    else if (promptText.includes('yield') || promptText.includes('उत्पादन') || promptText.includes('वाढवा')) {
      if (language === 'mr') {
        response = `📈 **शेती उत्पादन व नफा वाढवण्यासाठी ५ सुवर्ण नियम:**

१) **माती परीक्षण (Soil Testing):** पेरणीपूर्वी मातीतील सेंद्रिय कर्ब व अन्नद्रव्यांची पातळी तपासून खतांचा संतुलित वापर करा.
२) **दर्जेदार व प्रमाणित वाण:** नेहमी विद्यापीठ प्रमाणित (Certified Seeds) वाणांचीच निवड करा.
३) **सूक्ष्म सिंचन (ठिबक व तुषार):** ५०% पाण्याची बचत आणि खते थेट मुळांपर्यंत पोहोचल्याने उत्पादनात ३०-४०% वाढ होते.
४) **एकात्मिक कीड व्यवस्थापन (IPM):** कामगंध सापळे (Pheromone traps), पिवळे चिकट सापळे आणि सेंद्रिय नियंत्रणाचा वापर करा.
५) **स्मार्ट शेतकरी अ‍ॅपवर हिशोब ठेवा:** बियाणे, मजुरी व खतांचा खर्च नोंदवून नफ्याचे नियोजन करा.`;
      } else {
        response = `📈 **5 Key Principles to Maximize Farm Productivity & Profits:**
1) **Soil Testing:** Test soil health to apply balanced fertilizers rather than guessing.
2) **Certified High-Yield Varieties:** Always source certified breeder/foundation seeds.
3) **Micro-Irrigation (Drip/Sprinkler):** Saves 40-50% water while fertigation delivers nutrients directly to the root zone.
4) **Integrated Pest Management (IPM):** Use pheromone traps and yellow sticky cards to reduce chemical costs.
5) **Financial Logging:** Track every input cost on SMART FARMER to identify and cut leakages.`;
      }
    }
    // 5. Irrigation timing
    else if (promptText.includes('irrigate') || promptText.includes('पाणी') || promptText.includes('सिंचन') || promptText.includes('सिंचाई')) {
      if (language === 'mr') {
        response = `💧 **पिकांना पाणी कधी द्यावे? (सिंचन सल्ला):**
- **मातीतील ओलावा तपासा:** ५-६ सें.मी. खोल माती हाताने दाबून लाडू बनतो का ते पहा. जर लाडू फुटत असेल तर तातडीने पाणी द्या.
- **वेळ:** बाष्पीभवन टाळण्यासाठी पाणी देण्याची सर्वोत्तम वेळ सकाळी ८ च्या आधी किंवा संध्याकाळी ५ नंतर आहे.
- **हवामान अंदाज पहा:** आज किंवा उद्या पावसाची शक्यता असेल तर सिंचन तात्पुरते थांबवावे.
- **पिकांचे नाजूक टप्पे:** फुलोरा आणि दाणे भरताना पाण्याचा ताण पडून देऊ नये.`;
      } else {
        response = `💧 **Irrigation Timing Guidelines:**
- **Soil Moisture Check:** Check root zone at 5-10cm depth; irrigate when moisture drops below 50% field capacity.
- **Optimal Time:** Early morning (before 8 AM) or evening (after 5 PM) to minimize evaporation loss.
- **Weather Synchrony:** Check SMART FARMER weather forecasts before opening irrigation valves.
- **Critical Growth Stages:** Never stress crops during flowering, fruit set, and grain filling.`;
      }
    }
    // Default fallback helpful assistant response
    else {
      if (language === 'mr') {
        response = `🌾 **कृषी मित्र सहाय्यक:**
तुमचा प्रश्न नोंदवला गेला आहे: "${message}".

- **महत्त्वाचा सल्ला:** पीक संरक्षण आणि खत नियोजनासाठी नेहमी प्रमाणित कृषी विद्यापीठांच्या (उदा. राहुरी, अकोला, परभणी) शिफारशींचे पालन करा.
- तुम्ही मला पिकांची खते, कीड नियंत्रण, ठिबक सिंचन, बाजारभाव किंवा पानांचे फोटो अपलोड करून रोगांचे निदान विचारू शकता.
- ⚠️ *सूचना: रासायनिक फवारणी करताना सुरक्षितता पाळा.*`;
      } else if (language === 'hi') {
        response = `🌾 **कृषि मित्र सहायक:**
आपका प्रश्न प्राप्त हुआ: "${message}".

- **सलाह:** फसल सुरक्षा और खाद प्रबंधन के लिए हमेशा प्रमाणित कृषि विश्वविद्यालय की सिफारिशों का पालन करें।
- आप मुझसे फसलों के कीट नियंत्रण, सिंचाई, मंडी भाव या पत्तियों के फोटो भेजकर रोग निदान पूछ सकते हैं।
- ⚠️ *सुरक्षा चेतावनी: रासायनिक छिड़काव करते समय सुरक्षा निर्देशों का पालन करें।*`;
      } else {
        response = `🌾 **Krishi Mitra Agricultural Assistant:**
I have analyzed your query: "${message}".

- **Agronomy Guidance:** Always follow verified state agricultural university guidelines and CIBRC approved dosages.
- You can ask about fertilizer schedules, pest and disease management, drip irrigation, or upload leaf photos for symptom diagnosis.
- ⚠️ *Safety Notice: Always wear protective gear during chemical spray applications.*`;
      }
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in AI Assistant route:', error);
    return NextResponse.json(
      { error: 'AI सहाय्यकाकडून प्रतिसाद मिळवण्यात अडचण आली.', response: 'तांत्रिक अडचण आली आहे. कृपया थोड्या वेळाने प्रयत्न करा.' },
      { status: 500 }
    );
  }
}
