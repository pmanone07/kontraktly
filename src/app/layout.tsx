import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kontraktly — Profesjonelle kontrakter på minutter",
  description: "Lag juridisk bindende kontrakter for freelance, leie, og mer. Betal kun per kontrakt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="h-full">
      <body className="noise min-h-full antialiased">{children}</body>
    </html>
  );
}
