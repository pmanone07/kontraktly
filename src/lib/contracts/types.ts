import type { ElementType } from "react";

export type FieldType = "text" | "number" | "date" | "select" | "textarea";

export interface Field {
  key: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: string[];
  hint?: string;
}

export interface FieldGroup {
  title: string;
  fields: Field[];
}

export interface ContractFaq {
  q: string;
  a: string;
}

export interface ContractSeo {
  metaTitle: string;
  metaDescription: string;
  longDescription: string;
  useCases: string[];
  includes: string[];
  legalBasis: string;
  faqs: ContractFaq[];
}

export type ContractCategory = "bedrift" | "privat" | "naringsliv";

export interface ContractType {
  id: string;
  icon: ElementType;
  label: string;
  description: string;
  price: number;
  popular: boolean;
  color: string;
  category: ContractCategory;
  features: string[];
  fieldGroups: FieldGroup[];
  buildPreview: (values: Record<string, string>) => string;
  seo: ContractSeo;
}
