# Dvi atskiros svetainės: BCG ir Skanlika. Taisyklės puslapių perrašymui

Klientas pasakė, kad dvi įmonės turi būti **atskirtos** ir turėti **dvi atskiras svetaines**. Iki šiol buvo viena bendra
svetainė (`BCG/` šaknyje, `_body/`, `_parts/`), kurioje abi įmonės pristatytos kartu („dvi įmonės po vienu stogu“).
Dabar kiekviena įmonė gauna savo svetainę `BCG/svetaines/<svetainė>/`. Struktūra, antraštė, poraštė, spalvos ir build
jau paruošti. Jūsų darbas – **perrašyti 6 savo svetainės puslapių turinį** (`_body/*.html`), kad jie pristatytų tik vieną
įmonę. Darbas lokalus: **nieko necommitinti ir nekelti į GitHub**.

## Kur ką keisti

| Kelias | Ar galima keisti |
|---|---|
| `svetaines/<svetainė>/_body/*.html` (index, klientams, veiklos-sritys, karjera, apie-mus, kontaktai) | TAIP – pagrindinis darbas |
| `svetaines/<svetainė>/assets/css/theme.css` | TAIP – tik jei reikia savo svetainės CSS pataisų (rašyti failo gale, su komentaru) |
| `svetaines/<svetainė>/_parts/*` | NE (antraštė, poraštė, meniu jau paruošti; jei kažko trūksta – parašyti ataskaitoje) |
| `svetaines/bendra/**`, `svetaines/<svetainė>/assets/css/style.css`, `p-*.css`, `assets/js/*` | NE (bendri failai, kiekvieno build metu perrašomi iš `bendra/`) |
| Kita svetainė, `BCG/` šaknies failai, `.git` | NE |

Puslapių failų pirmoji eilutė – meta JSON (`title`, `description`, `body_class`, `extra_head`, `extra_scripts`). `title` ir
`description` perrašyti savo įmonei. `extra_head` / `extra_scripts` nuorodų į `assets/css/p-*.css` ir `assets/js/p-karjera.js` nekeisti.

## Griežtos taisyklės

1. **Jokio kitos įmonės paminėjimo**: nei tekste, nei `alt`, nei meta, nei HTML komentaruose, nei el. pašte, nei
   logotipuose, nei nuorodose. Jokių frazių „dvi įmonės“, „po vienu stogu“, „abi įmonės“, „viena komanda Klaipėdoje (su kita
   įmone)“, „kuri įmonė pasirašys sutartį“. `python3 svetaines/build.py <svetainė>` automatiškai praneša „minima kita įmonė“ –
   tikslas **0 įspėjimų**.
2. Kalba – lietuvių, tokiu pat tonu kaip dabar. Kabutės „…“, brūkšnys „–“ (ne em brūkšnys „—“). Tekstai konkretūs, be
   tuščių frazių.
3. Komponentai ir klasės – tie patys (`hero`, `section`, `duo`, `models`, `sectors`, `steps steps--media`, `reel`, `values`,
   `certs`, `jobs job--img`, `testis`, `faq`, `form-card`, `tabs`, `market-groups markets--flags`, `sector-tabs`,
   `sector-panel`, `svc-media`, `timeline tl` ir t. t.). Duomenų atributai (`data-reveal`, `data-split`, `data-stagger`,
   `data-mask`, `data-tilt`, `data-count`, `data-hover-video`, `data-inview-video`, `data-vbox`, `data-tabs-hash`,
   `data-job-filter`, `data-demo-form`, …) palikti veikiančius. Salient komentarus virš sekcijų atnaujinti pagal turinį.
4. **Id, į kuriuos veda antraštė ir poraštė, turi likti**: `klientams.html#subranga`, `#personalo-nuoma`, `#specialistai`,
   `#eiga`, `#rinkos`, `#uzklausa`; `veiklos-sritys.html#<srities-id>` (žr. savo svetainės sričių sąrašą žemiau);
   `karjera.html#pasiulymai`, `#cv`; `kontaktai.html#uzklausa`, `#zemelapis`. Vidinės nuorodos tarp puslapių turi rasti
   savo id (build tai tikrina). Jei sekciją pašalinate (pvz. sertifikatų), sutvarkykite visas nuorodas į ją.
5. **Išgalvotus faktus žymėti**: `<span class="demo-note" title="Patikslinti su klientu">tikslinama</span>`; atsiliepimai
   lieka su `<span class="testi__tag">Pavyzdys</span>`; išgalvoti darbo skelbimai – su žyma `pavyzdys` (kaip dabar).
   Neišgalvoti sertifikatų numerių, klientų pavadinimų, tikslių skaičių be žymos.
6. Užrašų (caption) ant nuotraukų nedėti (klientas paprašė jų nebūti). Video kortelių pavadinimai `.reel__body` – leidžiama.
7. Šalys su vėliavomis: `assets/img/flags/<kodas>.svg` – `gb-eng`, `gb-sct`, `gb-wls`, `gb`, `ie`, `nl`, `se`, `no`, `dk`, `de`, `be`.
   Kur rodomas šalies pavadinimas (rinkos, filtras, darbo kortelės, įmonės žymos, judanti juosta) – su vėliava, kaip dabar.
8. Formos: palikti abi (užsakovams ir darbuotojams), pritaikyti pasirinkimus (veiklos sritys – tik savo; pavyzdžiai
   placeholder'iuose – savo šalių miestai), šoninės kontaktų kortelės – tik savo įmonė + biuras.
9. Bendri kontaktai abiem įmonėms tie patys: tel. +370 46 310637, Daukanto g. 34, LT-92143 Klaipėda, I–V 8:00–17:00
   (tikslinama). El. paštas – tik savo.

## Medija

Naudoti tik Pexels medžiagą, kuri jau yra puslapiuose arba sąraše `BCG/_brief/MEDIA.md`, ir žemiau išvardintus papildomus
video. Naujų failų iš interneto nesisiųsti. Nuotraukų URL formatas:
`https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=<W>&h=<H>&fit=crop`.

Tikslas – kad dvi svetainės **neatrodytų vienodai**: BCG lieka su dabartine medžiaga (laivų statyklos, naftos gamyklos,
Roterdamas, Skandinavija), Skanlika naudoja kitus hero video ir kitas nuotraukas (statybvietės, plieno karkasai, suvirinimas,
JK uostai – pvz. Grinoko uostas Škotijoje 7519160). Tame pačiame puslapyje toje pačioje vietoje abi svetainės neturi turėti to
paties hero video.

Papildomi patikrinti video (1280×720, mp4; plakatas – `<plakatas>?auto=compress&cs=tinysrgb&w=1600`, kortelėms `w=900`):

| ID | Turinys | Failas | Plakatas |
|---|---|---|---|
| 9991145 | Statybvietė, kranas, plieno karkasas, mėlynas dangus | https://videos.pexels.com/video-files/9991145/9991145-hd_1280_720_24fps.mp4 | https://images.pexels.com/videos/9991145/pexels-photo-9991145.jpeg |
| 9991144 | Statybvietė, plieno karkasas | https://videos.pexels.com/video-files/9991144/9991144-hd_1280_720_24fps.mp4 | https://images.pexels.com/videos/9991144/architect-builders-building-site-business-9991144.jpeg |
| 11396197 | Dronas virš pastato metalo karkaso | https://videos.pexels.com/video-files/11396197/11396197-hd_1280_720_60fps.mp4 | https://images.pexels.com/videos/11396197/fpv-drone-footage-11396197.jpeg |
| 14314764 | Suvirintojas su kauke, kibirkštys | https://videos.pexels.com/video-files/14314764/14314764-hd_1280_720_50fps.mp4 | https://images.pexels.com/videos/14314764/metalworking-sparks-welder-welding-14314764.jpeg |
| 10641848 | Suvirinimas gamykloje, tamsus | https://videos.pexels.com/video-files/10641848/10641848-hd_1280_720_25fps.mp4 | https://images.pexels.com/videos/10641848/construction-worker-flare-industrial-machinery-industrial-plant-10641848.jpeg |
| 32243438 | Suvirinimas naktį, kibirkštys | https://videos.pexels.com/video-files/32243438/13751411_1280_720_50fps.mp4 | https://images.pexels.com/videos/32243438/pexels-photo-32243438.jpeg |
| 35872096 | Surūdijęs laivo korpusas uoste | https://videos.pexels.com/video-files/35872096/15213529_1280_720_24fps.mp4 | https://images.pexels.com/videos/35872096/pexels-photo-35872096.jpeg |
| 38415762 | Laivų statykla su krovininiais laivais | https://videos.pexels.com/video-files/38415762/16313152_1280_720_30fps.mp4 | https://images.pexels.com/videos/38415762/pexels-photo-38415762.jpeg |
| 6285692 | Du vyrai su šalmais aptaria brėžinį | https://videos.pexels.com/video-files/6285692/6285692-hd_1280_720_30fps.mp4 | https://images.pexels.com/videos/6285692/pexels-photo-6285692.jpeg |

Šiuos papildomus video pirmiausia naudoja **Skanlika**. BCG lieka su savo dabartiniais video.

## Įmonės

### Baltic Contracting Group (`svetaines/bcg/`, baltcontract.eu, spalva – mėlyna #1B4E9B)

- UAB „Baltic Contracting Group“, įkurta 2013 m. Klaipėdoje; registruota Nyderlandų prekybos rūmuose (KvK nr. 55608272;
  KvK išraše registracija 2010-09, veiklos pradžia NL 2011-03). Įm. kodas 302541541, PVM LT100005653413, info@baltcontract.eu.
- Rinkos: Nyderlandai (pagrindinė), Švedija, Norvegija (tikslinama), Danija (tikslinama); judančioje juostoje gali būti ir
  Vokietija, Belgija.
- Veiklos sritys (5, id): `laivu-statyba-ir-remontas`, `naftos-ir-duju-pramone`, `metalo-konstrukcijos`,
  `laivu-vidaus-irengimas`, `statybu-pramone`. Sričių faktuose „Rinkos“ – tik BCG šalys (be JK ir Airijos).
- Sertifikatai: VCA (SCC) ir VCU nr. 4091 (2022), NEN 4400-1 / SNA registracija (2022), KvK registracija; „Stipriausi Lietuvoje
  2016–2020“ (rodytas senoje baltcontract.eu svetainėje, palikti su žyma „tikslinama“). Skenai: `assets/img/sert/`.
- Darbo pasiūlymai: Suvirintojai NL 3000 €, Varinių vamzdžių suvirintojai NL 3500 €, Elektrikai SE nuo 2500 € (tikri),
  Laivų korpusų surinkėjai NL (pavyzdys). Škotijos skelbimą pašalinti. Filtras: Visi, Nyderlandai, Švedija.
- Suvirintojo nuotrauka `assets/img/foto/suvirintojas-baltcontract.jpg` – iš baltcontract.eu, galima naudoti.

### Skanlika (`svetaines/skanlika/`, skanlika.com, spalva – žalsvai mėlyna #0F7C7A, pasiūlymas)

- UAB „Skanlika“, įkurta 2003 m. Klaipėdoje, 20+ metų patirties. Įm. kodas 142136214, PVM LT421362113, info@skanlika.com.
- Istorija (iš senos svetainės): pradžioje metalo konstrukcijų gamyba, vėliau statybų projektai Skandinavijoje; nuo tada
  orientuota į Jungtinės Karalystės ir Airijos rinką: Anglija, Škotija, Velsas, Airija.
- Veiklos sritys (3, id): `metalo-konstrukcijos`, `statybu-pramone`, `laivu-statyba-ir-remontas` (tokia tvarka). Kitas dvi
  sritis (nafta ir dujos, laivų vidaus įrengimas) pašalinti iš visų puslapių.
- Rinkų aprašai (iš dabartinio maketo): Anglija – laivų statyklos ir jachtų gamintojai, metalo konstrukcijų montavimas,
  statybos objektai; Škotija – metalo konstrukcijų montuotojų komandos statybos ir pramonės objektuose; Velsas – žvejybinių
  laivų statyba ir remontas, suvirinimo ir vamzdynų darbai; Airija – pastatų statyba ir renovacija: elektros instaliacija,
  betonavimas, apdaila.
- Sertifikatų nežinome. VCA, VCU, NEN 4400-1, KvK, „Stipriausi Lietuvoje“ – **ne Skanlika**, juos pašalinti. Vietoje
  sertifikatų blokų – „Atitiktis ir darbo sauga“: ES piliečiai, dokumentai darbui JK (po „Brexit“ – leidimai / statusas,
  tikslinama), A1 pažymos darbui Airijoje (ES), CSCS kortelės JK statybvietėms (tikslinama), draudimas. Viską, kas nežinoma,
  žymėti „tikslinama“.
- Darbo pasiūlymai: tik pavyzdžiai (visi su žyma „pavyzdys“): Metalo konstrukcijų montuotojai (Škotija), Suvirintojai
  (Anglija), Statybininkai / betonuotojai arba elektrikai (Airija). Atlyginimą rodyti kaip dabar („per mėn. į rankas“) su
  žyma „tikslinama“. Filtras: Visi + šalys su vėliavomis (Anglija `gb-eng`, Škotija `gb-sct`, Airija `ie`; Velsas – jei yra
  skelbimas).
- Suvirintojo nuotraukos iš baltcontract.eu **nenaudoti** (jos ir nėra Skanlika `assets/`) – vietoje jos Pexels nuotrauka.

## Puslapiai: ką pakeisti (abiem svetainėms)

- **index**: hero (eyebrow su įkūrimo metais, h1 ir lead apie vieną įmonę ir jos rinkas), du keliai (užsakovas / darbuotojas)
  lieka; skaitikliai – savo (pvz. metai, sritys, šalys, 100 % ES piliečiai); judanti juosta – savo sritys + savo šalys su
  vėliavomis; sekcija `#imones` (dvi kortelės) → viena sekcija apie įmonę (pvz. `split`: nuotrauka + tekstas + rekvizitai
  `dl` + žymos su vėliavomis), `scroll-cue` turi vesti į ją; modeliai lieka; veiklos sritys – tik savo (Skanlika – 3 kortelės:
  `.sectors` tinklelyje pirmos dvi kortelės užima pusę eilutės, todėl 3 kortelėms reikia `theme.css` pataisos, pvz. visos
  `span 2`); „Darbas objektuose“ video kortelės – savo temų; eiga lieka; vertybės lieka; sertifikatai – kaip aprašyta
  įmonei; karjeros blokas – savo pasiūlymai; atsiliepimai – savo šalys; DUK – pritaikyti (JK dokumentai Skanlika);
  užklausų formos – savo.
- **klientams**: hero, „kam skirta“ (savo užsakovų tipai), subranga ir personalo nuoma (medija – savo), palyginimas,
  specialistai (Skanlika – tik jos sričių specialybės), eiga, atitiktis (BCG – sertifikatai; Skanlika – JK/IE atitiktis),
  `#rinkos` – viena grupė su savo 4 šalimis (be kitos įmonės grupės), DUK, `#uzklausa`.
- **veiklos-sritys**: skirtukai ir panelės tik savo sritims (Skanlika – 3: `.sector-tabs` tinklelį pritaikyti `theme.css`,
  pvz. `repeat(3, 1fr)`); faktuose „Rinkos“ – tik savo šalys; „Kas bendra visoms sritims“ – be sertifikatų, jei jų nėra.
- **karjera**: pasiūlymai ir filtras (žr. įmonę), privalumai, eiga, „Diena objekte“ video, sąlygos, atsiliepimai, DUK, CV.
- **apie-mus**: hero, kas esame, istorija (tik savo įvykiai), `#imones` blokas su dviem įmonėmis → pašalinti arba pakeisti
  vienos įmonės rekvizitų / registracijos bloku, vertybės, sertifikatai (BCG) arba atitiktis (Skanlika), rinkos (viena
  grupė), darbas su darbuotojais, CTA.
- **kontaktai**: viena įmonės kortelė + biuro kortelė (be kitos įmonės), formos, žemėlapis, rekvizitai (viena įmonė),
  CTA darbuotojams.

## Patikra (privaloma prieš baigiant)

Darbo katalogas – `/Users/arvydastrybe/Documents/Claude Stitch/BCG`.

1. `python3 svetaines/build.py <svetainė>` – **0 įspėjimų** (tarp jų „minima kita įmonė“).
2. Serveris savo svetainei (fone): BCG – `python3 -m http.server 8791 --bind 127.0.0.1 --directory svetaines/bcg`,
   Skanlika – `python3 -m http.server 8792 --bind 127.0.0.1 --directory svetaines/skanlika`. Baigę – sustabdyti
   (`pkill -f "http.server 879X"`).
3. Kiekvienam puslapiui: `node _tools/check.mjs http://127.0.0.1:879X/<puslapis>.html` – `errors: []`, `imagesBroken: []`,
   `overflowX: 0`, formos / skirtukai / filtras / žemėlapis veikia.
4. Telefono plotis: `node _tools/probe.mjs http://127.0.0.1:879X/<puslapis>.html 390 844 "JSON.stringify({ov:document.documentElement.scrollWidth-document.documentElement.clientWidth})"` – `ov: 0`.
5. Vizualiai peržiūrėti **kiekvieną** puslapį: `node _tools/shot.mjs <url> _tools/shots/<svetainė>/<puslapis>-1440.png 1440 900 --segments=1700`
   ir `... 390 844 --mobile --segments=1600` (sukuria `-1.png`, `-2.png`…), atsidaryti kadrus ir taisyti, kas atrodo blogai
   (tušti tarpai, persidengimai, sulūžę tinkleliai, pasikartojančios nuotraukos šalia). `shot.mjs` priverstinai įjungia
   atsiradimo animacijas, todėl jų veikimą tikrina tik `check.mjs` (`masks`, `inviewVideo`).
6. Hash nuorodos: `veiklos-sritys.html#<srities-id>` atidaro reikiamą skirtuką (`_tools/probe.mjs` su
   `JSON.stringify([...document.querySelectorAll('.sector-panel')].filter(p=>!p.hidden).map(p=>p.id))`).

## Ataskaita

Pabaigoje trumpai: kas pakeista kiekviename puslapyje, ką išgalvojote ir pažymėjote „tikslinama“ / „pavyzdys“, kokius
Pexels ID (nuotraukas ir video) panaudojote kuriuose puslapiuose, patikros rezultatai (build, check, 390 px) ir kas liko
neaišku ar reikia mano sprendimo (pvz. jei reikėtų keisti `_parts`).
