import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailConfirmBadge } from "../layouts/components";

interface CheckoutGuestEmailProps {
  guestName: string;
  propertyName: string;
  depositReturned: boolean;
  incidentDescription?: string;
  checkOutDate: string;
}

export default function CheckoutGuestEmail({
  guestName,
  propertyName,
  depositReturned,
  incidentDescription,
  checkOutDate,
}: CheckoutGuestEmailProps) {
  return (
    <BaseLayout previewText="Your check-out has been confirmed">
      <EmailHeading>Check-Out Confirmed ✅</EmailHeading>
      <EmailSubtext>
        Thank you, {guestName}! Your check-out has been recorded.
      </EmailSubtext>
      
      <EmailInfoBox>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Property</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{propertyName}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Check-Out Date</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{checkOutDate}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Deposit Returned</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>
              {depositReturned ? "Yes" : "No"}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8" }}>Incident</td>
            <td style={{ fontSize: "14px", color: "#0f172a", textAlign: "right" }}>
              {incidentDescription || "None"}
            </td>
          </tr>
        </table>
      </EmailInfoBox>

      <EmailConfirmBadge confirmed={true} text="Digital check-out recorded" />

      <p style={{ margin: "24px 0 0", fontSize: "14px", color: "#64748b" }}>
        Thank you for staying with us. We hope to see you again!
      </p>
    </BaseLayout>
  );
}
