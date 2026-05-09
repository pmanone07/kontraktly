"use client";

import type { Field } from "@/lib/contracts";

export const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(201,168,92,0.15)",
  background: "#0a0a0b",
  color: "#f0ede6",
};

export function FormInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const base =
    "w-full rounded-sm px-3 py-2 text-sm focus:outline-none transition-colors font-mono-custom placeholder:text-[#3d3d40]";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={base + " resize-none"}
        style={inputStyle}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={base}
        style={{ ...inputStyle, appearance: "auto", colorScheme: "dark" }}
      >
        <option value="" style={{ background: "#111113", color: "#7a7672" }}>Velg...</option>
        {field.options?.map((o) => (
          <option key={o} value={o} style={{ background: "#111113", color: "#f0ede6" }}>{o}</option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={field.type === "date" ? "date" : "text"}
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={base}
      style={{ ...inputStyle, colorScheme: field.type === "date" ? "dark" : undefined }}
    />
  );
}
