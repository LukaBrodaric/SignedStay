import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailButton, EmailAlert } from "../layouts/components";

interface CheckoutOwnerEmailProps {
  ownerName: string;
  guestName: string;
  propertyName: string;
  depositReturned: boolean;
  incidentDescription?: string;
  checkOutDate: string;
}

export default function CheckoutOwnerEmail({
  ownerName,
  guestName,
  propertyName,
  depositReturned,
  incidentDescription,
  checkOutDate,
}: CheckoutOwnerEmailProps) {
  return (
    <BaseLayout previewText="Guest check-out recorded for your property">
      <EmailHeading>Guest Check-Out Recorded 🔔</EmailHeading>
      <EmailSubtext>
        {guestName} has completed check-out for {propertyName}.
      </EmailSubtext>
      
      <EmailInfoBox>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Guest Name</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{guestName}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Property</td>
            <td style={{ fontSize: "14px", color: "#0f172a", textAlign: "right", paddingBottom: "4px" }}>{propertyName}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Date</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{checkOutDate}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Deposit Returned</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>
              {depositReturned ? "Yes" : "No"}
            </td>
          </tr>
          {incidentDescription && (
            <tr>
              <td style={{ fontSize: "13px", color: "#94a3b8" }}>Incident</td>
              <td style={{ fontSize: "14px", color: "#0f172a", textAlign: "right" }}>{incidentDescription}</td>
            </tr>
          )}
        </table>
      </EmailInfoBox>

      {!depositReturned && (
        <EmailAlert>
          Deposit was marked as NOT returned.
        </EmailAlert>
      )}

      {incidentDescription && (
        <EmailAlert>
          Incident reported: {incidentDescription}
        </EmailAlert>
      )}

      <EmailButton href="https://signedstay.com/dashboard">
        View in Dashboard
      </EmailButton>
    </BaseLayout>
  );
}
