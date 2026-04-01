import { ReactNode } from "react";

interface BaseLayoutProps {
  previewText?: string;
  children: ReactNode;
}

export default function BaseLayout({ previewText, children }: BaseLayoutProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {previewText && (
          <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
            {previewText}
          </div>
        )}
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#f8f7ff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f8f7ff", padding: "40px 20px" }}>
          <tr>
            <td align="center">
              <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: "600px", width: "100%" }}>

                <tr>
                  <td style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px 16px 0 0",
                    padding: "32px 40px 24px",
                    borderBottom: "1px solid #f0eeff",
                  }}>
                    <div style={{ display: "inline-block" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                        display: "inline-block",
                        verticalAlign: "middle",
                      }} />
                      <span style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0f172a",
                        verticalAlign: "middle",
                        marginLeft: "10px",
                      }}>
                        SignedStay
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ backgroundColor: "#ffffff", padding: "32px 40px" }}>
                    {children}
                  </td>
                </tr>

                <tr>
                  <td style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "0 0 16px 16px",
                    padding: "24px 40px 32px",
                    borderTop: "1px solid #f0eeff",
                    textAlign: "center",
                  }}>
                    <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
                      © {new Date().getFullYear()} SignedStay · signedstay.com
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#cbd5e1" }}>
                      This is an automated message. Please do not reply to this email.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
