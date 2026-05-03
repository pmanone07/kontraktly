import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kontraktly — Norske kontraktmaler på under 10 minutter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at top right, rgba(201,168,92,0.18), transparent 60%), radial-gradient(ellipse at bottom left, rgba(126,184,164,0.10), transparent 60%), #0a0a0b",
          fontFamily: "sans-serif",
          color: "#f0ede6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 6,
              background: "linear-gradient(135deg, #c9a85c, #a07c30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              color: "#0a0a0b",
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Kontraktly
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c9a85c",
              fontFamily: "monospace",
            }}
          >
            Kontrakter på minutter
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            Profesjonelle kontrakter
            <br />
            tilpasset norsk lovgivning
          </div>
          <div style={{ fontSize: 30, color: "#7a7672", maxWidth: 900, lineHeight: 1.4 }}>
            Freelance, leie, NDA, arbeid og flere — last ned som PDF fra 59 kr.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(201,168,92,0.2)",
          }}
        >
          <div style={{ fontSize: 22, color: "#7a7672" }}>kontraktly.no</div>
          <div
            style={{
              fontSize: 20,
              color: "#c9a85c",
              padding: "10px 20px",
              border: "1px solid rgba(201,168,92,0.3)",
              borderRadius: 4,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            FRA 59 KR
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
