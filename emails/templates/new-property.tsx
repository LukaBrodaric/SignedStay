import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailInfoRow, EmailButton } from "../layouts/components";

interface NewPropertyEmailProps {
  userName: string;
  propertyName: string;
  propertyType: string;
  address?: string;
  depositAmount: number;
}

export default function NewPropertyEmail({ userName, propertyName, propertyType, address, depositAmount }: NewPropertyEmailProps) {
  return (
    <BaseLayout previewText="A new property has been added">
      <EmailHeading>A new property has been added 🏠</EmailHeading>
      <EmailSubtext>
        Your property has been set up in SignedStay. You can now manage check-ins and check-outs for your guests.
      </EmailSubtext>
      
      <EmailInfoBox>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Property Name</td>
          </tr>
          <tr>
            <td style={{ fontSize: "16px", color: "#0f172a", fontWeight: "600", paddingBottom: "12px" }}>{propertyName}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Type</td>
          </tr>
          <tr>
            <td style={{ fontSize: "14px", color: "#0f172a", paddingBottom: "12px" }}>{propertyType}</td>
          </tr>
          {address && (
            <>
              <tr>
                <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Address</td>
              </tr>
              <tr>
                <td style={{ fontSize: "14px", color: "#0f172a", paddingBottom: "12px" }}>{address}</td>
              </tr>
            </>
          )}
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Deposit Amount</td>
          </tr>
          <tr>
            <td style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>€{depositAmount} EUR</td>
          </tr>
        </table>
      </EmailInfoBox>

      <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748b" }}>
        Your check-in and check-out links will be shared with you by the administrator.
      </p>

      <EmailButton href="https://signedstay.com/dashboard">
        View Your Dashboard
      </EmailButton>
    </BaseLayout>
  );
}
