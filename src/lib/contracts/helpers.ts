export const v = (
  values: Record<string, string>,
  key: string,
  fallback: string,
) => values[key]?.trim() || fallback;

export const today = () => new Date().toLocaleDateString("nb-NO");
