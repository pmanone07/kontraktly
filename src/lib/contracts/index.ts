export { CONTRACT_TYPES } from "./data";
export type {
  ContractType,
  Field,
  FieldGroup,
  FieldType,
  ContractFaq,
  ContractSeo,
  ContractCategory,
  ContractLocale,
  ContractJurisdiction,
} from "./types";
export { v, today, todayEn } from "./helpers";

import { CONTRACT_TYPES } from "./data";
import type { ContractLocale } from "./types";

export const getContractsByLocale = (locale: ContractLocale) =>
  CONTRACT_TYPES.filter((c) => c.locale === locale);

export const getContract = (slug: string, locale?: ContractLocale) => {
  if (locale) return CONTRACT_TYPES.find((c) => c.id === slug && c.locale === locale);
  return CONTRACT_TYPES.find((c) => c.id === slug);
};

export const getContractSlugs = (locale?: ContractLocale) =>
  (locale ? getContractsByLocale(locale) : CONTRACT_TYPES).map((c) => c.id);

const NO_TO_EN: Record<string, string> = {
  freelance: "freelance",
  nda: "nda",
  ansatt: "employment",
  konsulent: "consultancy",
  aksjonaer: "shareholders",
  distribusjon: "distribution",
  agent: "agency",
  partner: "partnership",
  kjoep: "sale-of-goods",
};

const EN_TO_NO: Record<string, string> = Object.fromEntries(
  Object.entries(NO_TO_EN).map(([no, en]) => [en, no]),
);

export const getEquivalentContractSlug = (
  slug: string,
  fromLocale: ContractLocale,
  toLocale: ContractLocale,
): string | null => {
  if (fromLocale === toLocale) return slug;
  const map = fromLocale === "no" ? NO_TO_EN : EN_TO_NO;
  return map[slug] ?? null;
};
