import { Resend } from "resend";
import path from "path";
import fs from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || "SignedStay <info@signedstay.com>";

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function loadAttachments(documents: { filePath: string; displayName: string }[]) {
  return documents
    .filter(doc => {
      const fullPath = path.join(process.cwd(), doc.filePath);
      return fs.existsSync(fullPath);
    })
    .map(doc => ({
      filename: doc.displayName,
      content: fs.readFileSync(path.join(process.cwd(), doc.filePath)),
    }));
}

const baseEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #f8f7ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f7ff; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px 16px 0 0; padding: 32px 40px 24px; border-bottom: 1px solid #f0eeff;">
              <div style="display: inline-block;">
                <div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #6366f1, #3b82f6); display: inline-block; vertical-align: middle;"></div>
                <span style="font-size: 20px; font-weight: 700; color: #0f172a; vertical-align: middle; margin-left: 10px;">SignedStay</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 0 0 16px 16px; padding: 24px 40px 32px; border-top: 1px solid #f0eeff; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">© ${new Date().getFullYear()} SignedStay · signedstay.com</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">This is an automated message. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const infoBox = (content: string) => `
<div style="background-color: #f8f7ff; border-radius: 12px; padding: 20px 24px; margin: 20px 0; border: 1px solid #ede9fe;">
  ${content}
</div>
`;

const infoRow = (label: string, value: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
  <tr>
    <td style="font-size: 13px; color: #94a3b8; width: 45%;">${label}</td>
    <td style="font-size: 14px; color: #0f172a; font-weight: 600;">${value}</td>
  </tr>
</table>
`;

const button = (href: string, text: string) => `
<a href="${href}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none; margin: 16px 0;">${text}</a>
`;

const alert = (text: string) => `
<div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 18px; margin: 16px 0; font-size: 14px; color: #92400e;">⚠️ ${text}</div>
`;

const badge = (confirmed: boolean, text: string) => `
<div style="display: flex; align-items: center; gap: 8px; margin: 8px 0; font-size: 14px; color: ${confirmed ? '#16a34a' : '#dc2626'};">
  ${confirmed ? '✓' : '✗'} ${text}
</div>
`;

const divider = `<hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />`;

export async function sendWelcomeEmail(params: {
  to: string; userName: string; email: string; temporaryPassword: string;
}) {
  try {
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">Welcome to SignedStay! 👋</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">Your account has been created by the administrator. Here are your login credentials:</p>
      ${infoBox(`
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font-size: 13px; color: #94a3b8; padding-bottom: 8px;">Email</td></tr>
          <tr><td style="font-size: 16px; color: #0f172a; font-weight: 600;">${params.email}</td></tr>
          <tr><td style="padding-top: 16px; font-size: 13px; color: #94a3b8; padding-bottom: 8px;">Password</td></tr>
          <tr><td style="font-size: 16px; color: #0f172a; font-weight: 600;">${params.temporaryPassword}</td></tr>
        </table>
      `)}
      ${button('https://signedstay.com/login', 'Log In to Your Account')}
      ${alert('Please change your password after your first login.')}
      <p style="margin: 24px 0 0; font-size: 14px; color: #64748b;">If you have any questions, contact us at <a href="mailto:info@signedstay.com" style="color: #6366f1;">info@signedstay.com</a></p>
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: "Welcome to SignedStay — Your account is ready",
      html,
    });
  } catch (e) { console.error("sendWelcomeEmail failed:", e); }
}

export async function sendNewPropertyEmail(params: {
  to: string; userName: string; propertyName: string;
  propertyType: string; address?: string; depositAmount: number;
}) {
  try {
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">A new property has been added 🏠</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">Your property has been set up in SignedStay. You can now manage check-ins and check-outs for your guests.</p>
      ${infoBox(`
        ${infoRow('Property Name', params.propertyName)}
        ${infoRow('Type', params.propertyType)}
        ${params.address ? infoRow('Address', params.address) : ''}
        ${infoRow('Deposit Amount', `€${params.depositAmount} EUR`)}
      `)}
      <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Your check-in and check-out links will be shared with you by the administrator.</p>
      ${button('https://signedstay.com/dashboard', 'View Your Dashboard')}
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `New property added: ${params.propertyName}`,
      html,
    });
  } catch (e) { console.error("sendNewPropertyEmail failed:", e); }
}

export async function sendCheckinGuestEmail(params: {
  to: string; guestName: string; propertyName: string; propertyType: string;
  arrivalDate: string; departureDate: string; estimatedDepartureHour: string;
  numberOfGuests: number; depositConfirmed: boolean; conditionConfirmed: boolean;
  documents: { filePath: string; displayName: string }[];
}) {
  try {
    const hasDocuments = params.documents.length > 0;
    const attachments = hasDocuments ? loadAttachments(params.documents) : [];
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">Check-In Confirmed ✅</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">Thank you, ${params.guestName}! Your check-in has been successfully recorded.</p>
      ${infoBox(`
        ${infoRow('Property', params.propertyName)}
        ${infoRow('Type', params.propertyType)}
        ${infoRow('Arrival', params.arrivalDate)}
        ${infoRow('Departure', params.departureDate)}
        ${infoRow('Est. Departure', params.estimatedDepartureHour)}
        ${infoRow('Number of Guests', String(params.numberOfGuests))}
      `)}
      ${divider}
      ${badge(params.depositConfirmed, 'Deposit confirmed')}
      ${badge(params.conditionConfirmed, 'Property condition confirmed')}
      ${badge(true, 'Digital signature recorded')}
      ${hasDocuments ? '<p style="margin: 16px 0 0; font-size: 13px; color: #64748b;">Please find the attached property documents in this email.</p>' : ''}
      <p style="margin: 24px 0 0; font-size: 14px; color: #64748b;">We hope you enjoy your stay!</p>
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Check-In Confirmed — ${params.propertyName}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
  } catch (e) { console.error("sendCheckinGuestEmail failed:", e); }
}

export async function sendCheckinOwnerEmail(params: {
  to: string; ownerName: string; guestName: string; guestEmail: string;
  propertyName: string; propertyType: string; arrivalDate: string;
  departureDate: string; estimatedDepartureHour: string;
  numberOfGuests: number; depositConfirmed: boolean; conditionConfirmed: boolean;
}) {
  try {
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">New Check-In Recorded 🔔</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">A guest has completed check-in for ${params.propertyName}.</p>
      ${infoBox(`
        ${infoRow('Guest Name', params.guestName)}
        ${infoRow('Property', params.propertyName)}
        ${infoRow('Type', params.propertyType)}
        ${infoRow('Arrival', params.arrivalDate)}
        ${infoRow('Departure', params.departureDate)}
        ${infoRow('Est. Departure', params.estimatedDepartureHour)}
        ${infoRow('Number of Guests', String(params.numberOfGuests))}
      `)}
      ${divider}
      ${badge(params.depositConfirmed, 'Deposit confirmed')}
      ${badge(params.conditionConfirmed, 'Property condition confirmed')}
      ${badge(true, 'Digital signature collected')}
      <p style="margin: 16px 0; font-size: 14px; color: #64748b;">Guest contact: <a href="mailto:${params.guestEmail}" style="color: #6366f1;">${params.guestEmail}</a></p>
      ${!params.depositConfirmed ? alert('Deposit was NOT confirmed by the guest.') : ''}
      ${button('https://signedstay.com/dashboard', 'View in Dashboard')}
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `New Check-In: ${params.guestName} at ${params.propertyName}`,
      html,
    });
  } catch (e) { console.error("sendCheckinOwnerEmail failed:", e); }
}

export async function sendCheckoutGuestEmail(params: {
  to: string; guestName: string; propertyName: string;
  depositReturned: boolean; incidentDescription?: string; checkOutDate: string;
}) {
  try {
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">Check-Out Confirmed ✅</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">Thank you, ${params.guestName}! Your check-out has been recorded.</p>
      ${infoBox(`
        ${infoRow('Property', params.propertyName)}
        ${infoRow('Check-Out Date', params.checkOutDate)}
        ${infoRow('Deposit Returned', params.depositReturned ? 'Yes' : 'No')}
        ${infoRow('Incident', params.incidentDescription || 'None')}
      `)}
      ${badge(true, 'Digital check-out recorded')}
      <p style="margin: 24px 0 0; font-size: 14px; color: #64748b;">Thank you for staying with us. We hope to see you again!</p>
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Check-Out Confirmed — ${params.propertyName}`,
      html,
    });
  } catch (e) { console.error("sendCheckoutGuestEmail failed:", e); }
}

export async function sendCheckoutOwnerEmail(params: {
  to: string; ownerName: string; guestName: string; propertyName: string;
  depositReturned: boolean; incidentDescription?: string; checkOutDate: string;
}) {
  try {
    let alerts = '';
    if (!params.depositReturned) {
      alerts += alert('Deposit was marked as NOT returned.');
    }
    if (params.incidentDescription) {
      alerts += alert(`Incident reported: ${params.incidentDescription}`);
    }
    
    const html = baseEmailTemplate(`
      <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">Guest Check-Out Recorded 🔔</h1>
      <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">${params.guestName} has completed check-out for ${params.propertyName}.</p>
      ${infoBox(`
        ${infoRow('Guest Name', params.guestName)}
        ${infoRow('Property', params.propertyName)}
        ${infoRow('Date', params.checkOutDate)}
        ${infoRow('Deposit Returned', params.depositReturned ? 'Yes' : 'No')}
        ${params.incidentDescription ? infoRow('Incident', params.incidentDescription) : ''}
      `)}
      ${alerts}
      ${button('https://signedstay.com/dashboard', 'View in Dashboard')}
    `);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Guest Check-Out: ${params.guestName} at ${params.propertyName}`,
      html,
    });
  } catch (e) { console.error("sendCheckoutOwnerEmail failed:", e); }
}
