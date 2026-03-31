import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface CheckInData {
  guestName: string;
  guestEmail: string;
  arrivalDate: Date;
  departureDate: Date;
  numberOfGuests: number;
}

interface PropertyDocument {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
}

export async function sendWelcomeEmail(
  to: string,
  name: string,
  password: string
) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1, #3b82f6); color: white; padding: 30px; border-radius: 10px; text-align: center; }
        .content { background: #f8f7ff; padding: 30px; border-radius: 10px; margin-top: 20px; }
        .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SignedStay!</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Welcome to SignedStay! Your account has been created by the administrator.</p>
          <div class="credentials">
            <p><strong>Your login credentials:</strong></p>
            <p>Email: <strong>${to}</strong></p>
            <p>Password: <strong>${password}</strong></p>
          </div>
          <p>Please login and change your password after your first login.</p>
          <a href="${process.env.NEXTAUTH_URL}/login" class="btn">Login Now</a>
        </div>
        <div class="footer">
          <p>&copy; 2025 SignedStay. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Welcome to SignedStay - Your Login Credentials",
    html: htmlContent,
  });
}

export async function sendCheckInConfirmation(
  to: string,
  guestName: string,
  propertyName: string,
  checkInData: CheckInData,
  documents: PropertyDocument[]
) {
  const arrivalDate = new Date(checkInData.arrivalDate).toLocaleDateString();
  const departureDate = new Date(checkInData.departureDate).toLocaleDateString();

  const attachments = documents.map((doc) => ({
    filename: doc.fileName,
    path: doc.filePath,
  }));

  const docsNote = documents.length > 0
    ? `<p>📋 The following documents have been attached to this email: ${documents.map(d => d.name).join(", ")}</p>`
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1, #3b82f6); color: white; padding: 30px; border-radius: 10px; text-align: center; }
        .content { background: #f8f7ff; padding: 30px; border-radius: 10px; margin-top: 20px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { font-weight: 600; }
        .success-icon { font-size: 48px; margin-bottom: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✅</div>
          <h1>Check-In Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hello ${guestName},</p>
          <p>Your check-in at <strong>${propertyName}</strong> has been confirmed. Here are your reservation details:</p>
          
          <div class="details">
            <div class="detail-row">
              <span class="label">Property</span>
              <span class="value">${propertyName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Arrival Date</span>
              <span class="value">${arrivalDate}</span>
            </div>
            <div class="detail-row">
              <span class="label">Departure Date</span>
              <span class="value">${departureDate}</span>
            </div>
            <div class="detail-row">
              <span class="label">Number of Guests</span>
              <span class="value">${checkInData.numberOfGuests}</span>
            </div>
          </div>
          
          ${docsNote}
          
          <p>We hope you enjoy your stay!</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 SignedStay. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Check-In Confirmed — ${propertyName}`,
    html: htmlContent,
    attachments: attachments,
  });
}
