"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  FileText, Home, Briefcase, Car, Shield, Users, Pen,
  ChevronRight, ChevronLeft, Check, Star, ArrowRight,
  Download, Lock, Zap, Globe, Eye,
} from "lucide-react";
import { useDownloadPDF } from "@/hooks/useDownloadPDF";

// ─── Types ───────────────────────────────────────────────────────────────────

type FieldType = "text" | "number" | "date" | "select" | "textarea";

interface Field {
  key: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: string[];
  hint?: string;
}

interface FieldGroup {
  title: string;
  fields: Field[];
}

interface ContractType {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  price: number;
  popular: boolean;
  color: string;
  features: string[];
  fieldGroups: FieldGroup[];
  buildPreview: (values: Record<string, string>) => string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const v = (values: Record<string, string>, key: string, fallback: string) =>
  values[key]?.trim() || fallback;

const today = new Date().toLocaleDateString("nb-NO");

// ─── Contract definitions ─────────────────────────────────────────────────────

const CONTRACT_TYPES: ContractType[] = [
  {
    id: "freelance",
    icon: Briefcase,
    label: "Freelance-kontrakt",
    description: "For selvstendige konsulenter, designere, utviklere og kreative.",
    price: 129,
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
Dato: ${today}

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
  },

  {
    id: "leie",
    icon: Home,
    label: "Leiekontrakt",
    description: "Husleiekontrakt for utleie av bolig, leilighet eller hybel.",
    price: 149,
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
Dato: ${today}

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
  },

  {
    id: "bil",
    icon: Car,
    label: "Bil-kjøpskontrakt",
    description: "Trygg overdragelse av kjøretøy mellom privatpersoner.",
    price: 99,
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
Dato: ${today}

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
  },

  {
    id: "nda",
    icon: Shield,
    label: "Konfidensialitetsavtale",
    description: "NDA for å beskytte forretningshemmeligheter og sensitiv info.",
    price: 89,
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
Dato: ${today}

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
  },

  {
    id: "ansatt",
    icon: Users,
    label: "Arbeidskontrakt",
    description: "Fullstendig ansettelsesavtale i tråd med arbeidsmiljøloven.",
    price: 179,
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
Dato: ${today}

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
  },

  {
    id: "konsulent",
    icon: Pen,
    label: "Konsulentavtale",
    description: "Rammeavtale mellom to selskaper for løpende konsulentbistand.",
    price: 199,
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
Dato: ${today}

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
  },
];

// ─── Shared input style ───────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(201,168,92,0.15)",
  background: "#0a0a0b",
  color: "#f0ede6",
};

function FormInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const base =
    "w-full rounded-sm px-3 py-2 text-sm focus:outline-none transition-colors font-mono-custom placeholder:text-[#3d3d40]";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={base + " resize-none"}
        style={inputStyle}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={base}
        style={{ ...inputStyle, appearance: "auto", colorScheme: "dark" }}
      >
        <option value="" style={{ background: "#111113", color: "#7a7672" }}>Velg...</option>
        {field.options?.map((o) => (
          <option key={o} value={o} style={{ background: "#111113", color: "#f0ede6" }}>{o}</option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={field.type === "date" ? "date" : "text"}
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={base}
      style={{ ...inputStyle, colorScheme: field.type === "date" ? "dark" : undefined }}
    />
  );
}

// ─── Fill-in wizard dialog ────────────────────────────────────────────────────

function FillDialog({
  contract,
  open,
  onClose,
  onProceedToCheckout,
}: {
  contract: ContractType | null;
  open: boolean;
  onClose: () => void;
  onProceedToCheckout: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  if (!contract) return null;

  const groups = contract.fieldGroups;
  const currentGroup = groups[step];
  const isLast = step === groups.length - 1;

  const setField = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleClose = () => {
    setValues({});
    setStep(0);
    setShowPreview(false);
    onClose();
  };

  const handleNext = () => {
    if (isLast) {
      onProceedToCheckout(values);
      handleClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  const preview = contract.buildPreview(values);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="w-[95vw] max-w-5xl rounded-sm p-0 flex flex-col"
        style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 620px)", overflow: "hidden" }}
      >
        {/* Header */}
        <DialogHeader
          className="px-4 pt-4 pb-3 flex-none"
          style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-sm flex-none"
              style={{ background: `${contract.color}18` }}
            >
              <contract.icon className="h-3.5 w-3.5" style={{ color: contract.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="font-display text-sm font-semibold truncate" style={{ color: "#f0ede6" }}>
                {contract.label}
              </DialogTitle>
              <p className="text-[11px]" style={{ color: "#7a7672" }}>Fyll inn informasjon</p>
            </div>
          </div>
        </DialogHeader>

        {/* Body — two-pane */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left: form */}
          <div className="flex-1 overflow-y-auto px-4 py-4 min-w-0">
            <div className="mb-4">
              <p className="font-mono-custom text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(201,168,92,0.5)" }}>
                Steg {step + 1} av {groups.length}
              </p>
              <h3 className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                {currentGroup.title}
              </h3>
            </div>

            <div className="space-y-4">
              {currentGroup.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs mb-1.5" style={{ color: "#7a7672" }}>
                    {field.label}
                    {field.hint && (
                      <span className="ml-2 opacity-60">{field.hint}</span>
                    )}
                  </label>
                  <FormInput
                    field={field}
                    value={values[field.key] ?? ""}
                    onChange={(val) => setField(field.key, val)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile preview toggle panel */}
            {showPreview && (
              <div
                className="mt-5 rounded-sm p-4 lg:hidden"
                style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}
              >
                <pre
                  className="font-mono-custom text-[10px] leading-relaxed whitespace-pre-wrap"
                  style={{ color: "#6a6562" }}
                >
                  {preview}
                </pre>
              </div>
            )}
          </div>

          {/* Right: live preview (desktop) */}
          <div
            className="hidden lg:flex flex-col w-[340px] flex-none overflow-hidden"
            style={{ borderLeft: "1px solid rgba(201,168,92,0.08)", background: "#0a0a0b" }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2 flex-none"
              style={{ borderBottom: "1px solid rgba(201,168,92,0.08)" }}
            >
              <Eye className="h-3 w-3" style={{ color: "#c9a85c" }} />
              <span className="font-mono-custom text-[10px] uppercase tracking-widest" style={{ color: "rgba(201,168,92,0.5)" }}>
                Live forhåndsvisning
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <pre
                className="font-mono-custom text-[10px] leading-[1.8] whitespace-pre-wrap"
                style={{ color: "#5a5855" }}
              >
                {preview}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex items-center gap-2 flex-none"
          style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}
        >
          {/* Progress dots */}
          <div className="flex items-center gap-1 flex-none">
            {groups.map((g, i) => (
              <div
                key={g.title}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === step ? "20px" : "6px",
                  background: i <= step ? "#c9a85c" : "rgba(201,168,92,0.15)",
                }}
              />
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-8 px-3 text-xs flex-none"
            style={{ color: "#7a7672" }}
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-sm h-8 px-3 text-xs flex-none"
            style={{ color: "rgba(201,168,92,0.6)", border: "1px solid rgba(201,168,92,0.15)" }}
            onClick={async () => {
              await download(contract.label, contract.buildPreview(values));
            }}
          >
            <Download className="h-3 w-3 mr-1" />Test
          </Button>

          <Button
            size="sm"
            className="rounded-sm h-8 px-4 text-xs font-medium flex-none"
            style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
            onClick={handleNext}
          >
            {isLast ? (
              <>Betal <Lock className="ml-1.5 h-3 w-3" /></>
            ) : (
              <>Neste <ChevronRight className="ml-1 h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", title: "Velg kontrakt", desc: "Finn malen som passer din situasjon." },
  { n: "02", title: "Fyll inn info", desc: "Svar på enkle spørsmål — vi bygger kontrakten." },
  { n: "03", title: "Betal & last ned", desc: "Betal med kort eller Vipps. Last ned PDF." },
];

const TESTIMONIALS = [
  { name: "Marte Kristiansen", role: "UX-designer, frilanser", text: "Brukte 8 minutter på en fullstendig freelance-kontrakt. Klienten min var imponert over profesjonaliteten.", stars: 5 },
  { name: "Erik Haugen", role: "Huseier, Oslo", text: "Endelig en leiekontrakt som er lett å forstå og faktisk holder i retten. Verdt hver krone.", stars: 5 },
  { name: "Sofie Bakke", role: "Daglig leder, Bakke Digital AS", text: "Har brukt Kontraktly for NDA-er og konsulentavtaler. Sparer oss for advokattimer hvert kvartal.", stars: 5 },
];

export default function Page() {
  const [previewContract, setPreviewContract] = useState<ContractType | null>(null);
  const [fillContract, setFillContract] = useState<ContractType | null>(null);
  const [checkoutContract, setCheckoutContract] = useState<ContractType | null>(null);
  const [filledValues, setFilledValues] = useState<Record<string, string>>({});

  const [previewOpen, setPreviewOpen] = useState(false);
  const [fillOpen, setFillOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "vipps">("card");
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const { download, generating } = useDownloadPDF();

  const openFill = (contract: ContractType) => {
    setFillContract(contract);
    setFillOpen(true);
  };

  const openPreview = (contract: ContractType) => {
    setPreviewContract(contract);
    setPreviewOpen(true);
  };

  const proceedToCheckout = (values: Record<string, string>) => {
    setFilledValues(values);
    setCheckoutContract(fillContract);
    setCheckoutOpen(true);
    setPaid(false);
    setPaying(false);
  };

  const simulatePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 1500);
  };

  const downloadTest = async (contract: ContractType, values: Record<string, string> = {}) => {
    await download(contract.label, contract.buildPreview(values));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,92,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,92,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #c9a85c, transparent 70%)" }} />
        <div className="absolute top-[60%] -left-40 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #7eb8a4, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <nav className="flex items-center justify-between px-6 py-5 md:px-12 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-sm flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)" }}>
              <FileText className="h-4 w-4 text-black" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight" style={{ color: "#f0ede6" }}>
              Kontraktly
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm md:inline" style={{ color: "#7a7672" }}>
              Spørsmål?{" "}
              <span className="cursor-pointer hover:underline" style={{ color: "#c9a85c" }}>Kontakt oss</span>
            </span>
            <Button size="sm" className="h-8 rounded-sm text-xs"
              style={{ border: "1px solid rgba(201,168,92,0.3)", background: "transparent", color: "#c9a85c" }}>
              Logg inn
            </Button>
          </div>
        </nav>

        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center md:pt-24">
          <div className="animate-fade-up">
            <Badge className="mb-6 px-3 py-1 text-xs font-mono-custom tracking-widest uppercase"
              style={{ border: "1px solid rgba(201,168,92,0.3)", background: "rgba(201,168,92,0.08)", color: "#c9a85c" }}>
              Ingen abonnement · Betal kun per kontrakt
            </Badge>
          </div>
          <h1 className="font-display animate-fade-up delay-100 mb-6 font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#f0ede6" }}>
            Kontrakter som{" "}
            <em className="not-italic gold-shimmer">bare fungerer</em>
            <br />
          </h1>
          <p className="animate-fade-up delay-200 mx-auto mb-10 max-w-2xl text-[1.1rem] leading-relaxed" style={{ color: "#7a7672" }}>
            Fra freelance-oppdrag til leieavtaler — lag profesjonelle, juridisk solide kontrakter
            på under 10 minutter. Last ned PDF og signer digitalt.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap items-center justify-center gap-4">
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-12 px-8 text-sm font-medium tracking-wide"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                Se alle kontrakter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Button size="lg" onClick={() => openPreview(CONTRACT_TYPES[0])} className="rounded-sm h-12 px-8 text-sm"
              style={{ border: "1px solid rgba(201,168,92,0.25)", background: "transparent", color: "#f0ede6" }}>
              Se eksempel
            </Button>
          </div>
          <div className="animate-fade-up delay-400 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[{ icon: Lock, text: "256-bit kryptering" }, { icon: Zap, text: "Klar på under 10 min" },
              { icon: Globe, text: "Norsk lovgivning" }, { icon: Download, text: "PDF + digital signatur" }]
              .map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "#7a7672" }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: "#c9a85c" }} />
                  <span>{text}</span>
                </div>
              ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="ornament mb-12 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              Slik fungerer det
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.n} className={`animate-fade-up delay-${(i + 1) * 100} rounded-sm p-6 gold-glow-hover`}
                style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}>
                <span className="font-mono-custom text-4xl font-medium leading-none" style={{ color: "rgba(201,168,92,0.2)" }}>
                  {step.n}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold" style={{ color: "#f0ede6" }}>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#7a7672" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTRACTS */}
        <section id="kontrakter" className="mx-auto max-w-5xl px-6 pb-24 scroll-mt-8">
          <div className="ornament mb-4 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              Velg kontrakt
            </span>
          </div>
          <h2 className="font-display animate-fade-up delay-100 mb-12 text-center font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f0ede6" }}>
            Alt du trenger, én plass.
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CONTRACT_TYPES.map((contract, i) => {
              const Icon = contract.icon;
              return (
                <Card key={contract.id}
                  className={`animate-scale-in delay-${i * 100} relative flex flex-col rounded-sm p-6 gold-glow-hover cursor-pointer group`}
                  style={{ border: "1px solid rgba(201,168,92,0.12)", background: "#111113" }}
                  onClick={() => openPreview(contract)}
                >
                  {contract.popular && (
                    <div className="absolute -top-3 right-5">
                      <Badge className="rounded-sm text-[10px] font-medium tracking-widest uppercase px-2 py-0.5"
                        style={{ background: "#c9a85c", color: "#0a0a0b" }}>
                        Populær
                      </Badge>
                    </div>
                  )}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm"
                      style={{ background: `${contract.color}18`, border: `1px solid ${contract.color}30` }}>
                      <Icon className="h-5 w-5" style={{ color: contract.color }} />
                    </div>
                    <span className="font-mono-custom text-xl font-medium" style={{ color: "#f0ede6" }}>
                      {contract.price}<span className="text-sm ml-0.5" style={{ color: "#7a7672" }}>kr</span>
                    </span>
                  </div>
                  <h3 className="font-display mb-1 text-[1.05rem] font-semibold transition-colors" style={{ color: "#f0ede6" }}>
                    {contract.label}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed" style={{ color: "#7a7672" }}>{contract.description}</p>
                  <ul className="mb-6 space-y-1.5 flex-1">
                    {contract.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
                        <Check className="h-3 w-3 flex-shrink-0" style={{ color: "#c9a85c" }} />
                        {f}
                      </li>
                    ))}
                    {contract.features.length > 4 && (
                      <li className="text-xs" style={{ color: "rgba(201,168,92,0.5)" }}>
                        + {contract.features.length - 4} til...
                      </li>
                    )}
                  </ul>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 rounded-sm h-9 text-xs font-medium"
                      style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                      onClick={(e) => { e.stopPropagation(); openFill(contract); }}>
                      Lag kontrakt
                    </Button>
                    <Button size="sm" className="rounded-sm h-9 text-xs px-3"
                      style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}
                      onClick={(e) => { e.stopPropagation(); openPreview(contract); }}>
                      Forhåndsvis
                    </Button>
                    <Button size="sm" className="rounded-sm h-9 text-xs px-3"
                      disabled={generating}
                      style={{ border: "1px solid rgba(201,168,92,0.15)", background: "transparent", color: "rgba(201,168,92,0.5)" }}
                      onClick={(e) => { e.stopPropagation(); downloadTest(contract); }}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="ornament mb-12 animate-fade-up">
            <span className="font-mono-custom text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7a7672" }}>
              Hva folk sier
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`animate-fade-up delay-${i * 100} rounded-sm p-6`}
                style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#111113" }}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5" style={{ fill: "#c9a85c", color: "#c9a85c" }} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed italic" style={{ color: "#a09c97" }}>&ldquo;{t.text}&rdquo;</p>
                <Separator style={{ background: "rgba(201,168,92,0.1)", marginBottom: "1rem" }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "#f0ede6" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#7a7672" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="animate-fade-up rounded-sm p-10 text-center"
            style={{ border: "1px solid rgba(201,168,92,0.2)", background: "linear-gradient(135deg, #111113, #0d0d0f)" }}>
            <h2 className="font-display mb-3 font-bold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#f0ede6" }}>
              Klar til å beskytte deg selv?
            </h2>
            <p className="mb-7 text-sm" style={{ color: "#7a7672" }}>
              Over 2 400 nordmenn har laget kontrakter med Kontraktly. Ingen binding — betal kun for det du trenger.
            </p>
            <a href="#kontrakter">
              <Button size="lg" className="rounded-sm h-11 px-10 text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}>
                Kom i gang nå <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-8 md:px-12" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-sm flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)" }}>
                <FileText className="h-3 w-3 text-black" />
              </div>
              <span className="font-display text-sm" style={{ color: "#7a7672" }}>Kontraktly</span>
            </div>
            <div className="flex gap-6 text-xs" style={{ color: "#7a7672" }}>
              {["Personvern", "Vilkår", "Kontakt"].map((link) => (
                <span key={link} className="cursor-pointer hover:text-[#c9a85c] transition-colors">{link}</span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#3d3d40" }}>© 2025 Kontraktly AS</p>
          </div>
        </footer>
      </div>

      {/* ── FILL DIALOG ── */}
      <FillDialog
        contract={fillContract}
        open={fillOpen}
        onClose={() => setFillOpen(false)}
        onProceedToCheckout={proceedToCheckout}
      />

      {/* ── PREVIEW DIALOG ── */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="w-[95vw] max-w-2xl rounded-sm p-0 overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 700px)" }}>
          {previewContract && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 flex-none" style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm"
                      style={{ background: `${previewContract.color}18` }}>
                      <previewContract.icon className="h-5 w-5" style={{ color: previewContract.color }} />
                    </div>
                    <div>
                      <DialogTitle className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                        {previewContract.label}
                      </DialogTitle>
                      <p className="text-xs" style={{ color: "#7a7672" }}>Forhåndsvisning — mal</p>
                    </div>
                  </div>
                  <span className="font-mono-custom text-lg font-medium" style={{ color: "#c9a85c" }}>
                    {previewContract.price} kr
                  </span>
                </div>
              </DialogHeader>
              <div className="px-6 py-5 flex-1 overflow-y-auto min-h-0">
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {previewContract.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
                      <Check className="h-3 w-3 flex-shrink-0" style={{ color: "#c9a85c" }} />{f}
                    </div>
                  ))}
                </div>
                <div className="rounded-sm p-5" style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}>
                  <pre className="font-mono-custom text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#5a5855" }}>
                    {previewContract.buildPreview({})}
                  </pre>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: "rgba(201,168,92,0.1)" }} />
                    <span className="text-[10px] uppercase tracking-wider font-mono-custom" style={{ color: "#3d3d40" }}>
                      Fyll inn for å tilpasse
                    </span>
                    <div className="h-px flex-1" style={{ background: "rgba(201,168,92,0.1)" }} />
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 flex gap-3 flex-none">
                <Button className="flex-1 rounded-sm h-10 text-sm font-medium"
                  style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                  onClick={() => { setPreviewOpen(false); openFill(previewContract); }}>
                  Lag kontrakt — {previewContract.price} kr
                </Button>
                <Button className="rounded-sm h-10 text-sm"
                  style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}
                  onClick={() => setPreviewOpen(false)}>
                  Lukk
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── CHECKOUT DIALOG ── */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="w-[95vw] max-w-lg rounded-sm p-0 overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 700px)" }}>
          {checkoutContract && !paid && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 flex-none" style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}>
                <DialogTitle className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                  Fullfør kjøp
                </DialogTitle>
                <p className="text-xs" style={{ color: "#7a7672" }}>{checkoutContract.label}</p>
              </DialogHeader>
              <div className="px-6 py-5 space-y-5 flex-1 overflow-y-auto min-h-0">
                {/* Summary */}
                <div className="rounded-sm p-4" style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#7a7672" }}>{checkoutContract.label}</span>
                    <span style={{ color: "#f0ede6" }}>{checkoutContract.price} kr</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#7a7672" }}>MVA (25%)</span>
                    <span style={{ color: "#7a7672" }}>{Math.round(checkoutContract.price * 0.25)} kr</span>
                  </div>
                  <Separator style={{ margin: "8px 0", background: "rgba(201,168,92,0.1)" }} />
                  <div className="flex justify-between text-sm font-medium">
                    <span style={{ color: "#f0ede6" }}>Totalt</span>
                    <span className="font-mono-custom" style={{ color: "#c9a85c" }}>
                      {Math.round(checkoutContract.price * 1.25)} kr
                    </span>
                  </div>
                </div>
                {/* Filled fields summary */}
                {Object.keys(filledValues).length > 0 && (
                  <div className="rounded-sm p-3" style={{ border: "1px solid rgba(201,168,92,0.08)", background: "rgba(201,168,92,0.03)" }}>
                    <p className="font-mono-custom text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgba(201,168,92,0.4)" }}>
                      Dine opplysninger registrert
                    </p>
                    <p className="text-xs" style={{ color: "#5a5855" }}>
                      {Object.keys(filledValues).length} felt fylt inn — kontrakten er klar til generering.
                    </p>
                  </div>
                )}
                {/* Payment method */}
                <div>
                  <p className="text-xs mb-3 uppercase tracking-wider font-mono-custom" style={{ color: "#7a7672" }}>
                    Betalingsmetode
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["card", "vipps"] as const).map((method) => (
                      <button key={method} onClick={() => setPaymentMethod(method)}
                        className="rounded-sm p-3 text-sm transition-all text-left"
                        style={{
                          border: paymentMethod === method ? "1px solid rgba(201,168,92,0.5)" : "1px solid rgba(201,168,92,0.1)",
                          background: paymentMethod === method ? "rgba(201,168,92,0.08)" : "#111113",
                          color: paymentMethod === method ? "#c9a85c" : "#7a7672",
                        }}>
                        <span className="block font-medium">{method === "card" ? "💳 Kort" : "🟠 Vipps"}</span>
                        <span className="text-xs opacity-70">{method === "card" ? "Visa / Mastercard" : "Betal med Vipps"}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: "#7a7672" }}>Kortnummer</label>
                      <input type="text" placeholder="4242 4242 4242 4242"
                        className="w-full rounded-sm px-3 py-2 text-sm focus:outline-none font-mono-custom"
                        style={inputStyle} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs mb-1 block" style={{ color: "#7a7672" }}>Utløpsdato</label>
                        <input type="text" placeholder="MM / ÅÅ"
                          className="w-full rounded-sm px-3 py-2 text-sm focus:outline-none font-mono-custom"
                          style={inputStyle} />
                      </div>
                      <div>
                        <label className="text-xs mb-1 block" style={{ color: "#7a7672" }}>CVC</label>
                        <input type="text" placeholder="123"
                          className="w-full rounded-sm px-3 py-2 text-sm focus:outline-none font-mono-custom"
                          style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "vipps" && (
                  <div className="rounded-sm p-4 text-center" style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}>
                    <p className="text-sm mb-3" style={{ color: "#7a7672" }}>
                      Du vil motta en betalingsforespørsel i Vipps-appen.
                    </p>
                    <label className="text-xs mb-1 block" style={{ color: "#7a7672" }}>Mobilnummer</label>
                    <input type="tel" placeholder="400 00 000"
                      className="w-full rounded-sm px-3 py-2 text-sm focus:outline-none font-mono-custom text-center"
                      style={inputStyle} />
                  </div>
                )}
              </div>
              <div className="px-6 pb-6 flex-none">
                <Button className="w-full rounded-sm h-10 text-sm font-medium" disabled={paying}
                  style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                  onClick={simulatePay}>
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#0a0a0b] border-t-transparent animate-spin" />
                      Behandler...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Betal {Math.round(checkoutContract.price * 1.25)} kr
                    </span>
                  )}
                </Button>
                <p className="mt-2 text-center text-[10px]" style={{ color: "#3d3d40" }}>
                  Sikker betaling. Pengene refunderes ikke etter nedlasting.
                </p>
              </div>
            </>
          )}
          {paid && checkoutContract && (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(201,168,92,0.12)", border: "1px solid rgba(201,168,92,0.3)" }}>
                <Check className="h-8 w-8" style={{ color: "#c9a85c" }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#f0ede6" }}>
                Betaling bekreftet!
              </h3>
              <p className="text-sm mb-6" style={{ color: "#7a7672" }}>
                Din {checkoutContract.label.toLowerCase()} er klar med dine opplysninger.
                Kvittering sendt på e-post.
              </p>
              <Button
                className="rounded-sm h-10 px-8 text-sm font-medium w-full"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                disabled={generating}
                onClick={async () => {
                  await download(
                    checkoutContract.label,
                    checkoutContract.buildPreview(filledValues)
                  );
                  setCheckoutOpen(false);
                  setPaid(false);
                }}
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-[#0a0a0b] border-t-transparent animate-spin" />
                    Genererer PDF...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Last ned kontrakt (PDF)
                  </span>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
