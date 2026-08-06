export const v = (
  values: Record<string, string>,
  key: string,
  fallback: string,
) => values[key]?.trim() || fallback;

export const today = () => new Date().toLocaleDateString("nb-NO");

export const todayEn = () =>
  new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

export type PriceFormat = "short" | "compact";

export const formatPrice = (
  price: number,
  currency: "NOK" | "GBP",
  format: PriceFormat = "short",
): string => {
  if (currency === "GBP") {
    return format === "compact" ? `£${price}` : `£${price}`;
  }
  return format === "compact" ? `${price} kr` : `${price} kr`;
};
