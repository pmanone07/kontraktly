"use client";

import { useState } from "react";

export function useDownloadPDF() {
  const [generating, setGenerating] = useState(false);

  const download = async (contractLabel: string, contractText: string) => {
    setGenerating(true);
    try {
      const { pdf, Document } = await import("@react-pdf/renderer");
      const { ContractPDF } = await import("@/components/ContractPDF");
      const { createElement } = await import("react");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = createElement(ContractPDF, { contractLabel, contractText }) as any;
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const filename = contractLabel
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[æ]/g, "ae")
        .replace(/[ø]/g, "oe")
        .replace(/[å]/g, "aa")
        + ".pdf";
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
    }
  };

  return { download, generating };
}
