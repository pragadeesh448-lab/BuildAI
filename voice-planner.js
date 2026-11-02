/**
 * BuildAI - Professional Native Voice Command & Diagnostics for Material Planner
 * Features:
 * 1. Explicit navigator.mediaDevices.getUserMedia() check & permission handling.
 * 2. Real-time Web Audio API AnalyserNode VU meter with dynamic level display.
 * 3. Clear distinction between silent microphone vs cloud speech recognition timeout.
 * 4. Full lifecycle handling (onstart, onspeechstart, onspeechend, onresult, onerror, onend).
 * 5. Interim results streaming to see speech in real-time.
 * 6. Dual English (en-IN) and Tanglish / Tamil (ta-IN) support with Tamil script normalizer.
 * 7. Clean retries without page reload and prevention of duplicate instances.
 * 8. Non-intrusive interactive fallback dialog with one-click suggestion chips.
 * 9. 100% preservation of catalogue (232 products), units, and optimizer logic.
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. TAMIL SCRIPT & TANGLISH COMPREHENSIVE NORMALIZER
  // =========================================================================

  // Tamil Unicode digits to Arabic numbers
  const TAMIL_DIGITS = {
    "௦": "0", "௧": "1", "௨": "2", "௩": "3", "௪": "4",
    "௫": "5", "௬": "6", "௭": "7", "௮": "8", "௯": "9",
    "௰": "10", "௱": "100", "௲": "1000"
  };

  // Direct Tamil script replacements (Ordered longest phrase first to prevent partial substring collisions)
  const TAMIL_STRING_REPLACEMENTS = [
    // Numbers - multi-word & large numbers
    ["பத்து லட்சம்", " 1000000 "],
    ["ஐந்து லட்சம்", " 500000 "],
    ["அஞ்சு லட்சம்", " 500000 "],
    ["இரண்டு லட்சம்", " 200000 "],
    ["ரெண்டு லட்சம்", " 200000 "],
    ["ஒரு லட்சம்", " 100000 "],
    ["ஒரு லக்ஷம்", " 100000 "],
    ["லட்சம்", " 100000 "],
    ["லக்ஷம்", " 100000 "],
    ["ஐம்பதாயிரத்து", " 50000 "],
    ["ஐம்பதாயிரம்", " 50000 "],
    ["அம்பதாயிரத்து", " 50000 "],
    ["அம்பதாயிரம்", " 50000 "],
    ["நாற்பதாயிரம்", " 40000 "],
    ["முப்பதாயிரத்து", " 30000 "],
    ["முப்பதாயிரம்", " 30000 "],
    ["இருபதாயிரத்து", " 20000 "],
    ["இருபதாயிரம்", " 20000 "],
    ["பத்தாயிரத்து", " 10000 "],
    ["பத்தாயிரம்", " 10000 "],
    ["ஐந்தாயிரம்", " 5000 "],
    ["அஞ்சாயிரம்", " 5000 "],
    ["இரண்டாயிரம்", " 2000 "],
    ["ரெண்டாயிரம்", " 2000 "],
    ["ஆயிரத்து", " 1000 "],
    ["ஆயிரம்", " 1000 "],
    ["ஐந்நூறு", " 500 "],
    ["ஐநூறு", " 500 "],
    ["நானூறு", " 400 "],
    ["முந்நூறு", " 300 "],
    ["இருநூறு", " 200 "],
    ["நூறு", " 100 "],
    ["தொண்ணூறு", " 90 "],
    ["எண்பது", " 80 "],
    ["எழுபது", " 70 "],
    ["அறுபது", " 60 "],
    ["ஐம்பது", " 50 "],
    ["அம்பது", " 50 "],
    ["நாற்பது", " 40 "],
    ["முப்பது", " 30 "],
    ["இருபது", " 20 "],
    ["பதினொன்று", " 11 "],
    ["பன்னிரண்டு", " 12 "],
    ["பதினைந்து", " 15 "],
    ["பத்து", " 10 "],
    ["ஒன்பது", " 9 "],
    ["எட்டு", " 8 "],
    ["ஏழு", " 7 "],
    ["ஆறு", " 6 "],
    ["ஐந்து", " 5 "],
    ["அஞ்சு", " 5 "],
    ["நான்கு", " 4 "],
    ["நாலு", " 4 "],
    ["மூன்று", " 3 "],
    ["மூணு", " 3 "],
    ["இரண்டு", " 2 "],
    ["ரெண்டு", " 2 "],
    ["ஒன்று", " 1 "],
    ["ஒண்ணு", " 1 "],
    ["ஒரு", " 1 "],
    ["பூஜ்ஜியம்", " 0 "],
    ["பூஜ்யம்", " 0 "],

    // Units
    ["மூட்டைகள்", " bags "],
    ["மூட்டை", " bags "],
    ["பேக்குகள்", " bags "],
    ["பேக்ஸ்", " bags "],
    ["பேக்", " bags "],
    ["சாக்கு", " bags "],
    ["டன்கள்", " tonnes "],
    ["டன்னு", " tonnes "],
    ["டன்", " tonnes "],
    ["கிலோகிராம்", " kg "],
    ["கிலோ", " kg "],
    ["கேஜி", " kg "],
    ["சதுர அடி", " sqft "],
    ["ஸ்கொயர் பீட்", " sqft "],
    ["ச.அடி", " sqft "],
    ["கன அடி", " cft "],
    ["சிஎஃப்டி", " cft "],
    ["க.அடி", " cft "],
    ["பெட்டிகள்", " box "],
    ["பெட்டி", " box "],
    ["பாக்ஸ்", " box "],
    ["பீஸ்கள்", " pieces "],
    ["பீஸ்", " pieces "],
    ["எண்ணிக்கை", " pieces "],
    ["நோஸ்", " pieces "],
    ["லிட்டர்கள்", " litres "],
    ["லிட்டர்", " litres "],
    ["மீட்டர்கள்", " meters "],
    ["மீட்டர்", " meters "],

    // Brands & Materials
    ["அல்ட்ராடெக் சிமெண்ட்", " UltraTech Cement "],
    ["அல்ட்ரா டெக் சிமெண்ட்", " UltraTech Cement "],
    ["அல்ட்ராடெக்", " UltraTech "],
    ["அல்ட்ரா டெக்", " UltraTech "],
    ["அம்புஜா சிமெண்ட்", " Ambuja Cement "],
    ["அம்புஜா", " Ambuja "],
    ["டால்மியா சிமெண்ட்", " Dalmia Cement "],
    ["டால்மியா", " Dalmia "],
    ["தால்மியா சிமெண்ட்", " Dalmia Cement "],
    ["தால்மியா", " Dalmia "],
    ["ராம்கோ சிமெண்ட்", " Ramco Cement "],
    ["ராம்கோ", " Ramco "],
    ["ராம் கோ", " Ramco "],
    ["ஏசிசி சிமெண்ட்", " ACC Cement "],
    ["ஏசிசி", " ACC "],
    ["ஏ சி சி", " ACC "],
    ["ஜேஎஸ்டபிள்யூ சிமெண்ட்", " JSW Cement "],
    ["ஜேஎஸ்டபிள்யூ", " JSW "],
    ["ஜே எஸ் டபிள்யூ", " JSW "],
    ["செட்டிநாடு சிமெண்ட்", " Chettinad Cement "],
    ["செட்டிநாடு", " Chettinad "],
    ["பிர்லா ஒயிட்", " Birla White "],
    ["பிர்லா", " Birla "],
    ["சிமெண்ட்", " Cement "],
    ["சிமென்ட்", " Cement "],
    ["சிமென்டு", " Cement "],
    ["சிமிண்ட்", " Cement "],
    ["43 கிரேடு", " 43 Grade "],
    ["53 கிரேடு", " 53 Grade "],
    ["ஓபிசி", " OPC "],
    ["ஓ பி சி", " OPC "],
    ["பிபிசி", " PPC "],
    ["பி பி சி", " PPC "],
    ["கிரேடு", " Grade "],
    ["கிரேட்", " Grade "],

    ["டாடா டிஸ்கான்", " Tata Tiscon "],
    ["டாடா", " Tata "],
    ["டிஎம்டி கம்பி", " TMT Steel "],
    ["டிஎம்டி ஸ்டீல்", " TMT Steel "],
    ["டிஎம்டி", " TMT Steel "],
    ["கம்பி", " Steel "],
    ["ஸ்டீல்", " Steel "],
    ["இரும்பு", " Steel "],

    ["எம் சாண்ட் மணல்", " M-Sand "],
    ["எம் சாண்ட்", " M-Sand "],
    ["எம்சாண்ட்", " M-Sand "],
    ["பி சாண்ட்", " P-Sand "],
    ["பிசாண்ட்", " P-Sand "],
    ["ஆற்று மணல்", " River Sand "],
    ["மணல்", " Sand "],

    ["செங்கற்கள்", " Red Brick "],
    ["செங்கல்", " Red Brick "],
    ["ஏஏசி ப்ளாக்", " AAC Block "],
    ["ஏஏசி பிளாக்", " AAC Block "],
    ["ஏஏசி", " AAC "],
    ["ப்ளாக்", " Block "],
    ["பிளாக்", " Block "],

    ["ஏசியன் பெயிண்ட்ஸ்", " Asian Paints "],
    ["ஏசியன் பெயிண்ட்", " Asian Paints "],
    ["ராயல்", " Royale "],
    ["பெர்கர் பெயிண்ட்ஸ்", " Berger "],
    ["பெர்கர்", " Berger "],
    ["பெயிண்ட்", " Paint "],
    ["வண்ணம்", " Paint "],

    ["கஜாரியா டைல்ஸ்", " Kajaria "],
    ["கஜாரியா", " Kajaria "],
    ["சோமானி", " Somany "],
    ["டைல்ஸ்", " Tiles "],
    ["டைல்", " Tiles "],

    ["ஆஸ்ட்ரல் பைப்", " Astral "],
    ["ஆஸ்ட்ரல்", " Astral "],
    ["அஸ்ட்ரல்", " Astral "],
    ["ஆஷிர்வாத்", " Ashirvad "],
    ["சிபிவிசி பைப்", " CPVC Pipe "],
    ["பிவிசி பைப்", " PVC Pipe "],
    ["பைப்", " Pipe "],
    ["குழாய்", " Pipe "],

    ["செஞ்சுரி ப்ளை", " Century "],
    ["செஞ்சுரி", " Century "],
    ["பிளைவுட்", " Plywood "],
    ["ப்ளைவுட்", " Plywood "],
    ["ப்ளை", " Plywood "],
    ["கிரானைட்", " Granite "],

    // Aggregates & Jelly in Tamil
    ["ப்ளூ மெட்டல்", " Aggregates "],
    ["ப்ளூமெட்டல்", " Aggregates "],
    ["கருங்கற்கள்", " Aggregates "],
    ["கருங்கல்", " Aggregates "],
    ["கல்காரி", " Aggregates "],
    ["கற்கள்", " Aggregates "],
    ["ஜல்லி", " Aggregates "],

    // Steel Rebar Millimeters & Sizes
    ["25 எம்எம்", " 25mm "],
    ["20 எம்எம்", " 20mm "],
    ["16 எம்எம்", " 16mm "],
    ["12 எம்எம்", " 12mm "],
    ["10 எம்எம்", " 10mm "],
    ["8 எம்எம்", " 8mm "],
    ["மில்லி", " mm "],
    ["எம்எம்", " mm "],

    // Sand, Load & Bulk Units
    ["லோடு", " cft "],
    ["வண்டி", " cft "],
    ["லாரி", " cft "],
    ["சி.எப்.டி", " cft "],
    ["சிஎப்டி", " cft "],

    // Actions & Fields
    ["சேர்க்கவும்", " add "],
    ["சேர்த்து விடு", " add "],
    ["சேர்த்துக்கோ", " add "],
    ["சேர்த்துக்க", " add "],
    ["சேர்க்க", " add "],
    ["சேர்", " add "],
    ["போடுங்க", " add "],
    ["போடு", " add "],
    ["ஆட் பண்ணு", " add "],
    ["பண்ணு", " add "],
    ["வேண்டும்", " add "],
    ["தேவைப்படுகிறது", " add "],
    ["தேவைப்படுது", " add "],
    ["தேவை", " add "],
    ["வேண்டியது", " add "],
    ["வேணும்", " add "],
    ["குடுங்க", " add "],
    ["குடு", " add "],
    ["கொடுங்க", " add "],
    ["கொடு", " add "],
    ["வாங்கணும்", " add "],
    ["வாங்கு", " add "],
    ["நீக்கவும்", " remove "],
    ["நீக்கு", " remove "],
    ["அழிக்கவும்", " remove "],
    ["அழி", " remove "],
    ["தூக்கிடுங்க", " remove "],
    ["தூக்கிடு", " remove "],
    ["தூக்கு", " remove "],
    ["எடு", " remove "],
    ["டெலிட் பண்ணு", " remove "],
    ["வேண்டாம்", " remove "],
    ["வேணாம்", " remove "],
    ["ஆப்டிமைஸ் பண்ணு", " optimize "],
    ["ஆப்டிமைஸ் செய்", " optimize "],
    ["ஆப்டிமைஸ்", " optimize "],
    ["பிளான் பண்ணு", " optimize "],
    ["சேர்க்கவும்", " add "],
    ["சேர்த்துக்கோ", " add "],
    ["சேர்த்துக்க", " add "],
    ["சேர்க்க", " add "],
    ["சேர்", " add "],
    ["போடு", " add "],
    ["பண்ணு", " add "],
    ["வேண்டும்", " add "],
    ["தேவை", " add "],
    ["வேணும்", " add "],
    ["நீக்கவும்", " remove "],
    ["நீக்கு", " remove "],
    ["அழிக்கவும்", " remove "],
    ["அழி", " remove "],
    ["தூக்கு", " remove "],
    ["எடு", " remove "],
    ["வேண்டாம்", " remove "],
    ["ஆப்டிமைஸ் பண்ணு", " optimize "],
    ["ஆப்டிமைஸ் செய்", " optimize "],
    ["ஆப்டிமைஸ்", " optimize "],
    ["கணக்கிடு", " optimize "],
    ["முடிவு செய்", " optimize "],
    ["பட்ஜெட்", " budget "],
    ["தொகை", " budget "],
    ["செலவு", " budget "],
    ["மதிப்பீடு", " budget "],
    ["ரூபாய்", " "],
    ["நாளைக்குள்", " days "],
    ["நாட்கள்", " days "],
    ["நாள்", " days "],
    ["சீக்கிரம்", " fastest speed "],
    ["விரைவாக", " fastest speed "],
    ["குறைந்த விலை", " lowest cost "],
    ["கம்மி விலை", " lowest cost "],
    ["சிறந்த தரம்", " highest quality "],
    ["தரம்", " quality "],
    ["சப்ளையர் காம்பினேஷன்", " supplier combination "],
    ["காம்பினேஷன்", " supplier combination "],
    ["வேலூர்", " Vellore "],
    ["சென்னை", " Chennai "],
    ["காட்பாடி", " Katpadi "],
    ["அண்ணா நகர்", " Anna Nagar "]
  ];

    // Common Phonetic Tanglish replacements
  const TANGLISH_PHONETIC_MAP = [
    // 1. Spoken Tanglish numbers (Compound & Large amounts first)
    { pattern: /\b(oru\s+latcham|oru\s+lakh|latcham|patcham|lakh)\b/gi, replacement: " 100000 " },
    { pattern: /\b(rendu\s+latcham|rendu\s+lakh|irandu\s+latcham)\b/gi, replacement: " 200000 " },
    { pattern: /\b(moonu\s+latcham|moonu\s+lakh)\b/gi, replacement: " 300000 " },
    { pattern: /\b(naalu\s+latcham|naalu\s+lakh)\b/gi, replacement: " 400000 " },
    { pattern: /\b(anju\s+latcham|aindhu\s+latcham|anju\s+lakh)\b/gi, replacement: " 500000 " },
    { pattern: /\b(pathu\s+latcham|pathu\s+lakh)\b/gi, replacement: " 1000000 " },
    { pattern: /\b(aimbadhayiram|ambadhaayiram|ambathayiram|aimbathayiram|ambadhayiram)\b/gi, replacement: " 50000 " },
    { pattern: /\b(narpadhayiram|narpathayiram)\b/gi, replacement: " 40000 " },
    { pattern: /\b(mubadhayiram|mubathayiram)\b/gi, replacement: " 30000 " },
    { pattern: /\b(irubadhayiram|irubathayiram)\b/gi, replacement: " 20000 " },
    { pattern: /\b(pathaayiram|pathayiram)\b/gi, replacement: " 10000 " },
    { pattern: /\b(anjaayiram|anjairam|aindhaayiram)\b/gi, replacement: " 5000 " },
    { pattern: /\b(rendaayiram|irandaayiram)\b/gi, replacement: " 2000 " },
    { pattern: /\b(ayiram|aayiram)\b/gi, replacement: " 1000 " },
    { pattern: /\b(ainnooru|ainooru|anjooru)\b/gi, replacement: " 500 " },
    { pattern: /\b(naanooru|nanooru)\b/gi, replacement: " 400 " },
    { pattern: /\b(munnooru)\b/gi, replacement: " 300 " },
    { pattern: /\b(irunooru)\b/gi, replacement: " 200 " },
    { pattern: /\b(nooru)\b/gi, replacement: " 100 " },
    { pattern: /\b(thonnooru)\b/gi, replacement: " 90 " },
    { pattern: /\b(enbathu|enbadhu)\b/gi, replacement: " 80 " },
    { pattern: /\b(ezhubathu|elubadhu)\b/gi, replacement: " 70 " },
    { pattern: /\b(arubathu|arubadhu)\b/gi, replacement: " 60 " },
    { pattern: /\b(aimbathu|aimbadhu|ambathu|ambadhu)\b/gi, replacement: " 50 " },
    { pattern: /\b(narpathu|narpadhu)\b/gi, replacement: " 40 " },
    { pattern: /\b(muppathu|muppadhu)\b/gi, replacement: " 30 " },
    { pattern: /\b(irubathu|irubadhu)\b/gi, replacement: " 20 " },
    { pattern: /\b(pathinanju|pathinaindhu)\b/gi, replacement: " 15 " },
    { pattern: /\b(pathinaalu)\b/gi, replacement: " 14 " },
    { pattern: /\b(pathimoonu)\b/gi, replacement: " 13 " },
    { pattern: /\b(pannirendu|pannirandu)\b/gi, replacement: " 12 " },
    { pattern: /\b(pathinonnu|pathinondru)\b/gi, replacement: " 11 " },
    { pattern: /\b(pathu)\b/gi, replacement: " 10 " },
    { pattern: /\b(onbadhu|ombadhu)\b/gi, replacement: " 9 " },
    { pattern: /\b(ettu)\b/gi, replacement: " 8 " },
    { pattern: /\b(yezhu|elu)\b/gi, replacement: " 7 " },
    { pattern: /\b(aaru)\b/gi, replacement: " 6 " },
    { pattern: /\b(anju|aindhu)\b/gi, replacement: " 5 " },
    { pattern: /\b(naalu|nanku)\b/gi, replacement: " 4 " },
    { pattern: /\b(moonu|moondru)\b/gi, replacement: " 3 " },
    { pattern: /\b(rendu|irandu)\b/gi, replacement: " 2 " },
    { pattern: /\b(onnu|oru)\b/gi, replacement: " 1 " },

    // 2. Units in phonetic Tanglish
    { pattern: /\b(moottai|mootta|moottaigal|saakku|sakku|bagu|paeg|paegs)\b/gi, replacement: " bags " },
    { pattern: /\b(dannu|tannu)\b/gi, replacement: " tonnes " },
    { pattern: /\b(kilo|kilogram|keji)\b/gi, replacement: " kg " },
    { pattern: /\b(cft|gana\s+adi|kana\s+adi|lorry|lori|vandi|loadu|load)\b/gi, replacement: " cft " },
    { pattern: /\b(sqft|sadura\s+adi|square\s+feet)\b/gi, replacement: " sqft " },
    { pattern: /\b(petti|pettigal|baaks)\b/gi, replacement: " box " },
    { pattern: /\b(peesu|peeskigal|ennikkai)\b/gi, replacement: " pieces " },
    { pattern: /\b(leetar|littar)\b/gi, replacement: " litres " },

    // 3. Materials in phonetic Tanglish
    { pattern: /\b(seement|sement|chiment|cementu|cement-u)\b/gi, replacement: " Cement " },
    { pattern: /\b(kambi|kambigal|irumbu|rebar|rod)\b/gi, replacement: " TMT Steel " },
    { pattern: /\b(jalli|jellie|jalie|karkal|kalkaari|karungal|blue\s+metal)\b/gi, replacement: " Aggregates " },
    { pattern: /\b(manal|aathu\s+manal|aattru\s+manal|sandu)\b/gi, replacement: " Sand " },
    { pattern: /\b(m\s*sand|msand)\b/gi, replacement: " M-Sand " },
    { pattern: /\b(p\s*sand|psand)\b/gi, replacement: " P-Sand " },
    { pattern: /\b(chengal|senkal|sengal|chengallu|sengallu|itika|brick-u|bricks)\b/gi, replacement: " Red Brick " },
    { pattern: /\b(aac\s+block|aac\s+kal)\b/gi, replacement: " AAC Block " },
    { pattern: /\b(vanna\s+poosu|vannam|varnam|varna\s+poochu|emulsion)\b/gi, replacement: " Paint " },
    { pattern: /\b(kuzhai|pipe-u)\b/gi, replacement: " Pipe " },
    { pattern: /\b(maram|plywood-u)\b/gi, replacement: " Plywood " },

    // 4. Action verbs in Tanglish
    { pattern: /\b(add\s+pannu|podu|podunga|potuko|sethuko|serthu|serthukonga|venum|vendum|venam|thevai|theva|thevapadudhu|theva\s+padudhu|vaanganum|vanganum|eduthuko|eduthukonga|kudu|kudunga|anupu|anupunga|order\s+pannu|book\s+pannu|set\s+pannu)\b/gi, replacement: " add " },
    { pattern: /\b(remove\s+pannu|thooku|thookidu|thookidunga|eduthu|delete\s+pannu|vendam|veanadaam)\b/gi, replacement: " remove " },
    { pattern: /\b(optimaise|optimize\s+pannu|plan\s+pannu|calculate\s+pannu|kanakku\s+podu)\b/gi, replacement: " optimize " },
    { pattern: /\b(kammi\s+vila|kammi\s+cost|kammi\s+price|cheap\s+ah|maliwa|kuraintha\s+vilai)\b/gi, replacement: " lowest cost " },
    { pattern: /\b(seekiram|seekirama|seekiramaa|vegamma|vegama|fast\s+delivery|fastest)\b/gi, replacement: " fastest speed " },
    { pattern: /\b(tharamana|tharam|nalla\s+quality|best\s+quality|periya\s+quality)\b/gi, replacement: " highest quality " },
    { pattern: /\b(budget\s+ah|budget-u|pathivaana|selavu)\b/gi, replacement: " budget " },

    // 5. Common English acoustic misrecognitions from Google speech engine on Tanglish speech
    { pattern: /\b(when\s+you\s+want|when\s+you|when\s+him|when\s+um|venue|venom|we\s+know|winner)\b/gi, replacement: " add " },
    { pattern: /\b(the\s+weather|day\s+were|they\s+were)\b/gi, replacement: " add " },
    { pattern: /\b(can\s+be|can\s+we|camby)\b/gi, replacement: " TMT Steel " },
    { pattern: /\b(jelly|jolly)\b/gi, replacement: " Aggregates " },
    { pattern: /\b(manual|man\s+all|manner)\b/gi, replacement: " Sand " },
    { pattern: /\b(motel|motor)\b/gi, replacement: " bags " },
    { pattern: /\b(to\s+cook|took)\b/gi, replacement: " remove " },
    { pattern: /\b(rent\s+to|run\s+to|red\s+to)\b/gi, replacement: " 2 " },
    { pattern: /\b(part\s+2|pat\s+to|pat)\b/gi, replacement: " 10 " },
    { pattern: /\b(lecture|latch\s+on)\b/gi, replacement: " 100000 " },
    { pattern: /\b(iron|i\s+run)\b/gi, replacement: " 1000 " },
    { pattern: /\b(sea\s+cream|c\s+cream)\b/gi, replacement: " fastest speed " },
    { pattern: /\b(come\s+me|calm\s+me)\b/gi, replacement: " lowest cost " }

  ];

  function normalizeTamilAndTanglish(inputStr) {
    if (!inputStr) return "";
    let str = String(inputStr).trim();

    // 1. Replace Tamil numeric glyphs (௧ -> 1, etc.)
    for (const [tGlyph, aDigit] of Object.entries(TAMIL_DIGITS)) {
      str = str.split(tGlyph).join(aDigit);
    }

    // 2. Apply Tamil Unicode direct string replacements
    for (const [tWord, engWord] of TAMIL_STRING_REPLACEMENTS) {
      str = str.split(tWord).join(engWord);
    }

    // 3. Apply Tanglish phonetic dictionary replacements
    for (const item of TANGLISH_PHONETIC_MAP) {
      str = str.replace(item.pattern, item.replacement);
    }

    return str.replace(/\s+/g, " ").trim();
  }

  // Spoken number words in English
  const NUMBER_WORDS = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
    lakh: 100000, lakhs: 100000, crore: 10000000, crores: 10000000
  };

  function parseSpokenNumber(text) {
    if (!text) return null;
    const str = String(text).toLowerCase().trim();

    // Direct numeric digits
    const numMatch = str.match(/\b(\d+(?:\.\d+)?)\b/);
    if (numMatch) {
      const val = parseFloat(numMatch[1]);
      if (str.includes("lakh") || str.includes("latcham")) return Math.round(val * 100000);
      if (str.includes("thousand") || str.includes("ayiram") || str.includes("aayiram")) return Math.round(val * 1000);
      if (str.includes("crore")) return Math.round(val * 10000000);
      return val;
    }

    // Accumulator for spelled-out numbers
    const words = str.match(/[a-z]+/g) || [];
    let total = 0, current = 0, found = false;
    for (const w of words) {
      if (NUMBER_WORDS.hasOwnProperty(w)) {
        found = true;
        const n = NUMBER_WORDS[w];
        if (n === 100 || n === 1000 || n === 100000 || n === 10000000) {
          current = Math.max(1, current) * n;
          if (n >= 1000) {
            total += current;
            current = 0;
          }
        } else {
          current += n;
        }
      }
    }
    total += current;
    return found ? total : null;
  }

  // =========================================================================
  // 2. PRODUCT CATALOGUE MATCHING (PRESERVES ALL 232 PRODUCTS & CRITERIA)
  // =========================================================================

  function getCatalogProducts() {
    if (typeof products !== "undefined" && Array.isArray(products)) return products;
    if (typeof getProducts === "function") return getProducts();
    if (typeof window !== "undefined" && Array.isArray(window.products)) return window.products;
    return [];
  }

  function matchProduct(queryText, preferredUnit) {
    const prods = getCatalogProducts();
    if (!prods.length || !queryText) return { product: null, score: 0 };

    const clean = queryText.toLowerCase().replace(/[^\w\s]/g, " ");
    const noise = new Set([
      "add", "pannu", "podu", "sethuko", "vennum", "thevai", "of", "and", "mattrum", "kooda",
      "bags", "bag", "kg", "kgs", "tonne", "tonnes", "litre", "litres", "liter", "liters",
      "cft", "sqft", "box", "boxes", "pieces", "piece", "nos", "unit", "units", "please",
      "in", "to", "for", "the", "a", "an", "rate", "cost", "price", "delivery", "fast", "require",
      "material", "items", "item", "order"
    ]);

    const tokens = clean.split(/\s+/).filter(w => w && !noise.has(w) && w.length > 1);
    if (!tokens.length) return { product: null, score: 0 };

    let bestProd = null;
    let bestScore = 0;

    for (const p of prods) {
      const pName = (p.name || "").toLowerCase();
      const pCat = (p.category || "").toLowerCase();
      const pBrand = (p.brand || "").toLowerCase();
      const pSpec = (p.spec || "").toLowerCase();
      const pWords = new Set(`${pName} ${pCat} ${pBrand} ${pSpec}`.match(/\b\w+\b/g) || []);

      let score = 0;
      let exactMatches = 0;
      let numberMismatch = false;

      for (const t of tokens) {
        if (/^\d+$/.test(t)) {
          // If query specifies a model grade like '43' or '53' or mm '12'
          if (pWords.has(t)) {
            score += 6.0;
            exactMatches += 1;
          } else {
            // Penalize heavily if product contains a competing grade number (e.g. 53 vs 43)
            const prodNumbers = pName.match(/\b\d+\b/g) || [];
            if (prodNumbers.length && !prodNumbers.includes(t)) {
              numberMismatch = true;
            }
          }
        } else if (pWords.has(t)) {
          exactMatches += 1;
          if (pName.includes(t)) score += 4.0;
          else if (pBrand.includes(t) || pCat.includes(t)) score += 2.5;
          else score += 1.5;
        } else if (t.length >= 4) {
          const hasPrefix = Array.from(pWords).some(w => w.length >= 4 && (w.startsWith(t) || t.startsWith(w)));
          if (hasPrefix) {
            exactMatches += 0.5;
            score += 1.5;
          }
        }
      }

      if (numberMismatch) score -= 8.0;

      // Exact phrase match bonus
      const qClean = tokens.join(" ");
      if (pName.includes(qClean)) score += 6.0;

      // Unit match bonus
      if (preferredUnit && p.unit && p.unit.toLowerCase().startsWith(preferredUnit.toLowerCase().slice(0, 3))) {
        score += 1.5;
      }

      if (score > bestScore && exactMatches >= 1) {
        bestScore = score;
        bestProd = p;
      }
    }

    if (bestScore >= 3.8 && bestProd) {
      return { product: bestProd, score: Math.round(bestScore * 10) / 10 };
    }
    return { product: null, score: 0 };
  }

  function extractItemQuantityAndCleanSegment(segment) {
    const unitRegex = /\b(bags?|kgs?|tonnes?|tons?|litres?|liters?|cft|sqft|box(?:es)?|pieces?|pcs|nos|units?|sheets?|blocks?)\b/i;
    const unitMatch = segment.match(unitRegex);
    let unit = unitMatch ? unitMatch[1] : null;

    let qty = 1;
    let matchedPortion = null;

    // Pattern A: Number preceding unit (e.g. "100 bags", "50 kg", "fifty bags")
    if (unit) {
      const patternA = new RegExp(`(?:([a-z0-9]+)\\s+)(?:of\\s+)?${unit}\\b`, "i");
      const mA = segment.match(patternA);
      if (mA && mA[1]) {
        const numA = parseSpokenNumber(mA[1]);
        if (numA !== null && numA > 0) {
          qty = numA;
          matchedPortion = mA[0];
        }
      }
    }

    // Pattern B: "add <num> [unit] ... " or "<num> <unit> add"
    if (!matchedPortion) {
      const patternB = /\b(?:add|podu|vennum|thevai)\s+([a-z0-9]+)\b/i;
      const mB = segment.match(patternB);
      if (mB && mB[1]) {
        const numB = parseSpokenNumber(mB[1]);
        if (numB !== null && numB > 0) {
          qty = numB;
          matchedPortion = mB[0];
        }
      }
    }

    // Pattern C: Numeric token that is NOT part of a spec (43 Grade, 12mm, Fe 500D)
    if (!matchedPortion) {
      const tokens = segment.split(/\s+/);
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i].toLowerCase();
        const nextT = (tokens[i + 1] || "").toLowerCase();
        if (nextT === "grade" || nextT === "mm" || t.endsWith("mm") || t.endsWith("d") || t.startsWith("fe")) {
          continue;
        }
        const numC = parseSpokenNumber(t);
        if (numC !== null && numC > 0) {
          qty = numC;
          matchedPortion = t;
          break;
        }
      }
    }

    let clean = segment;
    if (matchedPortion) {
      clean = clean.replace(matchedPortion, " ");
    }
    if (unit) {
      clean = clean.replace(new RegExp(`\\b${unit}\\b`, "gi"), " ");
    }
    clean = clean.replace(/\b(add|pannu|podu|sethuko|vennum|thevai|please|of|items|material|ku|nu|only|just)\b/gi, " ");
    clean = clean.replace(/\s+/g, " ").trim();

    return { qty, unit, cleanSegment: clean };
  }

  // =========================================================================
  // 3. VOICE COMMAND PARSER (NATURAL LANGUAGE CLASSIFIER)
  // =========================================================================

  function isOnlyCementAndQty(text) {
    if (!text) return false;
    const t = text.toLowerCase();

    // Must contain cement (or Tamil / Tanglish phonetic equivalents)
    const hasCement = /\b(cement|seement|sement|chiment|cementu|சிமெண்ட்|சிமென்ட்|சிமென்டு)\b/i.test(t);
    if (!hasCement) return false;

    // Must NOT contain specific cement brand names in the catalogue
    const specificCementBrands = [
      "ultratech", "ultra tech", "ultra", "acc", "dalmia", "ambuja", "birla", "ramco", "jsw", "chettinad"
    ];
    for (const b of specificCementBrands) {
      if (new RegExp(`\\b${b}\\b`, "i").test(t)) return false;
    }

    // Must NOT contain specific cement grades/types/specs
    const specificCementGrades = [
      "43", "53", "ppc", "opc", "psc", "dsp", "white", "roof", "supercrete", "concreel",
      "masonry", "mortar", "slag", "weather"
    ];
    for (const g of specificCementGrades) {
      if (new RegExp(`\\b${g}\\b`, "i").test(t)) return false;
    }

    // Must NOT contain other material categories
    const otherCategories = [
      "steel", "rebar", "tmt", "kambi", "sand", "m-sand", "p-sand", "manal",
      "aggregate", "aggregates", "jalli", "brick", "chengal", "aac", "paint", "plywood", "pipe"
    ];
    for (const o of otherCategories) {
      if (new RegExp(`\\b${o}\\b`, "i").test(t)) return false;
    }

    return true;
  }

  function parseVoiceCommand(rawTranscript) {
    if (!rawTranscript || !rawTranscript.trim()) return null;
    const normalized = normalizeTamilAndTanglish(rawTranscript);
    const text = normalized.toLowerCase().replace(/[.!?]+$/, "");

    // 1. OPTIMIZE PLAN
    if (/optimize|optimaise|run optimizer|calculate plan|find best suppliers|plan optimize/.test(text)) {
      return {
        action: "OPTIMIZE_PLAN",
        type: "optimize",
        title: "⚡ Optimize Purchase Plan",
        desc: "Execute BuildAI supplier combination optimizer with current materials",
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    // 2. CLEAR MATERIALS
    if (/clear all|clear materials|ellam clear|reset materials|delete all materials/.test(text)) {
      return {
        action: "CLEAR_MATERIALS",
        type: "clear",
        title: "🗑️ Clear All Materials",
        desc: "Remove all material requirement lines from the planner",
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    // 3. SET BUDGET
    if (text.includes("budget")) {
      const budgetVal = parseSpokenNumber(text);
      if (budgetVal && budgetVal > 0) {
        return {
          action: "SET_BUDGET",
          type: "field",
          field: "projectBudget",
          value: budgetVal,
          title: `💰 Target Budget: ₹${budgetVal.toLocaleString("en-IN")}`,
          desc: `Update project procurement budget to ₹${budgetVal.toLocaleString("en-IN")}`,
          transcript: rawTranscript,
          normalized: normalized,
          ready: true
        };
      }
    }

    // 4. SET DELIVERY DEADLINE
    if (/deadline|delivery within|delivery time|delivery days|days/.test(text)) {
      const dayMatch = text.match(/\b(\d+)\s*(day|days|naal)?\b/);
      const days = dayMatch ? parseInt(dayMatch[1], 10) : parseSpokenNumber(text);
      if (days) {
        const allowed = [1, 2, 3, 4, 5, 7, 14];
        const bestDay = allowed.reduce((prev, curr) => Math.abs(curr - days) < Math.abs(prev - days) ? curr : prev);
        return {
          action: "SET_DEADLINE",
          type: "field",
          field: "deliveryDeadline",
          value: String(bestDay),
          title: `⏱️ Delivery Deadline: Within ${bestDay} day(s)`,
          desc: `Set required supplier delivery speed to ${bestDay} day(s)`,
          transcript: rawTranscript,
          normalized: normalized,
          ready: true
        };
      }
    }

    // 5. SET PRIORITY
    if (text.includes("priority") || /lowest cost|cheap|fastest|speed|quick|quality|service score|balanced/.test(text)) {
      let val = "balanced", label = "Balanced value";
      if (/cost|cheap|lowest/.test(text)) { val = "cost"; label = "Lowest overall cost"; }
      else if (/speed|fast|quick/.test(text)) { val = "speed"; label = "Fastest delivery"; }
      else if (/quality|score|service/.test(text)) { val = "quality"; label = "Highest service score"; }
      else if (/balanced|balance/.test(text)) { val = "balanced"; label = "Balanced value"; }

      return {
        action: "SET_PRIORITY",
        type: "field",
        field: "optimizationPriority",
        value: val,
        title: `🎯 Priority: ${label}`,
        desc: `Tune optimizer trade-off objective to ${label}`,
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    // 6. SUPPLIER COMBINATION TOGGLE
    if (text.includes("combination") || text.includes("mix suppliers") || text.includes("single supplier")) {
      const enable = (/allow|enable|on|yes|mix|pannu|true/.test(text)) && !(/disable|off|no|single|don't/.test(text));
      return {
        action: "SET_COMBINATION",
        type: "field",
        field: "allowCombinationSuppliers",
        value: enable,
        title: `🔀 Supplier Combination: ${enable ? "Enabled" : "Disabled"}`,
        desc: enable ? "Allow BuildAI to split procurement across multiple suppliers" : "Restrain plan to a single primary supplier shop",
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    // 7. SET LOCATION
    if (/location|area|address|place|vellore|chennai|katpadi|anna nagar/.test(text)) {
      let loc = text.replace(/^(?:set\s+)?(?:delivery\s+|project\s+)?(?:location|area|address|place)(?:\s+(?:to|is|ah|nu))?\s+/, "");
      loc = loc.replace(/\b(set|mathu|podu)\b/g, "").trim();
      if (loc) {
        const titleLoc = loc.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return {
          action: "SET_LOCATION",
          type: "field",
          field: "projectArea",
          value: titleLoc,
          title: `📍 Delivery Location: ${titleLoc}`,
          desc: `Update site destination address to ${titleLoc}`,
          transcript: rawTranscript,
          normalized: normalized,
          ready: true
        };
      }
    }

    // 8. SET PROJECT NAME
    if (text.includes("project name") || text.includes("project title")) {
      let name = text.replace(/^(?:set\s+)?project\s+(?:name|title)(?:\s+(?:to|is|ah|nu))?\s+/, "");
      name = name.replace(/\b(set|mathu|podu)\b/g, "").trim();
      if (name) {
        const titleName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return {
          action: "SET_PROJECT_NAME",
          type: "field",
          field: "projectName",
          value: titleName,
          title: `🏗️ Project Name: ${titleName}`,
          desc: `Rename project to ${titleName}`,
          transcript: rawTranscript,
          normalized: normalized,
          ready: true
        };
      }
    }

    // 9. REMOVE MATERIAL
    if (/remove|delete/.test(text)) {
      const q = text.replace(/\b(remove|delete|line|item|material|ah)\b/g, "").trim();
      return {
        action: "REMOVE_MATERIAL",
        type: "remove",
        query: q,
        title: `✕ Remove Material: "${q}"`,
        desc: `Remove line item matching "${q}" from the material list`,
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    // 9B. CEMENT CATEGORY SELECTION (When user specifies only cement and its quantity)
    if (isOnlyCementAndQty(text)) {
      const extracted = extractItemQuantityAndCleanSegment(text);
      const qty = extracted.qty > 0 ? extracted.qty : 50;
      const unit = extracted.unit || "bags";
      return {
        action: "SELECT_CEMENT_PRODUCT",
        type: "category_selection",
        category: "Cement",
        qty: qty,
        unit: unit,
        transcript: rawTranscript,
        normalized: normalized,
        title: "🧱 Select Cement Product",
        desc: `Choose from all available cement products for ${qty} ${unit}`,
        ready: true
      };
    }

    // 10. ADD MATERIAL(S)
    const delimiter = /\band\b|\bmattrum\b|\bkooda\b|\bapram\b|,/g;
    const segments = text.split(delimiter).map(s => s.trim()).filter(Boolean);
    const parsedItems = [];
    const missingItems = [];

    for (const segment of segments) {
      const extracted = extractItemQuantityAndCleanSegment(segment);
      const qty = extracted.qty;
      const unit = extracted.unit;
      const cleanSegment = extracted.cleanSegment;

      const matchRes = matchProduct(cleanSegment, unit);
      if (matchRes.product) {
        parsedItems.push({
          product: matchRes.product,
          qty: qty,
          unit: matchRes.product.unit || unit || "unit",
          confidence: matchRes.score,
          rawQuery: cleanSegment
        });
      } else {
        missingItems.push(cleanSegment || segment);
      }
    }

    if (parsedItems.length > 0) {
      return {
        action: "ADD_MATERIALS",
        type: "materials",
        items: parsedItems,
        unmatched: missingItems,
        title: `📦 Add ${parsedItems.length} Material Line(s)`,
        desc: parsedItems.map(it => `${it.product.name} (${it.qty} ${it.unit})`).join(", "),
        transcript: rawTranscript,
        normalized: normalized,
        ready: true
      };
    }

    if (missingItems.length > 0) {
      return {
        action: "UNCERTAIN_PRODUCT",
        type: "uncertain",
        raw: rawTranscript,
        normalized: normalized,
        unmatched: missingItems,
        title: "⚠️ Material Not Found in Catalogue",
        desc: `Could not identify product in catalogue for "${missingItems.join(', ')}". Try specifying cement, TMT steel, paint, sand, or tiles.`,
        transcript: rawTranscript,
        ready: false
      };
    }

    return {
      action: "UNKNOWN",
      type: "unknown",
      raw: rawTranscript,
      normalized: normalized,
      title: "❓ Command Not Recognized",
      desc: `BuildAI didn't recognize "${rawTranscript}". Try: "UltraTech 43 Grade Cement 100 bags add pannu" or "Budget 50000 set pannu".`,
      transcript: rawTranscript,
      ready: false
    };
  }

  // =========================================================================
  // 4. PLANNER FORM EXECUTION
  // =========================================================================

  function applyVoiceCommand(cmd) {
    if (!cmd || !cmd.action) return false;

    // A. OPTIMIZE PLAN
    if (cmd.action === "OPTIMIZE_PLAN") {
      const form = document.getElementById("buildRequestForm");
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        if (typeof toast === "function") toast("⚡ Material plan optimization executed!");
        return true;
      }
    }

    // B. CLEAR MATERIALS
    if (cmd.action === "CLEAR_MATERIALS") {
      const host = document.getElementById("requestItems");
      if (host) {
        host.innerHTML = "";
        if (typeof toast === "function") toast("Cleared all material rows.");
        return true;
      }
    }

    // C. SET FORM FIELD
    if (cmd.type === "field" && cmd.field) {
      const el = document.getElementById(cmd.field);
      if (el) {
        if (el.type === "checkbox") {
          el.checked = Boolean(cmd.value);
        } else {
          el.value = cmd.value;
        }
        el.dispatchEvent(new Event("change", { bubbles: true }));
        el.dispatchEvent(new Event("input", { bubbles: true }));

        if (typeof toast === "function") toast(`✓ ${cmd.title}`);
        return true;
      }
    }

    // D. REMOVE SPECIFIC MATERIAL
    if (cmd.action === "REMOVE_MATERIAL") {
      const host = document.getElementById("requestItems");
      if (host) {
        const rows = Array.from(host.querySelectorAll(".request-item-row"));
        const targetQ = (cmd.query || "").toLowerCase();
        let removed = false;
        for (const r of rows) {
          const matSel = r.querySelector(".req-material");
          const selectedText = matSel && matSel.selectedOptions[0] ? matSel.selectedOptions[0].textContent.toLowerCase() : "";
          if (selectedText.includes(targetQ) || targetQ.includes(selectedText.slice(0, 5))) {
            r.remove();
            removed = true;
            break;
          }
        }
        if (removed) {
          if (typeof toast === "function") toast(`✓ Removed ${cmd.query} from material list.`);
          return true;
        } else {
          if (typeof toast === "function") toast(`Could not find "${cmd.query}" in current material list.`);
          return false;
        }
      }
    }

    // E. ADD MATERIAL(S)
    if (cmd.action === "ADD_MATERIALS" && Array.isArray(cmd.items)) {
      const host = document.getElementById("requestItems");
      if (!host) return false;

      let addedCount = 0;
      cmd.items.forEach(it => {
        // If a row for this product already exists, update/combine its quantity to satisfy optimizer uniqueness
        const existingRows = Array.from(host.querySelectorAll(".request-item-row"));
        let existingRow = null;
        for (const row of existingRows) {
          const matSel = row.querySelector(".req-material");
          if (matSel && matSel.value === it.product.id) {
            existingRow = row;
            break;
          }
        }

        if (existingRow) {
          const qtyInp = existingRow.querySelector(".req-qty");
          if (qtyInp) {
            const currentQty = parseFloat(qtyInp.value) || 0;
            qtyInp.value = currentQty + it.qty;
            qtyInp.dispatchEvent(new Event("input", { bubbles: true }));
            qtyInp.dispatchEvent(new Event("change", { bubbles: true }));
            addedCount++;
          }
        } else if (typeof window.addRow === "function") {
          window.addRow(it.product.id, it.qty);
          addedCount++;
        } else {
          const addBtn = document.getElementById("addRequirementRow");
          if (addBtn) {
            addBtn.click();
            const lastRow = host.lastElementChild;
            if (lastRow) {
              const catSel = lastRow.querySelector(".req-category");
              const matSel = lastRow.querySelector(".req-material");
              const qtyInp = lastRow.querySelector(".req-qty");
              if (catSel && it.product.category) {
                catSel.value = it.product.category;
                catSel.dispatchEvent(new Event("change"));
              }
              if (matSel) {
                matSel.value = it.product.id;
                matSel.dispatchEvent(new Event("change"));
              }
              if (qtyInp) {
                qtyInp.value = it.qty;
                qtyInp.dispatchEvent(new Event("input"));
              }
              addedCount++;
            }
          }
        }
      });

      if (addedCount > 0) {
        if (typeof toast === "function") {
          toast(`✓ Added ${addedCount} material(s): ${cmd.items.map(i => i.product.name).join(", ")}`);
        }
        host.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return true;
      }
    }

    return false;
  }

  // =========================================================================
  // 5. AUDIO DIAGNOSTICS & LIVE VU METER
  // =========================================================================

  let mediaStream = null;
  let audioContext = null;
  let analyserNode = null;
  let animFrameId = null;
  let sessionMaxVolume = 0;
  let sessionAudioSamples = 0;

  async function startAudioDiagnostics(onLevelUpdate) {
    sessionMaxVolume = 0;
    sessionAudioSamples = 0;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("NAVIGATOR_MEDIA_DEVICES_NOT_SUPPORTED");
    }

    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    mediaStream = stream;

    // Web Audio API VU meter
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      try {
        audioContext = new AudioCtx();
        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }
        const source = audioContext.createMediaStreamSource(stream);
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;
        analyserNode.smoothingTimeConstant = 0.5;
        source.connect(analyserNode);

        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

        const tick = () => {
          if (!analyserNode) return;
          analyserNode.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          // Scale from average byte value (0-128) to 0-100%
          const volPercent = Math.min(100, Math.round((avg / 96) * 100));

          sessionAudioSamples++;
          if (volPercent > sessionMaxVolume) {
            sessionMaxVolume = volPercent;
          }

          if (typeof onLevelUpdate === "function") {
            onLevelUpdate(volPercent, sessionMaxVolume);
          }

          animFrameId = requestAnimationFrame(tick);
        };

        animFrameId = requestAnimationFrame(tick);
      } catch (err) {
        console.warn("AudioContext setup warning:", err);
      }
    }

    return stream;
  }

  function stopAudioDiagnostics() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (analyserNode) {
      analyserNode.disconnect();
      analyserNode = null;
    }
    if (audioContext) {
      try { audioContext.close(); } catch (e) {}
      audioContext = null;
    }
    if (mediaStream) {
      try {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      } catch (e) {}
      mediaStream = null;
    }
  }

  // =========================================================================
  // 6. UI DIAGNOSTIC WIDGET & LIVE METER MODAL
  // =========================================================================

  let diagnosticWidgetEl = null;

  function ensureDiagnosticWidget() {
    if (diagnosticWidgetEl && document.body.contains(diagnosticWidgetEl)) {
      return diagnosticWidgetEl;
    }

    const el = document.createElement("div");
    el.id = "voiceDiagnosticWidget";
    el.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: min(440px, calc(100vw - 32px));
      background: #ffffff;
      border: 1.5px solid #10b981;
      border-radius: 16px;
      box-shadow: 0 20px 35px -8px rgba(15, 23, 42, 0.22), 0 8px 16px -6px rgba(16, 185, 129, 0.15);
      z-index: 99999;
      font-family: inherit;
      padding: 16px 18px;
      color: #0f172a;
      display: none;
      box-sizing: border-box;
      animation: buildAiSlideIn 0.25s ease-out;
    `;

    el.innerHTML = `
      <style>
        @keyframes buildAiSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes buildAiPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.92); }
        }
        .v-meter-bar-track {
          width: 100%;
          height: 10px;
          background: #f1f5f9;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          border: 1px solid #e2e8f0;
        }
        .v-meter-bar-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #10b981 0%, #eab308 70%, #ef4444 100%);
          border-radius: 5px;
          transition: width 0.08s ease-out;
        }
        .v-chip-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }
        .v-chip-btn:hover {
          background: #ecfdf5;
          border-color: #10b981;
          color: #047857;
        }
      </style>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span id="vStatusDot" style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;animation:buildAiPulse 1.5s infinite;"></span>
          <b style="font-size:13px;color:#0f172a;letter-spacing:0.2px;" id="vStatusTitle">BuildAI Voice Assistant</b>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span id="vLangBadge" style="font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:4px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;">Tanglish</span>
          <button type="button" id="vCloseBtn" style="background:transparent;border:none;font-size:16px;color:#94a3b8;cursor:pointer;line-height:1;padding:2px 4px;">✕</button>
        </div>
      </div>

      <!-- Live VU Meter Indicator -->
      <div id="vMeterContainer" style="margin-bottom:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;font-weight:700;color:#475569;margin-bottom:6px;">
          <span>Microphone Input Level</span>
          <span id="vMeterPercent" style="color:#0f766e;">0% (Waiting)</span>
        </div>
        <div class="v-meter-bar-track">
          <div class="v-meter-bar-fill" id="vMeterBar"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;font-size:10px;color:#94a3b8;">
          <span>Silent (0%)</span>
          <span id="vPeakText">Peak: 0%</span>
          <span>Max (100%)</span>
        </div>
      </div>

      <!-- Interim / Live Transcript Display -->
      <div id="vTranscriptBox" style="min-height:48px;background:#ffffff;border:1px dashed #cbd5e1;border-radius:8px;padding:8px 10px;margin-bottom:12px;font-size:12.5px;line-height:1.45;color:#1e293b;">
        <div id="vTranscriptText" style="color:#64748b;font-style:italic;">Listening... Speak your command now.</div>
      </div>

      <!-- Diagnostic Message Alert -->
      <div id="vAlertBox" style="display:none;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:9px 11px;margin-bottom:12px;font-size:11.5px;line-height:1.4;color:#991b1b;">
        <div id="vAlertText"></div>
      </div>

      <!-- Action Buttons and Quick Fallback -->
      <div id="vControlsArea" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <button type="button" id="vFallbackTypeBtn" style="font-size:11.5px;font-weight:700;background:transparent;border:none;color:#0f766e;cursor:pointer;padding:4px 0;text-decoration:underline;">
          ⌨️ Type command instead
        </button>
        <div style="display:flex;gap:6px;">
          <button type="button" id="vRetryBtn" class="secondary" style="font-size:11.5px;padding:5px 12px;border-radius:6px;display:none;">Retry</button>
          <button type="button" id="vStopBtn" class="primary" style="font-size:11.5px;font-weight:700;padding:5px 14px;border-radius:6px;background:#10b981;border-color:#059669;color:#fff;">Stop & Apply</button>
        </div>
      </div>

      <!-- Interactive Text Fallback Section -->
      <div id="vTextFallbackSection" style="display:none;margin-top:12px;border-top:1px solid #e2e8f0;padding-top:10px;">
        <div style="font-size:11px;font-weight:800;color:#334155;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Text Command Fallback</div>
        <div style="display:flex;gap:6px;margin-bottom:8px;">
          <input type="text" id="vFallbackInput" placeholder="e.g. UltraTech 43 Grade Cement 50 bags add pannu" style="flex:1;height:32px;font-size:12px;padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;">
          <button type="button" id="vFallbackRunBtn" class="primary" style="height:32px;padding:0 12px;font-size:12px;font-weight:700;background:#047857;border-color:#065f46;color:#fff;border-radius:6px;">Run</button>
        </div>
        <div style="font-size:10.5px;color:#64748b;margin-bottom:4px;">Quick suggestions:</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <button type="button" class="v-chip-btn" data-v-cmd="UltraTech 43 Grade Cement 100 bags add pannu">“UltraTech 43 Grade Cement 100 bags add pannu”</button>
          <button type="button" class="v-chip-btn" data-v-cmd="Tata Tiscon TMT Steel 500 kg add pannu">“Tata Tiscon TMT Steel 500 kg add pannu”</button>
          <button type="button" class="v-chip-btn" data-v-cmd="Budget 75000 set pannu">“Budget 75000 set pannu”</button>
          <button type="button" class="v-chip-btn" data-v-cmd="Delivery within 2 days">“Delivery within 2 days”</button>
          <button type="button" class="v-chip-btn" data-v-cmd="⚡ Optimize supplier combination">“⚡ Optimize supplier combination”</button>
        </div>
      </div>
    `;

    document.body.appendChild(el);
    diagnosticWidgetEl = el;

    // Attach internal widget listeners
    const closeBtn = el.querySelector("#vCloseBtn");
    if (closeBtn) closeBtn.onclick = () => stopListeningAndClose();

    const stopBtn = el.querySelector("#vStopBtn");
    if (stopBtn) {
      stopBtn.onclick = () => {
        clearTimeout(speechSilenceTimer);
        const combined = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();
        if (combined) {
          finalizeSpeech(combined);
        } else {
          stopListeningAndClose();
        }
      };
    }

    const retryBtn = el.querySelector("#vRetryBtn");
    if (retryBtn) {
      retryBtn.onclick = () => {
        retryBtn.style.display = "none";
        startListening();
      };
    }

    const typeToggleBtn = el.querySelector("#vFallbackTypeBtn");
    const fallbackSec = el.querySelector("#vTextFallbackSection");
    if (typeToggleBtn && fallbackSec) {
      typeToggleBtn.onclick = () => {
        const isHidden = fallbackSec.style.display === "none";
        fallbackSec.style.display = isHidden ? "block" : "none";
        typeToggleBtn.textContent = isHidden ? "🎙️ Switch to voice mode" : "⌨️ Type command instead";
        if (isHidden) {
          const inp = el.querySelector("#vFallbackInput");
          if (inp) inp.focus();
        }
      };
    }

    const runBtn = el.querySelector("#vFallbackRunBtn");
    const fbInput = el.querySelector("#vFallbackInput");
    const executeFallback = () => {
      const text = fbInput ? fbInput.value.trim() : "";
      if (!text) return;
      const cmd = parseVoiceCommand(text);
      if (cmd && cmd.ready) {
        if (cmd.action === "SELECT_CEMENT_PRODUCT") {
          handleCommandResult(cmd);
          return;
        }
        applyVoiceCommand(cmd);
        stopListeningAndClose();
      } else if (cmd) {
        showDiagnosticAlert(cmd.title + ": " + cmd.desc);
      }
    };
    if (runBtn) runBtn.onclick = executeFallback;
    if (fbInput) {
      fbInput.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          executeFallback();
        }
      };
    }

    el.querySelectorAll(".v-chip-btn").forEach(chip => {
      chip.onclick = () => {
        const cmdText = chip.getAttribute("data-v-cmd");
        if (fbInput) fbInput.value = cmdText;
        executeFallback();
      };
    });

    return el;
  }

  function updateWidgetLevel(currentPercent, peakPercent) {
    const el = ensureDiagnosticWidget();
    const bar = el.querySelector("#vMeterBar");
    const percentText = el.querySelector("#vMeterPercent");
    const peakText = el.querySelector("#vPeakText");

    if (bar) bar.style.width = `${currentPercent}%`;
    if (percentText) {
      if (currentPercent > 0) {
        percentText.textContent = `${currentPercent}% (Live audio)`;
        percentText.style.color = currentPercent > 20 ? "#059669" : "#d97706";
      } else {
        percentText.textContent = "0% (Waiting for speech)";
        percentText.style.color = "#64748b";
      }
    }
    if (peakText) peakText.textContent = `Peak: ${peakPercent}%`;
  }

  function updateWidgetStatus(state, message) {
    const el = ensureDiagnosticWidget();
    const dot = el.querySelector("#vStatusDot");
    const title = el.querySelector("#vStatusTitle");

    if (title) title.textContent = message || "BuildAI Voice Assistant";

    if (dot) {
      if (state === "listening") {
        dot.style.background = "#ef4444";
        dot.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.7)";
      } else if (state === "speaking") {
        dot.style.background = "#3b82f6";
        dot.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.7)";
      } else if (state === "processing") {
        dot.style.background = "#8b5cf6";
        dot.style.boxShadow = "0 0 10px rgba(139, 92, 246, 0.7)";
      } else if (state === "error") {
        dot.style.background = "#f59e0b";
        dot.style.boxShadow = "none";
      } else {
        dot.style.background = "#10b981";
        dot.style.boxShadow = "none";
      }
    }
  }

  function updateWidgetTranscript(text, isFinal) {
    const el = ensureDiagnosticWidget();
    const tBox = el.querySelector("#vTranscriptText");
    if (!tBox) return;

    if (text) {
      tBox.innerHTML = `Heard: “<b>${escapeHtml(text)}</b>”${isFinal ? " ✓" : "..."}`;
      tBox.style.color = isFinal ? "#047857" : "#0f172a";
      tBox.style.fontStyle = "normal";
    } else {
      tBox.innerHTML = `Listening... Speak into your microphone.`;
      tBox.style.color = "#64748b";
      tBox.style.fontStyle = "italic";
    }
  }

  function showDiagnosticAlert(msg, showRetry = false) {
    const el = ensureDiagnosticWidget();
    const alertBox = el.querySelector("#vAlertBox");
    const alertText = el.querySelector("#vAlertText");
    const retryBtn = el.querySelector("#vRetryBtn");
    const fallbackSec = el.querySelector("#vTextFallbackSection");

    if (alertBox && alertText) {
      alertText.innerHTML = msg;
      alertBox.style.display = "block";
    }
    if (retryBtn) retryBtn.style.display = showRetry ? "inline-block" : "none";
    if (fallbackSec) fallbackSec.style.display = "block";
  }

  function hideDiagnosticAlert() {
    const el = ensureDiagnosticWidget();
    const alertBox = el.querySelector("#vAlertBox");
    if (alertBox) alertBox.style.display = "none";
  }

  function openDiagnosticWidget(lang) {
    const el = ensureDiagnosticWidget();
    const langBadge = el.querySelector("#vLangBadge");
    if (langBadge) {
      if (lang === "ta-IN") langBadge.textContent = "Tamil (தமிழ்)";
      else if (lang === "en-IN") langBadge.textContent = "English (en-IN)";
      else langBadge.textContent = activeLang === "ta-IN" ? "Tanglish (Tamil Engine)" : "Tanglish (English Engine)";
    }
    const meterCont = el.querySelector("#vMeterContainer");
    if (meterCont) meterCont.style.display = "block";
    hideDiagnosticAlert();
    updateWidgetTranscript("", false);
    updateWidgetLevel(0, 0);
    el.style.display = "block";
  }

  function stopListeningAndClose() {
    stopListening();
    if (diagnosticWidgetEl) {
      diagnosticWidgetEl.style.display = "none";
    }
  }

  // =========================================================================
  // 7. SPEECH RECOGNITION ENGINE WITH RETRY & RECOVERY
  // =========================================================================

  let recognition = null;
  let isListening = false;
  let activeLang = "ta-IN";
  let hasReceivedFinalResult = false;
  let isFinalizing = false;
  let speechSilenceTimer = null;
  let accumulatedFinalText = "";
  let currentInterimText = "";

  function getSelectedLang() {
    const langSel = document.getElementById("voiceLangSelect");
    const val = langSel ? langSel.value : "tanglish";
    if (val === "ta-IN") return "ta-IN";
    if (val === "en-IN") return "en-IN";
    return "tanglish"; // Default Tanglish hybrid mode
  }

  function updateMicButtonUi(active) {
    document.querySelectorAll("[data-voice-mic], #voiceMicBtn").forEach(micBtn => {
      const micLabel = micBtn.querySelector("[data-voice-label], #voiceMicLabel") || document.getElementById("voiceMicLabel");
      if (active) {
        micBtn.style.borderColor = "#dc2626";
        micBtn.style.color = "#dc2626";
        micBtn.style.fontWeight = "800";
        if (micLabel) micLabel.textContent = "Listening...";
      } else {
        micBtn.style.borderColor = "";
        micBtn.style.color = "";
        micBtn.style.fontWeight = "";
        if (micLabel) micLabel.textContent = "Voice Command";
      }
    });
  }

  function cleanupRecognitionInstance() {
    if (recognition) {
      try {
        recognition.onstart = null;
        recognition.onspeechstart = null;
        recognition.onspeechend = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.abort();
      } catch (e) {}
      recognition = null;
    }
  }

  function finalizeSpeech(explicitText = null) {
    if (isFinalizing) return;
    isFinalizing = true;
    clearTimeout(speechSilenceTimer);
    hasReceivedFinalResult = true;

    const fullText = (explicitText || (accumulatedFinalText + " " + currentInterimText) || "").replace(/\s+/g, " ").trim();
    if (!fullText) {
      stopListening();
      return;
    }

    updateWidgetTranscript(fullText, true);
    updateWidgetStatus("processing", "Command received! Applying...");
    stopListening();

    const cmd = parseVoiceCommand(fullText);
    handleCommandResult(cmd);
  }

  async function startListening(overrideLocale = null) {
    // 1. Prevent duplicate instances
    cleanupRecognitionInstance();
    stopAudioDiagnostics();
    hasReceivedFinalResult = false;
    isFinalizing = false;
    clearTimeout(speechSilenceTimer);
    accumulatedFinalText = "";
    currentInterimText = "";

    const selectedSetting = getSelectedLang();
    let recognizerLocale = "ta-IN";

    if (overrideLocale) {
      recognizerLocale = overrideLocale;
    } else if (selectedSetting === "ta-IN") {
      recognizerLocale = "ta-IN";
    } else if (selectedSetting === "en-IN") {
      recognizerLocale = "en-IN";
    } else {
      // Tanglish: Default to ta-IN acoustic engine because it natively captures Tamil speech + English brand terms.
      // Falls back automatically to en-IN if ta-IN is unsupported.
      recognizerLocale = "ta-IN";
    }

    activeLang = recognizerLocale;

    // 2. Open diagnostic popover
    openDiagnosticWidget(selectedSetting);
    updateWidgetStatus("requesting", "Verifying microphone access...");

    // 3. Check microphone via getUserMedia and start VU meter
    try {
      await startAudioDiagnostics((currentVol, peakVol) => {
        updateWidgetLevel(currentVol, peakVol);
      });
    } catch (err) {
      console.error("Microphone access failure:", err);
      updateMicButtonUi(false);
      updateWidgetStatus("error", "Microphone access blocked or unavailable");

      let errorMsg = "Could not access microphone.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMsg = "<b>Microphone permission blocked.</b><br>Please click the camera/microphone icon in your browser address bar to allow microphone access, then click Retry.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMsg = "<b>No microphone detected.</b><br>Please plug in a microphone or headset and click Retry.";
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        errorMsg = "<b>Microphone in use.</b><br>Another application may be using your microphone. Please close other audio apps and click Retry.";
      } else {
        errorMsg = `<b>Microphone error:</b> ${escapeHtml(err.message || err.name)}. You can type your command below.`;
      }

      showDiagnosticAlert(errorMsg, true);
      return;
    }

    // 4. Check Web Speech API availability
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      stopAudioDiagnostics();
      updateWidgetStatus("error", "Web Speech API not supported");
      showDiagnosticAlert("<b>Browser Speech Recognition not supported.</b><br>Please use Google Chrome, Edge, or enter your command using the text box below.", false);
      return;
    }

    // 5. Initialize Speech Recognition instance
    const rec = new SpeechRecognition();
    rec.continuous = true; // Crucial: Continuous listening so brief pauses do NOT cut off input prematurely
    rec.interimResults = true; // Stream interim results in real-time
    rec.maxAlternatives = 3;
    rec.lang = recognizerLocale;

    rec.onstart = () => {
      isListening = true;
      isFinalizing = false;
      accumulatedFinalText = "";
      currentInterimText = "";
      clearTimeout(speechSilenceTimer);
      updateMicButtonUi(true);
      updateWidgetStatus("listening", "Listening... Speak your command");
    };

    rec.onspeechstart = () => {
      clearTimeout(speechSilenceTimer);
      updateWidgetStatus("speaking", "Hearing voice input...");
    };

    rec.onspeechend = () => {
      // Do NOT finalize immediately on brief pause! The user may be taking a breath or pausing between words.
      const currentSpoken = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();
      if (currentSpoken && !isFinalizing) {
        updateWidgetStatus("speaking", "Pause detected... keep speaking or pause to finish");
      }
    };

    rec.onresult = (event) => {
      clearTimeout(speechSilenceTimer);

      let allFinal = "";
      let allInterim = "";

      for (let i = 0; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          if (item[0] && item[0].transcript) {
            allFinal += " " + item[0].transcript.trim();
          }
        } else {
          if (item[0] && item[0].transcript) {
            allInterim += " " + item[0].transcript;
          }
        }
      }

      accumulatedFinalText = allFinal.trim();
      currentInterimText = allInterim.trim();

      const combinedSpoken = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();

      if (combinedSpoken) {
        updateWidgetTranscript(combinedSpoken, false);
        updateWidgetStatus("speaking", "Hearing speech... continue or pause when finished");

        // Debounce: Wait 1800ms of true silence after speech ceases before finalizing
        speechSilenceTimer = setTimeout(() => {
          finalizeSpeech(combinedSpoken);
        }, 1800);
      }
    };

    rec.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);

      // Controlled fallback: If Tanglish in ta-IN errors on language support or service error, fallback to en-IN
      if (selectedSetting === "tanglish" && recognizerLocale === "ta-IN" && (e.error === "language-not-supported" || e.error === "service-not-allowed")) {
        console.log("Tanglish falling back to en-IN engine...");
        cleanupRecognitionInstance();
        startListening("en-IN");
        return;
      }

      if (hasReceivedFinalResult || isFinalizing) return;

      clearTimeout(speechSilenceTimer);
      stopAudioDiagnostics();
      updateMicButtonUi(false);
      isListening = false;

      if (e.error === "no-speech") {
        const combinedSpoken = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();
        if (combinedSpoken) {
          finalizeSpeech(combinedSpoken);
          return;
        }
        if (sessionMaxVolume >= 5) {
          const alertMsg = `
            <b>Microphone received audio (${sessionMaxVolume}% input level)</b>, but speech recognition service did not return words.<br>
            <i>(Browser Web Speech API relies on Google cloud speech servers which may time out or drop noisy packets).</i><br>
            Please speak a bit closer and louder, or use the quick text command below.
          `;
          showDiagnosticAlert(alertMsg, true);
        } else {
          const alertMsg = `
            <b>Microphone was silent (0% audio level detected).</b><br>
            Please check that your microphone is unmuted in Windows settings, properly plugged in, and selected as default.
          `;
          showDiagnosticAlert(alertMsg, true);
        }
        updateWidgetStatus("error", "No speech detected");
      } else if (e.error === "not-allowed") {
        showDiagnosticAlert("<b>Microphone blocked.</b> Please allow microphone permission in your browser URL bar.", true);
        updateWidgetStatus("error", "Permission blocked");
      } else if (e.error === "network") {
        showDiagnosticAlert("<b>Network error.</b> Browser speech recognition requires internet connection to Google servers. You can use the text command below.", true);
        updateWidgetStatus("error", "Network issue");
      } else if (e.error === "aborted") {
        updateWidgetStatus("idle", "Ready");
      } else {
        showDiagnosticAlert(`Speech recognition error: ${e.error}. Use text fallback below.`, true);
        updateWidgetStatus("error", "Recognition error");
      }
    };

    rec.onend = () => {
      isListening = false;
      updateMicButtonUi(false);
      clearTimeout(speechSilenceTimer);

      const combinedSpoken = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();
      if (combinedSpoken && !hasReceivedFinalResult && !isFinalizing) {
        finalizeSpeech(combinedSpoken);
        return;
      }

      stopAudioDiagnostics();
    };

    recognition = rec;

    try {
      rec.start();
    } catch (startErr) {
      console.error("Speech recognition start failed:", startErr);
      stopAudioDiagnostics();
      showDiagnosticAlert(`Recognition failed to start: ${startErr.message}`, true);
    }
  }

  function stopListening() {
    isListening = false;
    clearTimeout(speechSilenceTimer);
    updateMicButtonUi(false);
    cleanupRecognitionInstance();
    stopAudioDiagnostics();
  }

  function toggleListening() {
    if (isListening) {
      clearTimeout(speechSilenceTimer);
      const combinedSpoken = (accumulatedFinalText + " " + currentInterimText).replace(/\s+/g, " ").trim();
      if (combinedSpoken) {
        finalizeSpeech(combinedSpoken);
      } else {
        stopListening();
        if (diagnosticWidgetEl) diagnosticWidgetEl.style.display = "none";
      }
    } else {
      startListening();
    }
  }

  // =========================================================================
  // 8. COMMAND CONFIRMATION & EXECUTION PREVIEW
  // =========================================================================

  function handleCommandResult(cmd) {
    if (!cmd) return;

    if (!cmd.ready) {
      showDiagnosticAlert(`<b>${escapeHtml(cmd.title)}</b><br>${escapeHtml(cmd.desc)}`, true);
      return;
    }

    // Cement category selection: when user says only cement and its quantity
    if (cmd.action === "SELECT_CEMENT_PRODUCT") {
      showCementProductSelectionModal(cmd);
      return;
    }

    // Direct apply for simple single actions, or show brief confirmation
    if (cmd.type === "field" || cmd.action === "OPTIMIZE_PLAN" || cmd.action === "CLEAR_MATERIALS" || cmd.action === "REMOVE_MATERIAL") {
      applyVoiceCommand(cmd);
      updateWidgetStatus("success", `✓ Applied: ${cmd.title}`);
      setTimeout(() => {
        stopListeningAndClose();
      }, 500);
      return;
    }

    // Material additions: show rich preview
    showMaterialConfirmationPreview(cmd);
  }

  function showCementProductSelectionModal(cmd) {
    clearTimeout(autoConfirmTimer);
    const el = ensureDiagnosticWidget();
    el.style.display = "block";
    el.style.maxHeight = "calc(100vh - 40px)";
    el.style.overflowY = "auto";

    updateWidgetStatus("success", "Select Cement Product");

    const meterCont = el.querySelector("#vMeterContainer");
    if (meterCont) meterCont.style.display = "none";

    const tBox = el.querySelector("#vTranscriptText");
    if (!tBox) return;

    const allProds = getCatalogProducts();
    const cementProds = allProds.filter(p => (p.category || "").toLowerCase() === "cement");

    const requestedQty = cmd.qty || 50;
    const requestedUnit = cmd.unit || "bags";

    let listHtml = "";
    if (!cementProds.length) {
      listHtml = '<div style="padding:10px;color:#dc2626;font-size:12px;">No cement products currently available in catalogue.</div>';
    } else {
      listHtml = cementProds.map((p, idx) => {
        const estCost = p.price ? p.price * requestedQty : null;
        return `
          <div class="v-cement-option" data-pid="${escapeHtml(p.id)}" style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;border:1px solid #e2e8f0;border-radius:8px;background:#ffffff;cursor:pointer;transition:all 0.15s ease;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:10px;font-weight:700;">${idx + 1}</span>
                <b style="font-size:12px;color:#0f172a;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(p.name)}</b>
              </div>
              <div style="font-size:11px;color:#64748b;margin-left:24px;">
                <span>${escapeHtml(p.brand || "Cement")}</span>
                ${p.spec ? ` · <span>${escapeHtml(p.spec)}</span>` : ""}
              </div>
              <div style="font-size:11px;color:#0f766e;font-weight:600;margin-left:24px;margin-top:2px;">
                ₹${p.price || 0}/${p.unit || "bag"} ${estCost ? `· <span style="color:#334155;">Est. Total: ₹${estCost.toLocaleString("en-IN")}</span>` : ""}
              </div>
            </div>
            <button type="button" class="primary v-cement-pick-btn" data-pid="${escapeHtml(p.id)}" style="flex-shrink:0;padding:4px 10px;font-size:11px;font-weight:700;border-radius:6px;background:#10b981;border-color:#059669;color:#fff;cursor:pointer;">
              Select
            </button>
          </div>
        `;
      }).join("");
    }

    tBox.innerHTML = `
      <div style="font-size:11.5px;color:#475569;margin-bottom:6px;">
        Heard: “<b>${escapeHtml(cmd.transcript)}</b>”
      </div>
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
        <span>Select cement for <b>${requestedQty} ${escapeHtml(requestedUnit)}</b>:</span>
        <span style="font-size:11px;font-weight:600;color:#059669;background:#ecfdf5;padding:2px 8px;border-radius:12px;border:1px solid #a7f3d0;">${cementProds.length} Products</span>
      </div>
      <div id="vCementListContainer" style="max-height:280px;overflow-y:auto;padding-right:2px;margin-bottom:8px;">
        ${listHtml}
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:6px;padding-top:6px;border-top:1px solid #e2e8f0;">
        <button type="button" id="vCementCancelBtn" class="secondary" style="font-size:11px;padding:3px 12px;border-radius:6px;cursor:pointer;">Cancel</button>
      </div>
    `;

    const optRows = tBox.querySelectorAll(".v-cement-option");
    optRows.forEach(row => {
      row.onmouseenter = () => {
        row.style.background = "#f0fdf4";
        row.style.borderColor = "#10b981";
      };
      row.onmouseleave = () => {
        row.style.background = "#ffffff";
        row.style.borderColor = "#e2e8f0";
      };
    });

    const selectProduct = (prodId) => {
      const selected = cementProds.find(p => p.id === prodId) || allProds.find(p => p.id === prodId);
      if (!selected) return;

      const chosenItem = {
        product: selected,
        qty: requestedQty,
        unit: selected.unit || requestedUnit || "bag",
        confidence: 10.0,
        rawQuery: "cement"
      };

      const applied = applyVoiceCommand({
        action: "ADD_MATERIALS",
        type: "materials",
        items: [chosenItem]
      });

      if (applied) {
        updateWidgetStatus("success", `✓ Selected: ${selected.name}`);
        tBox.innerHTML = `
          <div style="text-align:center;padding:16px 8px;">
            <div style="font-size:22px;margin-bottom:6px;color:#10b981;">✓</div>
            <div style="font-weight:700;color:#047857;font-size:13px;margin-bottom:4px;">Product Selected!</div>
            <div style="font-size:12px;color:#0f172a;"><b>${escapeHtml(selected.name)}</b></div>
            <div style="font-size:11.5px;color:#0f766e;font-weight:700;margin-top:4px;">${requestedQty} ${escapeHtml(chosenItem.unit)} added to requirements</div>
          </div>
        `;
        setTimeout(() => {
          stopListeningAndClose();
        }, 700);
      }
    };

    tBox.querySelectorAll(".v-cement-option").forEach(card => {
      card.onclick = (e) => {
        const pid = card.getAttribute("data-pid");
        if (pid) selectProduct(pid);
      };
    });

    const cancelBtn = tBox.querySelector("#vCementCancelBtn");
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        if (typeof toast === "function") toast("Cement selection cancelled.");
        stopListeningAndClose();
      };
    }
  }

  let autoConfirmTimer = null;

  function showMaterialConfirmationPreview(cmd) {
    clearTimeout(autoConfirmTimer);
    const el = ensureDiagnosticWidget();
    el.style.display = "block";
    updateWidgetStatus("success", "Material Match Ready!");

    const tBox = el.querySelector("#vTranscriptText");
    if (tBox) {
      let itemsListHtml = cmd.items.map(it => `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;padding:6px 10px;border-radius:6px;margin:5px 0;font-size:12px;">
          <span><b>${escapeHtml(it.product.name)}</b></span>
          <span style="color:#0f766e;font-weight:700;">${it.qty} ${escapeHtml(it.unit)}</span>
        </div>
      `).join("");

      tBox.innerHTML = `
        <div style="font-size:11.5px;color:#475569;margin-bottom:4px;">Heard: “<b>${escapeHtml(cmd.transcript)}</b>”</div>
        <div style="margin:6px 0;">${itemsListHtml}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:6px;border-top:1px solid #e2e8f0;">
          <span id="vCountdown" style="font-size:11.5px;color:#047857;font-weight:700;">Applying in 3s...</span>
          <div style="display:flex;gap:6px;">
            <button type="button" id="vPreviewCancel" class="secondary" style="font-size:11px;padding:3px 10px;border-radius:6px;">Cancel</button>
            <button type="button" id="vPreviewApply" class="primary" style="font-size:11px;font-weight:700;padding:3px 12px;border-radius:6px;background:#10b981;border-color:#059669;color:#fff;">Apply Now</button>
          </div>
        </div>
      `;

      const cancelBtn = el.querySelector("#vPreviewCancel");
      const applyBtn = el.querySelector("#vPreviewApply");
      const cdText = el.querySelector("#vCountdown");

      let seconds = 3;
      const doApply = () => {
        clearTimeout(autoConfirmTimer);
        applyVoiceCommand(cmd);
        stopListeningAndClose();
      };

      if (cancelBtn) {
        cancelBtn.onclick = () => {
          clearTimeout(autoConfirmTimer);
          if (typeof toast === "function") toast("Voice action cancelled.");
          stopListeningAndClose();
        };
      }
      if (applyBtn) applyBtn.onclick = doApply;

      autoConfirmTimer = setInterval(() => {
        seconds--;
        if (cdText) cdText.textContent = `Applying in ${seconds}s...`;
        if (seconds <= 0) {
          clearInterval(autoConfirmTimer);
          doApply();
        }
      }, 1000);
    }
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // =========================================================================
  // 9. ATTACH LISTENERS & PUBLIC EXPORTS
  // =========================================================================

  function attachVoiceListeners() {
    document.querySelectorAll("[data-voice-mic], #voiceMicBtn, #voiceMicBtnBottom").forEach(micBtn => {
      if (!micBtn.dataset.voiceBound) {
        micBtn.dataset.voiceBound = "true";
        micBtn.addEventListener("click", toggleListening);
      }
    });
  }

  window.BuildAIVoice = {
    parseCommand: parseVoiceCommand,
    normalize: normalizeTamilAndTanglish,
    matchProduct: matchProduct,
    applyCommand: applyVoiceCommand,
    handleCommandResult: handleCommandResult,
    showCementSelection: showCementProductSelectionModal,
    toggleListening: toggleListening,
    startListening: startListening,
    stopListening: stopListening
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachVoiceListeners);
  } else {
    attachVoiceListeners();
  }
})();
