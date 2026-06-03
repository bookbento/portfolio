import { ImageResponse } from "next/og";

export const alt = "Sarunpat Sangpak — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dark-luxury card matching the site's zinc palette (#09090b / #fafafa).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(250,250,250,0.10), transparent 42%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            letterSpacing: "6px",
            color: "#a1a1aa",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "2px",
              backgroundColor: "#fafafa",
            }}
          />
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "108px",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-3px",
            }}
          >
            Sarunpat Sangpak
          </div>
          <div style={{ fontSize: "40px", fontWeight: 500, color: "#d4d4d8" }}>
            Full-Stack Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "26px",
            color: "#a1a1aa",
          }}
        >
          <span>Next.js · React · TypeScript</span>
          <span style={{ color: "#fafafa" }}>www.sarunpats.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
