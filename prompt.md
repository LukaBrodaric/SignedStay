# SignedStay — Email System with Resend

Implement a complete email system using **Resend** for all transactional emails. Read all existing code carefully before making changes, especially the existing `lib/email.ts`, check-in/check-out API routes, and the `PropertyDocument` model in Prisma.

---

## Install Resend

```bash
npm install resend
```

---

## Environment Variables

Add to `.env`:
```env
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="SignedStay <info@signedstay.com>"
```

---

## File Structure

Create the following files:

```
lib/
  email.ts                          # Main email sending functions (replace existing)
emails/
  layouts/
    base.tsx                        # Base layout component (logo, footer)
  templates/
    welcome-user.tsx                # Admin created new user
    new-property.tsx                # Admin created new property for user
    checkin-guest.tsx               # Check-in confirmation for guest
    checkin-owner.tsx               # Check-in notification for property owner
    checkout-guest.tsx              # Check-out confirmation for guest
    checkout-owner.tsx              # Check-out notification for property owner
```

---

## Base Layout (`emails/layouts/base.tsx`)

Create a clean, professional HTML email base layout. This is a React component using standard HTML elements (compatible with email clients):

```tsx
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

                {/* Header */}
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

                {/* Content */}
                <tr>
                  <td style={{ backgroundColor: "#ffffff", padding: "32px 40px" }}>
                    {children}
                  </td>
                </tr>

                {/* Footer */}
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
```

### Reusable helper components — add to `emails/layouts/components.tsx`:

```tsx
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
```

---

## Email Templates

### 1. `emails/templates/welcome-user.tsx`
Sent when: Admin creates a new user account.
Recipient: New CLIENT user.

```tsx
interface WelcomeUserEmailProps {
  userName: string;
  email: string;
  temporaryPassword: string;
}
```

Content:
- Heading: "Welcome to SignedStay! 👋"
- Subtext: "Your account has been created by the administrator. Here are your login credentials:"
- InfoBox: Email, Password
- EmailButton href="https://signedstay.com/login" → "Log In to Your Account"
- EmailAlert: "Please change your password after your first login."
- Closing: "If you have any questions, contact us at info@signedstay.com"

---

### 2. `emails/templates/new-property.tsx`
Sent when: Admin creates a new property for a user.
Recipient: Property owner (CLIENT).

```tsx
interface NewPropertyEmailProps {
  userName: string;
  propertyName: string;
  propertyType: string;
  address?: string;
  depositAmount: number;
}
```

Content:
- Heading: "A new property has been added 🏠"
- Subtext: "Your property has been set up in SignedStay."
- InfoBox: Property Name, Type, Address (if set), Deposit Amount (€)
- Note: "Your check-in and check-out links will be shared with you by the administrator."
- EmailButton href="https://signedstay.com/dashboard" → "View Your Dashboard"

---

### 3. `emails/templates/checkin-guest.tsx`
Sent when: Guest submits check-in form.
Recipient: Guest.

```tsx
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
```

Content:
- Heading: "Check-In Confirmed ✅"
- Subtext: "Thank you, [guestName]! Your check-in has been successfully recorded."
- InfoBox: Property Name, Type, Arrival, Departure, Est. Departure Hour, Number of Guests
- EmailDivider
- EmailConfirmBadge for depositConfirmed: "Deposit confirmed"
- EmailConfirmBadge for conditionConfirmed: "Property condition confirmed"
- EmailConfirmBadge confirmed=true: "Digital signature recorded"
- If hasDocuments: small note "Please find the attached property documents in this email."
- Closing: "We hope you enjoy your stay!"

---

### 4. `emails/templates/checkin-owner.tsx`
Sent when: Guest submits check-in form.
Recipient: Property owner.

```tsx
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
```

Content:
- Heading: "New Check-In Recorded 🔔"
- Subtext: "A guest has completed check-in for [propertyName]."
- InfoBox: all fields above
- EmailDivider
- EmailConfirmBadge for depositConfirmed
- EmailConfirmBadge for conditionConfirmed
- EmailConfirmBadge confirmed=true: "Digital signature collected"
- Note: "Guest contact: [guestEmail]"
- If depositConfirmed is false: EmailAlert "Deposit was NOT confirmed by the guest."
- EmailButton href="https://signedstay.com/dashboard" → "View in Dashboard"

---

### 5. `emails/templates/checkout-guest.tsx`
Sent when: Guest submits check-out form.
Recipient: Guest.

```tsx
interface CheckoutGuestEmailProps {
  guestName: string;
  propertyName: string;
  depositReturned: boolean;
  incidentDescription?: string;
  checkOutDate: string;
}
```

Content:
- Heading: "Check-Out Confirmed ✅"
- Subtext: "Thank you, [guestName]! Your check-out has been recorded."
- InfoBox: Property Name, Check-Out Date, Deposit Returned (Yes/No), Incident (if any, else "None")
- EmailConfirmBadge confirmed=true: "Digital check-out recorded"
- Closing: "Thank you for staying with us. We hope to see you again!"

---

### 6. `emails/templates/checkout-owner.tsx`
Sent when: Guest submits check-out form.
Recipient: Property owner.

```tsx
interface CheckoutOwnerEmailProps {
  ownerName: string;
  guestName: string;
  propertyName: string;
  depositReturned: boolean;
  incidentDescription?: string;
  checkOutDate: string;
}
```

Content:
- Heading: "Guest Check-Out Recorded 🔔"
- Subtext: "[guestName] has completed check-out for [propertyName]."
- InfoBox: Guest Name, Property, Date, Deposit Returned, Incident
- If depositReturned is false: EmailAlert "Deposit was marked as NOT returned."
- If incidentDescription exists: EmailAlert with the incident text
- EmailButton → "View in Dashboard"

---

## Main Email Library (`lib/email.ts`)

Replace existing `lib/email.ts` completely:

```typescript
import { Resend } from "resend";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import path from "path";
import fs from "fs";

import WelcomeUserEmail from "@/emails/templates/welcome-user";
import NewPropertyEmail from "@/emails/templates/new-property";
import CheckinGuestEmail from "@/emails/templates/checkin-guest";
import CheckinOwnerEmail from "@/emails/templates/checkin-owner";
import CheckoutGuestEmail from "@/emails/templates/checkout-guest";
import CheckoutOwnerEmail from "@/emails/templates/checkout-owner";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || "SignedStay <info@signedstay.com>";

function render(component: React.ReactElement): string {
  return "<!DOCTYPE html>" + renderToStaticMarkup(component);
}

function loadAttachments(documents: { filePath: string; displayName: string }[]) {
  return documents
    .filter(doc => fs.existsSync(path.join(process.cwd(), doc.filePath)))
    .map(doc => ({
      filename: doc.displayName,
      content: fs.readFileSync(path.join(process.cwd(), doc.filePath)),
    }));
}

export async function sendWelcomeEmail(params: {
  to: string; userName: string; email: string; temporaryPassword: string;
}) {
  try {
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: "Welcome to SignedStay — Your account is ready",
      html: render(React.createElement(WelcomeUserEmail, params)),
    });
  } catch (e) { console.error("sendWelcomeEmail failed:", e); }
}

export async function sendNewPropertyEmail(params: {
  to: string; userName: string; propertyName: string;
  propertyType: string; address?: string; depositAmount: number;
}) {
  try {
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `New property added: ${params.propertyName}`,
      html: render(React.createElement(NewPropertyEmail, params)),
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
    const attachments = loadAttachments(params.documents);
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Check-In Confirmed — ${params.propertyName}`,
      html: render(React.createElement(CheckinGuestEmail, { ...params, hasDocuments: attachments.length > 0 })),
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
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `New Check-In: ${params.guestName} at ${params.propertyName}`,
      html: render(React.createElement(CheckinOwnerEmail, params)),
    });
  } catch (e) { console.error("sendCheckinOwnerEmail failed:", e); }
}

export async function sendCheckoutGuestEmail(params: {
  to: string; guestName: string; propertyName: string;
  depositReturned: boolean; incidentDescription?: string; checkOutDate: string;
}) {
  try {
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Check-Out Confirmed — ${params.propertyName}`,
      html: render(React.createElement(CheckoutGuestEmail, params)),
    });
  } catch (e) { console.error("sendCheckoutGuestEmail failed:", e); }
}

export async function sendCheckoutOwnerEmail(params: {
  to: string; ownerName: string; guestName: string; propertyName: string;
  depositReturned: boolean; incidentDescription?: string; checkOutDate: string;
}) {
  try {
    return await resend.emails.send({
      from: FROM, to: params.to,
      subject: `Guest Check-Out: ${params.guestName} at ${params.propertyName}`,
      html: render(React.createElement(CheckoutOwnerEmail, params)),
    });
  } catch (e) { console.error("sendCheckoutOwnerEmail failed:", e); }
}
```

---

## API Route Updates

### Check-In submission route (`app/api/forms/checkin/[token]/route.ts`)

After saving CheckIn to DB, fetch property with owner and documents:

```typescript
const property = await prisma.property.findUnique({
  where: { checkInToken: params.token },
  include: { user: true, documents: true },
});

// Send to guest
await sendCheckinGuestEmail({
  to: body.guestEmail,
  guestName: body.guestName,
  propertyName: property.name,
  propertyType: property.propertyType,
  arrivalDate: formatDate(body.arrivalDate),
  departureDate: formatDate(body.departureDate),
  estimatedDepartureHour: body.estimatedDepartureHour,
  numberOfGuests: body.numberOfGuests,
  depositConfirmed: body.depositConfirmed,
  conditionConfirmed: body.conditionConfirmed,
  documents: property.documents.map(d => ({ filePath: d.filePath, displayName: d.displayName })),
});

// Send to owner
await sendCheckinOwnerEmail({
  to: property.user.email,
  ownerName: property.user.name,
  guestName: body.guestName,
  guestEmail: body.guestEmail,
  propertyName: property.name,
  propertyType: property.propertyType,
  arrivalDate: formatDate(body.arrivalDate),
  departureDate: formatDate(body.departureDate),
  estimatedDepartureHour: body.estimatedDepartureHour,
  numberOfGuests: body.numberOfGuests,
  depositConfirmed: body.depositConfirmed,
  conditionConfirmed: body.conditionConfirmed,
});
```

### Check-Out submission route (`app/api/forms/checkout/[token]/route.ts`)

After saving CheckOut to DB:

```typescript
const property = await prisma.property.findUnique({
  where: { checkOutToken: params.token },
  include: { user: true },
});

// Get last check-in to find guest email
const lastCheckIn = await prisma.checkIn.findFirst({
  where: { propertyId: property.id },
  orderBy: { createdAt: "desc" },
});

const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

// Send to guest if we have their email
if (lastCheckIn) {
  await sendCheckoutGuestEmail({
    to: lastCheckIn.guestEmail,
    guestName: body.guestName,
    propertyName: property.name,
    depositReturned: body.depositReturned,
    incidentDescription: body.incidentDescription,
    checkOutDate: today,
  });
}

// Send to owner
await sendCheckoutOwnerEmail({
  to: property.user.email,
  ownerName: property.user.name,
  guestName: body.guestName,
  propertyName: property.name,
  depositReturned: body.depositReturned,
  incidentDescription: body.incidentDescription,
  checkOutDate: today,
});
```

### Admin create user route

After creating user, before returning response:
```typescript
await sendWelcomeEmail({
  to: newUser.email,
  userName: newUser.name,
  email: newUser.email,
  temporaryPassword: plainTextPassword, // save this before hashing
});
```

### Admin create property route

After creating property:
```typescript
const owner = await prisma.user.findUnique({ where: { id: body.userId } });
await sendNewPropertyEmail({
  to: owner.email,
  userName: owner.name,
  propertyName: newProperty.name,
  propertyType: newProperty.propertyType,
  address: newProperty.address ?? undefined,
  depositAmount: newProperty.depositAmount,
});
```

---

## Date Helper

Add to `lib/utils.ts`:
```typescript
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
```

---

## Important Notes

1. All email sends are wrapped in try/catch — email failure must NEVER cause the API to return an error
2. Email templates use plain React with inline CSS only — no Tailwind, no external CSS
3. Documents are loaded from filesystem using `filePath` stored in DB (relative to `process.cwd()`)
4. Remove Nodemailer from the project completely (`npm uninstall nodemailer`) if it was installed
5. The `emails/` folder is at the project root, not inside `app/`
6. After making all changes, run `npm run build` to verify no TypeScript errors