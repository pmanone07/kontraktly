import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";

Font.register({
  family: "DM Mono",
  src: "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYhh0.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "DM Mono",
    fontSize: 9,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 64,
    lineHeight: 1.6,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#c9a85c",
    borderBottomStyle: "solid",
    marginBottom: 28,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  logoText: { fontSize: 16, fontFamily: "DM Mono", color: "#c9a85c", letterSpacing: 1 },
  metaText: { fontSize: 7.5, color: "#999", textAlign: "right" },
  title: {
    fontSize: 17,
    fontFamily: "DM Mono",
    color: "#0a0a0b",
    letterSpacing: 2,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 8,
    color: "#c9a85c",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 28,
  },
  body: { fontSize: 9, color: "#222", lineHeight: 1.9 },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 64,
    right: 64,
    borderTopWidth: 1,
    borderTopColor: "#e5d9b6",
    borderTopStyle: "solid",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 7, color: "#bbb" },
  goldLine: { height: 1, backgroundColor: "#c9a85c", marginVertical: 20, opacity: 0.3 },
  watermark: { fontSize: 7, color: "#c9a85c", letterSpacing: 1, opacity: 0.5, textTransform: "uppercase" },
});

export type PdfLocale = "no" | "en";
export type PdfJurisdiction = "no" | "uk" | "us";

interface PDFProps {
  contractLabel: string;
  contractText: string;
  locale?: PdfLocale;
  jurisdiction?: PdfJurisdiction;
}

const COPY = {
  no: {
    generated: "Generert",
    subtitle: {
      no: "Juridisk dokument · Norsk lovgivning",
      uk: "Juridisk dokument · Engelsk lovgivning",
      us: "Juridisk dokument · Amerikansk lovgivning",
    },
    rights: "© Kontraktly AS · Alle rettigheter forbeholdt",
    page: (n: number, t: number) => `Side ${n} av ${t}`,
  },
  en: {
    generated: "Generated",
    subtitle: {
      no: "Legal document · Norwegian law",
      uk: "Legal document · English law",
      us: "Legal document · US law",
    },
    rights: "© Kontraktly AS · All rights reserved",
    page: (n: number, t: number) => `Page ${n} of ${t}`,
  },
} as const;

function ContractDocument({ contractLabel, contractText, locale = "no", jurisdiction = "no" }: PDFProps) {
  const copy = COPY[locale];
  const dateLocale = locale === "en" ? "en-GB" : "nb-NO";
  const date = new Date().toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document title={contractLabel} author="Kontraktly AS" subject={contractLabel} creator="Kontraktly">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logoText}>KONTRAKTLY</Text>
          <View>
            <Text style={styles.metaText}>{copy.generated}: {date}</Text>
            <Text style={styles.metaText}>kontraktly.no</Text>
          </View>
        </View>
        <Text style={styles.title}>{contractLabel}</Text>
        <Text style={styles.subtitle}>{copy.subtitle[jurisdiction]}</Text>
        <Text style={styles.body}>{contractText}</Text>
        <View style={styles.goldLine} />
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{copy.rights}</Text>
          <Text style={styles.watermark}>Kontraktly</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => copy.page(pageNumber, totalPages)}
          />
        </View>
      </Page>
    </Document>
  );
}

export async function generateContractPDF(
  contractLabel: string,
  contractText: string,
  options?: { locale?: PdfLocale; jurisdiction?: PdfJurisdiction },
): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = createElement(ContractDocument, {
    contractLabel,
    contractText,
    locale: options?.locale,
    jurisdiction: options?.jurisdiction,
  }) as any;
  return renderToBuffer(element);
}

export function safeFilename(contractLabel: string): string {
  return (
    contractLabel
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[æ]/g, "ae")
      .replace(/[ø]/g, "oe")
      .replace(/[å]/g, "aa")
      .replace(/[^a-z0-9-]/g, "") + ".pdf"
  );
}
