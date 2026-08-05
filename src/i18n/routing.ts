import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["no", "en"],
  defaultLocale: "no",
  // Ikke prefiks default-locale (no) — /om er norsk, /en/about er engelsk.
  // Dette bevarer eksisterende URL-er og SEO-verdi paa norske sider.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
