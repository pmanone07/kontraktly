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
