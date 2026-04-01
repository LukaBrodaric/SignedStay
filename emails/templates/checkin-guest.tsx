import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailConfirmBadge, EmailDivider } from "../layouts/components";

interface CheckinGuestEmailProps {
  guestName: string;
  propertyName: string;
  propertyType: string;
  arrivalDate: string;
  departureDate: string;
  estimatedDepartureHour: string;
  numberOfGuests: number;
  depositConfirmed: boolean;
  conditionConfirmed: boolean;
  hasDocuments: boolean;
}

export default function CheckinGuestEmail({
  guestName,
  propertyName,
  propertyType,
  arrivalDate,
  departureDate,
  estimatedDepartureHour,
  numberOfGuests,
  depositConfirmed,
  conditionConfirmed,
  hasDocuments,
}: CheckinGuestEmailProps) {
  return (
    <BaseLayout previewText="Your check-in has been confirmed">
      <EmailHeading>Check-In Confirmed ✅</EmailHeading>
      <EmailSubtext>
        Thank you, {guestName}! Your check-in has been successfully recorded.
      </EmailSubtext>
      
      <EmailInfoBox>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Property</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{propertyName}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Type</td>
            <td style={{ fontSize: "14px", color: "#0f172a", textAlign: "right", paddingBottom: "4px" }}>{propertyType}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Arrival</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{arrivalDate}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Departure</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right", paddingBottom: "4px" }}>{departureDate}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "4px" }}>Est. Departure</td>
            <td style={{ fontSize: "14px", color: "#0f172a", textAlign: "right", paddingBottom: "4px" }}>{estimatedDepartureHour}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8" }}>Number of Guests</td>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", textAlign: "right" }}>{numberOfGuests}</td>
          </tr>
        </table>
      </EmailInfoBox>

      <EmailDivider />

      <EmailConfirmBadge confirmed={depositConfirmed} text="Deposit confirmed" />
      <EmailConfirmBadge confirmed={conditionConfirmed} text="Property condition confirmed" />
      <EmailConfirmBadge confirmed={true} text="Digital signature recorded" />

      {hasDocuments && (
        <p style={{ margin: "16px 0 0", fontSize: "13px", color: "#64748b" }}>
          Please find the attached property documents in this email.
        </p>
      )}

      <p style={{ margin: "24px 0 0", fontSize: "14px", color: "#64748b" }}>
        We hope you enjoy your stay!
      </p>
    </BaseLayout>
  );
}
