"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
  logoText: {
    fontSize: 16,
    fontFamily: "DM Mono",
    color: "#c9a85c",
    letterSpacing: 1,
  },
  metaText: {
    fontSize: 7.5,
    color: "#999",
    textAlign: "right",
  },
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
  body: {
    whiteSpace: "pre-wrap",
    fontSize: 9,
    color: "#222",
    lineHeight: 1.9,
  },
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
  footerText: {
    fontSize: 7,
    color: "#bbb",
  },
  goldLine: {
    height: 1,
    backgroundColor: "#c9a85c",
    marginVertical: 20,
    opacity: 0.3,
  },
  watermark: {
    fontSize: 7,
    color: "#c9a85c",
    letterSpacing: 1,
    opacity: 0.5,
    textTransform: "uppercase",
  },
});

interface ContractPDFProps {
  contractLabel: string;
  contractText: string;
  generatedAt?: string;
}

export function ContractPDF({ contractLabel, contractText, generatedAt }: ContractPDFProps) {
  const date = generatedAt || new Date().toLocaleDateString("nb-NO", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <Document
      title={contractLabel}
      author="Kontraktly AS"
      subject={contractLabel}
      creator="Kontraktly"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>KONTRAKTLY</Text>
          <View>
            <Text style={styles.metaText}>Generert: {date}</Text>
            <Text style={styles.metaText}>kontraktly.no</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{contractLabel}</Text>
        <Text style={styles.subtitle}>Juridisk dokument · Norsk lovgivning</Text>

        {/* Contract body */}
        <Text style={styles.body}>{contractText}</Text>

        <View style={styles.goldLine} />

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>© Kontraktly AS · Alle rettigheter forbeholdt</Text>
          <Text style={styles.watermark}>Kontraktly</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) =>
            `Side ${pageNumber} av ${totalPages}`
          } />
        </View>
      </Page>
    </Document>
  );
}
