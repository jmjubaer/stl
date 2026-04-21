// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "STL — Save The Link";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1A8CFF 0%, #9952E0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 80 }}>📌</div>
        <div style={{ fontSize: 60, fontWeight: "bold", marginTop: 20 }}>
          STL — Save The Link
        </div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.9 }}>
          Smart Bookmark Manager
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 15,
            opacity: 0.8,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Save, organize, and access your favorite links from anywhere
        </div>
      </div>
    ),
    size,
  );
}