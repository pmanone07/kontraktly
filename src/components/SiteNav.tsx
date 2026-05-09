"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { CONTRACT_TYPES, type ContractCategory, type ContractType } from "@/lib/contracts";

const CATEGORY_LABELS: Record<ContractCategory, string> = {
  bedrift: "Bedrift",
  privat: "Privat",
  naringsliv: "Næringsliv",
};

const CATEGORY_ORDER: ContractCategory[] = ["bedrift", "privat", "naringsliv"];

function groupByCategory(contracts: ContractType[]) {
  return CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    contracts: contracts.filter((c) => c.category === cat),
  })).filter((g) => g.contracts.length > 0);
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const groups = groupByCategory(CONTRACT_TYPES);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="relative px-6 py-5 md:px-12 animate-fade-in" style={{ borderBottom: "1px solid rgba(201,168,92,0.06)" }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-none" aria-label="Kontraktly — til forsiden">
          <Image src="/logo.png" alt="Kontraktly" width={240} height={240} priority className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-haspopup="true"
              className="flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium transition-colors"
              style={{
                color: open ? "#c9a85c" : "#f0ede6",
                background: open ? "rgba(201,168,92,0.08)" : "transparent",
              }}
            >
              Alle kontrakter
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div
                className="absolute left-0 top-full mt-2 z-50 rounded-sm grid gap-6 grid-cols-3 p-6"
                style={{
                  border: "1px solid rgba(201,168,92,0.2)",
                  background: "#0f0f11",
                  width: "min(720px, 90vw)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                }}
              >
                {groups.map((g) => (
                  <div key={g.category}>
                    <p className="font-mono-custom text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(201,168,92,0.5)" }}>
                      {g.label}
                    </p>
                    <ul className="space-y-1">
                      {g.contracts.map((c) => {
                        const Icon = c.icon;
                        return (
                          <li key={c.id}>
                            <Link
                              href={`/kontrakter/${c.id}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs transition-colors hover:bg-[rgba(201,168,92,0.06)]"
                              style={{ color: "#a09c97" }}
                            >
                              <Icon className="h-3.5 w-3.5 flex-none" style={{ color: c.color }} />
                              <span className="truncate">{c.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/#faq" className="rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:text-[#c9a85c]" style={{ color: "#f0ede6" }}>
            FAQ
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden flex items-center gap-1 rounded-sm px-3 py-2 text-xs font-medium"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            border: "1px solid rgba(201,168,92,0.2)",
            color: mobileOpen ? "#c9a85c" : "#f0ede6",
            background: mobileOpen ? "rgba(201,168,92,0.08)" : "transparent",
          }}
        >
          Kontrakter
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Mobile expanded menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden mt-4 mx-auto max-w-6xl rounded-sm p-4 space-y-5"
          style={{ border: "1px solid rgba(201,168,92,0.15)", background: "#0f0f11" }}
        >
          {groups.map((g) => (
            <div key={g.category}>
              <p className="font-mono-custom text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(201,168,92,0.5)" }}>
                {g.label}
              </p>
              <ul className="space-y-1">
                {g.contracts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/kontrakter/${c.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-sm px-2 py-2 text-sm"
                        style={{ color: "#a09c97" }}
                      >
                        <Icon className="h-4 w-4 flex-none" style={{ color: c.color }} />
                        <span>{c.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="pt-3" style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="block rounded-sm px-2 py-2 text-sm"
              style={{ color: "#f0ede6" }}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
