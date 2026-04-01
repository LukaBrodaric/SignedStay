import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailConfirmBadge, EmailDivider, EmailButton, EmailAlert } from "../layouts/components";

interface CheckinOwnerEmailProps {
  ownerName: string;
  guestName: string;
  guestEmail: string;
  propertyName: string;
  propertyType: string;
  arrivalDate: string;
  departureDate: string;
  estimatedDepartureHour: string;
  numberOfGuests: number;
  depositConfirmed: boolean;
  conditionConfirmed: boolean;
}

export default function CheckinOwnerEmail({
  ownerName,
  guestName,
  guestEmail,
  propertyName,
  propertyType,
  arrivalDate,
  departureDate,
  estimatedDepartureHour,
  numberOfGuests,
  depositConfirmed,
  conditionConfirmed,
}: CheckinOwnerEmailProps) {
  return (
    <BaseLayout previewText="New check-in recorded for your property">
      <EmailHeading>New Check-In Recorded 🔔</EmailHeading>
      <EmailSubtext>
        A guest has completed check-in for {propertyName}.
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
      <EmailConfirmBadge confirmed={true} text="Digital signature collected" />

      <p style={{ margin: "16px 0", fontSize: "14px", color: "#64748b" }}>
        Guest contact: <a href={`mailto:${guestEmail}`} style={{ color: "#6366f1" }}>{guestEmail}</a>
      </p>

      {!depositConfirmed && (
        <EmailAlert>
          Deposit was NOT confirmed by the guest.
        </EmailAlert>
      )}

      <EmailButton href="https://signedstay.com/dashboard">
        View in Dashboard
      </EmailButton>
    </BaseLayout>
  );
}
