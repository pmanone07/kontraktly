"use client";

import { Button } from "@/components/ui/button";
import { Eye, FileText, Lock } from "lucide-react";
import { getContract } from "@/lib/contracts";
import { useContractFlow } from "./ContractFlow";

export function ContractCTA({
  slug,
  price,
  variant = "primary",
}: {
  slug: string;
  price: number;
  variant?: "primary" | "preview";
}) {
  const { openFill, openPreview } = useContractFlow();

  const handleFill = () => {
    const contract = getContract(slug);
    if (contract) openFill(contract);
  };

  const handlePreview = () => {
    const contract = getContract(slug);
    if (contract) openPreview(contract);
  };

  if (variant === "preview") {
    return (
      <Button
        className="rounded-sm h-11 px-6 text-sm"
        style={{ border: "1px solid rgba(201,168,92,0.25)", background: "transparent", color: "#f0ede6" }}
        onClick={handlePreview}
      >
        <Eye className="mr-2 h-4 w-4" />
        Se eksempel
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="rounded-sm h-12 px-8 text-sm font-medium tracking-wide"
      style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
      onClick={handleFill}
    >
      <FileText className="mr-2 h-4 w-4" />
      Lag kontrakt — {price} kr
      <Lock className="ml-2 h-3.5 w-3.5 opacity-60" />
    </Button>
  );
}
