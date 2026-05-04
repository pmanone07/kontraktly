import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #c9a85c, #a07c30)",
          color: "#0a0a0b",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 36,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
