"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Eye, Lock } from "lucide-react";
import type { ContractType } from "@/lib/contracts";
import { FormInput } from "./FormInput";

export function FillDialog({
  contract,
  open,
  onClose,
  onProceedToCheckout,
}: {
  contract: ContractType | null;
  open: boolean;
  onClose: () => void;
  onProceedToCheckout: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  if (!contract) return null;

  const groups = contract.fieldGroups;
  const currentGroup = groups[step];
  const isLast = step === groups.length - 1;
  const hasInput = Object.values(values).some((val) => val.trim() !== "");

  const setField = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleClose = () => {
    setValues({});
    setStep(0);
    setShowPreview(false);
    setConfirmClose(false);
    onClose();
  };

  const requestClose = () => {
    if (hasInput) {
      setConfirmClose(true);
    } else {
      handleClose();
    }
  };

  const handleNext = () => {
    if (isLast) {
      onProceedToCheckout(values);
      handleClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  const preview = contract.buildPreview(values);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) requestClose(); }}>
      <DialogContent
        className="w-[95vw] max-w-5xl rounded-sm p-0 flex flex-col"
        style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 620px)", overflow: "hidden" }}
      >
        <DialogHeader
          className="px-4 pt-4 pb-3 flex-none"
          style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-sm flex-none"
              style={{ background: `${contract.color}18` }}
            >
              <contract.icon className="h-3.5 w-3.5" style={{ color: contract.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="font-display text-sm font-semibold truncate" style={{ color: "#f0ede6" }}>
                {contract.label}
              </DialogTitle>
              <p className="text-[11px]" style={{ color: "#7a7672" }}>Fyll inn informasjon</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-4 min-w-0">
            <div className="mb-4">
              <p className="font-mono-custom text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(201,168,92,0.5)" }}>
                Steg {step + 1} av {groups.length}
              </p>
              <h3 className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                {currentGroup.title}
              </h3>
            </div>

            <div className="space-y-4">
              {currentGroup.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs mb-1.5" style={{ color: "#7a7672" }}>
                    {field.label}
                    {field.hint && (
                      <span className="ml-2 opacity-60">{field.hint}</span>
                    )}
                  </label>
                  <FormInput
                    field={field}
                    value={values[field.key] ?? ""}
                    onChange={(val) => setField(field.key, val)}
                  />
                </div>
              ))}
            </div>

            {showPreview && (
              <div
                className="mt-5 rounded-sm p-4 lg:hidden"
                style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}
              >
                <pre
                  className="font-mono-custom text-[10px] leading-relaxed whitespace-pre-wrap"
                  style={{ color: "#6a6562" }}
                >
                  {preview}
                </pre>
              </div>
            )}
          </div>

          <div
            className="hidden lg:flex flex-col w-[340px] flex-none overflow-hidden"
            style={{ borderLeft: "1px solid rgba(201,168,92,0.08)", background: "#0a0a0b" }}
          >
            <div
              className="px-4 py-3 flex items-center gap-2 flex-none"
              style={{ borderBottom: "1px solid rgba(201,168,92,0.08)" }}
            >
              <Eye className="h-3 w-3" style={{ color: "#c9a85c" }} />
              <span className="font-mono-custom text-[10px] uppercase tracking-widest" style={{ color: "rgba(201,168,92,0.5)" }}>
                Live forhåndsvisning
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <pre
                className="font-mono-custom text-[10px] leading-[1.8] whitespace-pre-wrap"
                style={{ color: "#5a5855" }}
              >
                {preview}
              </pre>
            </div>
          </div>
        </div>

        <div
          className="px-4 py-3 flex items-center gap-2 flex-none"
          style={{ borderTop: "1px solid rgba(201,168,92,0.1)" }}
        >
          <div className="flex items-center gap-1 flex-none">
            {groups.map((g, i) => (
              <div
                key={g.title}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === step ? "20px" : "6px",
                  background: i <= step ? "#c9a85c" : "rgba(201,168,92,0.15)",
                }}
              />
            ))}
          </div>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-8 px-3 text-xs flex-none"
            style={{ color: "#7a7672" }}
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="sm"
            className="rounded-sm h-8 px-4 text-xs font-medium flex-none"
            style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
            onClick={handleNext}
          >
            {isLast ? (
              <>Betal <Lock className="ml-1.5 h-3 w-3" /></>
            ) : (
              <>Neste <ChevronRight className="ml-1 h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>

        {confirmClose && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,10,11,0.85)", backdropFilter: "blur(4px)" }}
          >
            <div
              className="w-full max-w-sm rounded-sm p-5"
              style={{ border: "1px solid rgba(201,168,92,0.25)", background: "#0f0f11" }}
            >
              <h3 className="font-display text-sm font-semibold mb-2" style={{ color: "#f0ede6" }}>
                Er du sikker på at du vil lukke?
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#7a7672" }}>
                Du mister all innfylt informasjon, og må fylle ut kontrakten på nytt om du ombestemmer deg.
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-sm h-8 px-3 text-xs"
                  style={{ color: "#7a7672" }}
                  onClick={() => setConfirmClose(false)}
                >
                  Nei, fortsett
                </Button>
                <Button
                  size="sm"
                  className="rounded-sm h-8 px-3 text-xs font-medium"
                  style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.35)", color: "#ff8080" }}
                  onClick={handleClose}
                >
                  Ja, lukk
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
