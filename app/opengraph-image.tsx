import { ImageResponse } from "next/og";

export const alt = "Zohaib Mustafa — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a12",
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(232,67,43,0.35) 0%, rgba(232,67,43,0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9CA3AF",
            marginBottom: 24,
          }}
        >
          Full Stack Web Developer
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: "#ffffff" }}>
          Zohaib
          <span style={{ color: "#9CA3AF", marginLeft: 20 }}>Mustafa.</span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#E8432B", marginTop: 28 }}>
          Transforming Ideas Into Digital Reality
        </div>
      </div>
    ),
    { ...size }
  );
}
