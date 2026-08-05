import { Shield } from "lucide-react";
import type { ContractType } from "./types";
import { v, todayEn } from "./helpers";

export const CONTRACT_TYPES_EN: ContractType[] = [
  {
    id: "nda",
    icon: Shield,
    label: "Non-Disclosure Agreement",
    description: "Mutual or one-way NDA under English law — for pitches, negotiations and vendor talks.",
    price: 59,
    popular: true,
    color: "#c9a85c",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    features: [
      "Mutual or one-way structure",
      "Clear definition of Confidential Information",
      "Permitted use and disclosure",
      "Term and survival clauses",
      "Return or destruction of materials",
      "Injunctive relief and governing law",
    ],
    fieldGroups: [
      {
        title: "Disclosing Party",
        fields: [
          { key: "disclosing_name", label: "Legal name", placeholder: "Acme Ltd", type: "text" },
          { key: "disclosing_number", label: "Company number (optional)", placeholder: "12345678", type: "text" },
          { key: "disclosing_address", label: "Registered address", placeholder: "1 King's Road, London EC1A 1AA", type: "text" },
        ],
      },
      {
        title: "Receiving Party",
        fields: [
          { key: "receiving_name", label: "Legal name", placeholder: "Beta Ltd", type: "text" },
          { key: "receiving_number", label: "Company number (optional)", placeholder: "87654321", type: "text" },
          { key: "receiving_address", label: "Registered address", placeholder: "2 Queen's Road, Manchester M1 1AA", type: "text" },
        ],
      },
      {
        title: "Scope & Purpose",
        fields: [
          { key: "structure", label: "Structure", type: "select", options: ["Mutual (both parties disclose)", "One-way (only Disclosing Party discloses)"] },
          { key: "purpose", label: "Purpose of disclosure", placeholder: "Evaluating a potential commercial partnership...", type: "textarea" },
          { key: "effective_date", label: "Effective date", type: "date" },
        ],
      },
      {
        title: "Term & Governing Law",
        fields: [
          { key: "term_years", label: "Confidentiality term (years)", placeholder: "3", type: "number" },
          { key: "notice_days", label: "Return-of-materials notice (days)", placeholder: "14", type: "number" },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => {
      const structure = v(val, "structure", "Mutual (both parties disclose)");
      const isMutual = structure.startsWith("Mutual");
      const partyLabel = isMutual ? "each Party" : "the Receiving Party";
      const disclosedBy = isMutual ? "either Party (the \"Disclosing Party\")" : "the Disclosing Party";
      return `NON-DISCLOSURE AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "disclosing_name", "[Disclosing Party]")}${v(val, "disclosing_number", "") ? ` (company no. ${v(val, "disclosing_number", "")})` : ""},
    of ${v(val, "disclosing_address", "[address]")} ("Disclosing Party"); and

(2) ${v(val, "receiving_name", "[Receiving Party]")}${v(val, "receiving_number", "") ? ` (company no. ${v(val, "receiving_number", "")})` : ""},
    of ${v(val, "receiving_address", "[address]")} ("Receiving Party").

(each a "Party" and together the "Parties")

BACKGROUND
The Parties wish to explore the following matter (the "Purpose"):
${v(val, "purpose", "[describe the purpose]")}

In connection with the Purpose, ${disclosedBy} may disclose Confidential Information
to the other Party. This Agreement sets out the terms on which such information
is disclosed and used.

1. DEFINITIONS
1.1 "Confidential Information" means all information (whether oral, written or in any
    other form) disclosed by ${disclosedBy} to the other Party in connection with the
    Purpose, including business plans, financial information, customer and supplier
    lists, technical data, know-how, source code, product designs and any information
    marked or reasonably identifiable as confidential.
1.2 "Effective Date" means ${v(val, "effective_date", "[effective date]")}.

2. OBLIGATIONS OF CONFIDENTIALITY
2.1 ${partyLabel[0].toUpperCase() + partyLabel.slice(1)} shall:
    (a) keep the Confidential Information strictly confidential;
    (b) use the Confidential Information solely for the Purpose;
    (c) not disclose the Confidential Information to any third party without the
        prior written consent of the Disclosing Party; and
    (d) apply at least the same standard of care to the Confidential Information as
        it applies to its own confidential information, and in any event no less than
        a reasonable standard of care.

3. PERMITTED DISCLOSURES
3.1 The obligations in clause 2 do not apply to information which:
    (a) is or becomes publicly available other than through breach of this Agreement;
    (b) was lawfully in the possession of the receiving Party before disclosure;
    (c) is independently developed without use of the Confidential Information; or
    (d) is required to be disclosed by law, court order or a competent regulatory
        authority, provided that (where lawful) prompt notice is given to the
        Disclosing Party.

4. TERM AND SURVIVAL
4.1 This Agreement takes effect on the Effective Date and continues for
    ${v(val, "term_years", "3")} years, unless terminated earlier by written agreement.
4.2 The obligations of confidentiality shall survive termination and continue for
    ${v(val, "term_years", "3")} years from the date of disclosure of the relevant
    Confidential Information.

5. RETURN OR DESTRUCTION OF MATERIALS
5.1 On written request from the Disclosing Party, the receiving Party shall within
    ${v(val, "notice_days", "14")} days return or securely destroy all Confidential
    Information in its possession or control, and confirm the same in writing.

6. NO LICENCE, NO WARRANTY
6.1 Nothing in this Agreement grants any licence or right in the Confidential
    Information, save as expressly set out.
6.2 The Confidential Information is provided "as is" and without warranty of any
    kind, whether express or implied.

7. REMEDIES
7.1 The Parties acknowledge that damages alone may not be an adequate remedy for
    breach of this Agreement, and that the Disclosing Party shall be entitled to
    seek injunctive relief and specific performance in addition to any other
    remedies available at law or in equity.

8. GENERAL
8.1 No variation of this Agreement is effective unless in writing and signed by both
    Parties.
8.2 A person who is not a party to this Agreement has no rights under the
    Contracts (Rights of Third Parties) Act 1999.
8.3 If any provision is held invalid or unenforceable, the remainder of the
    Agreement shall continue in full force.

9. GOVERNING LAW AND JURISDICTION
9.1 This Agreement and any dispute or claim arising out of it (including
    non-contractual disputes) shall be governed by and construed in accordance with
    the laws of England and Wales.
9.2 The Parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}.

Signed for and on behalf of the Disclosing Party:

_______________________          _______________________
Name                             Date

Signed for and on behalf of the Receiving Party:

_______________________          _______________________
Name                             Date`;
    },
    seo: {
      metaTitle: "Non-Disclosure Agreement (NDA) template — English law | Kontraktly",
      metaDescription: "Professional NDA under English law. Mutual or one-way, injunctive relief, governing law and jurisdiction. Ready-to-sign PDF from NOK 59.",
      longDescription: "A Non-Disclosure Agreement (NDA) protects sensitive business information shared during commercial discussions — from investor pitches and product demos to supplier evaluations and hiring conversations. This template is drafted under the laws of England and Wales and can be issued as a mutual NDA (both sides disclose) or a one-way NDA (only one party discloses). It covers the definition of Confidential Information, permitted uses and disclosures, term and survival, return of materials, and remedies including injunctive relief.",
      useCases: [
        "You are about to pitch to an investor, partner or acquirer and need to protect deal-specific information",
        "You are evaluating a supplier, contractor or agency and need to share commercial or technical detail",
        "You are hiring a contractor who will access source code, customer data or product roadmaps",
        "You are entering early-stage discussions with a potential co-founder, JV partner or strategic customer",
      ],
      includes: [
        "Identification of both parties with registered addresses and company numbers",
        "Toggle between mutual and one-way structure",
        "Definition of Confidential Information covering written, oral and electronic disclosure",
        "Permitted disclosures (public domain, prior possession, independent development, legal compulsion)",
        "Configurable confidentiality term and survival",
        "Return-or-destruction clause with configurable notice period",
        "Remedies clause with express reference to injunctive relief",
        "Governing law and jurisdiction (England and Wales) with configurable courts",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales. It is written to sit alongside common law principles on confidentiality, the Contracts (Rights of Third Parties) Act 1999 (which it expressly excludes), and standard commercial practice for pre-contractual disclosures. It is not tailored for consumer disclosures, employee post-termination restraints, or trade-secret regimes outside the UK.",
      faqs: [
        {
          q: "Is this NDA valid outside the UK?",
          a: "The Agreement is expressly governed by English law and the parties submit to the jurisdiction chosen. English-law NDAs are widely accepted in international commercial dealings and are commonly used by parties in different jurisdictions. That said, if either party is outside the UK, you should confirm that English law and jurisdiction is commercially acceptable to the other side.",
        },
        {
          q: "What is the difference between a mutual and a one-way NDA?",
          a: "A mutual NDA protects information disclosed by either party — appropriate when both sides will be sharing sensitive information (e.g. two companies exploring a partnership). A one-way NDA protects information disclosed by one party only — appropriate when only the Disclosing Party will be sharing information (e.g. an investor pitch, where the founder shares but the investor does not).",
        },
        {
          q: "How long should the confidentiality term be?",
          a: "Two to five years is common for commercial NDAs. Highly sensitive trade secrets may warrant a longer term (or perpetual protection for trade-secret information specifically), while shorter engagements may only need one to two years. The template lets you set the term explicitly and survival runs from the date of disclosure, which is generally more protective than a term running from signature.",
        },
        {
          q: "Do I still need a lawyer if I use this template?",
          a: "For standard commercial discussions, this template is a solid starting point. For high-value transactions (M&A, licensing of core IP, regulated data), or where either party has significant leverage to demand bespoke terms, engaging a commercial solicitor for review is prudent. This template is not legal advice and does not create a solicitor–client relationship.",
        },
        {
          q: "Is an NDA binding without a witness?",
          a: "Under English law an NDA is a simple contract and does not require a witness or a deed. Signatures from an authorised representative of each party (or an electronic equivalent such as DocuSign or Adobe Sign) are sufficient to create a binding agreement.",
        },
      ],
    },
  },
];
