"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Download, Lock } from "lucide-react";
import { CONTRACT_TYPES, type ContractType } from "@/lib/contracts";
import { useDownloadPDF } from "@/hooks/useDownloadPDF";
import { FillDialog } from "./FillDialog";

type Ctx = {
  openPreview: (contract: ContractType) => void;
  openFill: (contract: ContractType) => void;
};

const ContractFlowContext = createContext<Ctx | null>(null);

export function useContractFlow() {
  const ctx = useContext(ContractFlowContext);
  if (!ctx) throw new Error("useContractFlow must be used within ContractFlowProvider");
  return ctx;
}

export function ContractFlowProvider({ children }: { children: React.ReactNode }) {
  const [previewContract, setPreviewContract] = useState<ContractType | null>(null);
  const [fillContract, setFillContract] = useState<ContractType | null>(null);
  const [checkoutContract, setCheckoutContract] = useState<ContractType | null>(null);
  const [filledValues, setFilledValues] = useState<Record<string, string>>({});

  const [previewOpen, setPreviewOpen] = useState(false);
  const [fillOpen, setFillOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmCheckoutClose, setConfirmCheckoutClose] = useState(false);

  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const { download, generating } = useDownloadPDF();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    window.history.replaceState({}, "", window.location.pathname);

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.paid) return;
        const stored = sessionStorage.getItem("kontraktly_pending");
        if (!stored) return;
        const { contractId, values } = JSON.parse(stored) as { contractId: string; values: Record<string, string> };
        sessionStorage.removeItem("kontraktly_pending");
        const contract = CONTRACT_TYPES.find((c) => c.id === contractId);
        if (!contract) return;
        setFilledValues(values);
        setCheckoutContract(contract);
        setCheckoutOpen(true);
        setPaid(true);
      })
      .catch(() => {});
  }, []);

  const openFill = useCallback((contract: ContractType) => {
    setFillContract(contract);
    setFillOpen(true);
  }, []);

  const openPreview = useCallback((contract: ContractType) => {
    setPreviewContract(contract);
    setPreviewOpen(true);
  }, []);

  const proceedToCheckout = useCallback((values: Record<string, string>) => {
    setFilledValues(values);
    setCheckoutContract(fillContract);
    setCheckoutOpen(true);
    setPaid(false);
    setPaying(false);
    setStripeError(null);
  }, [fillContract]);

  const redirectToStripe = useCallback(async () => {
    if (!checkoutContract) return;
    setPaying(true);
    setStripeError(null);
    try {
      sessionStorage.setItem(
        "kontraktly_pending",
        JSON.stringify({ contractId: checkoutContract.id, values: filledValues })
      );
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId: checkoutContract.id,
          values: filledValues,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? "Ukjent feil");
      }
    } catch (err) {
      setStripeError(err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.");
      setPaying(false);
    }
  }, [checkoutContract, filledValues]);

  return (
    <ContractFlowContext.Provider value={{ openPreview, openFill }}>
      {children}

      <FillDialog
        contract={fillContract}
        open={fillOpen}
        onClose={() => setFillOpen(false)}
        onProceedToCheckout={proceedToCheckout}
      />

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="w-[95vw] max-w-2xl rounded-sm p-0 overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 700px)" }}>
          {previewContract && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 flex-none" style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm"
                      style={{ background: `${previewContract.color}18` }}>
                      <previewContract.icon className="h-5 w-5" style={{ color: previewContract.color }} />
                    </div>
                    <div>
                      <DialogTitle className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                        {previewContract.label}
                      </DialogTitle>
                      <p className="text-xs" style={{ color: "#7a7672" }}>Eksempel — slik blir kontrakten din</p>
                    </div>
                  </div>
                  <span className="font-mono-custom text-lg font-medium" style={{ color: "#c9a85c" }}>
                    {previewContract.price} kr
                  </span>
                </div>
              </DialogHeader>
              <div className="px-6 py-5 flex-1 overflow-y-auto min-h-0">
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {previewContract.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "#7a7672" }}>
                      <Check className="h-3 w-3 flex-shrink-0" style={{ color: "#c9a85c" }} />{f}
                    </div>
                  ))}
                </div>
                <div className="rounded-sm p-5" style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}>
                  <pre className="font-mono-custom text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#5a5855" }}>
                    {previewContract.buildPreview({})}
                  </pre>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: "rgba(201,168,92,0.1)" }} />
                    <span className="text-[10px] uppercase tracking-wider font-mono-custom" style={{ color: "#3d3d40" }}>
                      Fyll inn for å tilpasse
                    </span>
                    <div className="h-px flex-1" style={{ background: "rgba(201,168,92,0.1)" }} />
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 flex gap-3 flex-none">
                <Button className="flex-1 rounded-sm h-10 text-sm font-medium"
                  style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                  onClick={() => { setPreviewOpen(false); openFill(previewContract); }}>
                  Lag kontrakt — {previewContract.price} kr
                </Button>
                <Button className="rounded-sm h-10 text-sm"
                  style={{ border: "1px solid rgba(201,168,92,0.2)", background: "transparent", color: "#7a7672" }}
                  onClick={() => setPreviewOpen(false)}>
                  Lukk
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={checkoutOpen}
        onOpenChange={(o) => {
          if (!o) {
            if (paid) {
              setCheckoutOpen(false);
              setConfirmCheckoutClose(false);
            } else {
              setConfirmCheckoutClose(true);
            }
          } else {
            setCheckoutOpen(true);
          }
        }}
      >
        <DialogContent className="w-[95vw] max-w-lg rounded-sm p-0 overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(201,168,92,0.2)", background: "#0f0f11", maxHeight: "min(92dvh, 700px)" }}>
          {checkoutContract && !paid && (
            <>
              <DialogHeader className="px-6 pt-6 pb-4 flex-none" style={{ borderBottom: "1px solid rgba(201,168,92,0.1)" }}>
                <DialogTitle className="font-display text-base font-semibold" style={{ color: "#f0ede6" }}>
                  Fullfør kjøp
                </DialogTitle>
                <p className="text-xs" style={{ color: "#7a7672" }}>{checkoutContract.label}</p>
              </DialogHeader>
              <div className="px-6 py-5 space-y-5 flex-1 overflow-y-auto min-h-0">
                <div className="rounded-sm p-4" style={{ border: "1px solid rgba(201,168,92,0.1)", background: "#0a0a0b" }}>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#7a7672" }}>{checkoutContract.label}</span>
                    <span style={{ color: "#f0ede6" }}>{(checkoutContract.price / 1.25).toFixed(2)} kr</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#7a7672" }}>MVA (25%)</span>
                    <span style={{ color: "#7a7672" }}>{(checkoutContract.price - checkoutContract.price / 1.25).toFixed(2)} kr</span>
                  </div>
                  <Separator style={{ margin: "8px 0", background: "rgba(201,168,92,0.1)" }} />
                  <div className="flex justify-between text-sm font-medium">
                    <span style={{ color: "#f0ede6" }}>Totalt</span>
                    <span className="font-mono-custom" style={{ color: "#c9a85c" }}>
                      {checkoutContract.price} kr
                    </span>
                  </div>
                </div>
                {Object.keys(filledValues).length > 0 && (
                  <div className="rounded-sm p-3" style={{ border: "1px solid rgba(201,168,92,0.08)", background: "rgba(201,168,92,0.03)" }}>
                    <p className="font-mono-custom text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgba(201,168,92,0.4)" }}>
                      Dine opplysninger registrert
                    </p>
                    <p className="text-xs" style={{ color: "#5a5855" }}>
                      {Object.keys(filledValues).length} felt fylt inn — kontrakten er klar til generering.
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs" style={{ color: "#3d3d40" }}>
                  <Lock className="h-3 w-3" />
                  <span>Sikker betaling via Stripe — Visa, Mastercard, Apple Pay og mer</span>
                </div>
                {stripeError && (
                  <p className="text-xs rounded-sm px-3 py-2" style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", color: "#ff6060" }}>
                    {stripeError}
                  </p>
                )}
              </div>
              <div className="px-6 pb-6 flex-none">
                <Button className="w-full rounded-sm h-10 text-sm font-medium" disabled={paying}
                  style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                  onClick={redirectToStripe}>
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#0a0a0b] border-t-transparent animate-spin" />
                      Sender til betaling...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Betal {checkoutContract.price} kr
                    </span>
                  )}
                </Button>
                <p className="mt-2 text-center text-[10px]" style={{ color: "#3d3d40" }}>
                  Du sendes til Stripes sikre betalingsside. Pengene refunderes ikke etter nedlasting.
                </p>
              </div>
            </>
          )}
          {paid && checkoutContract && (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(201,168,92,0.12)", border: "1px solid rgba(201,168,92,0.3)" }}>
                <Check className="h-8 w-8" style={{ color: "#c9a85c" }} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#f0ede6" }}>
                Betaling bekreftet!
              </h3>
              <p className="text-sm mb-6" style={{ color: "#7a7672" }}>
                Din {checkoutContract.label.toLowerCase()} er klar med dine opplysninger.
              </p>
              <Button
                className="rounded-sm h-10 px-8 text-sm font-medium w-full"
                style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
                disabled={generating}
                onClick={async () => {
                  await download(
                    checkoutContract.label,
                    checkoutContract.buildPreview(filledValues)
                  );
                  setCheckoutOpen(false);
                  setPaid(false);
                }}
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-[#0a0a0b] border-t-transparent animate-spin" />
                    Genererer PDF...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Last ned kontrakt (PDF)
                  </span>
                )}
              </Button>
            </div>
          )}

          {confirmCheckoutClose && !paid && (
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
                    onClick={() => setConfirmCheckoutClose(false)}
                  >
                    Nei, fortsett
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-sm h-8 px-3 text-xs font-medium"
                    style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.35)", color: "#ff8080" }}
                    onClick={() => {
                      setConfirmCheckoutClose(false);
                      setCheckoutOpen(false);
                      setFilledValues({});
                      setCheckoutContract(null);
                      setStripeError(null);
                    }}
                  >
                    Ja, lukk
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ContractFlowContext.Provider>
  );
}
