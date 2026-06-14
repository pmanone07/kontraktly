import type { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "freelance-kontrakt-norge-guide",
    title: "Freelance-kontrakt i Norge: Alt du må ha med",
    metaTitle: "Freelance-kontrakt i Norge — komplett guide (2026)",
    metaDescription:
      "Hva må en freelance-kontrakt inneholde i Norge? Honorar, eierskap, ansvar og oppsigelse. Praktisk guide med eksempler og PDF-mal.",
    excerpt:
      "En freelance-kontrakt beskytter både deg og kunden. Vi går gjennom de syv punktene som faktisk avgjør om kontrakten holder hvis det blir konflikt.",
    publishedAt: "2026-06-14",
    author: "Kontraktly",
    readingMinutes: 7,
    tags: ["freelance", "selvstendig", "kontrakt"],
    relatedContractSlugs: ["freelance", "konsulent", "nda"],
    content: `## Hvorfor freelancere trenger en skriftlig kontrakt

I Norge gjelder avtalefrihet. Det betyr at en muntlig avtale i prinsippet er bindende — men det betyr også at *du* må bevise hva som ble avtalt hvis det blir uenighet. Skriftlig kontrakt er derfor ikke et juridisk krav, men praktisk talt et must hvis du tar deg betalt for arbeid.

De vanligste feilene som rammer freelancere:

- Honorar betales aldri, eller utbetales i småbiter uten klar plan.
- Kunden bruker leveransen kommersielt, mens du trodde du hadde beholdt rettighetene.
- "Små endringer" balloner ut til dobbel arbeidstid uten ekstra betaling.
- Oppdraget avbrytes halvveis, og det er uklart hva som skal betales.

Alle disse er enkle å unngå med en kontrakt som er to-tre sider lang.

## De syv punktene en freelance-kontrakt må ha

### 1. Partene
Fullt navn, adresse og organisasjonsnummer (eller fødselsdato hvis du er enkeltpersonforetak uten org.nr.). Hvis kunden er et AS, sjekk at du skriver selskapsnavnet — ikke navnet på kontaktpersonen.

### 2. Leveransen
Konkret beskrivelse av hva som skal leveres. "Designe nettside" er for vagt. "Designe forside, om-side og kontaktside i Figma, med to revisjonsrunder" er bra. Jo mer spesifikt, jo lettere er det å si "dette ligger utenfor kontrakten" når kunden ber om ekstra.

### 3. Honorar og betaling
Beløp, eks mva eller inkl mva, og når det forfaller. Vanlige modeller:

- **Fast pris** — hele beløpet ved levering, eller delt 50/50 ved oppstart og levering.
- **Timepris** — med fakturering ukentlig eller månedlig.
- **Milepæler** — for større prosjekter, f.eks. 30% ved oppstart, 40% ved utkast, 30% ved levering.

Forsinkelsesrente følger forsinkelsesrenteloven (per 2026: 12,5 % p.a.) — du trenger ikke skrive dette eksplisitt, men det er greit at det står.

### 4. Tidsplan
Når starter arbeidet, når er forventet leveranse, og hva skjer ved forsinkelse. Hvis du jobber på flere prosjekter parallelt, vær forsiktig med å love datoer du ikke kan holde.

### 5. Eierskap til resultatet
Dette er det viktigste — og det punktet flest glemmer. I norsk rett tilhører åndsverk *opphavspersonen* (deg) inntil noe annet er avtalt. Hvis du designer en logo og ikke står noe om rettigheter, kan kunden i teorien ikke bruke den til alt de vil.

I praksis følger man en av to modeller:

- **Full overdragelse** — kunden overtar alle økonomiske rettigheter ved full betaling.
- **Bruksrett** — kunden får en lisens for et bestemt formål, og du beholder retten til å bruke arbeidet i portefølje.

Begge er greit — bare vær eksplisitt om hvilken som gjelder.

### 6. Konfidensialitet
Hvis kunden gir deg innsyn i sensitiv informasjon (forretningsplaner, kundedata, kildekode), trenger dere en taushetsklausul — eller en separat [NDA](/kontrakter/nda).

### 7. Avslutning og oppsigelse
Hvor lang oppsigelsestid? Hva skal betales hvis prosjektet avsluttes underveis? Et vanlig prinsipp: utført arbeid betales pro rata, og leverte filer overleveres ved sluttoppgjør.

## MVA og enkeltpersonforetak

Hvis du er enkeltpersonforetak og omsetter for mindre enn 50 000 kr i løpet av en 12-måneders periode, er du *ikke* mva-pliktig. Når du når grensen, må du registrere deg i mva-registeret og legge til 25 % mva på fakturaen.

For tjenester levert til utenlandske kunder gjelder egne regler — kort sagt: salg av tjenester til bedrifter i EU faktureres som regel uten norsk mva (omvendt avgiftsplikt).

## Vanlige fallgruver

- **"Vi ordner det etterpå"** — etterpå-avtaler blir aldri så fordelaktige som forhåndsavtaler.
- **Å starte arbeidet før kontrakten er signert** — du har ingen ryggdekning hvis kunden trekker seg.
- **Glemme å avtale rettigheter til kildefiler** — kunden vil ha PSD/AI/Figma-filer, men de er ikke en del av leveransen med mindre det står.
- **Å kopiere en amerikansk freelance-kontrakt** — terminologi som "work for hire" og "indemnification" har ikke samme betydning i norsk rett.

## Trenger du en mal?

Vi har bygget en [freelance-kontrakt](/kontrakter/freelance) som dekker alle punktene over. Du fyller inn dine egne opplysninger, og laster ned som PDF. Tilpasset norsk lovgivning og avtaleloven.
`,
  },
  {
    slug: "leiekontrakt-bolig-hva-ma-vaere-med",
    title: "Leiekontrakt for bolig: Hva må være med?",
    metaTitle: "Leiekontrakt bolig — krav og innhold (norsk lov, 2026)",
    metaDescription:
      "Husleieloven setter krav til hva en leiekontrakt må inneholde. Sjekkliste for utleier og leietaker — depositum, oppsigelse, husdyr og mer.",
    excerpt:
      "Husleieloven er ufravikelig i leietakers favør på de fleste punktene. Slik skriver du en leiekontrakt som faktisk holder — og hva som *ikke* kan stå i kontrakten.",
    publishedAt: "2026-06-14",
    author: "Kontraktly",
    readingMinutes: 6,
    tags: ["leie", "bolig", "husleieloven"],
    relatedContractSlugs: ["leie", "samboer"],
    content: `## Husleieloven gjelder — uansett hva som står i kontrakten

Det viktigste først: husleieloven er **ufravikelig** på de fleste punktene. Det betyr at du ikke kan avtale bort leietakers rettigheter, selv om begge parter signerer på det. Hvis kontrakten din sier "leietaker har ingen oppsigelsestid", er det punktet ugyldig — loven gjelder uansett.

Det betyr ikke at kontrakten er ubrukelig. Men det betyr at maler hentet fra utlandet, eller fra "raske gratis"-sider, ofte inneholder klausuler som ikke gjelder i Norge.

## Hva en leiekontrakt for bolig må inneholde

### 1. Partene
Utleier (eier eller foretak) og leietaker. Hvis flere leietakere skal stå solidarisk ansvarlig — f.eks. tre studenter som leier kollektiv — må alle stå på kontrakten.

### 2. Leieobjektet
Adresse, etasje, leilighetsnummer hvis aktuelt, og hvor mange m². Hva inngår (kjeller-bod, parkering, hage)? Hva inngår *ikke*?

### 3. Leietid
- **Tidsubestemt** — løper til en av partene sier opp.
- **Tidsbestemt** — løper til en fast dato. Minimum 3 år (1 år for hybel/del av bolig der utleier bor). Kortere tidsbestemte avtaler er ulovlige med mindre du har en saklig grunn (f.eks. midlertidig utleie under utenlandsopphold).

### 4. Husleie
Beløp per måned, og hva som inngår (strøm, internett, fellesutgifter). Det er ikke lov å kreve "ekstra" gebyrer som ikke står i kontrakten.

Husleien kan justeres etter konsumprisindeksen (KPI) en gang i året, med en måneds varsel. Andre økninger krever 6 måneders varsel og må være "gjengs leie" — markedsleie for tilsvarende bolig i området.

### 5. Depositum
Maks 6 måneders husleie. **Depositumet skal stå på egen sperret konto** i leietakers navn — ikke på utleiers konto. Hvis utleier krever depositum kontant eller på egen konto, er det lovbrudd.

### 6. Oppsigelse
Lovens utgangspunkt: 3 måneders oppsigelsestid for begge parter. Skriftlig. Utleier kan kun si opp med saklig grunn (f.eks. eget brukbehov, mislighold, salg).

Leietaker har sterkere stilling: kan i prinsippet alltid si opp tidsubestemte avtaler med 3 måneders varsel.

### 7. Vedlikehold
Husleieloven fordeler ansvar slik:

- **Utleier**: byggets struktur, varme, vann, vinduer, hvitevarer som følger med, generell vedlikehold.
- **Leietaker**: løpende renhold, sikringer, lyspærer, tetningslister, mindre slitasje.

### 8. Husdyr
Du kan forby husdyr i kontrakten, men retten kan tilsidesette forbudet hvis leietaker har en særlig grunn (f.eks. førerhund). For vanlige selskapsdyr er forbudet som regel gyldig.

### 9. Røyking
Du kan forby røyking i boligen. Dette holder i retten.

### 10. Inn- og utflyttingsprotokoll
Ikke et lovkrav, men sterkt anbefalt: protokoll med bilder ved innflytting og utflytting. Uten dette er det vanskelig å kreve erstatning for skader.

## Hva som *ikke* kan stå i kontrakten

Følgende klausuler er ugyldige selv om begge parter signerer:

- "Depositum tilbakebetales ikke ved oppsigelse"
- "Leietaker har ingen oppsigelsestid"
- "Utleier kan si opp uten grunn"
- "Husleien økes med 10 % årlig"
- "Leietaker dekker alle reparasjoner"

Hvis maler du har funnet inneholder noe av dette, er det et rødt flagg.

## Det som ofte glemmes

- **Hvem betaler nettleie og strøm?** — i kollektiv blir dette ofte tvist. Avtal eksplisitt.
- **Internett** — er det inkludert, eller skal leietaker tegne eget abonnement?
- **Vaskemaskin/tørketrommel** — eier leietaker eller utleier? Hvem betaler reparasjon?
- **Tilgang for utleier** — utleier har ikke rett til å komme uanmeldt. Minimum 24 timers varsel for vanlige besøk.

## Bruk en oppdatert mal

Mange leiekontrakter du finner gratis på nettet er flere år gamle og inneholder klausuler som ikke lenger er gyldige. Vi har bygget en [leiekontrakt](/kontrakter/leie) som følger husleieloven slik den gjelder i 2026, og du fyller den ut på noen minutter.
`,
  },
  {
    slug: "nda-konfidensialitetsavtale-norsk-rett",
    title: "NDA i Norge: Når trenger du en konfidensialitetsavtale?",
    metaTitle: "NDA / konfidensialitetsavtale — når og hvordan (norsk rett)",
    metaDescription:
      "Når trenger du en NDA i Norge? Hva skal den dekke, hvor lenge varer den, og hva er forskjellen på ensidig og gjensidig? Praktisk guide.",
    excerpt:
      "NDA-er kopieres ofte fra amerikanske maler — og bommer på norsk rett. Slik skriver du en konfidensialitetsavtale som faktisk er håndhevelig.",
    publishedAt: "2026-06-14",
    author: "Kontraktly",
    readingMinutes: 5,
    tags: ["nda", "konfidensialitet", "forretningshemmelighet"],
    relatedContractSlugs: ["nda", "freelance", "konsulent"],
    content: `## Hva er en NDA?

NDA (Non-Disclosure Agreement) — eller konfidensialitetsavtale på norsk — er en avtale om å ikke dele bestemt informasjon med utenforstående. Det er kanskje det vanligste juridiske dokumentet i næringslivet, og samtidig det som oftest skrives dårlig.

## Når trenger du en?

- Før du diskuterer en forretningsidé med en potensiell partner eller investor.
- Før du gir en utvikler tilgang til kildekode eller designsystemer.
- Før du deler kundeliste, prisstrategi eller leverandøravtaler med en konsulent.
- Før du gir innsyn i interne tall til en kjøper i en oppkjøpsprosess.
- Før du engasjerer en frilanser som skal jobbe med upublisert produkt.

Hvis informasjonen er allerede offentlig — ingen NDA trengs. Hvis informasjonen er sensitiv og kan misbrukes — alltid NDA.

## Ensidig eller gjensidig?

- **Ensidig (one-way)** — kun den ene parten deler hemmelig informasjon. Brukes når du gir en konsulent tilgang til ting de ellers ikke ville sett.
- **Gjensidig (mutual)** — begge parter deler. Brukes når to selskaper utforsker samarbeid og begge må avsløre noe om eget produkt eller strategi.

Hvis du er i tvil — bruk gjensidig. Det er like enkelt å skrive, og dekker mer.

## Det norske utgangspunktet: forretningshemmeligheter er beskyttet uten NDA

Litt overraskende: i Norge er forretningshemmeligheter beskyttet av **lov om forretningshemmeligheter** (2021), selv uten avtale. Det betyr at noen som får tilgang til hemmelig informasjon under et samarbeid, ikke kan bruke den til egen vinning — uavhengig av om dere har signert NDA.

Hvorfor da bruke NDA? Tre grunner:

1. **Klarhet** — partene vet hva som regnes som konfidensielt, og hvor lenge.
2. **Bevisbyrde** — det er lettere å vinne en sak hvis det finnes en signert avtale.
3. **Avtalt sanksjon** — du kan avtale en konkret konvensjonalbot (f.eks. 250 000 kr per brudd), som er enklere å kreve enn dokumentert tap.

## Hva NDA-en bør inneholde

### 1. Definisjon av "konfidensiell informasjon"
For vagt: "all informasjon utvekslet". For snevert: "informasjon merket KONFIDENSIELT". En god mellomvei: "all informasjon som ikke er offentlig og som en fornuftig person ville forstå er konfidensiell, samt informasjon eksplisitt markert som konfidensiell".

### 2. Unntak
NDA-en skal *ikke* dekke:
- Informasjon som allerede er offentlig.
- Informasjon mottakeren allerede hadde.
- Informasjon utviklet uavhengig.
- Informasjon en domstol eller myndighet krever utlevert.

Hvis disse unntakene mangler, er NDA-en for streng og kan settes til side.

### 3. Bruksbegrensninger
Informasjonen skal kun brukes til **formålet med samarbeidet** — ikke til egen vinning eller deling med tredjepart.

### 4. Varighet
Vanlige modeller:
- Konfidensialitetsplikt i 3-5 år fra avtaleinngåelse.
- Forretningshemmeligheter beskyttes **så lenge de er hemmelige** (ubegrenset varighet).

For tech-startups er 2-3 år vanlig — informasjonen blir ofte uaktuell raskt.

### 5. Sanksjon ved brudd
Tre alternativer:
- Erstatning for faktisk tap (dokumenteres).
- Konvensjonalbot — fast beløp avtalt på forhånd.
- Begge deler.

Konvensjonalbot er kraftig, men retten kan sette den ned hvis den fremstår urimelig.

### 6. Lovvalg og verneting
For norske avtaler: norsk rett, og som regel nærmeste tingrett til en av partene. For internasjonale samarbeid: avklar tidlig.

## Vanlige feil

- **Kopiere amerikansk mal** — "indemnification" og "liquidated damages" har ikke direkte motstykke i norsk rett.
- **For lang varighet** — 50 års konfidensialitet er ikke realistisk for en typisk forretningsidé.
- **Ikke definere hva som er konfidensielt** — uten klar avgrensning får du diskusjon om hvorvidt en spesifikk opplysning faktisk var dekket.
- **Ikke ha utleveringsplikt etter samarbeidet** — det bør stå at materiale skal returneres eller slettes.

## Trenger du en mal?

Vi har en [NDA tilpasset norsk rett](/kontrakter/nda) som dekker punktene over. Bygg den med dine egne opplysninger, last ned PDF, og signer.
`,
  },
];

export const getBlogSlugs = () => BLOG_POSTS.map((p) => p.slug);
export const getBlogPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
export const getAllBlogPosts = () =>
  [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
