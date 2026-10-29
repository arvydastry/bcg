# Baltic Contracting Group · Skanlika: naujos svetainės demo maketas

Demo maketas naujai [baltcontract.eu](https://baltcontract.eu/) svetainei: UAB „Baltic Contracting Group“ ir UAB „Skanlika“,
dvi įmonės po vienu stogu Klaipėdoje (subranga ir personalo nuoma laivų statybai, naftos ir dujų pramonei, metalo
konstrukcijoms, laivų vidaus įrengimui ir statybai). Galutinė svetainė bus kuriama **WordPress + Salient** tema, todėl makete
naudojami tik tokie efektai, kuriuos Salient atkartoja savo elementais, o perkėlimo gidas – `salient-gidas.html`.

**Demo apimtis:** 6 lietuviški puslapiai. Kalbų jungiklis LT / EN / DE yra, vertimų nėra (pilname projekte – WPML).
Formos duomenų nesiunčia. Tekstai sukurti pagal dabartinės svetainės esmę ir patobulinti; kontaktai ir rekvizitai – tikri,
o išgalvoti elementai pažymėti „tikslinama“ arba „Pavyzdys“ (sąrašas gido 13 skyriuje).

## Peržiūra

Atidarykite `index.html` naršyklėje (veikia ir iš `file://`) arba paleiskite vietinį serverį:

```bash
python3 -m http.server 8781
```

ir eikite į http://127.0.0.1:8781/ (tas pats nustatyta `.claude/launch.json`). Nuotraukos, video, šriftai ir ikonos kraunami
iš interneto (Pexels, Google Fonts, Phosphor). Visuose puslapiuose yra `noindex`.

## Puslapiai

| Failas | Turinys |
|---|---|
| `index.html` | Pradžia: video hero su dviem keliais (užsakovas / darbuotojas) ir skaitikliais, judanti juosta, dvi įmonės, du bendradarbiavimo modeliai (su nuotraukomis), 5 veiklos sritys, video kortelės „Darbas objektuose“ (groja užvedus, lightbox), eiga su nuotraukomis užvedus, vertybės ir sertifikatai, karjera su pasiūlymais, atsiliepimai su portretais, DUK, užklausų formos |
| `klientams.html` | Užsakovams: video hero, kam skirta (kortelės su nuotraukomis), subranga ir personalo nuoma (prie kiekvieno – video, kuris groja kai matomas, ir 2 nuotraukos), palyginimo lentelė, 12 specialybių su miniatiūromis, eiga ir atitiktis, rinkos su šalių vėliavomis (dvi grupės pagal įmonę), DUK, užklausos forma |
| `veiklos-sritys.html` | Video hero ir penkios sritys kaip kortelės-skirtukai: paspaudus rodomas vienos srities turinys (video ar nuotrauka su 2 nuotraukomis, darbų sąrašas, specialistai, faktai, užklausa pagal sritį, „Kita sritis“). Nuoroda `veiklos-sritys.html#naftos-ir-duju-pramone` atidaro reikiamą sritį |
| `karjera.html` | Darbuotojams: video hero, privalumai, video kortelės „Diena objekte“, įdarbinimo eiga, darbo pasiūlymai su filtru pagal šalį ir miniatiūromis, sąlygos, atsiliepimai su portretais, DUK, CV forma |
| `apie-mus.html` | Video hero, istorija (laiko juosta nuo 2003 m. su nuotraukomis), dvi įmonės, vertybės, sertifikatai (tikri skenai), rinkos, darbas su darbuotojais |
| `kontaktai.html` | Abiejų įmonių kontaktai, dvi formos, žemėlapis (OpenStreetMap, įkeliamas paspaudus), rekvizitai, kaip atvykti |
| `salient-gidas.html` | Perkėlimo į WordPress + Salient gidas: įskiepiai, Theme Options, kiekvieno puslapio eilutės, CF7 formos, WPML, CSS/JS, 301, „Patikslinti su klientu“, paleidimo sąrašas |

Maketas rodomas be demo juostos, taip, kaip matys lankytojas. Gidas pasiekiamas adresu `salient-gidas.html`.
Naudingi parametrai: `kontaktai.html?tipas=subranga#uzklausa` (parinkta paslauga), `kontaktai.html?sritis=laivu-statyba-ir-remontas#uzklausa`,
`karjera.html?pozicija=suvirintojas#cv` (parinkta profesija), `kontaktai.html?tipas=cv#uzklausa` (atidaroma darbuotojų forma),
`veiklos-sritys.html#metalo-konstrukcijos` (atidaroma sritis).

## Failai

| Kelias | Paskirtis |
|---|---|
| `build.py` | Surenka puslapius iš `_parts/` + `_body/`, tikrina nuorodas, id, paveikslėlius ir h1 |
| `_parts/` | `head.html`, `header.html` (meniu, mega meniu, kalbos, mobilus meniu), `footer.html` (poraštė, mobilus baras, slapukai), `scripts.html` |
| `_body/*.html` | Kiekvieno puslapio turinys; pirmoji eilutė – meta JSON (title, description, body_class, extra_head, extra_scripts) |
| `assets/css/style.css` | Visa dizaino sistema: žetonai, komponentai, judesys, pritaikymas ekranams |
| `assets/css/p-*.css`, `assets/js/p-*.js` | Puslapių specifiniai stiliai ir JS (pvz., darbo pasiūlymų filtras) |
| `assets/js/main.js` | Antraštė, meniu, Split Line / reveal / mask / parallax / tilt / skaitikliai, Toggles, skirtukai, formos, slapukai, žemėlapis, URL parametrai |
| `assets/img/logo/` | BCG ir Skanlika logotipai (balti, tamsūs, mėlyni PNG, iškirpti iš senos svetainės bendro failo) |
| `assets/img/sert/` | Sertifikatų skenai (VCA, VCU, NEN 4400-1) ir logotipai (VCA, VCU, SNA, KvK, „Stipriausi Lietuvoje“) |
| `assets/img/flags/` | Šalių vėliavos (apvalios, SVG) rinkų skilčiai: flag-icons, MIT licencija |
| `assets/img/foto/` | Suvirintojo nuotrauka iš dabartinės svetainės |
| `_brief/BRIEF.md` | Užduotis, faktų inventorius iš baltcontract.eu, dizaino kryptis, puslapių planas |
| `_brief/MEDIA.md` | Pexels nuotraukų ir video sąrašas su autoriais ir nuorodomis |
| `_brief/AGENTAMS.md` | Vidinių puslapių rašymo taisyklės (komponentai, patikra) |
| `_tools/shot.mjs` | Ekrano nuotraukos per Chrome DevTools protokolą (`--segments`, `--mobile`, `--full`, `--reduce`) |
| `_tools/shots/v2/`, `_tools/shots/v3/` | Patikros kadrai (1440, 768 ir 390 px): v2 – medija ir hover, v3 – sričių skirtukai ir Klientams video |

Po `_body/` ar `_parts/` pakeitimų: `python3 build.py` (turi rodyti 0 įspėjimų).

## Dizaino kryptis „Šiaurės jūra“

Salient kryptis (Business 3 struktūra, SaaS hero ritmas, Architect nuotraukų blokai): švarūs vientisi fonai be tekstūrų,
daug oro, apvalinti kampai, piliulės mygtukai, ramus judesys (reveal, split line, mask reveal, parallax, 3D tilt, skaitikliai,
scrolling text). Spalvos iš kliento logotipo mėlynos, bet švelnios:

| Žetonas | HEX | Naudojimas |
|---|---|---|
| Rūkas / Migla | `#F4F6F9` / `#E9EEF4` | fonai |
| Uostas (navy) | `#0C1E33` | tamsios sekcijos, poraštė |
| BCG mėlyna | `#1B4E9B` | mygtukai, nuorodos (Salient Accent Color) |
| Gintaras | `#F2A93B` | vienintelis šiltas akcentas: CTA tamsiame fone, pabraukimai |
| Jūra (teal) | `#0F7C7A` | Skanlika akcentas (pasiūlymas) |
| Tekstas | `#0F1720` / `#5E6B7A` | pagrindinis / pagalbinis |

Šriftai: **Schibsted Grotesk** (antraštės) ir **Instrument Sans** (tekstas), Google Fonts su `latin-ext`.
Kiekviena sekcija turi Salient atitikmenį – lentelės gido 7 skyriuje. Visi efektai paiso `prefers-reduced-motion`.

Hover efektai (v2, CSS blokas `style.css` gale): mygtukų blizgesys, kortelių pakilimas su šešėliu, ikonų pasisukimas ir užpildymas,
nuotraukų priartėjimas, eigos kortelių fono nuotrauka užvedus, video kortelės groja užvedus (lietimui – kai matomos), specialybių
miniatiūros iš nespalvotų tampa spalvotos, laiko juostos nuotraukos ir taškas, DUK, darbo pasiūlymų, kontaktų, rinkų ir poraštės nuorodos.
Video lightbox: `#vbox` poraštėje, `data-vbox` nuorodos, Escape užveria.

## Nuotraukos ir video

Visa medžiaga – [Pexels](https://www.pexels.com/) (nemokama licencija, komerciniam naudojimui). Sąrašas su autoriais –
`_brief/MEDIA.md` (v2 skyrius – naujos nuotraukos ir 12 video). Hero video penkiuose puslapiuose, 8 video kortelės (`preload="none"`, groja užvedus).
Tai demo iliustracijos: prieš paleidimą rekomenduojama fotosesija ir trumpi video objektuose. Kliento medžiaga
(logotipai, sertifikatai, suvirintojo nuotrauka) paimta iš dabartinės svetainės.

## Ko demo neapima

- EN ir DE vertimų (jungiklis rodo pranešimą), privatumo politikos ir slapukų politikos tekstų.
- Formų siuntimo, CRM integracijos, CAPTCHA.
- Atskirų veiklos sričių puslapių (visos penkios viename puslapyje su inkarais; gide – kaip padaryti atskirus).
- Galutinių tekstų, skaičių ir kliento nuotraukų: patikslinimų sąrašas – `salient-gidas.html`, 13 skyrius.
