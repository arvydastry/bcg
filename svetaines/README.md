# Dvi atskiros svetainės: Baltic Contracting Group ir Skanlika

Klientas nusprendė, kad dvi įmonės turi būti atskirtos ir turėti **dvi atskiras svetaines**. Šiame aplanke – abiejų svetainių
demo maketai, padaryti iš bendro maketo (`../`).

**Demo internete:** https://arvydastry.github.io/bcg/ – įmonės pasirinkimas, toliau
[BCG](https://arvydastry.github.io/bcg/bcg/) ir [Skanlika](https://arvydastry.github.io/bcg/skanlika/). Gidas –
https://arvydastry.github.io/bcg/salient-gidas.html. Publikuoja `.github/workflows/pages.yml` po kiekvieno `git push` į `main`
(surenka abi svetaines ir kelia tik sugeneruotus puslapius su `assets`). Senas bendras maketas šaknyje liko repozitorijoje,
bet nebepublikuojamas.

## Peržiūra

```bash
python3 -m http.server 8790 --bind 127.0.0.1 --directory svetaines
```

http://127.0.0.1:8790/ – pasirinkimo kortelė (tik peržiūrai), iš jos – į abi svetaines. Kiekvieną svetainę galima paleisti ir
atskirai, kaip ji veiks savo domene: `.claude/launch.json` → `bcg-svetaine` (8791) ir `skanlika-svetaine` (8792).

## Struktūra

| Kelias | Paskirtis |
|---|---|
| `build.py` | Surenka abi svetaines: `python3 svetaines/build.py`, viena – `python3 svetaines/build.py skanlika` |
| `bendra/assets/` | Bendra dizaino sistema: `style.css`, puslapių `p-*.css`, `main.js`, `p-karjera.js`, šalių vėliavos |
| `bcg/`, `skanlika/` | Savarankiška svetainė: `_parts/` (head, antraštė, poraštė), `_body/` (6 puslapių turinys), `assets/` (bendri failai nukopijuojami build metu + savo logotipai, `theme.css`, sertifikatai), sugeneruoti `*.html` |
| `index.html` | Įmonės pasirinkimo puslapis (demo pradžia), į galutines svetaines nekeliamas |
| `_brief/AGENTAMS.md` | Atskyrimo taisyklės ir kiekvienos įmonės faktai |

Build kiekvieną kartą patikrina nuorodas, id, paveikslėlius, h1 ir **ar puslapyje neminima kita įmonė** (pavadinimas, el. paštas,
logotipas). Abiem svetainėms tikslas – 0 įspėjimų.

Bendrą stilių keisti tik `bendra/assets/` (ne `bcg/assets/css/style.css` – jis perrašomas). Svetainės spalvos ir logotipo dydis –
`<svetainė>/assets/css/theme.css`.

## Kuo skiriasi svetainės

| | Baltic Contracting Group | Skanlika |
|---|---|---|
| Domenas | baltcontract.eu | skanlika.com |
| Pagrindinė spalva | BCG mėlyna #1B4E9B (iš logotipo) | žalsvai mėlyna #0F7C7A (pasiūlymas, tikslinti) |
| Įkurta | 2013 m., KvK (NL) 55608272 | 2003 m. |
| Rinkos | Nyderlandai, Švedija, Norvegija, Danija | Anglija, Škotija, Velsas, Airija |
| Veiklos sritys | 5: laivų statyba ir remontas, nafta ir dujos, metalo konstrukcijos, laivų vidaus įrengimas, statyba | 3: metalo konstrukcijos, statyba, laivų statyba ir remontas |
| Sertifikatai | VCA, VCU, NEN 4400-1 / SNA, KvK | nežinomi – vietoje jų „Atitiktis ir darbo sauga“ (tikslinama) |
| Darbo pasiūlymai | 3 tikri (NL, SE) + 1 pavyzdys | tik pavyzdžiai (JK, Airija) |
| El. paštas | info@baltcontract.eu | info@skanlika.com |
| Bendra | tel. +370 46 310637, Daukanto g. 34, Klaipėda | tas pats |

Dizainas, komponentai, efektai ir Salient atitikmenys – tie patys kaip bendrame makete (`../salient-gidas.html`).

## Medija

Abiem svetainėms – Pexels (nemokama licencija). Svetainės **nenaudoja tų pačių video**: BCG lieka su bendro maketo medžiaga
(laivų statyklos, naftos gamyklos, Roterdamas), Skanlika – su statybviečių, plieno karkasų, suvirinimo ir JK uostų medžiaga
(pvz. laivas sausajame doke Belfaste, Grinoko uostas Škotijoje). Video nuoroda: `https://www.pexels.com/video/<ID>/`.
Nuotraukų sąrašas su autoriais – `../_brief/MEDIA.md`.

| Svetainė | Puslapis | Video ID |
|---|---|---|
| BCG | `apie-mus` | 8964772 |
| BCG | `index` | 38415765, 38415766, 6046358, 10386901, 16111731 |
| BCG | `karjera` | 4941457, 30456100, 28886877, 11887091 |
| BCG | `klientams` | 8964378, 33880927, 32243444 |
| BCG | `kontaktai` | – |
| BCG | `veiklos-sritys` | 37151630, 33585498, 29959405, 34771890, 12098511 |
| Skanlika | `apie-mus` | – |
| Skanlika | `index` | 9991145, 6046365, 39173871, 39527935, 5391403 |
| Skanlika | `karjera` | 14314764, 39924274, 32244801, 8470295 |
| Skanlika | `klientams` | 6285692, 9991144, 32243438 |
| Skanlika | `kontaktai` | – |
| Skanlika | `veiklos-sritys` | 11396197, 10641848, 33893697, 38415762 |

## WordPress

Du variantai: (1) dvi atskiros WordPress instaliacijos su ta pačia Salient child tema; (2) WordPress Multisite (vienas
administravimas, dvi svetainės su savo domenais). Abiem atvejais skiriasi tik Theme Options (logotipai, Accent Color),
meniu, Global Sections (antraštė, poraštė su rekvizitais) ir turinys. Kalbos (WPML / Polylang) – kiekvienai svetainei atskirai.

## Klausimai klientui

- Ar svetainės turi kaip nors nuoroduoti viena į kitą (pvz. poraštėje „Partneris“)? Makete – visiškai atskirtos, jokių nuorodų.
- Skanlika prekės ženklo spalva ir vektoriniai logotipai.
- Skanlika sertifikatai ir dokumentai darbui JK po „Brexit“ (makete pažymėta „tikslinama“).
- Skanlika darbo pasiūlymai (makete – pavyzdžiai).
- Ar Skanlika svetainei reikia vokiečių kalbos (JK ir Airijos rinkai gal pakanka LT ir EN)? Makete abiem – LT / EN / DE.
- Ar abi įmonės lieka tame pačiame biure ir su tuo pačiu telefonu.
- BCG įkūrimo metai: Lietuvoje 2013 m., bet KvK išraše registracija 2010-09, veikla Nyderlanduose nuo 2011-03 – kuriuos metus
  rodyti (makete „nuo 2013 m.“ ir „10+ metų“).
- „Stipriausi Lietuvoje 2016–2020“ – kurios įmonės apdovanojimas? Makete – BCG su žyma „tikslinama“.
- Kiekvienos svetainės išgalvoti elementai pažymėti „tikslinama“ / „Pavyzdys“: atsiliepimai, Skanlika darbo skelbimai ir
  atlyginimai, rinkos pagal sritis, komandų dydžiai, Skanlika istorijos laikotarpiai, JK dokumentai po „Brexit“.
