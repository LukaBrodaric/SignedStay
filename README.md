# SignedStay - Vacation Rental Management SaaS

A full-stack SaaS application for vacation rental property owners to digitally manage guest check-ins and check-outs.

## Features

- **Multi-property management**: Manage unlimited villas, apartments, and rentals
- **Digital signatures**: Guests sign digitally on any device
- **Automatic email confirmations**: Instant confirmation emails with all details
- **Property documents**: Upload and attach documents (house rules, contracts, etc.) to properties
- **Admin dashboard**: Full overview of users, properties, and activity
- **Client dashboard**: Individual property owners can manage their properties
- **Unique guest links**: Generate dedicated check-in/check-out URLs for each property
- **PDF export**: Export check-in and check-out records as PDF documents
- **CSV export**: Export check-in and check-out data as CSV files
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js (credentials provider)
- **Email**: Nodemailer with Gmail SMTP
- **Digital Signature**: react-signature-canvas
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Gmail account with App Password (for email functionality)

### Installation

1. Clone or create the project folder

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:123456@localhost:5432/signedstay"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_FROM="your@gmail.com"
   EMAIL_PASSWORD="your-gmail-app-password"
   ```

4. Create the PostgreSQL database:
   ```bash
   createdb -U postgres signedstay
   ```
   Or via pgAdmin: create a database named "signedstay"

5. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Seed the database (creates admin user):
   ```bash
   npx prisma db seed
   ```

7. Run the development server:
   ```bash
   npm run dev
   ```

8. Open http://localhost:3000

### Default Login Credentials

**Admin Account:**
- Email: luka@signedstay.com
- Password: admin123

**Demo User:**
- Email: demo@signedstay.com
- Password: demo1234

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication pages
│   │   └── login/
│   ├── (dashboard)/         # Dashboard routes
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── properties/  # Property management
│   │   │   └── users/      # User management
│   │   └── dashboard/       # Client dashboard
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/          # Authentication API
│   │   ├── dashboard/     # Dashboard API endpoints
│   │   └── forms/        # Public form endpoints
│   ├── checkin/[token]/   # Guest check-in form
│   └── checkout/[token]/   # Guest check-out form
├── components/
│   ├── dashboard/          # Dashboard components
│   ├── landing/           # Landing page components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── email.ts          # Email sending functions
│   ├── exportCsv.ts      # CSV export utilities
│   ├── exportPdf.ts      # PDF export utilities
│   └── prisma.ts        # Prisma client
└── prisma/
    ├── schema.prisma     # Database schema
    └── seed.ts          # Database seeding
```

## Database Schema

The application uses the following main models:
- **User**: Property owners and admins
- **Property**: Vacation rental properties
- **CheckIn**: Guest check-in records with digital signatures
- **CheckOut**: Guest check-out records
- **PropertyDocument**: Documents attached to properties

## API Endpoints

### Admin APIs
- `GET/POST /api/admin/users` - List and create users
- `GET/PUT/DELETE /api/admin/users/[id]` - User operations
- `GET/POST /api/admin/properties` - List and create properties
- `GET/PUT /api/admin/properties/[id]` - Property operations
- `POST /api/admin/properties/[id]/generate-tokens` - Generate check-in/out links

### Dashboard APIs
- `GET /api/dashboard/properties` - List user's properties
- `GET /api/dashboard/properties/[id]` - Property details with check-ins

### Public APIs
- `GET/POST /api/forms/checkin/[token]` - Public check-in form
- `GET/POST /api/forms/checkout/[token]` - Public check-out form
- `GET /api/properties/validate-token` - Validate property token

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `EMAIL_FROM` | Gmail address for sending emails | Yes |
| `EMAIL_PASSWORD` | Gmail App Password | Yes |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
