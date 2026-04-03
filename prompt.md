# SignedStay — UI Improvements & New Pages

Please make the following changes to the existing application. Read all existing code carefully before making changes. Do not break any existing functionality.

---

## Change 1: Check-In Form — Extended Departure Hour Options

Find the check-in form (`app/checkin/[token]/page.tsx` or `components/forms/CheckInForm.tsx`) and update the estimated departure hour select options to include every hour from midnight to 15:00:

```
00:00 (Midnight)
01:00
02:00
03:00
04:00
05:00
06:00
07:00
08:00
09:00
10:00
11:00
12:00 (Noon)
13:00
14:00
15:00
```

Replace the existing limited options with this full list. Keep the same select styling.

---

## Change 2: Privacy Policy & Terms of Service Pages

Create two new public pages with full content in both Croatian and English, switchable via the same HR/EN language system already in place (`useLanguage` hook + `translations`).

### Routes
- `app/privacy/page.tsx` — Privacy Policy
- `app/terms/page.tsx` — Terms of Service

### Page design
Both pages should follow this layout:
- Same navbar as landing page (with language switcher)
- Max width container: `max-w-4xl mx-auto px-6 py-16`
- Page title: `text-4xl font-bold text-slate-900 mb-2`
- Last updated date below title: `text-slate-400 text-sm mb-12`
- Section headings: `text-xl font-semibold text-slate-900 mt-10 mb-3`
- Body text: `text-slate-600 leading-relaxed`
- Same footer as landing page
- Wrap with `LanguageProvider`

---

### Privacy Policy Content

Add to `translations.ts` under `privacy` key for both `hr` and `en`:

**Croatian (hr):**

```
title: "Pravila privatnosti"
lastUpdated: "Zadnje ažuriranje: travanj 2025."

sections: [
  {
    heading: "1. Uvod",
    content: "SignedStay ('mi', 'nas', 'naš') poštuje vašu privatnost i obvezuje se zaštititi osobne podatke koje nam povjerite. Ova Pravila privatnosti objašnjavaju kako prikupljamo, koristimo i štitimo vaše podatke kada koristite našu platformu na signedstay.com."
  },
  {
    heading: "2. Koje podatke prikupljamo",
    content: "Prikupljamo sljedeće vrste podataka:\n\n• Podaci o vlasnicima objekata: ime, prezime, email adresa, podaci o nekretninama.\n• Podaci o gostima: ime i prezime, email adresa, datum dolaska i odlaska, broj gostiju, digitalni potpis, potvrda depozita i stanja objekta.\n• Tehnički podaci: IP adresa, vrsta preglednika, podaci o uređaju, kolačići."
  },
  {
    heading: "3. Kako koristimo vaše podatke",
    content: "Vaše podatke koristimo isključivo za:\n\n• Pružanje usluge digitalnog check-in i check-out procesa.\n• Slanje automatskih email potvrda gostima i vlasnicima objekata.\n• Čuvanje evidencije o boravcima u svrhu zaštite vlasnika i gostiju.\n• Poboljšanje naše usluge i korisničkog iskustva."
  },
  {
    heading: "4. Dijeljenje podataka",
    content: "Vaše osobne podatke ne prodajemo, ne iznajmljujemo niti dijelimo s trećim stranama u komercijalne svrhe. Podaci se dijele isključivo:\n\n• Između vlasnika objekta i njegovih gostiju u okviru platforme.\n• S pružateljima tehničkih usluga neophodnih za rad platforme (hosting, email servisi), koji su obvezani ugovorima o zaštiti podataka."
  },
  {
    heading: "5. Čuvanje podataka",
    content: "Podatke čuvamo onoliko dugo koliko je potrebno za pružanje usluge i ispunjavanje zakonskih obveza. Vlasnici objekata mogu zatražiti brisanje podataka kontaktiranjem na info@signedstay.com. Podaci gostiju čuvaju se u skladu s potrebama vlasnika objekta i primjenjivim zakonima."
  },
  {
    heading: "6. Vaša prava (GDPR)",
    content: "Ako ste rezident Europskog gospodarskog prostora, imate pravo:\n\n• Pristupiti svojim osobnim podacima.\n• Ispraviti netočne podatke.\n• Zatražiti brisanje podataka ('pravo na zaborav').\n• Ograničiti obradu podataka.\n• Prigovoriti obradi podataka.\n• Prenosivosti podataka.\n\nZa ostvarivanje ovih prava kontaktirajte nas na info@signedstay.com."
  },
  {
    heading: "7. Kolačići",
    content: "Koristimo isključivo funkcionalne kolačiće neophodne za rad platforme (npr. autentifikacija, jezične postavke). Ne koristimo kolačiće za praćenje ili reklamne svrhe."
  },
  {
    heading: "8. Sigurnost podataka",
    content: "Primjenjujemo odgovarajuće tehničke i organizacijske mjere zaštite podataka, uključujući enkripciju prijenosa podataka (HTTPS/SSL), hashiranje lozinki i kontrolu pristupa. Međutim, nijedan sustav nije 100% siguran i ne možemo jamčiti apsolutnu sigurnost."
  },
  {
    heading: "9. Kontakt",
    content: "Za sva pitanja vezana uz privatnost i zaštitu podataka možete nas kontaktirati:\n\nSignedStay\nEmail: info@signedstay.com\nTelefon: +385 91 915 7424\nAdresa: Pula, Hrvatska"
  }
]
```

**English (en):**

```
title: "Privacy Policy"
lastUpdated: "Last updated: April 2025"

sections: [
  {
    heading: "1. Introduction",
    content: "SignedStay ('we', 'us', 'our') respects your privacy and is committed to protecting the personal data you entrust to us. This Privacy Policy explains how we collect, use, and protect your data when you use our platform at signedstay.com."
  },
  {
    heading: "2. Data We Collect",
    content: "We collect the following types of data:\n\n• Property owner data: name, surname, email address, property information.\n• Guest data: full name, email address, arrival and departure dates, number of guests, digital signature, deposit and property condition confirmation.\n• Technical data: IP address, browser type, device information, cookies."
  },
  {
    heading: "3. How We Use Your Data",
    content: "We use your data solely for:\n\n• Providing the digital check-in and check-out service.\n• Sending automated email confirmations to guests and property owners.\n• Maintaining stay records to protect both owners and guests.\n• Improving our service and user experience."
  },
  {
    heading: "4. Data Sharing",
    content: "We do not sell, rent, or share your personal data with third parties for commercial purposes. Data is shared only:\n\n• Between property owners and their guests within the platform.\n• With technical service providers necessary for platform operation (hosting, email services), who are bound by data protection agreements."
  },
  {
    heading: "5. Data Retention",
    content: "We retain data for as long as necessary to provide the service and fulfill legal obligations. Property owners may request data deletion by contacting info@signedstay.com. Guest data is retained in accordance with property owner needs and applicable laws."
  },
  {
    heading: "6. Your Rights (GDPR)",
    content: "If you are a resident of the European Economic Area, you have the right to:\n\n• Access your personal data.\n• Correct inaccurate data.\n• Request data deletion ('right to be forgotten').\n• Restrict data processing.\n• Object to data processing.\n• Data portability.\n\nTo exercise these rights, contact us at info@signedstay.com."
  },
  {
    heading: "7. Cookies",
    content: "We use only functional cookies necessary for platform operation (e.g., authentication, language settings). We do not use tracking or advertising cookies."
  },
  {
    heading: "8. Data Security",
    content: "We implement appropriate technical and organizational data protection measures, including data transmission encryption (HTTPS/SSL), password hashing, and access control. However, no system is 100% secure and we cannot guarantee absolute security."
  },
  {
    heading: "9. Contact",
    content: "For all privacy and data protection inquiries:\n\nSignedStay\nEmail: info@signedstay.com\nPhone: +385 91 915 7424\nAddress: Pula, Croatia"
  }
]
```

---

### Terms of Service Content

Add to `translations.ts` under `terms` key for both `hr` and `en`:

**Croatian (hr):**

```
title: "Uvjeti korištenja"
lastUpdated: "Zadnje ažuriranje: travanj 2025."

sections: [
  {
    heading: "1. Prihvaćanje uvjeta",
    content: "Korištenjem platforme SignedStay pristajete na ove Uvjete korištenja. Ako se ne slažete s ovim uvjetima, molimo vas da ne koristite našu uslugu."
  },
  {
    heading: "2. Opis usluge",
    content: "SignedStay je platforma za digitalno upravljanje check-in i check-out procesima za iznajmljivače nekretnina. Usluga omogućuje:\n\n• Generiranje jedinstvenih linkova za check-in i check-out.\n• Digitalno prikupljanje podataka gostiju i potpisa.\n• Automatsko slanje email potvrda.\n• Čuvanje evidencije boravaka u digitalnom obliku."
  },
  {
    heading: "3. Registracija i računi",
    content: "Registracija na platformi je moguća isključivo uz odobrenje administratora SignedStay. Odgovorni ste za čuvanje povjerljivosti svojih podataka za prijavu i za sve aktivnosti koje se odvijaju putem vašeg računa. Obavezni ste odmah obavijestiti SignedStay o svakoj neovlaštenoj upotrebi vašeg računa."
  },
  {
    heading: "4. Pretplata i plaćanje",
    content: "Usluga se naplaćuje godišnjom pretplatom od 30 EUR po objektu. Plaćanje se vrši temeljem issued računa. Pristup platformi aktivira se nakon potvrde uplate. Povrat novca nije moguć nakon aktivacije računa, osim u slučajevima predviđenim zakonom."
  },
  {
    heading: "5. Odgovornost korisnika",
    content: "Kao korisnik platforme obvezujete se:\n\n• Koristiti platformu isključivo u zakonite svrhe.\n• Ne unositi lažne ili obmanjujuće podatke.\n• Čuvati povjerljivost linkova za check-in i check-out.\n• Osigurati da gosti budu obaviješteni o prikupljanju njihovih podataka.\n• Poštovati primjenjive zakone o zaštiti podataka (GDPR)."
  },
  {
    heading: "6. Odricanje od odgovornosti",
    content: "SignedStay nije odgovoran za:\n\n• Sporove između vlasnika objekata i gostiju.\n• Gubitak podataka uzrokovan tehničkim poteškoćama izvan naše kontrole.\n• Štete nastale neovlaštenim pristupom podacima ukoliko je korisnik propustio zaštititi svoje pristupne podatke.\n• Posljedice korištenja platforme u svrhe koje nisu predviđene ovim Uvjetima."
  },
  {
    heading: "7. Dostupnost usluge",
    content: "Nastojimo osigurati neprekidnu dostupnost platforme, ali ne garantiramo 100% uptime. Zadržavamo pravo privremeno isključiti platformu radi održavanja ili nadogradnje, uz prethodnu obavijest korisnicima kada je to moguće."
  },
  {
    heading: "8. Izmjene uvjeta",
    content: "SignedStay zadržava pravo izmjene ovih Uvjeta korištenja u bilo kojem trenutku. O značajnim izmjenama obavijestit ćemo korisnike putem email adrese registrirane na platformi. Nastavak korištenja platforme nakon izmjena predstavlja prihvaćanje novih uvjeta."
  },
  {
    heading: "9. Mjerodavno pravo",
    content: "Na ove Uvjete korištenja primjenjuje se pravo Republike Hrvatske. Sve sporove nastojat ćemo riješiti sporazumno, a u slučaju spora nadležan je sud u Puli, Hrvatska."
  },
  {
    heading: "10. Kontakt",
    content: "Za sva pitanja vezana uz Uvjete korištenja:\n\nSignedStay\nEmail: info@signedstay.com\nTelefon: +385 91 915 7424\nAdresa: Pula, Hrvatska"
  }
]
```

**English (en):**

```
title: "Terms of Service"
lastUpdated: "Last updated: April 2025"

sections: [
  {
    heading: "1. Acceptance of Terms",
    content: "By using the SignedStay platform, you agree to these Terms of Service. If you do not agree with these terms, please do not use our service."
  },
  {
    heading: "2. Service Description",
    content: "SignedStay is a platform for digital check-in and check-out management for property rental owners. The service enables:\n\n• Generating unique check-in and check-out links.\n• Digitally collecting guest data and signatures.\n• Automatically sending email confirmations.\n• Maintaining digital stay records."
  },
  {
    heading: "3. Registration and Accounts",
    content: "Registration on the platform is only possible with SignedStay administrator approval. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. You must immediately notify SignedStay of any unauthorized use of your account."
  },
  {
    heading: "4. Subscription and Payment",
    content: "The service is charged as an annual subscription of €30 per property. Payment is made based on issued invoices. Platform access is activated upon payment confirmation. Refunds are not available after account activation, except as required by law."
  },
  {
    heading: "5. User Responsibilities",
    content: "As a platform user, you agree to:\n\n• Use the platform solely for lawful purposes.\n• Not enter false or misleading information.\n• Maintain the confidentiality of check-in and check-out links.\n• Ensure guests are informed about data collection.\n• Comply with applicable data protection laws (GDPR)."
  },
  {
    heading: "6. Limitation of Liability",
    content: "SignedStay is not liable for:\n\n• Disputes between property owners and guests.\n• Data loss caused by technical difficulties beyond our control.\n• Damages resulting from unauthorized data access if the user failed to protect their credentials.\n• Consequences of using the platform for purposes not covered by these Terms."
  },
  {
    heading: "7. Service Availability",
    content: "We strive to ensure continuous platform availability but do not guarantee 100% uptime. We reserve the right to temporarily suspend the platform for maintenance or upgrades, with prior notice to users when possible."
  },
  {
    heading: "8. Changes to Terms",
    content: "SignedStay reserves the right to modify these Terms of Service at any time. Users will be notified of significant changes via the email address registered on the platform. Continued use of the platform after changes constitutes acceptance of the new terms."
  },
  {
    heading: "9. Governing Law",
    content: "These Terms of Service are governed by the laws of the Republic of Croatia. We will attempt to resolve all disputes amicably, and in case of dispute, the competent court is in Pula, Croatia."
  },
  {
    heading: "10. Contact",
    content: "For all Terms of Service inquiries:\n\nSignedStay\nEmail: info@signedstay.com\nPhone: +385 91 915 7424\nAddress: Pula, Croatia"
  }
]
```

---

## Change 3: Navigation — Add More Links

Update the existing navbar to include links to more landing page sections. The navbar should link to all major sections using smooth scroll (`href="#section-id"`).

Updated nav links (in order):
- Funkcionalnosti / Features → `#features`
- Kako funkcionira / How it works → `#how-it-works`
- Za koga / Who it's for → `#target`
- Cijene / Pricing → `#pricing`
- FAQ → `#faq`
- Kontakt / Contact → `#contact`

Make sure each landing page section has the corresponding `id` attribute set (e.g. `<section id="features">`). Add missing `id` attributes to existing sections if they don't have them.

---

## Change 4: Floating Navbar (SaaS Style)

Replace the existing navbar with a modern floating navbar design:

### Design specs
- **Not full width** — centered with `max-w-5xl mx-auto`
- **Floating** — fixed at top with margin: `fixed top-4 left-0 right-0 z-50 px-4`
- **Rounded** — `rounded-2xl` with border
- **Glassmorphism** — `bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5`
- On scroll, increase shadow slightly: add a subtle `shadow-xl` when scrolled (use `useEffect` + `window.scrollY`)
- Inner padding: `px-6 py-3`
- Logo on left, nav links in center (hidden on mobile), CTA + language switcher on right

### Mobile
- Hide nav links on mobile (`hidden md:flex`)
- Show hamburger menu button on mobile (`md:hidden`) — clicking it toggles a dropdown menu below the navbar showing all links
- Mobile menu: `absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-xl p-4`

### Logo
- Small gradient square icon (indigo→blue) + "SignedStay" text in bold
- Logo links to `/#` (top of page)

### Nav links style
- `text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100`
- Active section highlight (optional but nice): use `IntersectionObserver` to highlight current section

### CTA Button
- "Prijava / Login" button — links to `/login`
- Style: `bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity`

### Important
- Add `pt-24` to the first section of the landing page (Hero) to account for the fixed floating navbar height
- The language switcher (HR/EN) stays in the navbar, to the left of the CTA button

---

## Change 5: Bigger & Better Footer

Replace the existing footer with a more complete, multi-column footer.

### Design specs
- Background: `bg-slate-900`
- Text: white/slate-400
- Padding: `py-16 px-6`
- Max width: `max-w-6xl mx-auto`
- 4-column grid on desktop, 2-column on tablet, 1-column on mobile: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`

### Column 1 — Brand
- Logo (same as navbar — gradient square + SignedStay text in white)
- Tagline: "Digitalni check-in i check-out za profesionalne iznajmljivače." / "Digital check-in and check-out for professional rental owners."
- Social/contact icons row below tagline:
  - Mail icon linking to `mailto:info@signedstay.com`
  - Phone icon linking to `tel:+385919157424`
  - Style: `w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors`

### Column 2 — Navigation (Navigacija / Navigation)
Links:
- Funkcionalnosti / Features → `#features`
- Kako funkcionira / How it works → `#how-it-works`
- Za koga / Who it's for → `#target`
- Cijene / Pricing → `#pricing`
- FAQ → `#faq`
- Kontakt / Contact → `#contact`

### Column 3 — Legal (Pravno / Legal)
Links:
- Pravila privatnosti / Privacy Policy → `/privacy`
- Uvjeti korištenja / Terms of Service → `/terms`
- GDPR

### Column 4 — Contact (Kontakt / Contact)
- Email: info@signedstay.com (clickable)
- Phone: +385 91 915 7424 (clickable)
- Address: Pula, Croatia
- Each item with small icon (Mail, Phone, MapPin) in indigo color

### Bottom bar
Separator line `border-t border-white/10 mt-12 pt-8`:
- Left: "© 2025 SignedStay. Sva prava pridržana. / All rights reserved."
- Right: "Made with ♥ in Pula, Croatia"
- Flex row, stack on mobile

### Link styles
`text-slate-400 hover:text-white text-sm transition-colors`

Column headings: `text-white font-semibold text-sm uppercase tracking-wide mb-4`

---

## Final Checklist

- [ ] Check-in form has departure hours from 00:00 to 15:00
- [ ] Privacy Policy page exists at `/privacy` with full content in HR and EN
- [ ] Terms of Service page exists at `/terms` with full content in HR and EN
- [ ] Footer links to `/privacy` and `/terms` work correctly
- [ ] All landing page sections have correct `id` attributes for smooth scroll
- [ ] Navbar has all 6 section links
- [ ] Navbar is floating, rounded, glassmorphism style
- [ ] Mobile hamburger menu works
- [ ] Footer is 4-column with brand, nav, legal, contact columns
- [ ] All new text is in both HR and EN translations
- [ ] No existing functionality is broken