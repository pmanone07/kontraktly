export const v = (
  values: Record<string, string>,
  key: string,
  fallback: string,
) => values[key]?.trim() || fallback;

export const today = () => new Date().toLocaleDateString("nb-NO");

export const todayEn = () =>
  new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
