"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(201,168,92,0.15)",
  background: "#0a0a0b",
  color: "#f0ede6",
};

const inputBase =
  "w-full rounded-sm px-3 py-2 text-sm focus:outline-none transition-colors font-mono-custom placeholder:text-[#3d3d40]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Noe gikk galt.");
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-sm p-6 text-center" style={{ border: "1px solid rgba(201,168,92,0.2)", background: "rgba(201,168,92,0.04)" }}>
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(201,168,92,0.12)", border: "1px solid rgba(201,168,92,0.3)" }}>
          <Check className="h-5 w-5" style={{ color: "#c9a85c" }} />
        </div>
        <p className="font-display text-sm font-semibold mb-1" style={{ color: "#f0ede6" }}>
          Melding sendt!
        </p>
        <p className="text-xs" style={{ color: "#7a7672" }}>
          Vi svarer normalt innen 24 timer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "#7a7672" }}>Navn</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ola Nordmann"
          className={inputBase}
          style={inputStyle}
        />
      </div>
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "#7a7672" }}>E-post</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ola@example.com"
          className={inputBase}
          style={inputStyle}
        />
      </div>
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "#7a7672" }}>Melding</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hva kan vi hjelpe med?"
          className={inputBase + " resize-none"}
          style={inputStyle}
          maxLength={4000}
        />
      </div>
      {error && (
        <p className="text-xs rounded-sm px-3 py-2"
          style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", color: "#ff6060" }}>
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={sending}
        className="w-full rounded-sm h-10 text-sm font-medium"
        style={{ background: "linear-gradient(135deg, #c9a85c, #a07c30)", color: "#0a0a0b" }}
      >
        {sending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sender...
          </span>
        ) : (
          "Send melding"
        )}
      </Button>
      <p className="text-[10px] text-center" style={{ color: "#3d3d40" }}>
        Vi svarer normalt innen 24 timer.
      </p>
    </form>
  );
}
