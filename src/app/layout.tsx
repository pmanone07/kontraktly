import "./globals.css";

// Root layout er bevisst minimal. Selve <html> og <body> renderes
// i src/app/[locale]/layout.tsx slik at lang-attributt kan settes
// per locale. Next.js krever et root layout selv om det bare passer
// gjennom children.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
