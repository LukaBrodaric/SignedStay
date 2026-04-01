import { ReactNode } from "react";

export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "700", color: "#0f172a", lineHeight: "1.3" }}>
      {children}
    </h1>
  );
}

export function EmailSubtext({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 24px", fontSize: "16px", color: "#475569", lineHeight: "1.6" }}>
      {children}
    </p>
  );
}

export function EmailInfoBox({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#f8f7ff", borderRadius: "12px", padding: "20px 24px", margin: "20px 0", border: "1px solid #ede9fe" }}>
      {children}
    </div>
  );
}

export function EmailInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "8px" }}>
      <tr>
        <td style={{ fontSize: "13px", color: "#94a3b8", width: "45%" }}>{label}</td>
        <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>{value}</td>
      </tr>
    </table>
  );
}

export function EmailConfirmBadge({ confirmed, text }: { confirmed: boolean; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0", fontSize: "14px", color: confirmed ? "#16a34a" : "#dc2626" }}>
      {confirmed ? "✓" : "✗"} {text}
    </div>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} style={{ display: "inline-block", backgroundColor: "#6366f1", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", textDecoration: "none", margin: "16px 0" }}>
      {children}
    </a>
  );
}

export function EmailDivider() {
  return <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "24px 0" }} />;
}

export function EmailAlert({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 18px", margin: "16px 0", fontSize: "14px", color: "#92400e" }}>
      ⚠️ {children}
    </div>
  );
}
