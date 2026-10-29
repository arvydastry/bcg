# Instrukcija vidinių puslapių autoriams (subagentams)

Projektas: `/Users/arvydastrybe/Documents/Claude Stitch/BCG` – statinis HTML demo maketas, kuris vėliau bus perkeltas į WordPress + Salient.
Perskaityk prieš rašydamas: `_brief/BRIEF.md` (faktai ir dizaino kryptis), `_brief/MEDIA.md` (leidžiamos nuotraukos),
`_body/index.html` (pavyzdinė struktūra ir komponentų naudojimas), `assets/css/style.css` (visi komponentai), `_parts/header.html` ir `_parts/footer.html`.

## Taisyklės
1. Rašai TIK savo `_body/<puslapis>.html` failus (+ prireikus `assets/css/p-<puslapis>.css` ir `assets/js/p-<puslapis>.js`).
   NEREDAGUOK `assets/css/style.css`, `assets/js/main.js`, `_parts/*`, `build.py`, kitų puslapių. Jei trūksta stiliaus – rašyk jį į savo `p-<puslapis>.css`
   ir įtrauk per meta `extra_head`: `"extra_head": "\n  <link rel=\"stylesheet\" href=\"assets/css/p-klientams.css\">"`.
2. Failo pirmoji eilutė – meta JSON (žr. `_body/index.html`). Puslapiai su tamsiu hero turi `"body_class": "has-dark-hero"`.
   Vidinio puslapio hero šablonas:
   ```html
   <section class="hero hero--page" aria-label="Įžanga">
     <div class="hero__bg"><div class="px" data-px="0.12" style="position:absolute;inset:-10% 0"><img src="https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg?auto=compress&cs=tinysrgb&w=1800&h=900&fit=crop" alt="..." width="1800" height="900"></div></div>
     <div class="container hero__content">
       <nav class="crumbs" aria-label="Kelias"><a href="index.html">Pradžia</a><i class="ph ph-caret-right"></i><span>Puslapio pavadinimas</span></nav>
       <h1 class="hero__title" data-split>...</h1>
       <p class="hero__lead" data-reveal>...</p>
       <div class="hero__actions" data-reveal style="--d:200ms">...mygtukai...</div>
     </div>
   </section>
   ```
3. Naudok esamus komponentus: `.section` (+ `--white`, `--mist`, `--navy`, `--inset`), `.section-head` (+ `--center`, `--row`), `.eyebrow`, `.lead`,
   `.btn` variantai, `.split`, `.figure`, `.media-grid`, `.check-list`, `.cards-3 .card`, `.compare`, `.specialists .spec`, `.steps .step`, `.values .value`,
   `.certs .cert`, `.jobs .job` (details/summary), `.benefits .benefit`, `.testis .testi`, `.faq` (details), `.form-card`, `.tabs`, `.form`, `.field`, `.checks .check`,
   `.form-aside`, `.contact-card`, `.reply-card`, `.cta-band`, `.marquee`, `.markets .market`, `.timeline .tl`, `.sector-tabs .sector-panel` (veiklos sritys, v3), `.sector-block`, `.map`, `.chip`, `.demo-note`.
   Judesys: `data-reveal` (+`style="--d:200ms"`), `data-stagger` (tėvas), `data-split` (antraštės), `data-mask` (nuotraukos), `data-px="0.08"` (paralaksas), `data-tilt="4"`, `data-count`.
4. Formos: `<form class="form" data-demo-form>` su `.field` ir `<span class="error">`; privalomi laukai `required`; sėkmės blokas `.form__success` su `data-form-again`.
   Kopijuok formų HTML iš `_body/index.html` ir pritaikyk. Formos nieko nesiunčia.
5. Kalba: lietuvių su diakritikais, kabutės „…“, brūkšnys „–“ (ne em dash „—“), be anglicizmų. Kontaktai ir rekvizitai – tik iš BRIEF.md.
   Išgalvotus dalykus (skaičius, atsiliepimus, grafikus) žymėk `<span class="demo-note" title="Patikslinti su klientu">tikslinama</span>` arba `.testi__tag` „Pavyzdys“ ir išvardink ataskaitoje.
6. Nuotraukos tik iš `_brief/MEDIA.md` (Pexels ID). Kiekvienam `<img>` – prasmingas lietuviškas `alt`, `loading="lazy"` (išskyrus hero), `width`/`height`.
7. Nuorodos į kitus puslapius ir inkarus turi egzistuoti. Privalomi tavo puslapio id nurodyti užduotyje.
8. Surinkimas: `python3 build.py <puslapis>` (iš projekto katalogo). Įspėjimai apie KITŲ puslapių failus/ id, kurių dar nėra, – normalu; savo puslapio id klaidų neturi būti.
9. Patikra: serveris jau veikia `http://127.0.0.1:8781/`. Ekrano nuotraukos:
   `node _tools/shot.mjs http://127.0.0.1:8781/<puslapis>.html _tools/shots/<puslapis>-d.png 1440 900 --segments=1800`
   `node _tools/shot.mjs http://127.0.0.1:8781/<puslapis>.html _tools/shots/<puslapis>-m.png 390 844 --mobile --segments=1800`
   Peržiūrėk visas gautas PNG (Read) ir ištaisyk: persidengimus, per ilgas eilutes, tuščias nuotraukas, horizontalų slinkimą mobiliajame.
   Kiekviena shell komanda turi baigtis greičiau nei per 60 s; vienu metu viena ekrano nuotraukų komanda.
10. Ataskaitoje (galutiniame atsakyme) išvardink: sukurtus failus, visus sekcijų id, papildomą CSS/JS, išgalvotus faktus, kurie reikalauja kliento patvirtinimo, ir Salient atitikmenis kiekvienai sekcijai (vienos eilutės lentelė).
