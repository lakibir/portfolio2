import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0b121b 0%, #121c2a 55%, #1c2938 100%)",
          color: "#eef3fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, letterSpacing: "0.34em", textTransform: "uppercase", color: "#f47423" }}>
          <div style={{ height: 14, width: 14, borderRadius: 999, background: "#f47423" }} />
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.03, fontWeight: 700, maxWidth: 900 }}>
            Junior full-stack developer and 2026 Wollo University graduate.
          </div>
          <div style={{ maxWidth: 760, fontSize: 30, color: "#d2deee", lineHeight: 1.4 }}>
            Next.js, TypeScript, motion-driven UI, performant architecture, and production-ready delivery.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
