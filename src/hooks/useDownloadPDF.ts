"use client";

import { useState } from "react";

interface DownloadOptions {
  locale?: "no" | "en";
  jurisdiction?: "no" | "uk" | "us";
}

export function useDownloadPDF() {
  const [generating, setGenerating] = useState(false);

  const download = async (
    contractLabel: string,
    contractText: string,
    options?: DownloadOptions,
  ) => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { ContractPDF } = await import("@/components/ContractPDF");
      const { createElement } = await import("react");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = createElement(ContractPDF, {
        contractLabel,
        contractText,
        locale: options?.locale,
        jurisdiction: options?.jurisdiction,
      }) as any;
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);

      // Alltid åpne i ny fane — iOS/macOS Safari blokkerer nedlastning av blob-URLer,
      // så brukere trenger delingsarket/PDF-viseren for å arkivere. Åpen fane gir alle
      // brukere samme mulighet til å laste ned, skrive ut eller dele PDF-en.
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } finally {
      setGenerating(false);
    }
  };

  return { download, generating };
}
