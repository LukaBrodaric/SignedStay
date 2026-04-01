import BaseLayout from "../layouts/base";
import { EmailHeading, EmailSubtext, EmailInfoBox, EmailInfoRow, EmailButton, EmailAlert } from "../layouts/components";

interface WelcomeUserEmailProps {
  userName: string;
  email: string;
  temporaryPassword: string;
}

export default function WelcomeUserEmail({ userName, email, temporaryPassword }: WelcomeUserEmailProps) {
  return (
    <BaseLayout previewText="Welcome to SignedStay!">
      <EmailHeading>Welcome to SignedStay! 👋</EmailHeading>
      <EmailSubtext>
        Your account has been created by the administrator. Here are your login credentials:
      </EmailSubtext>
      
      <EmailInfoBox>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tr>
            <td style={{ fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Email</td>
          </tr>
          <tr>
            <td style={{ fontSize: "16px", color: "#0f172a", fontWeight: "600" }}>{email}</td>
          </tr>
          <tr>
            <td style={{ paddingTop: "16px", fontSize: "13px", color: "#94a3b8", paddingBottom: "8px" }}>Password</td>
          </tr>
          <tr>
            <td style={{ fontSize: "16px", color: "#0f172a", fontWeight: "600" }}>{temporaryPassword}</td>
          </tr>
        </table>
      </EmailInfoBox>

      <EmailButton href="https://signedstay.com/login">
        Log In to Your Account
      </EmailButton>

      <EmailAlert>
        Please change your password after your first login.
      </EmailAlert>

      <p style={{ margin: "24px 0 0", fontSize: "14px", color: "#64748b" }}>
        If you have any questions, contact us at <a href="mailto:info@signedstay.com" style={{ color: "#6366f1" }}>info@signedstay.com</a>
      </p>
    </BaseLayout>
  );
}
