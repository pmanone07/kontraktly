import {
  Briefcase, Home, Car, Shield, Users, Pen,
  Heart, BarChart2, ShoppingCart, Handshake, Truck, UserCheck, Banknote,
} from "lucide-react";
import type { ContractType } from "./types";
import { v, today } from "./helpers";

export const CONTRACT_TYPES: ContractType[] = [
  {
    id: "freelance",
    icon: Briefcase,
    label: "Freelance-kontrakt",
    description: "For selvstendige konsulenter, designere, utviklere og kreative.",
    price: 59,
    popular: true,
    color: "#c9a85c",
    features: ["Betalingsbetingelser og fakturering", "Leveranser og milepæler", "Immaterielle rettigheter", "Konfidensialitetsklausul", "Oppsigelsesvilkår", "Ansvarsbegrensning"],
    fieldGroups: [
      {
        title: "Oppdragsgiver",
        fields: [
          { key: "client_name", label: "Navn / selskap", placeholder: "Acme AS", type: "text" },
          { key: "client_orgnr", label: "Org.nr (valgfritt)", placeholder: "123 456 789", type: "text" },
          { key: "client_address", label: "Adresse", placeholder: "Storgata 1, 0182 Oslo", type: "text" },
        ],
      },
      {
        title: "Frilanser",
        fields: [
          { key: "freelancer_name", label: "Ditt navn / selskap", placeholder: "Kari Nordmann AS", type: "text" },
          { key: "freelancer_orgnr", label: "Org.nr (valgfritt)", placeholder: "987 654 321", type: "text" },
          { key: "freelancer_email", label: "E-post", placeholder: "kari@example.com", type: "text" },
        ],
      },
      {
        title: "Oppdrag og betaling",
        fields: [
          { key: "scope", label: "Oppdragsbeskrivelse", placeholder: "Utvikling av nettside inkl. CMS...", type: "textarea" },
          { key: "rate", label: "Honorar / timepris (kr)", placeholder: "1 500", type: "number" },
          { key: "billing", label: "Faktureringsmodell", type: "select", options: ["Timebasis", "Fast pris", "Månedlig retainer"] },
          { key: "payment_days", label: "Betalingsfrist (dager)", placeholder: "14", type: "number" },
          { key: "start_date", label: "Startdato", type: "date" },
          { key: "end_date", label: "Sluttdato / ubestemt", placeholder: "Ubestemt", type: "text" },
        ],
      },
      {
        title: "Tilleggsvilkår",
        fields: [
          { key: "nda_years", label: "Konfidensialitet (år)", placeholder: "2", type: "number" },
          { key: "notice_days", label: "Oppsigelsestid (dager)", placeholder: "14", type: "number" },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `FREELANCE-KONTRAKT
Dato: ${today()}

OPPDRAGSGIVER
Navn: ${v(val, "client_name", "[Oppdragsgiver]")}
Org.nr: ${v(val, "client_orgnr", "—")}
Adresse: ${v(val, "client_address", "[Adresse]")}

FRILANSER
Navn: ${v(val, "freelancer_name", "[Frilanser]")}
Org.nr: ${v(val, "freelancer_orgnr", "—")}
E-post: ${v(val, "freelancer_email", "[e-post]")}

§1 – OPPDRAGETS OMFANG
${v(val, "scope", "[Beskriv oppdraget]")}

§2 – VEDERLAG
Honorar: NOK ${v(val, "rate", "[beløp]")} (${v(val, "billing", "Timebasis")})
Betalingsfrist: ${v(val, "payment_days", "14")} dager
Periode: ${v(val, "start_date", "[startdato]")} – ${v(val, "end_date", "Ubestemt")}

§3 – IMMATERIELLE RETTIGHETER
Alt arbeid overføres til oppdragsgiver ved full betaling.

§4 – KONFIDENSIALITET
Begge parter forplikter seg til å behandle all informasjon
som konfidensiell i ${v(val, "nda_years", "2")} år etter avtalens utløp.

§5 – OPPSIGELSE
Oppsigelsestid: ${v(val, "notice_days", "14")} dager skriftlig varsel.

§6 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
Oppdragsgiver              Frilanser`,
    seo: {
      metaTitle: "Freelance-kontrakt mal — norsk lovgivning | Kontraktly",
      metaDescription: "Profesjonell freelance-kontrakt for selvstendige konsulenter, designere og utviklere. Tilpasset norsk avtalerett. Last ned som PDF — fra 59 kr.",
      longDescription: "En freelance-kontrakt er den viktigste avtalen mellom en selvstendig næringsdrivende og oppdragsgiveren. Den definerer hva som skal leveres, til hvilken pris, når betalingen skal skje, og hvem som eier resultatet. Uten en skriftlig avtale risikerer du sene betalinger, uklare leveransekrav, eller uenighet om eierskap til arbeidet. Denne malen er bygget for norske frilansere — utviklere, designere, tekstforfattere, konsulenter og andre kreative — og dekker alt fra timepris og fast pris til immaterielle rettigheter, konfidensialitet og oppsigelse.",
      useCases: [
        "Du tar oppdrag som utvikler, designer eller konsulent gjennom eget enkeltpersonforetak eller AS",
        "Du jobber for en kunde som krever skriftlig avtale før prosjektstart",
        "Du vil sikre eierskap til kildekode, design eller annet kreativt arbeid",
        "Du trenger klare betalingsbetingelser og fakturarutiner for å unngå sene innbetalinger",
      ],
      includes: [
        "Identifikasjon av begge parter med org.nr og kontaktinformasjon",
        "Detaljert oppdragsbeskrivelse med leveranser",
        "Honorar og faktureringsmodell (timebasis, fast pris eller retainer)",
        "Betalingsfrist og rentevilkår ved forsinket betaling",
        "Klausul om immaterielle rettigheter og overdragelse ved full betaling",
        "Konfidensialitetsbestemmelser med valgbar varighet",
        "Oppsigelsesvilkår og ansvarsbegrensning",
        "Verneting og lovvalg",
      ],
      legalBasis: "Avtalen reguleres av avtaleloven, kjøpsloven (ved leveranse av varer) og åndsverkloven (ved kreativt arbeid). For frilansere er det også viktig å være oppmerksom på skatteetatens regler for selvstendig næringsdrivende, samt mva-plikt over 50 000 kroner.",
      faqs: [
        {
          q: "Hva er forskjellen på en freelance-kontrakt og en arbeidskontrakt?",
          a: "En freelance-kontrakt regulerer et oppdragsforhold mellom selvstendige parter — du fakturerer som næringsdrivende og er ikke ansatt. En arbeidskontrakt gir derimot rettigheter etter arbeidsmiljøloven (ferie, sykepenger, oppsigelsesvern). Hvis oppdragsgiver styrer hvordan, hvor og når du jobber, kan myndighetene omklassifisere forholdet til ansettelse.",
        },
        {
          q: "Hvem eier arbeidet etter at oppdraget er ferdig?",
          a: "I malen overføres alle immaterielle rettigheter til oppdragsgiver ved full betaling. Det betyr at klienten eier kildekode, design eller tekst etter at fakturaen er betalt. Frem til betaling beholder du som frilanser rettighetene — et viktig pressmiddel ved sen betaling.",
        },
        {
          q: "Bør jeg ha konfidensialitetsklausul i en freelance-kontrakt?",
          a: "Ja, hvis du får tilgang til kundens forretningshemmeligheter, brukerdata eller intern strategi. Malen inneholder en NDA-klausul med valgbar varighet (typisk 2–5 år). Trenger du en frittstående NDA for tidlige samtaler, har vi også en egen mal for det.",
        },
      ],
    },
  },

  {
    id: "leie",
    icon: Home,
    label: "Leiekontrakt",
    description: "Husleiekontrakt for utleie av bolig, leilighet eller hybel.",
    price: 59,
    popular: false,
    color: "#7eb8a4",
    features: ["Leieperiode og oppsigelse", "Depositum og husleie", "Vedlikeholdsansvar", "Husordensregler", "Inventarliste", "Fraflyttingsvilkår"],
    fieldGroups: [
      {
        title: "Utleier",
        fields: [
          { key: "landlord_name", label: "Utleiers navn", placeholder: "Per Hansen", type: "text" },
          { key: "landlord_phone", label: "Telefon", placeholder: "400 00 000", type: "text" },
          { key: "landlord_email", label: "E-post", placeholder: "per@example.com", type: "text" },
        ],
      },
      {
        title: "Leietaker",
        fields: [
          { key: "tenant_name", label: "Leietakers navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "tenant_phone", label: "Telefon", placeholder: "400 11 111", type: "text" },
          { key: "tenant_email", label: "E-post", placeholder: "kari@example.com", type: "text" },
        ],
      },
      {
        title: "Leieobjekt og økonomi",
        fields: [
          { key: "address", label: "Adresse", placeholder: "Storgata 10, 0182 Oslo", type: "text" },
          { key: "size", label: "Størrelse (m²)", placeholder: "52", type: "number" },
          { key: "type", label: "Type bolig", type: "select", options: ["Leilighet", "Hus", "Hybel", "Rekkehus", "Annet"] },
          { key: "rent", label: "Månedlig leie (kr)", placeholder: "14 500", type: "number" },
          { key: "deposit", label: "Depositum (kr)", placeholder: "43 500", type: "number" },
          { key: "account", label: "Kontonummer (depositum)", placeholder: "1234.56.78910", type: "text" },
        ],
      },
      {
        title: "Periode og vilkår",
        fields: [
          { key: "start_date", label: "Innflyttingsdato", type: "date" },
          { key: "end_date", label: "Utløpsdato (tom = løpende)", placeholder: "Løpende", type: "text" },
          { key: "notice_months", label: "Oppsigelsestid (måneder)", placeholder: "3", type: "number" },
          { key: "pets", label: "Husdyr tillatt?", type: "select", options: ["Nei", "Ja — etter avtale"] },
          { key: "smoking", label: "Røyking innendørs?", type: "select", options: ["Ikke tillatt", "Tillatt"] },
        ],
      },
    ],
    buildPreview: (val) => `LEIEKONTRAKT FOR BOLIG
Dato: ${today()}

UTLEIER
Navn: ${v(val, "landlord_name", "[Utleier]")}
Tlf: ${v(val, "landlord_phone", "—")}  E-post: ${v(val, "landlord_email", "—")}

LEIETAKER
Navn: ${v(val, "tenant_name", "[Leietaker]")}
Tlf: ${v(val, "tenant_phone", "—")}  E-post: ${v(val, "tenant_email", "—")}

§1 – LEIEOBJEKT
Adresse: ${v(val, "address", "[Adresse]")}
Type: ${v(val, "type", "Leilighet")}  Areal: ${v(val, "size", "?")} m²

§2 – LEIEPERIODE
Fra: ${v(val, "start_date", "[dato]")}
Til: ${v(val, "end_date", "Løpende")}
Oppsigelsestid: ${v(val, "notice_months", "3")} måneder (skriftlig)

§3 – HUSLEIE OG DEPOSITUM
Månedlig leie: NOK ${v(val, "rent", "[beløp]")}
Depositum: NOK ${v(val, "deposit", "[beløp]")}
Depositumskonto: ${v(val, "account", "[kontonummer]")}

§4 – HUSORDENSREGLER
Husdyr: ${v(val, "pets", "Nei")}
Røyking innendørs: ${v(val, "smoking", "Ikke tillatt")}

§5 – VEDLIKEHOLD
Leietaker holder boligen i god stand og varsler utleier
straks ved skader eller mangler.

§6 – FRAFLYTTING
Ved utflytting skal boligen leveres ryddig og rengjort.

_______________________    _______________________
Utleier                    Leietaker`,
    seo: {
      metaTitle: "Leiekontrakt mal for bolig — husleieloven | Kontraktly",
      metaDescription: "Husleiekontrakt for leilighet, hus eller hybel. Tilpasset husleieloven og inkluderer depositum, oppsigelse og vedlikehold. Last ned som PDF — 59 kr.",
      longDescription: "En skriftlig leiekontrakt er pålagt etter husleieloven dersom én av partene krever det, og den beskytter både utleier og leietaker mot uenigheter senere. Vår leiekontrakt-mal er utformet i tråd med norsk husleielov og dekker alt fra leieperiode og depositum til vedlikeholdsansvar og fraflyttingsvilkår. Enten du leier ut en leilighet, et hus, en hybel eller et rekkehus, gir denne malen deg en juridisk solid kontrakt som holder i Husleietvistutvalget og tingretten.",
      useCases: [
        "Du leier ut en leilighet, hybel eller hus til privatperson",
        "Du er leietaker som vil ha en trygg kontrakt før innflytting",
        "Du fremleier en bolig og trenger skriftlig dokumentasjon",
        "Du leier ut sokkel eller hybelleilighet i egen bolig",
      ],
      includes: [
        "Identifikasjon av utleier og leietaker",
        "Leieobjektets adresse, type og størrelse",
        "Leieperiode (tidsbestemt eller løpende)",
        "Månedlig husleie og indeksregulering",
        "Depositumsbeløp og krav til separat depositumskonto",
        "Oppsigelsestid med skriftlig varsel",
        "Husordensregler (husdyr, røyking, støy)",
        "Vedlikeholdsansvar mellom partene",
        "Fraflyttingsvilkår og tilstandsvurdering",
      ],
      legalBasis: "Avtalen følger husleieloven (lov om husleieavtaler av 1999). Sentrale bestemmelser inkluderer § 3-5 om depositum (skal stå på sperret konto i leietakers navn), § 9-4 om oppsigelse (minst 3 måneder for vanlige boligleieforhold), og § 5-3 om vedlikeholdsansvar. Husleietvistutvalget (HTU) behandler tvister i Oslo, Akershus, Bergen og Trondheim.",
      faqs: [
        {
          q: "Hvor mye depositum kan utleier kreve?",
          a: "Etter husleieloven § 3-5 kan utleier kreve depositum på inntil 6 måneders husleie. Beløpet skal stå på en sperret depositumskonto i leietakers navn — ikke utleiers konto. Ved utflytting kan utleier kun trekke fra dokumenterte krav (skader, ubetalt leie).",
        },
        {
          q: "Hvor lang oppsigelsestid er det på en leiekontrakt?",
          a: "Hovedregelen for boligleie er 3 måneders gjensidig oppsigelse, regnet fra utløpet av kalendermåneden oppsigelsen kommer fram. Tidsbestemte kontrakter kan ikke sies opp i bindingsperioden, kun ved vesentlig mislighold. Hybel i utleiers egen bolig har egne regler (1 måned).",
        },
        {
          q: "Må leiekontrakten være skriftlig?",
          a: "Etter husleieloven § 1-4 kan begge parter kreve skriftlig kontrakt. I praksis er skriftlig avtale alltid å anbefale — det hindrer uenighet om vilkår, depositum og oppsigelse, og det er et krav for å registrere depositumet hos banken.",
        },
      ],
    },
  },

  {
    id: "bil",
    icon: Car,
    label: "Bil-kjøpskontrakt",
    description: "Trygg overdragelse av kjøretøy mellom privatpersoner.",
    price: 59,
    popular: false,
    color: "#8b7eb8",
    features: ["Kjøretøydetaljer og kilometerstand", "Pris og betalingsform", "Kjøretøyets tilstand", "Garanti og reklamasjon", "Overdragelse av eierskap", "Angrerett og ansvar"],
    fieldGroups: [
      {
        title: "Selger",
        fields: [
          { key: "seller_name", label: "Navn", placeholder: "Ola Nordmann", type: "text" },
          { key: "seller_address", label: "Adresse", placeholder: "Veien 1, 4020 Stavanger", type: "text" },
          { key: "seller_phone", label: "Telefon", placeholder: "400 00 000", type: "text" },
        ],
      },
      {
        title: "Kjøper",
        fields: [
          { key: "buyer_name", label: "Navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "buyer_address", label: "Adresse", placeholder: "Gata 2, 0182 Oslo", type: "text" },
          { key: "buyer_phone", label: "Telefon", placeholder: "400 11 111", type: "text" },
        ],
      },
      {
        title: "Kjøretøy",
        fields: [
          { key: "make", label: "Merke og modell", placeholder: "Toyota RAV4", type: "text" },
          { key: "year", label: "Årsmodell", placeholder: "2019", type: "number" },
          { key: "regnr", label: "Reg.nr", placeholder: "AB 12345", type: "text" },
          { key: "vin", label: "VIN-nummer", placeholder: "WBAKG1...", type: "text" },
          { key: "km", label: "Kilometerstand", placeholder: "85 000", type: "number" },
          { key: "condition", label: "Tilstandsgrad", type: "select", options: ["Meget god", "God", "Akseptabel", "Selges som den er"] },
        ],
      },
      {
        title: "Handel",
        fields: [
          { key: "price", label: "Kjøpesum (kr)", placeholder: "285 000", type: "number" },
          { key: "payment", label: "Betalingsform", type: "select", options: ["Bankoverføring", "Vipps", "Kontant", "Finansiering"] },
          { key: "handover", label: "Overtagelsesdato", type: "date" },
        ],
      },
    ],
    buildPreview: (val) => `BIL-KJØPSKONTRAKT
Dato: ${today()}

SELGER
Navn: ${v(val, "seller_name", "[Selger]")}
Adresse: ${v(val, "seller_address", "—")}
Tlf: ${v(val, "seller_phone", "—")}

KJØPER
Navn: ${v(val, "buyer_name", "[Kjøper]")}
Adresse: ${v(val, "buyer_address", "—")}
Tlf: ${v(val, "buyer_phone", "—")}

§1 – KJØRETØY
Merke/modell: ${v(val, "make", "[Merke/modell]")}
Årsmodell: ${v(val, "year", "—")}
Reg.nr: ${v(val, "regnr", "—")}
VIN: ${v(val, "vin", "—")}
Kilometerstand: ${v(val, "km", "—")} km
Tilstand: ${v(val, "condition", "—")}

§2 – KJØPESUM OG BETALING
Pris: NOK ${v(val, "price", "[beløp]")} (inkl. alle avgifter)
Betalingsform: ${v(val, "payment", "Bankoverføring")}
Overtagelse: ${v(val, "handover", "[dato]")}

§3 – TILSTAND OG GARANTI
Kjøretøyet overdras i den stand kjøper har besiktiget.
Eventuelle kjente feil er opplyst om.

§4 – EIERSKAP
Eierskap overføres til kjøper ved full betaling og levering.

_______________________    _______________________
Selger                     Kjøper`,
    seo: {
      metaTitle: "Bil-kjøpskontrakt mal — privatsalg | Kontraktly",
      metaDescription: "Trygg kjøpskontrakt for bil mellom privatpersoner. Inkluderer VIN, kilometerstand, tilstand og overdragelse. Last ned som PDF — 59 kr.",
      longDescription: "Når du selger eller kjøper bil privat, er en skriftlig kjøpskontrakt din beste beskyttelse mot uenigheter senere. Avtalen dokumenterer kjøretøyets tilstand på salgstidspunktet, kilometerstand, kjent historikk og avtalt pris — alt som kan bli gjenstand for diskusjon hvis bilen viser seg å ha skjulte feil. Malen er tilpasset privatsalg av personbil, varebil og motorsykkel mellom forbrukere, og dekker både bankoverføring, Vipps og kontantbetaling.",
      useCases: [
        "Du selger bilen din til en privatperson",
        "Du kjøper bruktbil utenfor en bilforhandler",
        "Du gjør bytte (innbytte) av kjøretøy mellom privatpersoner",
        "Du gir bort eller overdrar bil i familien og ønsker dokumentasjon",
      ],
      includes: [
        "Identifikasjon av selger og kjøper med kontaktdata",
        "Fullstendige kjøretøyopplysninger (merke, modell, årsmodell)",
        "Reg.nr, VIN-nummer og kilometerstand",
        "Tilstandsgrad og opplysning om kjente feil",
        "Kjøpesum inkludert avgifter",
        "Betalingsform (bankoverføring, Vipps, finansiering)",
        "Overtagelsesdato og overdragelse av eierskap",
        "Klausul om kjøp \"som den er\" (kjl. § 19)",
      ],
      legalBasis: "Privatsalg mellom forbrukere reguleres av kjøpsloven (ikke forbrukerkjøpsloven, som krever næringsdrivende selger). Sentrale bestemmelser er § 17 om mangler og § 19 om \"som den er\"-forbehold. Husk å oppdatere eierskap hos Statens vegvesen via Vegvesen.no innen 3 dager etter overdragelse.",
      faqs: [
        {
          q: "Hva betyr \"selges som den er\" i en bilkontrakt?",
          a: "Klausulen begrenser selgers ansvar for skjulte feil til de forhold selger faktisk har gitt uriktige opplysninger om, eller har holdt skjult. Etter kjøpsloven § 19 gjelder forbeholdet ikke hvis bilen er i vesentlig dårligere stand enn kjøper med rimelighet kunne forvente. Klausulen fritar altså ikke selger for grov uaktsomhet.",
        },
        {
          q: "Hvem registrerer eierskifte hos Vegvesenet?",
          a: "Begge parter signerer salgsmelding digitalt på Vegvesen.no med BankID. Salgsmeldingen må sendes innen 3 virkedager etter overdragelse, ellers risikerer selger å fortsatt stå som ansvarlig for trafikkforsikringsavgiften. Bilen kan ikke omregistreres før forsikring er tegnet på ny eier.",
        },
        {
          q: "Bør kjøper få med seg EU-kontroll og servicehefte?",
          a: "Ja. Krev å få overlevert servicehefte, siste EU-kontrollrapport og eventuelle reparasjonsregninger. Disse dokumenterer bilens historikk og styrker dine rettigheter dersom det dukker opp skjulte feil senere. Kontrakten viser til at vedlagte dokumenter er en del av avtalen.",
        },
      ],
    },
  },

  {
    id: "nda",
    icon: Shield,
    label: "Konfidensialitetsavtale",
    description: "NDA for å beskytte forretningshemmeligheter og sensitiv info.",
    price: 59,
    popular: false,
    color: "#b87e7e",
    features: ["Ensidig eller gjensidig NDA", "Definisjon av konfidensiell info", "Unntak og fritak", "Varighet og opphør", "Sanksjoner ved brudd", "Jurisdiksjon"],
    fieldGroups: [
      {
        title: "Avtaleparter",
        fields: [
          { key: "party_a", label: "Part A (navn / selskap)", placeholder: "Acme AS", type: "text" },
          { key: "party_a_role", label: "Part A — tittel / rolle", placeholder: "Daglig leder", type: "text" },
          { key: "party_b", label: "Part B (navn / selskap)", placeholder: "Startup AS", type: "text" },
          { key: "party_b_role", label: "Part B — tittel / rolle", placeholder: "CEO", type: "text" },
        ],
      },
      {
        title: "Avtalens innhold",
        fields: [
          { key: "nda_type", label: "Type NDA", type: "select", options: ["Ensidig (A → B)", "Gjensidig"] },
          { key: "purpose", label: "Formål med informasjonsdelingen", placeholder: "Vurdering av mulig samarbeid...", type: "textarea" },
          { key: "duration_years", label: "Varighet (år)", placeholder: "3", type: "number" },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `KONFIDENSIALITETSAVTALE (NDA)
Dato: ${today()}

AVTALEPARTER
Part A: ${v(val, "party_a", "[Part A]")} — ${v(val, "party_a_role", "[rolle]")}
Part B: ${v(val, "party_b", "[Part B]")} — ${v(val, "party_b_role", "[rolle]")}
Type: ${v(val, "nda_type", "Ensidig (A → B)")}

§1 – FORMÅL
${v(val, "purpose", "[Beskriv formålet med informasjonsdelingen]")}

§2 – KONFIDENSIELL INFORMASJON
Med "Konfidensiell informasjon" menes all ikke-offentlig
informasjon en part deler med den andre i forbindelse med
det angitte formålet.

§3 – FORPLIKTELSER
Mottaker skal:
(a) behandle informasjonen konfidensielt,
(b) ikke videreformidle til tredjepart uten skriftlig samtykke,
(c) kun bruke informasjonen til avtalens formål.

§4 – UNNTAK
Konfidensialitetsplikten gjelder ikke informasjon som:
• er offentlig tilgjengelig,
• var kjent av mottaker på forhånd,
• mottas lovlig fra tredjepart.

§5 – VARIGHET
Avtalen gjelder i ${v(val, "duration_years", "3")} år fra signeringsdato.

§6 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
Part A                     Part B`,
    seo: {
      metaTitle: "NDA mal norsk — konfidensialitetsavtale | Kontraktly",
      metaDescription: "Ensidig eller gjensidig NDA på norsk. Beskytt forretningshemmeligheter, ideer og sensitiv informasjon. Last ned som PDF — 59 kr.",
      longDescription: "En konfidensialitetsavtale (NDA — Non-Disclosure Agreement) er det første du bør signere før du deler en idé, finansielle tall, kundedata eller teknologi med en ekstern part. Uten en signert NDA har du svært begrensede juridiske virkemidler hvis informasjonen blir misbrukt eller delt videre. Vår NDA-mal kan brukes ensidig (kun én part deler informasjon) eller gjensidig (begge parter), og er bygget for norske forhold med klare definisjoner, unntak og verneting.",
      useCases: [
        "Du skal pitche en forretningsidé til investorer eller potensielle partnere",
        "Du gir en utvikler eller leverandør tilgang til kildekode eller kundedata",
        "Du forhandler oppkjøp, fusjon eller partnerskap",
        "Du deler konsept, design eller patentbar teknologi med en samarbeidspartner",
        "Du leier inn frilanser eller konsulent som får innsyn i interne forhold",
      ],
      includes: [
        "Identifikasjon av begge parter (selskap, personer, roller)",
        "Klar definisjon av hva som regnes som konfidensiell informasjon",
        "Spesifikt formål med informasjonsdelingen",
        "Forpliktelser for mottaker (oppbevaring, tilgang, kopier)",
        "Unntak (offentlig kjent informasjon, eget kjennskap, lovpålagt utlevering)",
        "Varighet — typisk 3–5 år etter avtalens utløp",
        "Sanksjoner ved brudd og krav om sletting",
        "Verneting og lovvalg",
      ],
      legalBasis: "NDA-er reguleres primært av avtaleloven og markedsføringsloven § 28 (forbud mot urettmessig utnyttelse av forretningshemmeligheter). For ansatte gjelder også arbeidsmiljøloven § 14 A om kunde- og forretningsinformasjon. Lov om forretningshemmeligheter (2020) gir ytterligere beskyttelse for hemmeligholdt informasjon med kommersiell verdi.",
      faqs: [
        {
          q: "Når bør jeg bruke ensidig NDA og når gjensidig?",
          a: "Bruk ensidig NDA når kun én part deler informasjon — typisk når en gründer pitcher idé til en utvikler eller investor. Bruk gjensidig NDA når begge parter deler sensitiv informasjon, for eksempel ved oppkjøpsforhandlinger eller strategiske partnerskap. Gjensidig oppleves ofte som mer balansert og er enklere å få signert.",
        },
        {
          q: "Hvor lenge bør en NDA gjelde?",
          a: "Typisk 3–5 år etter avtalens utløp. For svært tidskritisk informasjon (f.eks. patentprosess) kan kortere periode være tilstrekkelig. For varige forretningshemmeligheter (kundedatabaser, oppskrifter, kildekode) bør du vurdere lengre periode eller \"så lenge informasjonen ikke er offentlig kjent\".",
        },
        {
          q: "Er en NDA gyldig hvis den ikke er signert?",
          a: "I praksis nei. Selv om muntlige avtaler i utgangspunktet er bindende etter avtaleloven, er det nesten umulig å bevise innholdet i en muntlig NDA. Sørg alltid for skriftlig signering — fysisk eller via BankID/DocuSign — før du deler sensitiv informasjon.",
        },
      ],
    },
  },

  {
    id: "ansatt",
    icon: Users,
    label: "Arbeidskontrakt",
    description: "Fullstendig ansettelsesavtale i tråd med arbeidsmiljøloven.",
    price: 59,
    popular: false,
    color: "#7ea8b8",
    features: ["Stillingsbeskrivelse og tittel", "Lønn, bonus og feriepenger", "Arbeidstid og overtid", "Prøvetid og oppsigelse", "Taushetsplikt", "Konkurranseklausul"],
    fieldGroups: [
      {
        title: "Arbeidsgiver",
        fields: [
          { key: "employer_name", label: "Selskap", placeholder: "Bedrift AS", type: "text" },
          { key: "employer_orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "employer_address", label: "Adresse", placeholder: "Næringsveien 5, 0580 Oslo", type: "text" },
        ],
      },
      {
        title: "Ansatt",
        fields: [
          { key: "employee_name", label: "Navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "employee_address", label: "Adresse", placeholder: "Gata 1, 0182 Oslo", type: "text" },
          { key: "employee_dob", label: "Fødselsdato", placeholder: "01.01.1990", type: "text" },
        ],
      },
      {
        title: "Stilling og lønn",
        fields: [
          { key: "title", label: "Stillingstittel", placeholder: "Senior utvikler", type: "text" },
          { key: "department", label: "Avdeling", placeholder: "Teknologi", type: "text" },
          { key: "start_date", label: "Tiltredelsesdato", type: "date" },
          { key: "salary", label: "Årslønn (kr)", placeholder: "750 000", type: "number" },
          { key: "hours", label: "Ukentlig arbeidstid (timer)", placeholder: "37.5", type: "number" },
          { key: "probation_months", label: "Prøvetid (måneder)", placeholder: "6", type: "number" },
        ],
      },
      {
        title: "Tilleggsvilkår",
        fields: [
          { key: "notice_months", label: "Oppsigelsestid (måneder)", placeholder: "3", type: "number" },
          { key: "non_compete", label: "Konkurranseklausul", type: "select", options: ["Ingen", "6 måneder", "12 måneder", "24 måneder"] },
        ],
      },
    ],
    buildPreview: (val) => `ARBEIDSAVTALE
Dato: ${today()}

ARBEIDSGIVER
${v(val, "employer_name", "[Selskap AS]")} — Org.nr: ${v(val, "employer_orgnr", "—")}
${v(val, "employer_address", "[Adresse]")}

ARBEIDSTAKER
${v(val, "employee_name", "[Navn]")}
${v(val, "employee_address", "[Adresse]")}
Fødselsdato: ${v(val, "employee_dob", "—")}

§1 – STILLING
Tittel: ${v(val, "title", "[Stillingstittel]")}
Avdeling: ${v(val, "department", "—")}
Tiltredelse: ${v(val, "start_date", "[dato]")}

§2 – LØNN OG ARBEIDSTID
Årslønn: NOK ${v(val, "salary", "[beløp]")}
Utbetaling: Siste virkedag i måneden
Arbeidstid: ${v(val, "hours", "37.5")} timer per uke

§3 – PRØVETID
Prøvetid: ${v(val, "probation_months", "6")} måneder
Oppsigelsestid i prøvetid: 14 dager

§4 – OPPSIGELSE
Gjensidig oppsigelsestid: ${v(val, "notice_months", "3")} måneder

§5 – TAUSHETSPLIKT
Arbeidstaker er underlagt taushetsplikt om bedriftens
konfidensielle forhold, også etter arbeidsforholdets opphør.

§6 – KONKURRANSEKLAUSUL
${v(val, "non_compete", "Ingen") === "Ingen"
  ? "Ingen konkurranseklausul."
  : `Arbeidstaker kan ikke ta ansettelse hos konkurrenter
i ${v(val, "non_compete", "—")} etter fratreden.`}

_______________________    _______________________
Arbeidsgiver               Arbeidstaker`,
    seo: {
      metaTitle: "Arbeidskontrakt mal — arbeidsmiljøloven | Kontraktly",
      metaDescription: "Komplett arbeidsavtale med stillingsbeskrivelse, lønn, prøvetid og oppsigelse. I tråd med arbeidsmiljøloven. Last ned som PDF — 59 kr.",
      longDescription: "Etter arbeidsmiljøloven § 14-5 har enhver arbeidstaker rett på en skriftlig arbeidskontrakt. Avtalen skal undertegnes så snart som mulig — innen én måned etter at arbeidsforholdet har vart i én måned. Vår mal dekker alle minimumskrav loven setter (§ 14-6), inkludert stillingstittel, tiltredelsesdato, lønn, arbeidstid, ferierettigheter, prøvetid og oppsigelsesvilkår, og er like brukbar for fast ansettelse, midlertidig stilling og deltidsansettelse.",
      useCases: [
        "Du ansetter din første medarbeider i et oppstartsselskap",
        "Du driver et lite firma og trenger standardisert arbeidskontrakt",
        "Du skal formalisere en eksisterende arbeidsavtale skriftlig",
        "Du ansetter senior med konkurranseklausul og lengre oppsigelsestid",
      ],
      includes: [
        "Identifikasjon av arbeidsgiver og arbeidstaker",
        "Stillingstittel, avdeling og tiltredelsesdato",
        "Årslønn og lønnsutbetalingsdato",
        "Ukentlig arbeidstid (heltid/deltid)",
        "Prøvetid med 14 dagers oppsigelse",
        "Gjensidig oppsigelsestid etter prøvetid",
        "Lovbestemte ferierettigheter (4 uker + 1 dag)",
        "Taushetspliktklausul også etter arbeidsforholdets opphør",
        "Konkurranseklausul med valgbar lengde (etter aml. § 14 A)",
      ],
      legalBasis: "Arbeidsmiljøloven (aml.) regulerer hele arbeidsforholdet. § 14-6 lister minstekravene til skriftlig avtale. § 15 dekker oppsigelse (saklig grunn kreves), § 14-9 om midlertidig ansettelse, og § 14 A om konkurranseklausuler (krever skriftlighet, lønn under karens og maks 12 måneder). Ferieloven gir 25 virkedager ferie per år (4 uker + 1 dag).",
      faqs: [
        {
          q: "Hvor lang prøvetid kan en arbeidskontrakt ha?",
          a: "Etter arbeidsmiljøloven § 15-6 kan prøvetid avtales for inntil 6 måneder. I prøvetiden er oppsigelsestiden 14 dager, og arbeidsgiver har lavere terskel for oppsigelse — men det må fortsatt foreligge saklig grunn knyttet til tilpasning, faglig dyktighet eller pålitelighet.",
        },
        {
          q: "Må arbeidskontrakten inneholde lønn i kroner?",
          a: "Ja, kontrakten må angi avtalt lønn ved arbeidsforholdets begynnelse, eventuelle tillegg og andre godtgjørelser, og når lønnen utbetales. Pensjonsordning og forsikringer kan refereres til via henvisning til separate dokumenter, men lønnsbeløp må være konkret.",
        },
        {
          q: "Kan jeg ha en konkurranseklausul i arbeidskontrakten?",
          a: "Ja, men det stiller strenge krav. Etter aml. § 14 A-1 må klausulen være skriftlig, kan maksimalt vare 12 måneder etter fratreden, og arbeidsgiver må betale full lønn under karensperioden. Klausulen gjelder kun hvis det er nødvendig for å beskytte arbeidsgivers særlige behov.",
        },
      ],
    },
  },

  {
    id: "konsulent",
    icon: Pen,
    label: "Konsulentavtale",
    description: "Rammeavtale mellom to selskaper for løpende konsulentbistand.",
    price: 59,
    popular: false,
    color: "#c9a85c",
    features: ["Tjenesteomfang og SOW", "Faktureringsrate og vilkår", "SLA og leveransekrav", "Endringshåndtering", "Immaterielle rettigheter", "Eksklusivitetsklausul"],
    fieldGroups: [
      {
        title: "Oppdragsgiver",
        fields: [
          { key: "client_name", label: "Selskap", placeholder: "Kunde AS", type: "text" },
          { key: "client_orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "client_contact", label: "Kontaktperson", placeholder: "Per Hansen", type: "text" },
        ],
      },
      {
        title: "Leverandør",
        fields: [
          { key: "vendor_name", label: "Konsulentselskap", placeholder: "Konsulent AS", type: "text" },
          { key: "vendor_orgnr", label: "Org.nr", placeholder: "987 654 321", type: "text" },
          { key: "vendor_contact", label: "Kontaktperson", placeholder: "Kari Nordmann", type: "text" },
        ],
      },
      {
        title: "Tjeneste og økonomi",
        fields: [
          { key: "service_desc", label: "Tjenestebeskrivelse", placeholder: "Strategisk rådgivning innen IT-arkitektur...", type: "textarea" },
          { key: "hourly_rate", label: "Timepris (kr, eks. mva)", placeholder: "2 200", type: "number" },
          { key: "billing_cycle", label: "Faktureringsfrekvens", type: "select", options: ["Månedlig", "Bi-månedlig", "Per leveranse"] },
          { key: "payment_days", label: "Betalingsfrist (dager)", placeholder: "30", type: "number" },
          { key: "start_date", label: "Startdato", type: "date" },
          { key: "notice_months", label: "Oppsigelsestid (måneder)", placeholder: "1", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `KONSULENTAVTALE
Dato: ${today()}

OPPDRAGSGIVER
${v(val, "client_name", "[Kunde AS]")} — Org.nr: ${v(val, "client_orgnr", "—")}
Kontakt: ${v(val, "client_contact", "—")}

LEVERANDØR
${v(val, "vendor_name", "[Konsulent AS]")} — Org.nr: ${v(val, "vendor_orgnr", "—")}
Kontakt: ${v(val, "vendor_contact", "—")}

§1 – TJENESTEBESKRIVELSE
${v(val, "service_desc", "[Beskriv tjenesten]")}

§2 – HONORAR OG FAKTURERING
Timepris: NOK ${v(val, "hourly_rate", "[beløp]")} eks. mva
Fakturering: ${v(val, "billing_cycle", "Månedlig")}
Betalingsfrist: ${v(val, "payment_days", "30")} dager

§3 – VARIGHET OG OPPSIGELSE
Avtalen trer i kraft ${v(val, "start_date", "[dato]")} og løper
inntil en av partene sier opp med ${v(val, "notice_months", "1")} måned(s) varsel.

§4 – IMMATERIELLE RETTIGHETER
Leveranser tilhører oppdragsgiver ved full betaling.
Leverandør beholder rett til gjenbruk av generiske metoder.

§5 – KONFIDENSIALITET
Begge parter behandler all informasjon konfidensielt
i avtalens løpetid og 2 år etter opphør.

_______________________    _______________________
Oppdragsgiver              Leverandør`,
    seo: {
      metaTitle: "Konsulentavtale mal — B2B rammeavtale | Kontraktly",
      metaDescription: "B2B-rammeavtale for konsulentbistand mellom to selskaper. Timepris, fakturering, IP og oppsigelse. Last ned som PDF — 59 kr.",
      longDescription: "En konsulentavtale brukes når et selskap engasjerer et annet selskap (eller selvstendig konsulent gjennom AS) til å levere rådgivning eller tjenester over tid. Avtalen er tyngre enn en freelance-kontrakt — den fungerer ofte som rammeavtale med løpende leveranser og månedlig fakturering. Vår mal er designet for B2B-forhold der både kunden og leverandøren er bedrifter, og dekker timepris, faktureringsrytme, immaterielle rettigheter og oppsigelsesvilkår.",
      useCases: [
        "Du driver konsulentselskap og inngår rammeavtale med ny kunde",
        "Du engasjerer ekstern rådgiver innen IT, økonomi eller strategi",
        "Du trenger formell SOW (Statement of Work) for løpende prosjekt",
        "Du skiller mellom rammeavtale og enkeltbestillinger i samme kundeforhold",
      ],
      includes: [
        "Identifikasjon av oppdragsgiver og leverandør (begge selskaper)",
        "Tjenestebeskrivelse på rammeavtalenivå",
        "Timepris (eks. mva) og faktureringsrytme",
        "Betalingsfrist og morarenter",
        "Bestemmelser om endringshåndtering og merarbeid",
        "Klausul om immaterielle rettigheter ved leveranse",
        "Konfidensialitet både under og etter avtaleforholdet",
        "Oppsigelsestid og opphør",
        "Mva-håndtering og eventuell MVA-ID-bekreftelse",
      ],
      legalBasis: "Konsulentavtaler reguleres av avtaleloven og kjøpsloven (ved leveranse av varer). For tjenesteleveranser uten varekjøpskarakter gjelder hovedsakelig avtalefrihet. Næringsdrivende har normalt mva-plikt over 50 000 kroner i omsetning. NS 8401 og NS 8402 brukes ofte som referanse for prosjekteringsoppdrag.",
      faqs: [
        {
          q: "Hva er forskjellen på konsulentavtale og freelance-kontrakt?",
          a: "Begge er oppdragsavtaler, men konsulentavtaler er typisk B2B mellom to selskaper og fungerer som rammeavtale for løpende bistand. Freelance-kontrakter er mer prosjektorienterte og brukes ofte mellom et selskap og en enkeltperson. Konsulentavtaler har vanligvis høyere timepris, lengre oppsigelsestid og mer formell endringshåndtering.",
        },
        {
          q: "Skal timeprisen oppgis med eller uten mva?",
          a: "I B2B-avtaler oppgis timeprisen normalt eks. mva, og mva legges til på fakturaen. Begge parter er typisk mva-registrerte og får fradrag, så det er ren passering. I avtaler med private kunder eller mva-fritatte virksomheter (helse, utdanning) bør prisen oppgis inkl. mva for å unngå misforståelser.",
        },
        {
          q: "Hvem eier resultatet av konsulentens arbeid?",
          a: "Etter standard formulering i malen overføres alle leveranser (rapporter, kode, design) til oppdragsgiver ved full betaling. Leverandøren beholder rett til gjenbruk av generiske metoder, rammeverk og kompetanse — det er normalt nødvendig for å kunne levere tjenester til andre kunder.",
        },
      ],
    },
  },

  {
    id: "samboer",
    icon: Heart,
    label: "Samboerkontrakt",
    description: "Regulerer eierforhold, økonomi og rettigheter mellom samboere.",
    price: 59,
    popular: false,
    color: "#b87e9e",
    features: ["Eierforhold til bolig og eiendeler", "Deling av fellesutgifter", "Særeie og felleskonto", "Oppgjør ved samlivsbrudd", "Arv og forsikring", "Varslingsplikt"],
    fieldGroups: [
      {
        title: "Samboer 1",
        fields: [
          { key: "p1_name", label: "Fullt navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "p1_dob", label: "Fødselsdato", placeholder: "01.01.1990", type: "text" },
          { key: "p1_address", label: "Nåværende adresse", placeholder: "Storgata 1, 0182 Oslo", type: "text" },
        ],
      },
      {
        title: "Samboer 2",
        fields: [
          { key: "p2_name", label: "Fullt navn", placeholder: "Ola Nordmann", type: "text" },
          { key: "p2_dob", label: "Fødselsdato", placeholder: "15.06.1988", type: "text" },
          { key: "p2_address", label: "Nåværende adresse", placeholder: "Storgata 1, 0182 Oslo", type: "text" },
        ],
      },
      {
        title: "Felles bolig",
        fields: [
          { key: "property_address", label: "Boligens adresse", placeholder: "Hjemveien 5, 0580 Oslo", type: "text" },
          { key: "ownership", label: "Eierfordeling", type: "select", options: ["50/50", "60/40", "70/30", "Kun én part eier"] },
          { key: "p1_share_pct", label: "Samboer 1 sin andel (%)", placeholder: "50", type: "number" },
          { key: "move_in_date", label: "Innflyttingsdato", type: "date" },
        ],
      },
      {
        title: "Økonomi og vilkår",
        fields: [
          { key: "expenses_split", label: "Deling av fellesutgifter", type: "select", options: ["Likt (50/50)", "Forholdsmessig etter inntekt", "Etter avtale"] },
          { key: "joint_account", label: "Felleskonto", type: "select", options: ["Ja", "Nei"] },
          { key: "separation_notice", label: "Varsel ved brudd (måneder)", placeholder: "1", type: "number" },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `SAMBOERKONTRAKT
Dato: ${today()}

PARTER
Samboer 1: ${v(val, "p1_name", "[Samboer 1]")}
Fødselsdato: ${v(val, "p1_dob", "—")}
Adresse: ${v(val, "p1_address", "[Adresse]")}

Samboer 2: ${v(val, "p2_name", "[Samboer 2]")}
Fødselsdato: ${v(val, "p2_dob", "—")}
Adresse: ${v(val, "p2_address", "[Adresse]")}

§1 – FELLES BOLIG
Adresse: ${v(val, "property_address", "[Boligens adresse]")}
Eierfordeling: ${v(val, "ownership", "50/50")}
${v(val, "p1_name", "Samboer 1")} eier ${v(val, "p1_share_pct", "50")} %.
Innflyttingsdato: ${v(val, "move_in_date", "[dato]")}

§2 – FELLESUTGIFTER
Deling av løpende utgifter: ${v(val, "expenses_split", "Likt (50/50)")}
Felleskonto: ${v(val, "joint_account", "Nei")}

§3 – SÆREIE
Eiendeler ervervet før samboerskapet forblir den enkeltes
særeie. Gaver og arv er likeledes særeie med mindre
partene skriftlig avtaler noe annet.

§4 – OPPGJØR VED BRUDD
Ved samlivsbrudd varsles den andre part skriftlig med
${v(val, "separation_notice", "1")} måneds frist. Felles eiendeler
fordeles etter eierandel. Særeie beholdes av eier.

§5 – ARV OG FORSIKRING
Partene oppfordres til å oppdatere testament og
begunstigede i forsikringsavtaler etter innflytting.

§6 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
${v(val, "p1_name", "Samboer 1")}          ${v(val, "p2_name", "Samboer 2")}`,
    seo: {
      metaTitle: "Samboerkontrakt mal — eierforhold og oppgjør | Kontraktly",
      metaDescription: "Samboerkontrakt som regulerer bolig, økonomi og oppgjør ved samlivsbrudd. Beskytt rettighetene dine. Last ned som PDF — 59 kr.",
      longDescription: "I motsetning til ektefeller har samboere ingen automatisk lov om felles eiendom — alt eies hver for seg, og ved samlivsbrudd skal hver part i utgangspunktet kun ta med det de selv har bidratt til. Uten en samboerkontrakt risikerer dere konflikt om bolig, innbo og felles innkjøp hvis dere går fra hverandre. Vår mal regulerer eierforhold til boligen, deling av fellesutgifter, særeie og hvordan oppgjøret skjer ved et eventuelt brudd — og er bygget for både unge par som flytter sammen og par som har bodd sammen lenge.",
      useCases: [
        "Dere flytter sammen for første gang og kjøper bolig sammen",
        "Den ene parten eier boligen og den andre flytter inn",
        "Dere vil avklare bidrag og eierandeler før felles oppussing",
        "Dere har levd sammen lenge og vil formalisere økonomien",
      ],
      includes: [
        "Identifikasjon av begge samboere",
        "Felles boligs adresse og eierfordeling i prosent",
        "Beskrivelse av hvem som har bidratt med egenkapital",
        "Regler for deling av løpende utgifter (likt eller etter inntekt)",
        "Felleskonto (ja/nei) og hvordan denne forvaltes",
        "Klare regler for særeie (ting eid før forholdet, gaver, arv)",
        "Oppgjørsprosedyre ved samlivsbrudd",
        "Oppfordring om testament og forsikringsbegunstigede",
        "Verneting ved tvist",
      ],
      legalBasis: "Samboere har ingen samlet samboerlov i Norge. Sentrale rettsregler er husstandsfellesskapsloven (regulerer felles bolig og innbo ved brudd etter minst 2 års samboerskap eller felles barn), arveloven (samboere med felles barn eller minst 5 års samboerskap har begrenset arverett), og folketrygdloven. En skriftlig samboeravtale fyller hullet sivilrettslig.",
      faqs: [
        {
          q: "Hva skjer med boligen ved samlivsbrudd uten samboerkontrakt?",
          a: "Hver part beholder det de eier. Hvis bare én står som eier på skjøtet, beholder vedkommende boligen — selv om den andre har bidratt med innskudd eller månedlige avdrag. Dette er den vanligste kilden til konflikt mellom samboere. En samboerkontrakt dokumenterer faktiske eierandeler uavhengig av hvem som står på skjøtet.",
        },
        {
          q: "Arver samboeren min meg automatisk hvis jeg dør?",
          a: "Nei. Samboere uten felles barn arver ingenting fra hverandre etter loven. Samboere med felles barn arver inntil 4G (folketrygdens grunnbeløp). For å sikre samboeren bør du opprette testament og oppdatere begunstigede i livsforsikring og pensjonsavtaler.",
        },
        {
          q: "Trenger vi samboerkontrakt selv om vi har felles barn?",
          a: "Ja, gjerne enda mer. Felles barn gir begrenset arverett, men ingen automatiske rettigheter til bolig, innbo eller felles oppsparte midler ved brudd. En samboerkontrakt er spesielt viktig hvis det er økonomisk skjevhet mellom dere — for eksempel hvis én tjener vesentlig mer eller har egen formue.",
        },
      ],
    },
  },

  {
    id: "laan",
    icon: Banknote,
    label: "Låneavtale",
    description: "Privat låneavtale mellom venner, familie eller bekjente.",
    price: 59,
    popular: false,
    color: "#7eb87e",
    features: ["Lånebeløp og valuta", "Rente og gebyrer", "Tilbakebetalingsplan", "Mislighold og konsekvenser", "Sikkerhetsstillelse", "Verneting"],
    fieldGroups: [
      {
        title: "Långiver",
        fields: [
          { key: "lender_name", label: "Navn", placeholder: "Per Hansen", type: "text" },
          { key: "lender_address", label: "Adresse", placeholder: "Gata 1, 0182 Oslo", type: "text" },
          { key: "lender_phone", label: "Telefon", placeholder: "400 00 000", type: "text" },
        ],
      },
      {
        title: "Låntaker",
        fields: [
          { key: "borrower_name", label: "Navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "borrower_address", label: "Adresse", placeholder: "Veien 2, 5020 Bergen", type: "text" },
          { key: "borrower_phone", label: "Telefon", placeholder: "400 11 111", type: "text" },
        ],
      },
      {
        title: "Lånebetingelser",
        fields: [
          { key: "amount", label: "Lånebeløp (kr)", placeholder: "50 000", type: "number" },
          { key: "interest", label: "Årlig rente (%)", placeholder: "0", type: "number" },
          { key: "loan_date", label: "Utbetalingsdato", type: "date" },
          { key: "due_date", label: "Forfallsdato", type: "date" },
          { key: "repayment", label: "Tilbakebetaling", type: "select", options: ["Engangsbeløp ved forfall", "Månedlige avdrag", "Etter avtale"] },
          { key: "security", label: "Sikkerhetsstillelse", placeholder: "Ingen / Pant i bil osv.", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `LÅNEAVTALE
Dato: ${today()}

LÅNGIVER
Navn: ${v(val, "lender_name", "[Långiver]")}
Adresse: ${v(val, "lender_address", "—")}
Tlf: ${v(val, "lender_phone", "—")}

LÅNTAKER
Navn: ${v(val, "borrower_name", "[Låntaker]")}
Adresse: ${v(val, "borrower_address", "—")}
Tlf: ${v(val, "borrower_phone", "—")}

§1 – LÅNEBELØP
Lånebeløp: NOK ${v(val, "amount", "[beløp]")}
Utbetalt: ${v(val, "loan_date", "[dato]")}

§2 – RENTE
Årlig rente: ${v(val, "interest", "0")} %
Renter beregnes på utestående saldo.

§3 – TILBAKEBETALING
Forfallsdato: ${v(val, "due_date", "[dato]")}
Betalingsform: ${v(val, "repayment", "Engangsbeløp ved forfall")}

§4 – SIKKERHET
${v(val, "security", "Ingen sikkerhetsstillelse.")}

§5 – MISLIGHOLD
Ved mislighold kan långiver kreve hele lånet
tilbakebetalt umiddelbart med skriftlig varsel.

_______________________    _______________________
Långiver                   Låntaker`,
    seo: {
      metaTitle: "Låneavtale mal — privatlån mellom personer | Kontraktly",
      metaDescription: "Låneavtale mellom venner, familie eller bekjente. Inkluderer rente, forfallsdato og sikkerhet. Last ned som PDF — 59 kr.",
      longDescription: "Privatlån mellom familiemedlemmer eller venner ender ofte i konflikt fordi forventningene aldri ble skrevet ned. En enkel låneavtale fjerner uklarheter om beløp, renter, forfallsdato og hva som skjer ved mislighold — og dokumenterer overføringen for skattemessige formål. Vår låneavtale-mal er bygget for vanlige privatlån fra noen tusen til flere hundre tusen kroner, med eller uten rente, og med valgfri sikkerhetsstillelse.",
      useCases: [
        "Du låner ut penger til bror, søster eller voksne barn",
        "Du gir et venneslån til oppstart av virksomhet",
        "Du kjøper bolig sammen med foreldre som låner ut egenkapital",
        "Du formaliserer et eldre, udokumentert privatlån",
      ],
      includes: [
        "Identifikasjon av långiver og låntaker",
        "Lånebeløp og valuta (NOK)",
        "Utbetalingsdato og -form (bankoverføring, Vipps)",
        "Rentesats (kan være 0 %)",
        "Forfallsdato og tilbakebetalingsplan",
        "Valgfri sikkerhetsstillelse (pant i bil, eiendom mv.)",
        "Mislighold og adgang til å kreve hele lånet umiddelbart",
        "Verneting ved tvist",
      ],
      legalBasis: "Privatlån reguleres av finansavtaleloven (§ 1-2 om virkeområde) og avtaleloven. Forbrukerlån fra långivere som ikke er finansforetak er som hovedregel utenfor finansavtalelovens virkeområde, men norske skattemyndigheter krever at lån over 100 000 kroner mellom nærstående har markedsmessig rente — ellers kan rentefordelen anses som gave eller arv.",
      faqs: [
        {
          q: "Må jeg ta rente på lån til familie?",
          a: "Ikke etter avtaleloven, men skatteetaten kan anse rentefri eller lavt forrentet lån over 100 000 kroner som en gave eller skattepliktig fordel. Hovedregelen er å bruke en sats minst lik normrenten (publiseres av Skatteetaten årlig). Renteinntekter er skattepliktige for långiver — også på privatlån.",
        },
        {
          q: "Hva skjer hvis låntaker ikke betaler tilbake?",
          a: "Med skriftlig låneavtale har du et solid bevis i forliksrådet eller tingretten. Du kan kreve hele lånet tilbake umiddelbart ved mislighold, og kreve forsinkelsesrenter etter forsinkelsesrenteloven. Uten avtale må du bevise at lånet faktisk var et lån og ikke en gave — det er svært vanskelig.",
        },
        {
          q: "Skal låneavtalen tinglyses?",
          a: "Vanlige privatlån trenger ikke tinglyses. Hvis det stilles pant i fast eiendom som sikkerhet, må pantet tinglyses i grunnboken hos Kartverket for å få rettsvern. Pant i kjøretøy registreres i Løsøreregisteret hos Brønnøysund.",
        },
      ],
    },
  },

  {
    id: "aksjonaer",
    icon: BarChart2,
    label: "Aksjonæravtale",
    description: "Regulerer rettigheter og plikter mellom aksjonærer i et AS.",
    price: 59,
    popular: false,
    color: "#7e9eb8",
    features: ["Stemmerett og beslutningsprosess", "Forkjøpsrett og medsalgsrett", "Utbyttefordeling", "Lock-up periode", "Konfidensialitet", "Mislighold og sanksjoner"],
    fieldGroups: [
      {
        title: "Selskapet",
        fields: [
          { key: "company_name", label: "Selskapsnavn", placeholder: "Startup AS", type: "text" },
          { key: "orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "company_address", label: "Forretningsadresse", placeholder: "Gründerveien 1, 0349 Oslo", type: "text" },
        ],
      },
      {
        title: "Aksjonærer",
        fields: [
          { key: "sh1_name", label: "Aksjonær 1 — navn", placeholder: "Kari Nordmann", type: "text" },
          { key: "sh1_pct", label: "Aksjonær 1 — eierandel (%)", placeholder: "60", type: "number" },
          { key: "sh2_name", label: "Aksjonær 2 — navn", placeholder: "Ola Hansen", type: "text" },
          { key: "sh2_pct", label: "Aksjonær 2 — eierandel (%)", placeholder: "40", type: "number" },
        ],
      },
      {
        title: "Rettigheter og begrensninger",
        fields: [
          { key: "lockup_months", label: "Lock-up periode (måneder)", placeholder: "12", type: "number" },
          { key: "drag_along", label: "Drag-along rett", type: "select", options: ["Ja", "Nei"] },
          { key: "tag_along", label: "Tag-along rett", type: "select", options: ["Ja", "Nei"] },
          { key: "preemption", label: "Forkjøpsrett", type: "select", options: ["Ja", "Nei"] },
          { key: "dividend_policy", label: "Utbyttepolitikk", type: "select", options: ["Etter eierandel", "Styrets skjønn", "Ingen utbytte de første 3 år"] },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `AKSJONÆRAVTALE
Dato: ${today()}

SELSKAP
${v(val, "company_name", "[Selskap AS]")} — Org.nr: ${v(val, "orgnr", "—")}
${v(val, "company_address", "[Adresse]")}

AKSJONÆRER
${v(val, "sh1_name", "[Aksjonær 1]")} — ${v(val, "sh1_pct", "?")} %
${v(val, "sh2_name", "[Aksjonær 2]")} — ${v(val, "sh2_pct", "?")} %

§1 – FORMÅL
Avtalen regulerer aksjonærenes rettigheter og plikter
knyttet til eierskap i selskapet.

§2 – STEMMERETT
Aksjonærene utøver stemmerett i samsvar med eierandel.
Beslutninger som krever kvalifisert flertall: minst 2/3.

§3 – FORKJØPSRETT
Forkjøpsrett: ${v(val, "preemption", "Ja")}
Ved salg av aksjer skal øvrige aksjonærer tilbys aksjene
på samme vilkår før ekstern kjøper kontaktes.

§4 – MEDSALGSRETTIGHETER
Drag-along: ${v(val, "drag_along", "Ja")}
Tag-along: ${v(val, "tag_along", "Ja")}

§5 – LOCK-UP
Aksjonærene kan ikke selge aksjer de første
${v(val, "lockup_months", "12")} månedene uten skriftlig samtykke.

§6 – UTBYTTE
Utbyttepolitikk: ${v(val, "dividend_policy", "Etter eierandel")}

§7 – KONFIDENSIALITET
Partene behandler all informasjon om selskapet
konfidensielt i avtalens løpetid og 3 år etter opphør.

§8 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
${v(val, "sh1_name", "Aksjonær 1")}         ${v(val, "sh2_name", "Aksjonær 2")}`,
    seo: {
      metaTitle: "Aksjonæravtale mal — AS med flere eiere | Kontraktly",
      metaDescription: "Aksjonæravtale med forkjøpsrett, drag-along, tag-along og utbyttepolitikk. For oppstartsselskap og medeierskap. Last ned som PDF — 59 kr.",
      longDescription: "En aksjonæravtale supplerer aksjeloven og selskapets vedtekter, og regulerer det som loven ikke svarer på: hva skjer hvis en gründer vil ut, hvordan selges aksjer, kan flertallet tvinge minoriteten til å selge, hvor mye utbytte deles ut. Uten en aksjonæravtale får du fastlåste situasjoner der minoritetsaksjonærer kan blokkere salg eller emisjoner. Vår mal dekker de viktigste klausulene for et norsk aksjeselskap med to eller flere eiere — særlig nyttig for oppstartsselskap, familieselskap og medgründer-konstellasjoner.",
      useCases: [
        "Du starter et selskap sammen med medgründere",
        "Du skal ta inn ny medeier eller investor i eksisterende AS",
        "Dere er familie som eier selskap sammen",
        "Du ønsker å sikre forkjøpsrett før noen kan selge til utenforstående",
      ],
      includes: [
        "Identifikasjon av selskapet og alle aksjonærer",
        "Eierfordeling i prosent",
        "Stemmerett og krav til kvalifisert flertall",
        "Forkjøpsrett ved salg av aksjer",
        "Tag-along (medsalgsrett for minoritet)",
        "Drag-along (medsalgsplikt for minoritet)",
        "Lock-up periode med begrensninger på salg",
        "Utbyttepolitikk (etter eierandel, styrets skjønn, eller karens)",
        "Konfidensialitet og lojalitetsplikt",
        "Verneting og tvisteløsning",
      ],
      legalBasis: "Aksjonæravtaler står sammen med, men i tillegg til, aksjeloven (asl.) og selskapets vedtekter. Aksjeloven § 4-15 om omsetningsbegrensninger og § 4-19 om forkjøpsrett gir lovfestet ramme. Avtalen er bindende mellom aksjonærene som personlig forpliktelse, men er normalt ikke bindende for selskapet selv. Brudd på aksjonæravtale gir erstatningskrav, ikke automatisk ugyldig aksjeoverføring.",
      faqs: [
        {
          q: "Hva er forskjellen på aksjonæravtale og vedtekter?",
          a: "Vedtekter er offentlige og registreres i Foretaksregisteret — de regulerer selskapets organisasjon (formål, kapital, styresammensetning). Aksjonæravtalen er privat mellom aksjonærene og regulerer hvordan de forholder seg til hverandre (forkjøpsrett, lock-up, utbyttepolitikk). Bestemmelser om aksjeoverdragelse kan stå i begge, men vedtektene har sterkere bindende virkning overfor tredjepart.",
        },
        {
          q: "Hva er drag-along og tag-along?",
          a: "Tag-along (medsalgsrett) gir minoritetsaksjonærer rett til å bli med ved salg på samme vilkår som flertallet — beskytter mot å bli sittende igjen med ny ukjent eier. Drag-along (medsalgsplikt) gir flertallet rett til å tvinge minoriteten med på et salg av hele selskapet — viktig ved oppkjøp der kjøper vil ha 100 % av aksjene.",
        },
        {
          q: "Trenger vi aksjonæravtale når vi bare er to gründere?",
          a: "Ja — særlig da. To likeverdige eiere med 50/50-fordeling kan blokkere alle beslutninger som krever flertall, og det kan låse selskapet hvis dere er uenige. En aksjonæravtale med klare regler for tie-breaker, exit-mekanisme og buyout-prosedyre forhindrer dødvanne-situasjoner som ellers kan tvinge selskapet til oppløsning.",
        },
      ],
    },
  },

  {
    id: "distribusjon",
    icon: Truck,
    label: "Distribusjonsavtale",
    description: "Avtale mellom produsent og distributør for salg av varer.",
    price: 59,
    popular: false,
    color: "#b8a07e",
    features: ["Eksklusivt eller ikke-eksklusivt territorium", "Minstekjøpsvolum", "Priser og marginer", "Markedsføringsplikter", "Varemerkebruk", "Oppsigelse og overgangsperiode"],
    fieldGroups: [
      {
        title: "Leverandør / Produsent",
        fields: [
          { key: "supplier_name", label: "Selskapsnavn", placeholder: "Produsent AS", type: "text" },
          { key: "supplier_orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "supplier_contact", label: "Kontaktperson", placeholder: "Kari Nordmann", type: "text" },
        ],
      },
      {
        title: "Distributør",
        fields: [
          { key: "dist_name", label: "Selskapsnavn", placeholder: "Distribusjon AS", type: "text" },
          { key: "dist_orgnr", label: "Org.nr", placeholder: "987 654 321", type: "text" },
          { key: "dist_contact", label: "Kontaktperson", placeholder: "Ola Hansen", type: "text" },
        ],
      },
      {
        title: "Avtalevilkår",
        fields: [
          { key: "products", label: "Produkter / varekategori", placeholder: "Sportsernæring — alle SKU-er", type: "textarea" },
          { key: "territory", label: "Territorium", placeholder: "Norge og Sverige", type: "text" },
          { key: "exclusivity", label: "Eksklusivitet", type: "select", options: ["Eksklusiv", "Ikke-eksklusiv"] },
          { key: "min_volume", label: "Minstekjøp per år (kr)", placeholder: "500 000", type: "number" },
          { key: "start_date", label: "Startdato", type: "date" },
          { key: "duration_years", label: "Varighet (år)", placeholder: "2", type: "number" },
          { key: "notice_months", label: "Oppsigelsestid (måneder)", placeholder: "3", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `DISTRIBUSJONSAVTALE
Dato: ${today()}

LEVERANDØR
${v(val, "supplier_name", "[Leverandør AS]")} — Org.nr: ${v(val, "supplier_orgnr", "—")}
Kontakt: ${v(val, "supplier_contact", "—")}

DISTRIBUTØR
${v(val, "dist_name", "[Distributør AS]")} — Org.nr: ${v(val, "dist_orgnr", "—")}
Kontakt: ${v(val, "dist_contact", "—")}

§1 – PRODUKTER
${v(val, "products", "[Beskriv produkter/varekategori]")}

§2 – TERRITORIUM OG EKSKLUSIVITET
Territorium: ${v(val, "territory", "[Territorium]")}
Eksklusivitet: ${v(val, "exclusivity", "Ikke-eksklusiv")}

§3 – MINSTEKJØPSVOLUM
Distributør forplikter seg til å kjøpe for minimum
NOK ${v(val, "min_volume", "[beløp]")} per kalenderår.

§4 – VARIGHET OG OPPSIGELSE
Avtalen gjelder fra ${v(val, "start_date", "[dato]")} i
${v(val, "duration_years", "2")} år, og fornyes automatisk
med mindre den sies opp med ${v(val, "notice_months", "3")} måneders varsel.

§5 – VAREMERKE OG MARKEDSFØRING
Distributør kan bruke leverandørens varemerke
utelukkende til markedsføring av de avtalte produktene.

§6 – KONFIDENSIALITET
Begge parter behandler priser og vilkår konfidensielt.

_______________________    _______________________
Leverandør                 Distributør`,
    seo: {
      metaTitle: "Distribusjonsavtale mal — produsent og forhandler | Kontraktly",
      metaDescription: "Distribusjonsavtale med territorium, eksklusivitet, minstekjøp og varemerkebruk. For norske og nordiske distributører. Last ned som PDF — 59 kr.",
      longDescription: "En distribusjonsavtale regulerer forholdet mellom en produsent eller importør og en uavhengig forhandler som videreselger varene i et avtalt marked. Avtalen er sentral for både norske produsenter som vil ut i Norden og utenlandske leverandører som søker norske distributører. Vår mal dekker eksklusivitet, territorium, minstekjøpsforpliktelser, prisstrukturer og varemerkebruk — pluss bestemmelser om hvordan partene avvikler samarbeidet hvis det ikke fungerer.",
      useCases: [
        "Du er norsk produsent som engasjerer distributør i Sverige eller Danmark",
        "Du er importør som tar inn et utenlandsk merke til Norge",
        "Du driver butikkjede og inngår eksklusivavtale på et merke",
        "Du formaliserer et eksisterende leverandør–forhandler-forhold",
      ],
      includes: [
        "Identifikasjon av leverandør og distributør",
        "Avgrensing av produkter eller varekategori",
        "Territorium (land, region eller kanal)",
        "Eksklusiv eller ikke-eksklusiv distribusjon",
        "Minstekjøpsvolum per kalenderår",
        "Prisstruktur og marginer",
        "Bruk av leverandørens varemerke",
        "Markedsførings- og rapporteringsplikter",
        "Avtalens varighet og oppsigelsestid",
        "Konfidensialitet om priser og vilkår",
      ],
      legalBasis: "Distribusjonsavtaler reguleres av avtaleloven og kjøpsloven, samt konkurranseloven (forbud mot vertikale konkurransebegrensninger over visse markedsandeler). For agentforhold kan agentloven få anvendelse hvis distributøren er nær en agent. EU/EØS gruppefritak for vertikale avtaler (forordning 2022/720) gir trygg havn ved markedsandeler under 30 %.",
      faqs: [
        {
          q: "Hva er forskjellen på distributør og agent?",
          a: "En distributør kjøper varene selv og videreselger med fortjeneste — bærer egen lager- og kredittrisiko. En agent formidler salg på leverandørens vegne uten å kjøpe varene, og får provisjon. Distributørens forhold er forretningsmessig friere; agentens er strengere lovregulert (agentloven gir bl.a. krav på etterprovisjon ved opphør).",
        },
        {
          q: "Kan jeg gi distributør eksklusivitet på hele Norge?",
          a: "Ja, men med konkurranserettslige begrensninger. Eksklusiv distribusjon er som hovedregel lovlig under 30 % markedsandel i det relevante markedet (EU/EØS gruppefritak). Over denne grensen må eksklusiviteten vurderes konkret. Forbud mot passivt salg på tvers av territorier (kunder som kontakter distributøren utenfra) er problematisk.",
        },
        {
          q: "Hva skjer hvis distributøren ikke når minstekjøpsvolumet?",
          a: "Manglende oppfyllelse er typisk vesentlig mislighold som gir leverandør rett til å si opp avtalen — eller å konvertere den fra eksklusiv til ikke-eksklusiv. Malen inneholder klausul om dette, men det er klokt å gi en \"cure period\" på 30–90 dager der distributøren får mulighet til å rette opp før oppsigelse.",
        },
      ],
    },
  },

  {
    id: "agent",
    icon: UserCheck,
    label: "Agentavtale",
    description: "Avtale mellom selskap og salgsagent for representasjon og salg.",
    price: 59,
    popular: false,
    color: "#9eb87e",
    features: ["Provisjon og bonusstruktur", "Territorium og eksklusivitet", "Rapporteringsplikt", "Utgiftsdekning", "Konkurranseforbud", "Oppsigelse og etterprovisjon"],
    fieldGroups: [
      {
        title: "Oppdragsgiver",
        fields: [
          { key: "principal_name", label: "Selskapsnavn", placeholder: "Selskap AS", type: "text" },
          { key: "principal_orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "principal_contact", label: "Kontaktperson", placeholder: "Kari Nordmann", type: "text" },
        ],
      },
      {
        title: "Agent",
        fields: [
          { key: "agent_name", label: "Navn / selskap", placeholder: "Agent AS / Ola Hansen", type: "text" },
          { key: "agent_orgnr", label: "Org.nr (valgfritt)", placeholder: "987 654 321", type: "text" },
          { key: "agent_email", label: "E-post", placeholder: "agent@example.com", type: "text" },
        ],
      },
      {
        title: "Betingelser",
        fields: [
          { key: "products", label: "Produkter / tjenester", placeholder: "B2B SaaS-løsninger", type: "textarea" },
          { key: "territory", label: "Territorium", placeholder: "Norge", type: "text" },
          { key: "exclusivity", label: "Eksklusivitet", type: "select", options: ["Eksklusiv", "Ikke-eksklusiv"] },
          { key: "commission_pct", label: "Provisjon (%)", placeholder: "10", type: "number" },
          { key: "payment_terms", label: "Provisjon utbetales", type: "select", options: ["Månedlig", "Kvartalsvis", "Ved betaling fra kunde"] },
          { key: "start_date", label: "Startdato", type: "date" },
          { key: "notice_months", label: "Oppsigelsestid (måneder)", placeholder: "3", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `AGENTAVTALE
Dato: ${today()}

OPPDRAGSGIVER
${v(val, "principal_name", "[Selskap AS]")} — Org.nr: ${v(val, "principal_orgnr", "—")}
Kontakt: ${v(val, "principal_contact", "—")}

AGENT
${v(val, "agent_name", "[Agent]")} — Org.nr: ${v(val, "agent_orgnr", "—")}
E-post: ${v(val, "agent_email", "—")}

§1 – OPPDRAGET
Agent representerer oppdragsgiver og arbeider for salg av:
${v(val, "products", "[Produkter/tjenester]")}
Territorium: ${v(val, "territory", "[Territorium]")}
Eksklusivitet: ${v(val, "exclusivity", "Ikke-eksklusiv")}

§2 – PROVISJON
Provisjonssats: ${v(val, "commission_pct", "10")} % av fakturert salg ekskl. mva.
Utbetaling: ${v(val, "payment_terms", "Månedlig")}

§3 – AGENTENS FORPLIKTELSER
Agent skal aktivt fremme salg, rapportere månedlig
og holde oppdragsgiver informert om markedsforhold.

§4 – UTGIFTER
Reise og andre salgskostnader dekkes av agent
med mindre annet er skriftlig avtalt.

§5 – VARIGHET OG OPPSIGELSE
Avtalen trer i kraft ${v(val, "start_date", "[dato]")} og løper inntil
oppsigelse med ${v(val, "notice_months", "3")} måneders skriftlig varsel.

§6 – ETTERPROVISJON
Agent har krav på provisjon for kontrakter inngått
innen 6 måneder etter avtalens opphør, dersom disse
stammer fra agentens innsats i avtaleperioden.

_______________________    _______________________
Oppdragsgiver              Agent`,
    seo: {
      metaTitle: "Agentavtale mal — salgsagent og handelsagent | Kontraktly",
      metaDescription: "Salgsagentavtale med provisjon, territorium og etterprovisjon. Tilpasset agentloven. Last ned som PDF — 59 kr.",
      longDescription: "En salgsagent jobber på provisjon på vegne av en oppdragsgiver, men er ikke ansatt — agenten er selvstendig næringsdrivende eller eget selskap. Agentavtalen er strengere lovregulert enn de fleste andre kommersielle avtaler, fordi handelsagenter har omfattende beskyttelse etter agentloven. Vår mal dekker provisjon, territorium, eksklusivitet, rapporteringsplikter og etterprovisjon ved opphør — alt tilpasset norsk agentlov.",
      useCases: [
        "Du engasjerer salgsagent for å selge dine produkter i et nytt marked",
        "Du er selvstendig handelsagent og trenger formell avtale med oppdragsgiver",
        "Du har et selskap med flere agenter du vil standardisere kontrakter for",
        "Du formaliserer en muntlig agentavtale som har vart en stund",
      ],
      includes: [
        "Identifikasjon av oppdragsgiver og agent",
        "Beskrivelse av produkter eller tjenester agenten skal selge",
        "Territorium og kundegruppe",
        "Eksklusiv eller ikke-eksklusiv representasjon",
        "Provisjonssats og beregningsgrunnlag",
        "Tidspunkt for utbetaling av provisjon",
        "Agentens rapporterings- og lojalitetsplikt",
        "Utgiftsdekning og reise",
        "Konkurranseforbud i avtalens løpetid",
        "Etterprovisjon ved opphør (lovbestemt minstekrav)",
      ],
      legalBasis: "Handelsagenter er beskyttet av agentloven (1992). Sentrale bestemmelser inkluderer § 7 om provisjonsplikt for ordrer i territoriet, § 28 om etterprovisjon (rett til provisjon for ordrer innkommet etter avtalens opphør), og § 34 om avgangsvederlag (kompensasjon ved opphør basert på opparbeidet kundeverdi — kan ikke fraskrives). Agentloven gjelder kun ved varesalg, ikke tjenestesalg.",
      faqs: [
        {
          q: "Hva er avgangsvederlag i agentforhold?",
          a: "Avgangsvederlag (\"goodwill\"-kompensasjon) etter agentloven § 34 er en lovbestemt rett agenten har ved avtalens opphør, hvis han har bygget opp ny kundekrets eller vesentlig økt salget til eksisterende kunder. Beløpet kan utgjøre opptil ett år med gjennomsnittlig provisjon. Klausul som fraskriver retten er ugyldig.",
        },
        {
          q: "Når har agenten krav på etterprovisjon?",
          a: "Etter agentloven § 28 har agenten krav på provisjon for ordrer som kommer inn etter avtalens opphør, hvis ordren skyldes agentens innsats i avtaleperioden eller kommer fra eksisterende kunder agenten har opparbeidet. Vår mal angir 6 måneder som standard frist, men agenten har rett uavhengig av om det fremgår av avtalen.",
        },
        {
          q: "Skiller agentloven mellom varer og tjenester?",
          a: "Ja. Agentloven gjelder kun salg av varer (løsøre). Agenter som formidler tjenester (forsikring, eiendomsmegling, finansrådgivning) faller utenfor loven og må håndteres etter alminnelig avtalerett. I praksis brukes likevel agentlovens prinsipper som tolkningsmønster også for tjenestesalg.",
        },
      ],
    },
  },

  {
    id: "partner",
    icon: Handshake,
    label: "Partneravtale",
    description: "Joint venture eller samarbeidsavtale mellom to selskaper.",
    price: 59,
    popular: false,
    color: "#7e8eb8",
    features: ["Formål og omfang", "Bidrag fra hver part", "Inntekts- og kostnadsfordeling", "Beslutningsprosess", "Immaterielle rettigheter", "Uttreden og avvikling"],
    fieldGroups: [
      {
        title: "Part A",
        fields: [
          { key: "a_name", label: "Selskapsnavn", placeholder: "Selskap A AS", type: "text" },
          { key: "a_orgnr", label: "Org.nr", placeholder: "123 456 789", type: "text" },
          { key: "a_contact", label: "Kontaktperson / rolle", placeholder: "Kari Nordmann, CEO", type: "text" },
        ],
      },
      {
        title: "Part B",
        fields: [
          { key: "b_name", label: "Selskapsnavn", placeholder: "Selskap B AS", type: "text" },
          { key: "b_orgnr", label: "Org.nr", placeholder: "987 654 321", type: "text" },
          { key: "b_contact", label: "Kontaktperson / rolle", placeholder: "Ola Hansen, CTO", type: "text" },
        ],
      },
      {
        title: "Samarbeidsvilkår",
        fields: [
          { key: "purpose", label: "Formål med samarbeidet", placeholder: "Felles utvikling og lansering av...", type: "textarea" },
          { key: "a_contribution", label: "Part A sitt bidrag", placeholder: "Kapital, salgsressurser", type: "text" },
          { key: "b_contribution", label: "Part B sitt bidrag", placeholder: "Teknologi, utvikling", type: "text" },
          { key: "revenue_split", label: "Inntektsfordeling (%)", placeholder: "50/50", type: "text" },
          { key: "start_date", label: "Startdato", type: "date" },
          { key: "duration_years", label: "Varighet (år, 0 = løpende)", placeholder: "0", type: "number" },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `PARTNERAVTALE / JOINT VENTURE
Dato: ${today()}

PART A
${v(val, "a_name", "[Selskap A AS]")} — Org.nr: ${v(val, "a_orgnr", "—")}
Kontakt: ${v(val, "a_contact", "—")}

PART B
${v(val, "b_name", "[Selskap B AS]")} — Org.nr: ${v(val, "b_orgnr", "—")}
Kontakt: ${v(val, "b_contact", "—")}

§1 – FORMÅL
${v(val, "purpose", "[Beskriv formålet med samarbeidet]")}

§2 – BIDRAG
Part A: ${v(val, "a_contribution", "—")}
Part B: ${v(val, "b_contribution", "—")}

§3 – INNTEKTS- OG KOSTNADSFORDELING
Nettoinntekter og -kostnader fordeles: ${v(val, "revenue_split", "50/50")}

§4 – BESLUTNINGER
Ordinære beslutninger krever enighet mellom partene.
Vesentlige beslutninger krever skriftlig samtykke fra begge.

§5 – IMMATERIELLE RETTIGHETER
Eksisterende IP forblir den respektive parts eiendom.
Nyutviklet IP eies i henhold til bidragsfordelingen.

§6 – VARIGHET OG UTTREDEN
Samarbeidet trer i kraft ${v(val, "start_date", "[dato]")}.
${v(val, "duration_years", "0") === "0"
  ? "Avtalen løper inntil en av partene sier opp med 3 måneders varsel."
  : `Avtalen løper i ${v(val, "duration_years", "—")} år.`}

§7 – KONFIDENSIALITET
Begge parter behandler all informasjon om samarbeidet
konfidensielt i avtaleperioden og 3 år etter opphør.

§8 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
Part A                     Part B`,
    seo: {
      metaTitle: "Partneravtale mal — joint venture og samarbeid | Kontraktly",
      metaDescription: "Partneravtale eller joint venture mellom to selskaper. Bidrag, inntektsfordeling, IP og uttreden. Last ned som PDF — 59 kr.",
      longDescription: "En partneravtale (eller joint venture-avtale) regulerer et strategisk samarbeid mellom to selvstendige selskaper som går sammen om å utvikle, lansere eller drifte noe sammen — uten å danne et felles aksjeselskap. Avtalen klargjør hva hver part bidrar med, hvordan inntekter og kostnader fordeles, hvem som tar beslutninger, og hvordan samarbeidet eventuelt avvikles. Vår mal er designet for vanlige B2B-samarbeid: leverandør og forhandler som utvikler felles produkt, teknologipartnerskap, eller markeds- og salgssamarbeid.",
      useCases: [
        "To selskaper utvikler et felles produkt eller marked",
        "Et teknologiselskap og et markedsselskap kombinerer styrker",
        "Du går inn i strategisk partnerskap uten å opprette nytt felles AS",
        "Du formaliserer et eksisterende uformelt samarbeid",
      ],
      includes: [
        "Identifikasjon av begge parter (selskap, kontaktpersoner)",
        "Klart formulert formål med samarbeidet",
        "Beskrivelse av hver parts bidrag (kapital, kompetanse, ressurser)",
        "Fordeling av nettoinntekter og kostnader",
        "Beslutningsprosess for ordinære og vesentlige avgjørelser",
        "Klausul om eksisterende og nyutviklet IP",
        "Konfidensialitetsbestemmelser også etter avtalens opphør",
        "Varighet og oppsigelsesvilkår",
        "Uttreden og avvikling av eventuelle felles eiendeler",
        "Verneting ved tvist",
      ],
      legalBasis: "Joint venture-avtaler reguleres av avtaleloven og — hvis partnerskapet får karakter av selskap — selskapsloven. Hvis samarbeidet etablerer felles drift med felles regnskap og navn, kan det utgjøre et ansvarlig selskap (ANS/DA), som har egen registreringsplikt og solidarisk ansvar. Konkurranseretten begrenser hva slags samarbeid konkurrenter kan ha (særlig forbud mot prissamarbeid og markedsdeling).",
      faqs: [
        {
          q: "Hva er forskjellen på partneravtale og felles AS?",
          a: "I et felles aksjeselskap stifter partene et nytt rettssubjekt med egen kapital, styre og regnskap. Det gir tydelig ansvarsbegrensning, men er tyngre å sette opp og avvikle. En partneravtale er enklere — partene fortsetter som separate selskaper og samarbeider gjennom avtalen. Brukes typisk når samarbeidet er prosjektbasert eller har avgrenset varighet.",
        },
        {
          q: "Hvem eier nyutviklet teknologi i et joint venture?",
          a: "Etter standard formulering eies nyutviklet IP i henhold til bidragsfordelingen — typisk samme prosent som inntektsfordelingen. Eksisterende IP forblir den respektive parts eiendom (\"background IP\"). I praksis lønner det seg å være eksplisitt om hva som er foreground vs. background, og om begge får lisens til å bruke nyutviklingen videre etter samarbeidets opphør.",
        },
        {
          q: "Kan vi konkurrere med hverandre etter at samarbeidet er over?",
          a: "Hovedregelen er at konkurranseforbud kun gjelder i avtalens løpetid. Etter opphør er partene fri til å konkurrere — med mindre samarbeidet har gitt tilgang til den andres forretningshemmeligheter, der konfidensialitetsklausulen fortsatt forplikter. Konkurransebegrensninger som varer for lenge etter opphør kan være ulovlige etter konkurranseloven.",
        },
      ],
    },
  },

  {
    id: "kjoep",
    icon: ShoppingCart,
    label: "Kjøpskontrakt",
    description: "Generell kontrakt for kjøp og salg av varer eller tjenester.",
    price: 59,
    popular: false,
    color: "#8bb87e",
    features: ["Beskrivelse av vare/tjeneste", "Pris og betalingsbetingelser", "Levering og risiko", "Reklamasjon og garanti", "Mislighold og heving", "Verneting"],
    fieldGroups: [
      {
        title: "Selger",
        fields: [
          { key: "seller_name", label: "Navn / selskap", placeholder: "Selger AS", type: "text" },
          { key: "seller_orgnr", label: "Org.nr (valgfritt)", placeholder: "123 456 789", type: "text" },
          { key: "seller_email", label: "E-post", placeholder: "selger@example.com", type: "text" },
        ],
      },
      {
        title: "Kjøper",
        fields: [
          { key: "buyer_name", label: "Navn / selskap", placeholder: "Kjøper AS", type: "text" },
          { key: "buyer_orgnr", label: "Org.nr (valgfritt)", placeholder: "987 654 321", type: "text" },
          { key: "buyer_email", label: "E-post", placeholder: "kjøper@example.com", type: "text" },
        ],
      },
      {
        title: "Vare / tjeneste",
        fields: [
          { key: "item_desc", label: "Beskrivelse", placeholder: "MacBook Pro 14\" M3, 2024...", type: "textarea" },
          { key: "quantity", label: "Antall", placeholder: "1", type: "number" },
          { key: "price", label: "Kjøpesum (kr)", placeholder: "25 000", type: "number" },
          { key: "payment_terms", label: "Betalingsbetingelser", type: "select", options: ["Ved levering", "14 dagers faktura", "30 dagers faktura", "Forskuddsbetaling"] },
          { key: "delivery_date", label: "Leveringsdato", type: "date" },
          { key: "delivery_place", label: "Leveringssted", placeholder: "Kjøpers adresse", type: "text" },
        ],
      },
      {
        title: "Vilkår",
        fields: [
          { key: "warranty_months", label: "Garantiperiode (måneder)", placeholder: "12", type: "number" },
          { key: "jurisdiction", label: "Verneting", placeholder: "Oslo tingrett", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `KJØPSKONTRAKT
Dato: ${today()}

SELGER
Navn: ${v(val, "seller_name", "[Selger]")}
Org.nr: ${v(val, "seller_orgnr", "—")}
E-post: ${v(val, "seller_email", "—")}

KJØPER
Navn: ${v(val, "buyer_name", "[Kjøper]")}
Org.nr: ${v(val, "buyer_orgnr", "—")}
E-post: ${v(val, "buyer_email", "—")}

§1 – KJØPSOBJEKT
${v(val, "item_desc", "[Beskrivelse]")}
Antall: ${v(val, "quantity", "1")}

§2 – PRIS OG BETALING
Kjøpesum: NOK ${v(val, "price", "[beløp]")}
Betalingsbetingelser: ${v(val, "payment_terms", "Ved levering")}

§3 – LEVERING
Leveringsdato: ${v(val, "delivery_date", "[dato]")}
Leveringssted: ${v(val, "delivery_place", "Kjøpers adresse")}
Risikoen går over på kjøper ved levering.

§4 – GARANTI OG REKLAMASJON
Garantiperiode: ${v(val, "warranty_months", "12")} måneder.
Kjøper må reklamere skriftlig innen rimelig tid.

§5 – MISLIGHOLD
Ved vesentlig mislighold kan den andre part heve
avtalen med øyeblikkelig skriftlig varsel.

§6 – VERNETING
Tvister behandles ved ${v(val, "jurisdiction", "Oslo tingrett")}.

_______________________    _______________________
Selger                     Kjøper`,
    seo: {
      metaTitle: "Kjøpskontrakt mal — generell kjøp og salg | Kontraktly",
      metaDescription: "Generell kjøpskontrakt for varer og tjenester. Pris, levering, garanti og reklamasjon. Last ned som PDF — 59 kr.",
      longDescription: "Når du kjøper eller selger noe av betydelig verdi — utstyr, inventar, tjenesteleveranser — gir en skriftlig kjøpskontrakt deg rettsklarhet om hva, når, til hvilken pris og under hvilke vilkår. Vår generelle kjøpskontrakt-mal kan brukes både av næringsdrivende og privatpersoner, og dekker varer og tjenester. Den er enklere enn spesialiserte kontrakter (som bil eller bolig), men mer formell enn en muntlig avtale eller en faktura — perfekt for B2B-handel og større private kjøp.",
      useCases: [
        "Kjøp eller salg av brukt utstyr eller inventar mellom bedrifter",
        "Levering av tjeneste mot betaling der enkel SOW er nok",
        "Privat kjøp av elektronikk, møbler eller verdifulle gjenstander",
        "Mindre B2B-leveranser som ikke krever full leveransekontrakt",
      ],
      includes: [
        "Identifikasjon av selger og kjøper",
        "Beskrivelse av kjøpsobjektet (vare eller tjeneste)",
        "Antall eller omfang",
        "Kjøpesum og betalingsbetingelser",
        "Leveringsdato og leveringssted",
        "Tidspunkt for risikoens overgang",
        "Garantiperiode",
        "Reklamasjonsfrist og prosedyre",
        "Vesentlig mislighold og hevingsrett",
        "Verneting ved tvist",
      ],
      legalBasis: "Generelle kjøpskontrakter reguleres av kjøpsloven (mellom næringsdrivende eller privatpersoner imellom) eller forbrukerkjøpsloven (når selger er næringsdrivende og kjøper er forbruker). Sentrale bestemmelser er kjl. § 17 om mangler, § 30 om reklamasjon og § 39 om heving. For tjenestekjøp får håndverkertjenesteloven anvendelse hvis det utføres arbeid på fast eiendom eller løsøre.",
      faqs: [
        {
          q: "Hvor lang reklamasjonsfrist har kjøper?",
          a: "Etter kjøpsloven § 32 må kjøper reklamere innen rimelig tid etter at mangelen ble eller burde blitt oppdaget — typisk 1–2 måneder. Den absolutte fristen er 2 år fra levering, eller 5 år hvis kjøpsobjektet er ment å vare vesentlig lenger. Ved forbrukerkjøp er fristen 5 år for varer som er ment å vare lenge.",
        },
        {
          q: "Når går risikoen over fra selger til kjøper?",
          a: "Hovedregelen i kjøpsloven § 13 er at risikoen går over ved levering — det vil si når kjøperen overtar tingen. Hvis selger sender varene, går risikoen over når selger har levert dem til frakteren (med mindre annet er avtalt). Etter risikoovergang må kjøper betale selv om varen blir ødelagt eller forsvinner.",
        },
        {
          q: "Hva regnes som vesentlig mislighold?",
          a: "Vesentlig mislighold gir den andre parten rett til å heve avtalen — for eksempel hvis varen er fundamentalt feil, levering uteblir over lengre tid, eller betaling ikke skjer tross purring. Mindre forsinkelser eller ubetydelige avvik er ikke vesentlig mislighold; da har kjøper kun krav på prisavslag eller utbedring.",
        },
      ],
    },
  },
];
