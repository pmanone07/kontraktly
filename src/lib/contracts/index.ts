export { CONTRACT_TYPES } from "./data";
export type { ContractType, Field, FieldGroup, FieldType, ContractFaq, ContractSeo } from "./types";
export { v, today } from "./helpers";

import { CONTRACT_TYPES } from "./data";

export const getContract = (slug: string) =>
  CONTRACT_TYPES.find((c) => c.id === slug);

export const getContractSlugs = () => CONTRACT_TYPES.map((c) => c.id);
