import {
  Briefcase, Shield, Users, Pen, BarChart2, ShoppingCart, Handshake, Truck, UserCheck,
} from "lucide-react";
import type { ContractType } from "./types";
import { v, todayEn } from "./helpers";

export const CONTRACT_TYPES_EN: ContractType[] = [
  {
    id: "freelance",
    icon: Briefcase,
    label: "Freelance Agreement",
    description: "For self-employed consultants, designers, developers and creative freelancers.",
    price: 5,
    popular: true,
    color: "#c9a85c",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Payment terms and invoicing",
      "Deliverables and milestones",
      "Intellectual property assignment on payment",
      "Confidentiality clause",
      "Termination and notice",
      "Limitation of liability",
    ],
    fieldGroups: [
      {
        title: "Client",
        fields: [
          { key: "client_name", label: "Legal name", placeholder: "Acme Ltd", type: "text" },
          { key: "client_number", label: "Company number (optional)", placeholder: "12345678", type: "text" },
          { key: "client_address", label: "Registered address", placeholder: "1 King's Road, London EC1A 1AA", type: "text" },
        ],
      },
      {
        title: "Freelancer",
        fields: [
          { key: "freelancer_name", label: "Your name / trading name", placeholder: "Jane Smith t/a Smith Design", type: "text" },
          { key: "freelancer_number", label: "Company / UTR (optional)", placeholder: "87654321", type: "text" },
          { key: "freelancer_email", label: "Email", placeholder: "jane@example.com", type: "text" },
        ],
      },
      {
        title: "Engagement & Fees",
        fields: [
          { key: "scope", label: "Description of services", placeholder: "Design and build of marketing website including CMS...", type: "textarea" },
          { key: "rate", label: "Fee / hourly rate (GBP)", placeholder: "120", type: "number" },
          { key: "billing", label: "Fee model", type: "select", options: ["Hourly", "Fixed price", "Monthly retainer"] },
          { key: "payment_days", label: "Payment terms (days)", placeholder: "14", type: "number" },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "end_date", label: "End date / open-ended", placeholder: "Open-ended", type: "text" },
        ],
      },
      {
        title: "Additional Terms",
        fields: [
          { key: "nda_years", label: "Confidentiality term (years)", placeholder: "2", type: "number" },
          { key: "notice_days", label: "Notice period (days)", placeholder: "14", type: "number" },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `FREELANCE SERVICES AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "client_name", "[Client]")}${v(val, "client_number", "") ? ` (company no. ${v(val, "client_number", "")})` : ""},
    of ${v(val, "client_address", "[address]")} ("Client"); and

(2) ${v(val, "freelancer_name", "[Freelancer]")}${v(val, "freelancer_number", "") ? ` (company no. / UTR ${v(val, "freelancer_number", "")})` : ""},
    contact: ${v(val, "freelancer_email", "[email]")} ("Freelancer").

1. SERVICES
1.1 The Freelancer shall provide the following services (the "Services") to the Client:
    ${v(val, "scope", "[Describe the services]")}

2. TERM
2.1 The Services shall commence on ${v(val, "start_date", "[start date]")} and continue
    until ${v(val, "end_date", "terminated in accordance with clause 6")}.

3. FEES AND INVOICING
3.1 The Client shall pay the Freelancer at the rate of GBP ${v(val, "rate", "[rate]")}
    (${v(val, "billing", "Hourly")}), exclusive of VAT where applicable.
3.2 The Freelancer shall invoice the Client periodically and each invoice shall be
    payable within ${v(val, "payment_days", "14")} days of receipt.
3.3 The Client shall pay interest on late payment at 8% above the Bank of England
    base rate under the Late Payment of Commercial Debts (Interest) Act 1998.

4. STATUS
4.1 The Freelancer is an independent contractor and not an employee, worker or
    agent of the Client. The Freelancer is responsible for its own income tax,
    National Insurance and (where applicable) VAT.
4.2 Both parties confirm that the engagement falls outside IR35 unless specifically
    agreed otherwise in writing.

5. INTELLECTUAL PROPERTY
5.1 On full payment of the fees for the relevant deliverable, the Freelancer assigns
    to the Client with full title guarantee all intellectual property rights in the
    deliverables created specifically for the Client under this Agreement.
5.2 The Freelancer retains ownership of all pre-existing know-how, templates,
    tools and methodologies used in performing the Services.

6. CONFIDENTIALITY
6.1 Each party shall keep confidential all non-public information disclosed by the
    other and shall not use it other than for the purposes of this Agreement.
6.2 This obligation continues for ${v(val, "nda_years", "2")} years after termination.

7. TERMINATION
7.1 Either party may terminate this Agreement by giving ${v(val, "notice_days", "14")} days'
    written notice to the other.
7.2 Either party may terminate immediately if the other commits a material breach
    which is not remedied within 14 days of written notice.

8. LIMITATION OF LIABILITY
8.1 Neither party excludes liability for death, personal injury caused by negligence
    or fraud.
8.2 Subject to clause 8.1, the Freelancer's total liability under this Agreement
    shall not exceed the fees paid or payable in the 12 months preceding the claim.

9. GOVERNING LAW AND JURISDICTION
9.1 This Agreement shall be governed by the laws of England and Wales.
9.2 The parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}.

Signed for the Client:                   Signed for the Freelancer:

_______________________          _______________________
Name / Date                      Name / Date`,
    seo: {
      metaTitle: "Freelance contract template — English law | Kontraktly",
      metaDescription: "Professional freelance services agreement under English law. Covers fees, IP, IR35, late payment interest and termination. Ready PDF from £5.",
      longDescription: "A freelance services agreement is the most important document between a self-employed contractor and their client. It defines what will be delivered, at what price, on what payment terms, and who owns the resulting work. This template is drafted under the laws of England and Wales and reflects UK-specific concerns — VAT treatment, IR35 status, late payment interest under the Late Payment of Commercial Debts (Interest) Act 1998, and IP assignment on payment. It is suitable for developers, designers, writers, consultants and creative freelancers working through a personal service company or as a sole trader.",
      useCases: [
        "You take on client work as a limited company or sole trader",
        "Your client requires a signed contract before work can begin",
        "You want to secure IP assignment tied to payment, not delivery",
        "You need clear payment terms with statutory late-payment protection",
      ],
      includes: [
        "Identification of client and freelancer with company details",
        "Detailed description of services",
        "Fee structure (hourly, fixed price or monthly retainer)",
        "Invoicing rhythm and payment terms",
        "Late payment interest under the Late Payment of Commercial Debts (Interest) Act 1998",
        "Independent contractor status confirmation and IR35 note",
        "IP assignment on full payment (with retained know-how carve-out)",
        "Confidentiality with configurable duration",
        "Termination on notice and for material breach",
        "Limitation of liability capped at 12 months of fees",
        "Governing law and jurisdiction",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales. Key statutory provisions referenced include the Late Payment of Commercial Debts (Interest) Act 1998, the Copyright, Designs and Patents Act 1988 (for IP assignment), and general common law of contract. Freelancers working through a personal service company should independently assess IR35 status; the contract's characterisation is a factor but not decisive.",
      faqs: [
        {
          q: "How does IR35 affect this contract?",
          a: "IR35 (the off-payroll working rules) can apply where a contractor supplies services through their own limited company but the working arrangement resembles employment. Since April 2021 the end client (if medium or large) is responsible for determining status. This contract confirms independent contractor status, but the reality of the working relationship — control, substitution, mutuality of obligation — is what HMRC assesses. Take the CEST tool output and status determination statement seriously.",
        },
        {
          q: "When does IP transfer to the client?",
          a: "Under this template, IP in deliverables created specifically for the client transfers on full payment of the fees for that deliverable. This gives the freelancer a commercial lever if invoices go unpaid. Pre-existing know-how, tools, templates and methodologies stay with the freelancer — this is important because freelancers typically reuse code libraries, design systems and process frameworks across clients.",
        },
        {
          q: "What happens if the client pays late?",
          a: "Under the Late Payment of Commercial Debts (Interest) Act 1998, statutory interest of 8% above the Bank of England base rate applies to overdue commercial invoices, along with a fixed compensation sum (currently £40–£100 depending on debt size) and the right to claim reasonable recovery costs. These rights apply automatically to B2B contracts; the clause here confirms them but does not create them.",
        },
        {
          q: "Do I need a written contract if the client already sent a purchase order?",
          a: "A purchase order plus your acceptance can form a binding contract, but purchase orders rarely address IP, confidentiality, limitation of liability or termination — the terms freelancers care most about. A signed services agreement lets you set those terms explicitly rather than relying on the client's standard PO wording or falling back on default statutory rules.",
        },
      ],
    },
  },

  {
    id: "nda",
    icon: Shield,
    label: "Non-Disclosure Agreement",
    description: "Mutual or one-way NDA under English law — for pitches, negotiations and vendor talks.",
    price: 5,
    popular: true,
    color: "#c9a85c",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
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
      metaDescription: "Professional NDA under English law. Mutual or one-way, injunctive relief, governing law and jurisdiction. Ready-to-sign PDF from £5.",
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

  {
    id: "employment",
    icon: Users,
    label: "Employment Contract",
    description: "Full-time employment contract under the Employment Rights Act 1996.",
    price: 5,
    popular: false,
    color: "#7ea8b8",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Statutory written particulars (s.1 ERA 1996)",
      "Salary, holiday and pension",
      "Working hours and overtime",
      "Probationary period",
      "Notice and PILON",
      "Confidentiality and restrictive covenants",
    ],
    fieldGroups: [
      {
        title: "Employer",
        fields: [
          { key: "employer_name", label: "Company name", placeholder: "Acme Ltd", type: "text" },
          { key: "employer_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "employer_address", label: "Registered address", placeholder: "1 King's Road, London EC1A 1AA", type: "text" },
        ],
      },
      {
        title: "Employee",
        fields: [
          { key: "employee_name", label: "Full name", placeholder: "John Smith", type: "text" },
          { key: "employee_address", label: "Address", placeholder: "10 Oak Lane, Bristol BS1 1AA", type: "text" },
          { key: "employee_dob", label: "Date of birth", placeholder: "01 January 1990", type: "text" },
        ],
      },
      {
        title: "Role & Remuneration",
        fields: [
          { key: "title", label: "Job title", placeholder: "Senior Software Engineer", type: "text" },
          { key: "department", label: "Department", placeholder: "Engineering", type: "text" },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "salary", label: "Annual salary (GBP)", placeholder: "65000", type: "number" },
          { key: "hours", label: "Weekly hours", placeholder: "37.5", type: "number" },
          { key: "probation_months", label: "Probation period (months)", placeholder: "6", type: "number" },
          { key: "holiday_days", label: "Annual holiday (days, inc. bank holidays)", placeholder: "28", type: "number" },
        ],
      },
      {
        title: "Notice & Restrictions",
        fields: [
          { key: "notice_weeks", label: "Notice period (weeks)", placeholder: "8", type: "number" },
          { key: "non_compete", label: "Restrictive covenant", type: "select", options: ["None", "3 months non-compete", "6 months non-compete", "12 months non-compete"] },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `CONTRACT OF EMPLOYMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "employer_name", "[Employer]")} (company no. ${v(val, "employer_number", "—")}),
    of ${v(val, "employer_address", "[address]")} ("Employer"); and

(2) ${v(val, "employee_name", "[Employee]")},
    of ${v(val, "employee_address", "[address]")} ("Employee"),
    date of birth: ${v(val, "employee_dob", "—")}.

This document sets out the written statement of particulars of employment required
by section 1 of the Employment Rights Act 1996.

1. POSITION
1.1 The Employee is employed as ${v(val, "title", "[Job title]")} in the
    ${v(val, "department", "—")} department.
1.2 Employment begins on ${v(val, "start_date", "[start date]")}. No previous
    employment counts as part of the Employee's continuous period of employment.

2. PROBATIONARY PERIOD
2.1 The first ${v(val, "probation_months", "6")} months of employment are probationary.
2.2 During probation, either party may terminate on one week's written notice.

3. SALARY
3.1 The Employer shall pay the Employee an annual gross salary of GBP
    ${v(val, "salary", "[salary]")}, payable monthly in arrears on or about the last
    working day of each month, by BACS transfer.
3.2 Salary is subject to review annually. Review does not imply an increase.

4. HOURS OF WORK
4.1 Normal working hours are ${v(val, "hours", "37.5")} hours per week, Monday to Friday.
4.2 The Employee agrees to work such additional hours as are reasonably necessary
    for the proper performance of duties, subject to the Working Time Regulations 1998.

5. HOLIDAY
5.1 The Employee is entitled to ${v(val, "holiday_days", "28")} days paid annual leave
    per holiday year (inclusive of public and bank holidays), pro-rated in the first
    and final year of employment.

6. SICKNESS
6.1 The Employee is entitled to Statutory Sick Pay in accordance with prevailing
    HMRC rules. Any enhanced company sick pay is at the Employer's discretion.

7. PENSION
7.1 The Employer operates a qualifying workplace pension scheme in accordance with
    the Pensions Act 2008. The Employee will be auto-enrolled if eligible.

8. NOTICE OF TERMINATION
8.1 After probation, either party may terminate employment on
    ${v(val, "notice_weeks", "8")} weeks' written notice, subject to the statutory
    minimum notice in section 86 of the Employment Rights Act 1996.
8.2 The Employer may make a payment in lieu of notice (PILON) at its discretion,
    equal to basic salary only for the unexpired notice period.

9. CONFIDENTIALITY
9.1 The Employee shall not, during or after employment, use or disclose any
    confidential information of the Employer or its customers.

10. RESTRICTIVE COVENANTS
10.1 ${v(val, "non_compete", "None") === "None"
  ? "No post-termination non-compete covenant applies."
  : `For a period of ${v(val, "non_compete", "—").replace(" non-compete", "")} after termination, the Employee
     shall not (within the territory in which the Employer actively trades) engage
     in any business which competes with the Employer's business, to the extent
     necessary to protect the Employer's legitimate business interests.`}

11. DATA PROTECTION
11.1 The Employer processes the Employee's personal data in accordance with the UK
     GDPR and the Data Protection Act 2018. Details are set out in the Employer's
     Employee Privacy Notice.

12. GOVERNING LAW AND JURISDICTION
12.1 This Agreement is governed by the laws of England and Wales.
12.2 The parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}
     and the Employment Tribunal in respect of statutory claims.

Signed for and on behalf of the Employer:

_______________________          _______________________
Name / Position                  Date

Signed by the Employee:

_______________________          _______________________
Name                             Date`,
    seo: {
      metaTitle: "Employment contract template — English law (ERA 1996) | Kontraktly",
      metaDescription: "Compliant UK employment contract with statutory written particulars under s.1 Employment Rights Act 1996. Salary, holiday, notice, PILON. PDF from £5.",
      longDescription: "Every UK employer must give employees a written statement of particulars from day one of employment, under section 1 of the Employment Rights Act 1996 (as amended by the Employment Rights (Employment Particulars and Paid Annual Leave) (Amendment) Regulations 2018). This template provides a full contract of employment that satisfies those statutory requirements and adds commercially standard clauses on confidentiality, restrictive covenants, notice, PILON and data protection. It is suitable for full-time permanent employees in England and Wales.",
      useCases: [
        "Hiring your first UK employee as a growing startup",
        "Standardising employment contracts across a small team",
        "Formalising an existing informal arrangement into a written contract",
        "Onboarding a senior hire with restrictive covenants",
      ],
      includes: [
        "Statutory written particulars under s.1 Employment Rights Act 1996",
        "Employer and employee identification with company number",
        "Job title, department and start date",
        "Salary, payment method and salary review",
        "Working hours consistent with the Working Time Regulations 1998",
        "Holiday entitlement (default 28 days inclusive of bank holidays)",
        "Statutory Sick Pay reference",
        "Auto-enrolment pension under the Pensions Act 2008",
        "Notice period with statutory minimum under s.86 ERA 1996",
        "PILON clause capped at basic salary",
        "Confidentiality obligations that survive termination",
        "Optional restrictive covenant (none / 3 / 6 / 12 months)",
        "UK GDPR / Data Protection Act 2018 note",
      ],
      legalBasis: "This template is drafted under English law and reflects the Employment Rights Act 1996 (particulars, notice, unfair dismissal), the Working Time Regulations 1998 (hours, rest, holiday), the Equality Act 2010 (non-discrimination), the Pensions Act 2008 (auto-enrolment), and the UK GDPR / Data Protection Act 2018. It does not address Scottish-law variations, executive service agreements, or highly regulated sectors (financial services, healthcare, aviation) where sector-specific rules apply.",
      faqs: [
        {
          q: "What is the statutory minimum notice period?",
          a: "Under s.86 of the Employment Rights Act 1996, the statutory minimum notice from employer to employee is one week for each complete year of service (up to a maximum of 12 weeks after 12 years). From employee to employer, the statutory minimum is one week once the employee has been continuously employed for one month. The contractual notice in this template is a floor above the statutory minimum, whichever is greater.",
        },
        {
          q: "Are restrictive covenants enforceable in the UK?",
          a: "Post-termination restrictive covenants are enforceable only if they go no further than is reasonably necessary to protect the employer's legitimate business interests — typically confidential information, customer connections and workforce stability. Duration matters: 3–6 months is usually defensible for most roles; 12 months requires stronger justification (senior executives, unique client relationships). Overly broad covenants risk being struck down entirely.",
        },
        {
          q: "How long can a probationary period last?",
          a: "There is no statutory cap on probation length in the UK. Six months is common for professional roles, extendable to 9–12 months for senior positions. However, unfair dismissal protection generally requires 2 years' continuous service, so the practical value of a long probation is limited — for most cases, dismissal within the first 2 years does not attract standard unfair dismissal claims regardless of whether probation has ended.",
        },
        {
          q: "Do I need to auto-enrol the employee in a pension?",
          a: "Yes. Under the Pensions Act 2008, all UK employers must auto-enrol eligible workers (aged 22 to State Pension age, earning above the earnings trigger, currently £10,000) into a qualifying workplace pension scheme, contribute at least 3% of qualifying earnings, and process opt-outs correctly. The template flags this obligation; you must set up a scheme (e.g. Nest, The People's Pension) separately.",
        },
      ],
    },
  },

  {
    id: "consultancy",
    icon: Pen,
    label: "Consultancy Agreement",
    description: "B2B framework agreement for ongoing consultancy services between two companies.",
    price: 5,
    popular: false,
    color: "#c9a85c",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Master services agreement with SOW model",
      "Day rate or fixed fee billing",
      "Service levels and deliverables",
      "Change control mechanism",
      "IP assignment on payment",
      "IR35 status confirmation",
    ],
    fieldGroups: [
      {
        title: "Client",
        fields: [
          { key: "client_name", label: "Company name", placeholder: "Client Ltd", type: "text" },
          { key: "client_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "client_contact", label: "Contact person", placeholder: "Jane Doe, COO", type: "text" },
        ],
      },
      {
        title: "Consultant",
        fields: [
          { key: "vendor_name", label: "Consultancy name", placeholder: "Consulting Ltd", type: "text" },
          { key: "vendor_number", label: "Company number", placeholder: "87654321", type: "text" },
          { key: "vendor_contact", label: "Contact person", placeholder: "John Smith, Director", type: "text" },
        ],
      },
      {
        title: "Services & Fees",
        fields: [
          { key: "service_desc", label: "Description of services", placeholder: "Strategic IT architecture advisory...", type: "textarea" },
          { key: "day_rate", label: "Day rate (GBP, ex VAT)", placeholder: "1200", type: "number" },
          { key: "billing_cycle", label: "Billing frequency", type: "select", options: ["Monthly", "Fortnightly", "Per deliverable"] },
          { key: "payment_days", label: "Payment terms (days)", placeholder: "30", type: "number" },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "notice_months", label: "Notice period (months)", placeholder: "1", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `CONSULTANCY AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "client_name", "[Client Ltd]")} (company no. ${v(val, "client_number", "—")}),
    contact: ${v(val, "client_contact", "—")} ("Client"); and

(2) ${v(val, "vendor_name", "[Consultant Ltd]")} (company no. ${v(val, "vendor_number", "—")}),
    contact: ${v(val, "vendor_contact", "—")} ("Consultant").

1. SERVICES
1.1 The Consultant shall provide the following services (the "Services") to the Client:
    ${v(val, "service_desc", "[Describe the services]")}
1.2 Individual assignments may be documented in Statements of Work ("SOWs") referring
    to this Agreement, which shall govern in the event of conflict except where the
    SOW expressly amends this Agreement.

2. FEES AND EXPENSES
2.1 The Client shall pay the Consultant at the rate of GBP ${v(val, "day_rate", "[day rate]")}
    per day, exclusive of VAT.
2.2 Invoices shall be raised ${v(val, "billing_cycle", "Monthly")} and paid within
    ${v(val, "payment_days", "30")} days of receipt.
2.3 Pre-approved travel and accommodation expenses shall be reimbursed at cost.
2.4 Late payment interest applies under the Late Payment of Commercial Debts
    (Interest) Act 1998.

3. TERM AND TERMINATION
3.1 This Agreement commences on ${v(val, "start_date", "[start date]")} and continues
    until terminated on ${v(val, "notice_months", "1")} month's written notice by either
    party.
3.2 Either party may terminate immediately on material breach not remedied within
    30 days of written notice.

4. STATUS AND IR35
4.1 The Consultant is engaged as an independent contractor. Neither the Consultant
    nor any of its personnel is an employee, worker or agent of the Client.
4.2 The Consultant is responsible for its own tax, National Insurance and VAT. If the
    off-payroll working rules (IR35) apply to any assignment, the parties shall agree
    the appropriate status determination process in the relevant SOW.
4.3 The Consultant has the right to substitute equivalently qualified personnel,
    subject to the Client's reasonable prior approval.

5. INTELLECTUAL PROPERTY
5.1 On full payment for the relevant deliverable, the Consultant assigns to the
    Client with full title guarantee all intellectual property rights in the
    deliverables created specifically for the Client under this Agreement or a SOW.
5.2 The Consultant retains ownership of all pre-existing methodologies, frameworks,
    tools and generic know-how used in delivering the Services, and grants the Client
    a perpetual, royalty-free licence to use them to the extent embedded in
    deliverables.

6. CONFIDENTIALITY
6.1 Each party shall treat as confidential all non-public information disclosed by
    the other, and shall not use it other than for the purposes of this Agreement.
6.2 This obligation continues for 2 years after termination.

7. LIABILITY
7.1 Neither party excludes liability for death or personal injury caused by
    negligence, fraud, or any liability that cannot be excluded by law.
7.2 Subject to clause 7.1, the Consultant's total liability under this Agreement
    (whether in contract, tort or otherwise) shall not exceed the fees paid in the
    12 months preceding the claim.

8. GOVERNING LAW AND JURISDICTION
8.1 This Agreement is governed by the laws of England and Wales.
8.2 The parties submit to the exclusive jurisdiction of the courts of England and Wales.

Signed for the Client:                   Signed for the Consultant:

_______________________          _______________________
Name / Position / Date           Name / Position / Date`,
    seo: {
      metaTitle: "Consultancy agreement template — English law | Kontraktly",
      metaDescription: "B2B master consultancy agreement under English law. Day rate, SOW model, IR35, IP assignment, liability cap. PDF from £5.",
      longDescription: "A consultancy agreement is used when one company engages another (or a personal service company) to deliver advisory or professional services over time. Unlike a freelance agreement, it is a B2B framework — typically written as a master services agreement with individual Statements of Work bolted on. This template is drafted under English law and reflects UK-specific concerns: IR35 status, VAT treatment, late payment interest, right of substitution, and IP assignment on payment.",
      useCases: [
        "You run a consultancy and are agreeing a framework with a new client",
        "You engage external strategic, IT or financial advisors",
        "You need a master agreement that individual SOWs can attach to",
        "You want a right of substitution clause to support outside-IR35 status",
      ],
      includes: [
        "Master services structure with reference to SOWs",
        "Day rate exclusive of VAT",
        "Billing frequency and payment terms",
        "Late payment interest under the Late Payment of Commercial Debts (Interest) Act 1998",
        "Reimbursable expenses at cost with prior approval",
        "Termination for convenience on notice, and immediate termination for material breach",
        "Independent contractor status confirmation and IR35 note",
        "Right of substitution to support outside-IR35 characterisation",
        "IP assignment on payment with pre-existing IP carve-out and licence-back",
        "Confidentiality with 2-year post-termination survival",
        "Liability cap at 12 months of fees, with statutory carve-outs",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales. It reflects standard commercial practice for B2B professional services engagements and takes account of the off-payroll working rules (IR35, as codified in Part 2 Chapter 8 and Chapter 10 of the Income Tax (Earnings and Pensions) Act 2003), the Late Payment of Commercial Debts (Interest) Act 1998, and the Copyright, Designs and Patents Act 1988. Sector-specific consulting (regulated advice, medical, legal) requires additional professional-body compliance.",
      faqs: [
        {
          q: "Do I need this and separate Statements of Work?",
          a: "Yes — the master agreement fixes the commercial and legal architecture (fees, IP, liability, termination), while each SOW describes the specific engagement (deliverables, timeline, milestones, acceptance criteria). This structure lets you start new pieces of work quickly without renegotiating fundamentals each time, and keeps the master agreement stable across multiple engagements.",
        },
        {
          q: "How does IR35 apply to a consultancy engagement?",
          a: "Since April 2021, medium and large private-sector clients must determine whether an off-payroll worker (typically a personal service company consultant) is inside or outside IR35. If inside, the client must operate PAYE on payments. The right of substitution in clause 4.3, together with genuinely independent working practices, supports outside-IR35 status — but the contract is only one factor. The reality of the engagement matters most; HMRC uses the CEST tool as an initial indicator.",
        },
        {
          q: "Can the consultant refuse to do work under the master agreement?",
          a: "Yes. Under this framework, no work is committed until a specific SOW is signed. The master agreement sets the terms on which work can be done but imposes no obligation on either party to enter into any particular engagement. This mutual absence of commitment strengthens the argument that there is no mutuality of obligation for IR35 purposes.",
        },
        {
          q: "Why is VAT specified separately from the day rate?",
          a: "In B2B engagements, the client typically recovers VAT as input tax, so quoting the day rate exclusive of VAT is standard and avoids surprises. The consultant charges VAT on top if VAT-registered (mandatory above £90,000 turnover from April 2024). If the client is not VAT-registered or in a partially exempt sector, quote inclusive to avoid ambiguity.",
        },
      ],
    },
  },

  {
    id: "shareholders",
    icon: BarChart2,
    label: "Shareholders' Agreement",
    description: "Governs rights and obligations between shareholders of a UK private limited company.",
    price: 5,
    popular: false,
    color: "#7e9eb8",
    category: "naringsliv",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Voting and reserved matters",
      "Pre-emption rights on transfer and issue",
      "Drag-along and tag-along rights",
      "Dividend policy",
      "Deadlock resolution",
      "Confidentiality and restrictive covenants",
    ],
    fieldGroups: [
      {
        title: "The Company",
        fields: [
          { key: "company_name", label: "Company name", placeholder: "Newco Ltd", type: "text" },
          { key: "company_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "company_address", label: "Registered office", placeholder: "1 Founders Lane, London EC2A 4NE", type: "text" },
        ],
      },
      {
        title: "Shareholders",
        fields: [
          { key: "sh1_name", label: "Shareholder 1 — name", placeholder: "Jane Doe", type: "text" },
          { key: "sh1_pct", label: "Shareholder 1 — holding (%)", placeholder: "60", type: "number" },
          { key: "sh2_name", label: "Shareholder 2 — name", placeholder: "John Smith", type: "text" },
          { key: "sh2_pct", label: "Shareholder 2 — holding (%)", placeholder: "40", type: "number" },
        ],
      },
      {
        title: "Rights & Restrictions",
        fields: [
          { key: "lockup_months", label: "Lock-up period (months)", placeholder: "24", type: "number" },
          { key: "drag_along", label: "Drag-along right", type: "select", options: ["Yes", "No"] },
          { key: "tag_along", label: "Tag-along right", type: "select", options: ["Yes", "No"] },
          { key: "preemption", label: "Pre-emption on transfer", type: "select", options: ["Yes", "No"] },
          { key: "dividend_policy", label: "Dividend policy", type: "select", options: ["Pro rata to holdings", "Board discretion", "No dividend for first 3 years"] },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `SHAREHOLDERS' AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "sh1_name", "[Shareholder 1]")} — holding ${v(val, "sh1_pct", "?")}% of the issued share capital;

(2) ${v(val, "sh2_name", "[Shareholder 2]")} — holding ${v(val, "sh2_pct", "?")}% of the issued share capital;

(each a "Shareholder" and together the "Shareholders")

and

(3) ${v(val, "company_name", "[Company Ltd]")} (company no. ${v(val, "company_number", "—")}),
    registered office ${v(val, "company_address", "[address]")} (the "Company").

BACKGROUND
The Shareholders wish to regulate their relationship as shareholders of the Company,
in addition to (and consistent with) the Companies Act 2006 and the Company's
articles of association.

1. VOTING AND RESERVED MATTERS
1.1 Voting rights attach in proportion to shareholding.
1.2 The following "Reserved Matters" require the prior written consent of Shareholders
    holding at least 75% of the issued share capital:
    (a) any amendment to the articles of association;
    (b) any issue, redemption or buy-back of shares;
    (c) any material change to the nature of the Company's business;
    (d) any sale of all or substantially all of the assets;
    (e) any incurrence of borrowings above a materiality threshold to be agreed;
    (f) approval of the annual budget and any material variation to it;
    (g) any related-party transaction.

2. PRE-EMPTION ON TRANSFER
2.1 Pre-emption on transfer: ${v(val, "preemption", "Yes")}. Where "Yes", no Shareholder
    may transfer shares to a third party without first offering them to the other
    Shareholders on the same terms, pro rata to their existing holdings.

3. TAG-ALONG (SALE PROTECTION FOR MINORITY)
3.1 Tag-along: ${v(val, "tag_along", "Yes")}. Where "Yes", if a Shareholder proposes to
    sell shares representing more than 50% of the issued share capital to a third
    party, the other Shareholders may require the buyer to purchase their shares on
    the same terms and at the same price per share.

4. DRAG-ALONG (COMPULSORY SALE)
4.1 Drag-along: ${v(val, "drag_along", "Yes")}. Where "Yes", if Shareholders holding at
    least 75% wish to sell 100% of the issued share capital to a bona fide third
    party, they may require the remaining Shareholders to sell on the same terms.

5. LOCK-UP
5.1 No Shareholder may transfer any shares during the first ${v(val, "lockup_months", "24")}
    months following the date of this Agreement, save with the unanimous written
    consent of the other Shareholders.

6. DIVIDEND POLICY
6.1 Dividend policy: ${v(val, "dividend_policy", "Pro rata to holdings")}. Dividends
    shall only be declared out of distributable profits in accordance with Part 23
    of the Companies Act 2006.

7. DEADLOCK
7.1 If the Shareholders cannot agree on a Reserved Matter within 30 days of a formal
    notice of deadlock, the matter shall be referred to mediation under the CEDR Model
    Mediation Procedure. If mediation fails within a further 30 days, either party may
    initiate a Russian Roulette buyout procedure at a price notified by the initiating
    party per share.

8. CONFIDENTIALITY
8.1 Each Shareholder shall keep confidential all non-public information about the
    Company for the duration of their shareholding and 3 years thereafter.

9. GENERAL
9.1 This Agreement shall prevail over the articles of association to the extent of any
    conflict (as between the Shareholders — not as against third parties).
9.2 A person who is not a party to this Agreement has no rights under the
    Contracts (Rights of Third Parties) Act 1999.

10. GOVERNING LAW AND JURISDICTION
10.1 This Agreement is governed by the laws of England and Wales.
10.2 The parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}.

Signed by ${v(val, "sh1_name", "Shareholder 1")}:      Signed by ${v(val, "sh2_name", "Shareholder 2")}:

_______________________          _______________________
Date                             Date

Signed for and on behalf of the Company:

_______________________
Director / Date`,
    seo: {
      metaTitle: "Shareholders' agreement template — English law | Kontraktly",
      metaDescription: "Shareholders' agreement for a UK private limited company. Pre-emption, drag/tag, reserved matters, deadlock. Companies Act 2006. PDF from £5.",
      longDescription: "A shareholders' agreement supplements the Companies Act 2006 and the company's articles of association by addressing what the statutory framework leaves open: how shareholders behave towards each other, what decisions need supermajority approval, what happens on transfer or sale, and how deadlock is broken. Without one, minority shareholders can block change or majority shareholders can act without check. This template is drafted under English law and covers the essentials for a UK private company limited by shares with two or more founders or investors.",
      useCases: [
        "You are founding a company with one or more co-founders",
        "You are bringing in a new investor or key employee shareholder",
        "You are a family-owned company wanting to formalise governance",
        "You want to lock in pre-emption before an outside sale becomes possible",
      ],
      includes: [
        "Identification of the company and each shareholder with holding percentages",
        "Voting rights proportional to holdings",
        "Reserved matters list requiring 75% approval",
        "Pre-emption rights on transfer of shares",
        "Tag-along rights for minority shareholders",
        "Drag-along rights for a 75% majority selling 100%",
        "Lock-up period restricting early transfers",
        "Dividend policy tied to Part 23 CA 2006 distributable profits",
        "Deadlock procedure with mediation and Russian Roulette buyout",
        "Confidentiality during and after shareholding",
        "Prevalence over articles as between shareholders",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales and sits alongside the Companies Act 2006 and the company's articles of association. Distributable profits are governed by Part 23 CA 2006. Share transfers may also engage the CA 2006 rules on pre-emption on allotment (s.561), which this agreement does not disapply — it addresses transfer, not issue. It is not tailored for public companies, EIS/SEIS investment rounds, or founders' agreements involving vesting on employment termination.",
      faqs: [
        {
          q: "How does a shareholders' agreement interact with the articles of association?",
          a: "The articles are a public document filed at Companies House and bind the company and its shareholders as a matter of company law. A shareholders' agreement is a private contract between the shareholders (and often the company) and is not filed publicly. As between the shareholders, the agreement prevails on any conflict — but third parties dealing with the company can only rely on the articles. Sensitive commercial terms (deadlock, dividend expectations, investor consents) typically live in the agreement, not the articles.",
        },
        {
          q: "What are drag-along and tag-along rights?",
          a: "Tag-along protects the minority: if the majority agrees to sell, the minority can require the buyer to purchase their shares on the same terms. Drag-along protects the majority (and a buyer wanting 100%): if a supermajority wants to sell the whole company, they can compel minority shareholders to sell too. Together they align incentives on exit — no one gets left behind, and no minority holder can block a sale that everyone else supports.",
        },
        {
          q: "Do we need a shareholders' agreement if there are only two of us?",
          a: "Especially with two shareholders. A 50/50 split can produce deadlock on any decision requiring shareholder approval, potentially freezing the company. Even a 60/40 or 70/30 split leaves gaps the articles do not fill — buy-out mechanics if one founder leaves, whether they can be forced out for cause (a leaver clause), whether their shares should vest over time. The agreement is the vehicle for these founder-critical questions.",
        },
        {
          q: "Is a shareholders' agreement enforceable against the company itself?",
          a: "Provisions that purport to bind the company (e.g. requiring the company to declare a dividend, or restricting share issues) are unenforceable if they conflict with the Companies Act — for example, the CA cannot be contracted out of. However, provisions that bind only the shareholders (agreeing among themselves how to vote on a matter) are enforceable as ordinary contract. This is why the agreement is drafted to bind the shareholders' voting behaviour, not the company's ability to act.",
        },
      ],
    },
  },

  {
    id: "distribution",
    icon: Truck,
    label: "Distribution Agreement",
    description: "Agreement between a supplier and an independent distributor for resale of goods.",
    price: 5,
    popular: false,
    color: "#b8a07e",
    category: "naringsliv",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Exclusive or non-exclusive territory",
      "Minimum purchase obligation",
      "Pricing and margins",
      "Trade mark licence and marketing",
      "Competition law compliance",
      "Termination and run-off",
    ],
    fieldGroups: [
      {
        title: "Supplier",
        fields: [
          { key: "supplier_name", label: "Company name", placeholder: "Supplier Ltd", type: "text" },
          { key: "supplier_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "supplier_contact", label: "Contact person", placeholder: "Jane Doe", type: "text" },
        ],
      },
      {
        title: "Distributor",
        fields: [
          { key: "dist_name", label: "Company name", placeholder: "Distributor Ltd", type: "text" },
          { key: "dist_number", label: "Company number", placeholder: "87654321", type: "text" },
          { key: "dist_contact", label: "Contact person", placeholder: "John Smith", type: "text" },
        ],
      },
      {
        title: "Commercial Terms",
        fields: [
          { key: "products", label: "Products / category", placeholder: "Sports nutrition — all SKUs", type: "textarea" },
          { key: "territory", label: "Territory", placeholder: "United Kingdom and Ireland", type: "text" },
          { key: "exclusivity", label: "Exclusivity", type: "select", options: ["Exclusive", "Non-exclusive"] },
          { key: "min_volume", label: "Minimum annual purchase (GBP)", placeholder: "250000", type: "number" },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "duration_years", label: "Initial term (years)", placeholder: "2", type: "number" },
          { key: "notice_months", label: "Notice period (months)", placeholder: "3", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `DISTRIBUTION AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "supplier_name", "[Supplier Ltd]")} (company no. ${v(val, "supplier_number", "—")}),
    contact: ${v(val, "supplier_contact", "—")} ("Supplier"); and

(2) ${v(val, "dist_name", "[Distributor Ltd]")} (company no. ${v(val, "dist_number", "—")}),
    contact: ${v(val, "dist_contact", "—")} ("Distributor").

1. APPOINTMENT
1.1 The Supplier appoints the Distributor as its ${v(val, "exclusivity", "Non-exclusive")}
    distributor of the Products in the Territory, and the Distributor accepts the
    appointment on the terms of this Agreement.
1.2 "Products": ${v(val, "products", "[Product description]")}.
1.3 "Territory": ${v(val, "territory", "[Territory]")}.

2. RESALE AS PRINCIPAL
2.1 The Distributor purchases Products from the Supplier as principal and resells
    them in its own name and for its own account. The Distributor is not the agent
    of the Supplier and has no authority to bind the Supplier.

3. MINIMUM PURCHASE COMMITMENT
3.1 The Distributor shall purchase Products with an aggregate value of not less
    than GBP ${v(val, "min_volume", "[amount]")} in each calendar year of the term.
3.2 If the Distributor fails to meet the minimum commitment, the Supplier may (i)
    convert an exclusive appointment to non-exclusive on 30 days' notice, or (ii)
    terminate this Agreement on 60 days' notice.

4. PRICES AND PAYMENT
4.1 Products shall be supplied at the Supplier's list prices in effect at the date of
    each order, subject to any distributor discount agreed in writing.
4.2 Invoices are payable within 30 days of the date of invoice. Late payment interest
    applies under the Late Payment of Commercial Debts (Interest) Act 1998.

5. TRADE MARKS AND MARKETING
5.1 The Supplier grants the Distributor a non-exclusive, non-transferable, royalty-
    free licence to use the Supplier's trade marks solely for the purpose of
    promoting and reselling the Products during the term.
5.2 The Distributor shall use the trade marks in the form and manner specified in
    the Supplier's brand guidelines and shall not register, or apply to register,
    any confusingly similar mark.

6. COMPETITION LAW
6.1 Nothing in this Agreement shall prevent the Distributor from responding to
    unsolicited orders from customers located outside the Territory (passive sales).
    Active sales outside the Territory may be restricted as permitted by the UK
    Vertical Block Exemption Regulation and Article 101 TFEU / Chapter I Competition
    Act 1998 as applicable.
6.2 The Distributor is free to set its own resale prices.

7. TERM AND TERMINATION
7.1 This Agreement commences on ${v(val, "start_date", "[start date]")} and continues
    for an initial term of ${v(val, "duration_years", "2")} years, and thereafter
    continues until terminated on ${v(val, "notice_months", "3")} months' written notice
    by either party.
7.2 Either party may terminate immediately on material breach not remedied within
    30 days of written notice, or on insolvency of the other.

8. RUN-OFF
8.1 On termination, the Distributor may sell existing stock for 90 days, after which
    the Supplier shall repurchase remaining stock at cost.

9. CONFIDENTIALITY
9.1 Each party shall treat pricing and commercial terms as confidential during and
    for 3 years after termination.

10. GOVERNING LAW AND JURISDICTION
10.1 This Agreement is governed by the laws of England and Wales.
10.2 The parties submit to the exclusive jurisdiction of the courts of England and Wales.

Signed for the Supplier:                 Signed for the Distributor:

_______________________          _______________________
Name / Position / Date           Name / Position / Date`,
    seo: {
      metaTitle: "Distribution agreement template — English law | Kontraktly",
      metaDescription: "UK distribution agreement between supplier and reseller. Territory, exclusivity, minimum purchase, VBER-compliant. PDF from £5.",
      longDescription: "A distribution agreement governs the relationship between a supplier (or importer) and an independent reseller who buys goods for resale in a defined market. This template is drafted under English law and reflects the UK's post-Brexit competition regime, in particular the retained Vertical Block Exemption and the Competition Act 1998. It covers exclusivity, territory, minimum purchase commitments, trade mark licensing, competition-law-compliant sales restrictions, and run-off arrangements on termination.",
      useCases: [
        "You are a UK supplier appointing a distributor in the UK, Ireland or wider EMEA",
        "You are an importer bringing a foreign brand into the UK market",
        "You are formalising an existing supplier-reseller arrangement",
        "You are a retail chain agreeing an exclusive distribution deal on a brand",
      ],
      includes: [
        "Identification of supplier and distributor with company numbers",
        "Definition of Products and Territory",
        "Exclusive or non-exclusive appointment",
        "Resale-as-principal characterisation (contrast with agency)",
        "Minimum annual purchase commitment with conversion or termination remedy",
        "Pricing at supplier list prices with distributor discount",
        "Payment terms with late payment interest under the 1998 Act",
        "Trade mark licence for the duration of the appointment",
        "Competition law compliance clause (passive sales, resale price freedom)",
        "Initial term followed by rolling notice period",
        "Immediate termination for material breach and insolvency",
        "Post-termination run-off of stock",
        "Confidentiality of pricing and commercial terms",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales. It reflects the UK Vertical Agreements Block Exemption Order 2022 (retained after Brexit) and the Competition Act 1998 (Chapter I prohibition on anti-competitive agreements). Key limits: exclusive distribution is generally lawful below 30% market share; restrictions on passive sales are hardcore restrictions and void; resale price maintenance is likewise unlawful. The Late Payment of Commercial Debts (Interest) Act 1998 applies automatically to B2B invoices.",
      faqs: [
        {
          q: "What is the difference between a distributor and an agent?",
          a: "A distributor buys goods from the supplier and resells them in its own name — it takes title, bears stock risk, and sets its own margin above the supplier's price. An agent introduces sales to the supplier without buying the goods, and is paid by commission. Distribution is generally freer to structure commercially; agency is heavily regulated by the Commercial Agents (Council Directive) Regulations 1993 (including compulsory compensation or indemnity on termination).",
        },
        {
          q: "Can I grant exclusivity across the whole UK?",
          a: "Yes, subject to competition law. Exclusive distribution is a permitted vertical restraint under the UK Vertical Block Exemption where neither party exceeds 30% market share in the relevant market. Above that threshold, exclusivity requires individual assessment. What is not permitted (even below the threshold) is banning the distributor from making passive sales — responding to unsolicited orders from customers outside the exclusive territory.",
        },
        {
          q: "What happens if the distributor misses the minimum purchase target?",
          a: "Failure to hit the minimum commitment is typically material breach. Under this template, the supplier can either convert an exclusive appointment to non-exclusive (opening the territory to other resellers) or terminate outright. In practice, a cure period of 60–90 days is often given first — a distributor with genuine market difficulty may need time to adjust rather than lose the appointment outright.",
        },
        {
          q: "Can I control the resale prices the distributor charges?",
          a: "No — resale price maintenance (RPM) is a hardcore restriction of competition and is prohibited under Chapter I of the Competition Act 1998 (and Article 101 TFEU where trade between EU and UK is affected). You may publish a recommended resale price but may not enforce a minimum or fixed price. Discount schemes, promotional rebates and category pricing must be structured carefully to avoid effectively imposing RPM.",
        },
      ],
    },
  },

  {
    id: "agency",
    icon: UserCheck,
    label: "Commercial Agency Agreement",
    description: "Sales agent representing a principal under the Commercial Agents Regulations 1993.",
    price: 5,
    popular: false,
    color: "#9eb87e",
    category: "naringsliv",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Commission structure and payment",
      "Territory and customer groups",
      "Exclusive or non-exclusive representation",
      "Post-termination compensation or indemnity",
      "Reporting obligations",
      "Regulation compliance",
    ],
    fieldGroups: [
      {
        title: "Principal",
        fields: [
          { key: "principal_name", label: "Company name", placeholder: "Principal Ltd", type: "text" },
          { key: "principal_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "principal_contact", label: "Contact person", placeholder: "Jane Doe", type: "text" },
        ],
      },
      {
        title: "Agent",
        fields: [
          { key: "agent_name", label: "Agent name / company", placeholder: "Agent Ltd / John Smith", type: "text" },
          { key: "agent_number", label: "Company / UTR (optional)", placeholder: "87654321", type: "text" },
          { key: "agent_email", label: "Email", placeholder: "agent@example.com", type: "text" },
        ],
      },
      {
        title: "Appointment & Commission",
        fields: [
          { key: "products", label: "Products or services", placeholder: "Industrial machinery", type: "textarea" },
          { key: "territory", label: "Territory", placeholder: "United Kingdom", type: "text" },
          { key: "exclusivity", label: "Exclusivity", type: "select", options: ["Exclusive", "Non-exclusive"] },
          { key: "commission_pct", label: "Commission rate (%)", placeholder: "10", type: "number" },
          { key: "payment_terms", label: "Commission payable", type: "select", options: ["Monthly in arrears", "Quarterly in arrears", "On payment by customer"] },
          { key: "termination_remedy", label: "Termination remedy", type: "select", options: ["Compensation (default)", "Indemnity"] },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "notice_months", label: "Notice period (months)", placeholder: "3", type: "number" },
        ],
      },
    ],
    buildPreview: (val) => `COMMERCIAL AGENCY AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "principal_name", "[Principal Ltd]")} (company no. ${v(val, "principal_number", "—")}),
    contact: ${v(val, "principal_contact", "—")} ("Principal"); and

(2) ${v(val, "agent_name", "[Agent]")} (company / UTR ${v(val, "agent_number", "—")}),
    contact: ${v(val, "agent_email", "—")} ("Agent").

This Agreement is governed by the Commercial Agents (Council Directive) Regulations
1993 ("the Regulations") to the extent applicable.

1. APPOINTMENT
1.1 The Principal appoints the Agent as its ${v(val, "exclusivity", "Non-exclusive")}
    commercial agent for the negotiation of sales of the following goods (the
    "Goods") in the Territory:
    ${v(val, "products", "[Goods description]")}
1.2 "Territory": ${v(val, "territory", "[Territory]")}.
1.3 The Agent shall use its best endeavours to promote and negotiate the sale of the
    Goods in the Territory, but has no authority to conclude sales on behalf of the
    Principal without express written authority.

2. COMMISSION
2.1 The Agent is entitled to commission of ${v(val, "commission_pct", "10")}% (exclusive
    of VAT) on the net invoice value of Goods sold as a result of the Agent's action
    during the term.
2.2 Commission is payable ${v(val, "payment_terms", "Monthly in arrears")}, together
    with a statement of the transactions on which commission is calculated
    (Regulation 12).
2.3 The Agent is entitled to commission on transactions concluded after termination
    if the transaction is mainly attributable to the Agent's efforts during the
    agency and was entered into within a reasonable period after termination
    (Regulation 8).

3. AGENT'S DUTIES
3.1 The Agent shall:
    (a) act dutifully and in good faith towards the Principal (Regulation 3);
    (b) make proper efforts to negotiate and, where appropriate, conclude the
        transactions the Agent is instructed to take care of;
    (c) communicate to the Principal all necessary information available to it; and
    (d) comply with reasonable instructions given by the Principal.

4. PRINCIPAL'S DUTIES
4.1 The Principal shall:
    (a) act dutifully and in good faith towards the Agent (Regulation 4);
    (b) provide the Agent with the necessary documentation relating to the Goods; and
    (c) notify the Agent within a reasonable period once it anticipates that the
        volume of transactions will be significantly lower than the Agent could
        normally have expected.

5. EXPENSES
5.1 The Agent bears its own travel and selling expenses unless otherwise agreed in
    writing.

6. TERM AND TERMINATION
6.1 This Agreement commences on ${v(val, "start_date", "[start date]")} and continues
    until terminated by either party on ${v(val, "notice_months", "3")} months' written
    notice, subject to the statutory minimum notice periods under Regulation 15 (one
    month in the first year, two months in the second, three months thereafter).
6.2 Either party may terminate immediately in the case of material breach or where
    exceptional circumstances arise (Regulation 16).

7. POST-TERMINATION REMEDY
7.1 On termination, the Agent shall be entitled to
    ${v(val, "termination_remedy", "Compensation (default)").startsWith("Indemnity") ? "an indemnity" : "compensation"}
    under the Regulations.
7.2 ${v(val, "termination_remedy", "Compensation (default)").startsWith("Indemnity")
  ? "The indemnity shall not exceed the equivalent of one year's average annual remuneration calculated over the last five years (or the shorter actual term), under Regulation 17(3)."
  : "The compensation shall be assessed by reference to the damage the Agent suffers as a result of termination, valued as the loss of the agency business, under Regulation 17(6)–(7)."}

8. RESTRAINT OF TRADE
8.1 Any restraint of trade on the Agent shall not exceed two years from termination
    and shall be limited to the Territory and the Goods (Regulation 20).

9. GOVERNING LAW AND JURISDICTION
9.1 This Agreement is governed by the laws of England and Wales.
9.2 The parties submit to the exclusive jurisdiction of the courts of England and Wales.

Signed for the Principal:                Signed for the Agent:

_______________________          _______________________
Name / Position / Date           Name / Date`,
    seo: {
      metaTitle: "Commercial agency agreement — Regulations 1993 | Kontraktly",
      metaDescription: "UK sales agent agreement under the Commercial Agents (Council Directive) Regulations 1993. Commission, indemnity or compensation on termination. PDF from £5.",
      longDescription: "A commercial agency agreement engages an independent agent to negotiate (and possibly conclude) sales of goods on behalf of a principal, in return for commission. UK commercial agents enjoy substantial statutory protection under the Commercial Agents (Council Directive) Regulations 1993, retained in UK law after Brexit — most importantly, an inalienable right to indemnity or compensation on termination. This template is drafted under English law and structures the agency to comply with the Regulations while giving the principal the commercial flexibility it needs.",
      useCases: [
        "You are appointing a sales agent to sell your goods in a defined market",
        "You are an independent commercial agent needing a compliant framework",
        "You need to choose explicitly between compensation and indemnity on termination",
        "You are formalising an informal agency arrangement that has been running",
      ],
      includes: [
        "Identification of principal and agent",
        "Description of goods (Regulations apply to goods, not services)",
        "Defined territory and customer group",
        "Exclusive or non-exclusive appointment",
        "Commission rate and payment cycle",
        "Statutory reporting under Regulation 12",
        "Post-termination commission on Regulation 8 transactions",
        "Agent's duties under Regulation 3",
        "Principal's duties under Regulation 4",
        "Statutory minimum notice under Regulation 15",
        "Election between compensation and indemnity (Regulation 17)",
        "Restraint of trade limited to 2 years and to the territory/goods (Regulation 20)",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under English law and gives effect to the Commercial Agents (Council Directive) Regulations 1993 (SI 1993/3053), which continue to apply in UK law post-Brexit. The Regulations apply to agents selling goods (not services), impose non-excludable duties on both parties, provide statutory minimum notice periods, and — most importantly — guarantee the agent either compensation or indemnity on termination. The choice between compensation and indemnity must be made in writing before termination; if not made, compensation applies by default.",
      faqs: [
        {
          q: "What is the difference between compensation and indemnity?",
          a: "Both are termination payments due to the agent under Regulation 17. Indemnity is capped at the equivalent of one year's average annual remuneration and rewards the agent for enduring benefits (new customers, increased sales) the principal keeps. Compensation is uncapped in principle and reflects the value of the agency business the agent loses. The choice must be made in the contract before termination; without a choice, compensation applies by default. Indemnity gives more certainty; compensation can produce larger awards where the agency was substantial.",
        },
        {
          q: "Can I contract out of the Regulations?",
          a: "No, not for a UK-based agent selling goods within the UK or the EEA. The Regulations are mandatory and any clause purporting to exclude them (before termination) is void. This includes the right to indemnity or compensation, the statutory minimum notice periods, and the good-faith duties. You can, however, decide procedural matters (payment cycles, reporting frequency) and elect between compensation and indemnity in writing.",
        },
        {
          q: "Do the Regulations apply to service agents?",
          a: "No. The Regulations apply only to commercial agents negotiating the sale (or purchase) of goods. Agents introducing services — insurance, financial products, professional services — fall outside the Regulations and are governed by ordinary contract law. In practice, agency principles from the Regulations are often used as an interpretive framework even for service agencies, but the mandatory protections do not apply.",
        },
        {
          q: "What notice periods apply if we do not agree one?",
          a: "Regulation 15 sets statutory minimum notice: one month during the first year of the agency, two months during the second year, and three months thereafter. Any contractually agreed notice must be at least equal to these minimums, and any notice given must expire at the end of a calendar month unless the parties agree otherwise. Shorter contractual notice periods are void and the statutory minimum applies.",
        },
      ],
    },
  },

  {
    id: "partnership",
    icon: Handshake,
    label: "Partnership Agreement",
    description: "Contractual joint venture between two companies without forming a new entity.",
    price: 5,
    popular: false,
    color: "#7e8eb8",
    category: "naringsliv",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Purpose and scope of collaboration",
      "Contributions from each party",
      "Profit and cost sharing",
      "Decision-making and deadlock",
      "IP ownership (background vs foreground)",
      "Exit and dissolution",
    ],
    fieldGroups: [
      {
        title: "Party A",
        fields: [
          { key: "a_name", label: "Company name", placeholder: "Party A Ltd", type: "text" },
          { key: "a_number", label: "Company number", placeholder: "12345678", type: "text" },
          { key: "a_contact", label: "Contact / role", placeholder: "Jane Doe, CEO", type: "text" },
        ],
      },
      {
        title: "Party B",
        fields: [
          { key: "b_name", label: "Company name", placeholder: "Party B Ltd", type: "text" },
          { key: "b_number", label: "Company number", placeholder: "87654321", type: "text" },
          { key: "b_contact", label: "Contact / role", placeholder: "John Smith, CTO", type: "text" },
        ],
      },
      {
        title: "Collaboration Terms",
        fields: [
          { key: "purpose", label: "Purpose of the collaboration", placeholder: "Joint development and launch of...", type: "textarea" },
          { key: "a_contribution", label: "Party A contribution", placeholder: "Capital, sales channels", type: "text" },
          { key: "b_contribution", label: "Party B contribution", placeholder: "Technology, development", type: "text" },
          { key: "revenue_split", label: "Net revenue split", placeholder: "50/50", type: "text" },
          { key: "start_date", label: "Start date", type: "date" },
          { key: "duration_years", label: "Duration (years, 0 = open-ended)", placeholder: "0", type: "number" },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => `PARTNERSHIP / JOINT VENTURE AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "a_name", "[Party A Ltd]")} (company no. ${v(val, "a_number", "—")}),
    contact: ${v(val, "a_contact", "—")} ("Party A"); and

(2) ${v(val, "b_name", "[Party B Ltd]")} (company no. ${v(val, "b_number", "—")}),
    contact: ${v(val, "b_contact", "—")} ("Party B").

BACKGROUND
The Parties wish to collaborate on the following venture (the "Purpose") on the
terms set out in this Agreement, without forming a partnership within the meaning
of the Partnership Act 1890 or a body corporate.

1. PURPOSE
1.1 The Parties shall collaborate for the following Purpose:
    ${v(val, "purpose", "[Describe the purpose of the collaboration]")}

2. CONTRIBUTIONS
2.1 Party A shall contribute: ${v(val, "a_contribution", "—")}
2.2 Party B shall contribute: ${v(val, "b_contribution", "—")}

3. FINANCIAL ARRANGEMENTS
3.1 Net revenues and net costs of the Venture shall be shared between the Parties in
    the ratio ${v(val, "revenue_split", "50/50")}.
3.2 Each Party bears its own overheads. Direct project costs shall be documented,
    reconciled quarterly and settled net.

4. GOVERNANCE
4.1 A steering committee comprising one representative of each Party shall meet at
    least monthly to review progress.
4.2 Ordinary operating decisions may be taken by either Party acting within its area
    of contribution. Material decisions (spend above an agreed threshold, IP
    licensing outside the Venture, entry into contracts with third parties above a
    materiality threshold) require the written consent of both Parties.

5. INTELLECTUAL PROPERTY
5.1 "Background IP" is IP owned by a Party before the Effective Date or independently
    developed outside the Venture. Each Party retains ownership of its Background IP
    and grants the other a non-exclusive, royalty-free licence to use it solely for
    the Purpose.
5.2 "Foreground IP" is IP created in performance of the Venture. Foreground IP shall
    be owned in the same ratio as the revenue split, save that each Party has a
    perpetual, royalty-free licence to use Foreground IP outside the Venture for its
    own business, but not to sublicense to competitors of the other Party.

6. CONFIDENTIALITY
6.1 Each Party shall keep confidential all non-public information about the Venture
    and the other Party during the term and for 3 years after termination.

7. NO PARTNERSHIP OR AGENCY
7.1 Nothing in this Agreement constitutes a partnership, agency or employment
    relationship. Neither Party may bind the other without express written authority.

8. TERM AND EXIT
8.1 This Agreement commences on ${v(val, "start_date", "[start date]")}${v(val, "duration_years", "0") === "0"
  ? " and continues until terminated on 3 months' written notice by either Party."
  : ` and continues for ${v(val, "duration_years", "—")} years unless terminated earlier.`}
8.2 On termination, the Parties shall in good faith wind up the Venture, complete
    open commitments, and settle outstanding accounts within 60 days.

9. GOVERNING LAW AND JURISDICTION
9.1 This Agreement is governed by the laws of England and Wales.
9.2 The Parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}.

Signed for Party A:                      Signed for Party B:

_______________________          _______________________
Name / Position / Date           Name / Position / Date`,
    seo: {
      metaTitle: "Partnership / joint venture agreement — English law | Kontraktly",
      metaDescription: "Contractual joint venture between two UK companies. Contributions, revenue split, IP, governance, exit. Not a Partnership Act 1890 partnership. PDF from £5.",
      longDescription: "A contractual joint venture (JV) lets two companies collaborate on a specific opportunity without forming a new legal entity — no new limited company, no partnership under the Partnership Act 1890. This template is drafted under English law and covers the essentials: each party's contribution, how revenue and cost are shared, governance and decision-making, ownership of pre-existing and newly created IP, confidentiality, and how the venture is wound up on exit.",
      useCases: [
        "Two companies bringing complementary capability together on a defined project",
        "A tech company and a market player launching a joint product",
        "A strategic collaboration where a new corporate entity would be too heavy",
        "Formalising an existing informal collaboration",
      ],
      includes: [
        "Identification of both parties (companies with contact persons)",
        "Clear statement of Purpose",
        "Description of each party's contribution",
        "Net revenue / net cost sharing ratio",
        "Steering committee governance",
        "Distinction between ordinary and material decisions",
        "Background vs Foreground IP with licence-back arrangements",
        "Confidentiality with post-termination survival",
        "Express negation of partnership, agency and employment",
        "Term with rolling notice, or fixed duration",
        "Wind-up mechanism on exit",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under the laws of England and Wales. The Partnership Act 1890 defines a partnership as the relation between persons carrying on a business in common with a view of profit, which creates joint and several liability for partners. This template deliberately excludes that characterisation and structures the arrangement as a contractual collaboration — each party remains separately liable for its own actions. Competition law (Competition Act 1998 / Chapter I) limits how far competitors can coordinate; joint ventures between competitors need particular care around information exchange and market coordination.",
      faqs: [
        {
          q: "What is the difference between a contractual JV and a corporate JV?",
          a: "A corporate JV creates a new legal entity (typically a limited company) owned by both parties, which contracts with third parties, holds IP, employs staff and files its own accounts. It gives clean limited liability and clear governance, but is heavier to set up, run and wind up. A contractual JV — as in this template — is just an agreement between two existing companies; there is no new entity to form or dissolve, but the parties each contract directly with third parties and there is no independent balance sheet.",
        },
        {
          q: "Who owns IP created during the collaboration?",
          a: "Under this template, newly created IP (Foreground IP) is owned in the same ratio as the revenue split, but each party has a licence to use it in its own separate business (excluding sublicensing to competitors). Pre-existing IP (Background IP) stays with the party that brought it, licensed to the venture for the duration. In practice, it pays to be explicit about which pieces of IP are foreground versus background — arguments about ownership of jointly developed technology are one of the most common JV disputes.",
        },
        {
          q: "Can we compete with each other after the JV ends?",
          a: "Generally yes. Post-termination non-compete restraints are enforceable only if narrow, proportionate and time-limited, and even then are viewed sceptically as restraints of trade. Confidentiality obligations continue and protect against misuse of the other party's know-how, but neither party is prevented from operating in the same market as the other after wind-up. If the JV created a genuinely joint business with joint customers, buy-out mechanics may be needed instead of a non-compete.",
        },
        {
          q: "Do we need to notify HMRC or Companies House?",
          a: "No — a contractual JV is not a filed entity. Each party continues to file its own accounts and returns as normal. However, revenue and costs allocated between the parties may have VAT and transfer pricing implications (particularly for related parties), and joint tax filings may be needed if the collaboration is characterised as a partnership for tax purposes despite being drafted otherwise. Take tax advice on any material JV.",
        },
      ],
    },
  },

  {
    id: "sale-of-goods",
    icon: ShoppingCart,
    label: "Sale of Goods Agreement",
    description: "General contract for the sale of goods or services between businesses or individuals.",
    price: 5,
    popular: false,
    color: "#8bb87e",
    category: "bedrift",
    locale: "en",
    jurisdiction: "uk",
    currency: "GBP",
    features: [
      "Description of goods or services",
      "Price and payment terms",
      "Delivery and passing of risk",
      "Warranty and remedies",
      "Sale of Goods Act 1979 / Consumer Rights Act 2015 references",
      "Termination and governing law",
    ],
    fieldGroups: [
      {
        title: "Seller",
        fields: [
          { key: "seller_name", label: "Name / company", placeholder: "Seller Ltd", type: "text" },
          { key: "seller_number", label: "Company number (optional)", placeholder: "12345678", type: "text" },
          { key: "seller_email", label: "Email", placeholder: "seller@example.com", type: "text" },
        ],
      },
      {
        title: "Buyer",
        fields: [
          { key: "buyer_name", label: "Name / company", placeholder: "Buyer Ltd", type: "text" },
          { key: "buyer_number", label: "Company number (optional)", placeholder: "87654321", type: "text" },
          { key: "buyer_email", label: "Email", placeholder: "buyer@example.com", type: "text" },
        ],
      },
      {
        title: "Goods / Services",
        fields: [
          { key: "item_desc", label: "Description", placeholder: "MacBook Pro 14\" M3, 2024...", type: "textarea" },
          { key: "quantity", label: "Quantity", placeholder: "1", type: "number" },
          { key: "price", label: "Price (GBP)", placeholder: "2500", type: "number" },
          { key: "payment_terms", label: "Payment terms", type: "select", options: ["On delivery", "14-day invoice", "30-day invoice", "Payment in advance"] },
          { key: "delivery_date", label: "Delivery date", type: "date" },
          { key: "delivery_place", label: "Place of delivery", placeholder: "Buyer's address", type: "text" },
        ],
      },
      {
        title: "Warranty & Terms",
        fields: [
          { key: "warranty_months", label: "Warranty period (months)", placeholder: "12", type: "number" },
          { key: "buyer_type", label: "Buyer is", type: "select", options: ["A business (B2B)", "A consumer (B2C)"] },
          { key: "jurisdiction", label: "Courts", placeholder: "the courts of England and Wales", type: "text" },
        ],
      },
    ],
    buildPreview: (val) => {
      const isConsumer = v(val, "buyer_type", "A business (B2B)").startsWith("A consumer");
      return `SALE OF GOODS AGREEMENT
Date: ${todayEn()}

THIS AGREEMENT is made between:

(1) ${v(val, "seller_name", "[Seller]")}${v(val, "seller_number", "") ? ` (company no. ${v(val, "seller_number", "")})` : ""},
    contact: ${v(val, "seller_email", "—")} ("Seller"); and

(2) ${v(val, "buyer_name", "[Buyer]")}${v(val, "buyer_number", "") ? ` (company no. ${v(val, "buyer_number", "")})` : ""},
    contact: ${v(val, "buyer_email", "—")} ("Buyer").

1. GOODS
1.1 The Seller shall sell and the Buyer shall buy the following (the "Goods"):
    ${v(val, "item_desc", "[Description]")}
    Quantity: ${v(val, "quantity", "1")}

2. PRICE AND PAYMENT
2.1 The price is GBP ${v(val, "price", "[amount]")}, exclusive of VAT where applicable.
2.2 Payment terms: ${v(val, "payment_terms", "On delivery")}.
2.3 Late payment interest applies under the Late Payment of Commercial Debts
    (Interest) Act 1998 for B2B transactions.

3. DELIVERY
3.1 The Seller shall deliver the Goods on ${v(val, "delivery_date", "[delivery date]")}
    to ${v(val, "delivery_place", "Buyer's address")}.
3.2 Risk in the Goods passes to the Buyer on delivery.
3.3 Title in the Goods passes to the Buyer on the later of delivery and full payment.

4. WARRANTY AND QUALITY
${isConsumer
  ? `4.1 The Goods conform to the statutory rights under the Consumer Rights Act 2015:
    they must be of satisfactory quality, fit for purpose, and as described.
4.2 The Seller offers an additional commercial warranty of ${v(val, "warranty_months", "12")}
    months from delivery, in addition to (and not in substitution for) the Buyer's
    statutory rights.
4.3 If the Goods do not conform, the Buyer's rights include a short-term right to
    reject (30 days), the right to repair or replacement, and (after one failed
    attempt) the right to a price reduction or final rejection.`
  : `4.1 The Seller warrants that the Goods conform to their description, are of
    satisfactory quality within the meaning of section 14(2) of the Sale of Goods
    Act 1979, and are fit for any particular purpose expressly made known to the
    Seller.
4.2 The Seller offers a commercial warranty of ${v(val, "warranty_months", "12")}
    months from delivery covering defects in materials or workmanship.
4.3 The Buyer must notify defects in writing within a reasonable time of discovery.`}

5. LIMITATION OF LIABILITY
5.1 Nothing in this Agreement excludes liability for death or personal injury caused
    by negligence, for fraud, or for any liability that cannot lawfully be excluded.
5.2 Subject to clause 5.1, the Seller's total liability is limited to the price paid
    for the Goods.

6. TERMINATION
6.1 Either party may terminate immediately on material breach not remedied within 14
    days of written notice.

7. GOVERNING LAW AND JURISDICTION
7.1 This Agreement is governed by the laws of England and Wales.
7.2 The parties submit to the exclusive jurisdiction of ${v(val, "jurisdiction", "the courts of England and Wales")}.

Signed for the Seller:                   Signed for the Buyer:

_______________________          _______________________
Name / Date                      Name / Date`;
    },
    seo: {
      metaTitle: "Sale of goods contract template — English law | Kontraktly",
      metaDescription: "General B2B or B2C sale of goods contract under English law. Sale of Goods Act 1979 / Consumer Rights Act 2015 aligned. PDF from £5.",
      longDescription: "A sale of goods contract records the essential terms of any purchase of significant value — what is sold, at what price, when delivered, and what warranty applies. This template is drafted under English law and toggles between B2B (Sale of Goods Act 1979) and B2C (Consumer Rights Act 2015) framings, since the statutory regimes differ materially. It is suitable for private sales, small-business supply arrangements, and one-off B2B transactions that do not warrant a full supply agreement.",
      useCases: [
        "Sale or purchase of used equipment between businesses",
        "One-off supply arrangement not covered by an existing framework",
        "Private sale of high-value electronics, furniture or collectibles",
        "Small B2B transactions where a full supply agreement is over-engineered",
      ],
      includes: [
        "Identification of seller and buyer",
        "Description of the goods",
        "Quantity and price",
        "Payment terms",
        "Delivery date and place of delivery",
        "Passing of risk and title",
        "Late payment interest under the 1998 Act (B2B)",
        "Warranty tailored to B2B (SGA 1979) or B2C (CRA 2015)",
        "Consumer statutory rights preserved (B2C mode)",
        "Limitation of liability capped at the price",
        "Termination for material breach",
        "Governing law and jurisdiction — England and Wales",
      ],
      legalBasis: "This template is drafted under English law. For business-to-business sales it reflects the Sale of Goods Act 1979 (as amended), in particular the implied terms of satisfactory quality (s.14(2)) and fitness for purpose (s.14(3)), together with the Late Payment of Commercial Debts (Interest) Act 1998. For business-to-consumer sales it reflects the Consumer Rights Act 2015 Part 1 (Goods), which cannot be contracted out of — including the 30-day short-term right to reject, the right to repair or replacement, and the right to price reduction or final rejection. The Unfair Contract Terms Act 1977 limits how far liability can be excluded in B2B contracts.",
      faqs: [
        {
          q: "Should I use B2B or B2C mode?",
          a: "Choose B2C mode if the buyer is buying wholly or mainly for purposes outside their trade, business, craft or profession — the Consumer Rights Act 2015 then applies and the buyer's statutory rights (short-term right to reject, repair/replace, price reduction, final rejection) cannot be excluded. Choose B2B mode if both parties are acting in the course of a business — the Sale of Goods Act 1979 applies and contractual terms have more scope, subject to the Unfair Contract Terms Act 1977 reasonableness test.",
        },
        {
          q: "When does risk pass to the buyer?",
          a: "Under this template, risk passes on delivery — meaning if the goods are damaged or destroyed after delivery, the buyer still owes the price. This mirrors the default under section 20 of the Sale of Goods Act 1979 (risk follows property, unless otherwise agreed) and section 29 of the Consumer Rights Act 2015 (risk passes when the consumer takes physical possession). Where the seller uses a carrier, the position can differ — the template deliberately locks the transfer to physical delivery to the buyer.",
        },
        {
          q: "How long is the warranty period?",
          a: "The template defaults to 12 months of commercial warranty for defects in materials or workmanship. For consumer sales, this sits on top of the buyer's statutory rights under the Consumer Rights Act 2015, which typically extend for up to 6 years for latent defects present at delivery (the limitation period), not just the commercial warranty. Commercial warranties are useful because they set clear service expectations, but they cannot cut down consumer statutory rights.",
        },
        {
          q: "Can I limit my liability to the price paid?",
          a: "In B2B contracts, yes — provided the limitation is reasonable under section 3 of the Unfair Contract Terms Act 1977. Limiting liability to the price paid is generally reasonable for one-off sales of moderate-value goods, but may not be reasonable for high-consequence supplies (safety-critical components, business-critical software) where the buyer's foreseeable losses vastly exceed the price. In B2C contracts, you cannot exclude or limit liability for breach of the CRA 2015 implied terms.",
        },
      ],
    },
  },
];
