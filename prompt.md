# SignedStay — New Landing Page Sections

Add the following new sections to the existing landing page. Do NOT modify or remove any existing sections, styling, colors, fonts, or components. All new sections must blend seamlessly with the existing design system (white/indigo/blue palette, glassmorphism cards, radial glow effects, rounded-2xl corners, Tailwind CSS).

All new sections must be implemented in **both Croatian (HR) and English (EN)** using the existing `useLanguage` hook and `translations` object in `lib/translations.ts`. Add all new translation keys to both `hr` and `en` objects.

---

## Design Rules for All New Sections

Follow these rules for every new section so they feel native to the existing design:

- **Backgrounds**: Alternate between `bg-white` and `bg-slate-50/60` to create visual rhythm between sections
- **Section padding**: `py-24 px-6` consistently
- **Max width container**: `max-w-6xl mx-auto`
- **Section labels/badges**: Small uppercase pill above the title — `inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-100 mb-6`
- **Section titles**: `text-3xl md:text-4xl font-bold text-slate-900 leading-tight`
- **Body text**: `text-slate-600 text-lg leading-relaxed`
- **Accent text / gradient**: Use `bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent` for key phrases in headings
- **Cards**: `bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300`
- **Subtle glow accents**: Where appropriate, add a blurred radial gradient div behind section titles: `absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 blur-3xl rounded-full pointer-events-none`
- All sections must be fully **mobile responsive**

---

## Section 1: Problem Section — "Koliko puta ste imali problem s gostima?"

**Position:** Insert BEFORE the existing "How it Works" section.

**Design concept:** Emotionally impactful section that creates tension before the solution. Dark-tinted background to visually separate it from surrounding sections. Split layout with problem list on left and resolution statement on right.

### Layout & Visual Design

- Background: `bg-slate-900` (dark, creates contrast and gravity)
- Section badge (light version): `bg-white/10 text-white/80 border-white/20` pill
- Headline: white, large — `text-3xl md:text-4xl font-bold text-white`
- Body text: `text-slate-300 text-lg leading-relaxed`

**Left column — The Problem:**

Intro text paragraph (2 sentences from copy below), then a **problem list** styled as cards:

Each problem item is a row:
```
[red icon ✕] [problem text]
```
- Icon: `w-5 h-5 text-red-400 flex-shrink-0 mt-0.5`
- Text: `text-slate-300`
- Each item in a `flex items-start gap-3` div
- Wrap all items in a `space-y-3 mt-6` container

Problems to list:
- Nesporazumi s gostima / Misunderstandings with guests
- Gubitak depozita / Lost deposits
- Loše recenzije / Negative reviews
- Stres i nepotrebne rasprave / Stress and unnecessary disputes

**Right column — The Resolution:**

A glowing card `bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm` containing:
- Small label in indigo: `text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-3`
- Heading: `text-2xl font-bold text-white mb-4` — "SignedStay donosi jasnoću i sigurnost"
- Body: `text-slate-300 leading-relaxed`
- Three bullet points with checkmark icons `text-indigo-400`:
  - ✓ Digitalna potvrda svakog check-in i check-out
  - ✓ Evidencija dostupna u bilo koje vrijeme
  - ✓ Bez papira, nesporazuma i nagađanja

**Overall layout:** `grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`

Add a very subtle radial glow: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none`

---

### Translations to add for Section 1

```
problem: {
  badge: "Poznata situacija?" / "Sound familiar?"
  headline: "Koliko puta ste imali problem s gostima?" / "How often do you deal with guest disputes?"
  intro: "U iznajmljivanju nekretnina problemi nisu rijetkost. Gost tvrdi jedno, vlasnik drugo. Depozit je vraćen ili nije? Je li objekt bio u ispravnom stanju pri dolasku?" / "In property rentals, disputes are common. Guest says one thing, owner says another. Was the deposit returned? Was the property in good condition on arrival?"
  sub: "Bez jasnog zapisa i potvrde, sve se svodi na riječ protiv riječi. To često dovodi do:" / "Without a clear record, it's always your word against theirs. This often leads to:"
  problems: [array of 4 items above]
  resolution_label: "Rješenje" / "The Solution"
  resolution_title: "SignedStay donosi jasnoću i sigurnost" / "SignedStay brings clarity and peace of mind"
  resolution_body: "SignedStay je jednostavan sustav koji omogućuje gostima da digitalno potvrde check-in i check-out, uključujući stanje objekta i depozit. Svaki unos se sprema i ostaje kao evidencija kojoj možete pristupiti u bilo kojem trenutku." / "SignedStay is a simple system that lets guests digitally confirm check-in and check-out, including property condition and deposit. Every entry is saved and accessible at any time."
  bullets: [3 items above — in both languages]
  closing: "Bez papira, bez nesporazuma, bez nagađanja." / "No paper, no misunderstandings, no guesswork."
}
```

---

## Section 2: Replace "How It Works" with New Version

**Position:** Replace the existing "How it Works" section entirely.

**Design concept:** Vertical stepper/timeline on mobile, horizontal card flow on desktop. Each step has a large number, icon, and description. Connected with a subtle dashed line between steps on desktop.

### Layout & Visual Design

- Background: `bg-white`
- 4 steps in a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` layout
- Each step card: `relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`
- Step number: Large, bold, gradient — `text-5xl font-black bg-gradient-to-br from-indigo-500 to-blue-400 bg-clip-text text-transparent leading-none mb-4`
- Step icon below the number: `w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3` with a Lucide icon inside
- Step title: `text-lg font-bold text-slate-900 mb-2`
- Step body: `text-slate-500 text-sm leading-relaxed`
- Between cards on desktop, add a subtle arrow → using an absolutely positioned element or just a `hidden lg:block` divider

**Step icons (Lucide):**
1. `UserPlus` — Registration
2. `ClipboardCheck` — Check-in
3. `Database` — Data saved
4. `LogOut` — Check-out

### Steps content (both languages):

**Step 1 — Registration**
- HR: "Registracija" — "Prilikom registracije dodajemo vaš objekt u sustav i automatski dobijete jedinstvene linkove za check-in i check-out."
- EN: "Registration" — "When you register, we add your property to the system and you automatically receive unique check-in and check-out links."

**Step 2 — Guest Check-In**
- HR: "Gost ispuni Check-In" — "Pri dolasku gost putem linka ili QR koda ispunjava formu: dolazak, odlazak, broj osoba, depozit, stanje objekta, email. Na kraju daje digitalni potpis."
- EN: "Guest Fills Check-In" — "On arrival, the guest fills in the form via link or QR code: arrival, departure, number of guests, deposit, property condition, email — and gives a digital signature."

**Step 3 — Records Saved**
- HR: "Evidencija se automatski sprema" — "Svi podaci ostaju zabilježeni i dostupni u vašem dashboardu, a gost dobiva email potvrdu."
- EN: "Records Saved Automatically" — "All data is stored and accessible in your dashboard, and the guest receives an email confirmation."

**Step 4 — Guest Check-Out**
- HR: "Gost ispuni Check-Out" — "Prilikom odlaska gost potvrđuje povrat depozita i eventualne probleme — uz digitalni potpis."
- EN: "Guest Fills Check-Out" — "On departure, the guest confirms the deposit return and any issues — with a digital signature."

---

## Section 3: "Kome je namijenjen SignedStay?"

**Position:** Insert AFTER the existing "Features / Ključne prednosti" section.

**Design concept:** Clean, light section with a two-column layout. Left side has the intro text, right side has a styled list of ideal users as icon + text rows, plus a closing statement.

### Layout & Visual Design

- Background: `bg-indigo-600` (bold indigo, creates strong visual break)
- All text in white
- Section badge: `bg-white/15 text-white border-white/20`
- Headline: `text-3xl md:text-4xl font-bold text-white`
- Body: `text-indigo-100 text-lg leading-relaxed`

**Left column:**
- Badge + headline + intro paragraph

**Right column — Ideal users list:**
Each item: `flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm border border-white/10`
- Icon: relevant Lucide icon, `text-indigo-200 w-5 h-5`
- Text: `text-white font-medium`

Icons to use:
- `Home` — Vlasnici vila / Villa owners
- `Building2` — Iznajmljivači apartmana / Apartment hosts
- `Briefcase` — Property management agencije / Property management agencies
- `Globe` — Turističke agencije / Travel agencies
- `LayoutGrid` — Vlasnici više nekretnina / Multi-property owners

**Below the list — closing line:**
`text-indigo-200 text-sm mt-6 italic` — "Ako imate barem jedan objekt koji iznajmljujete, ovaj sustav vam štedi vrijeme i živce." / "If you have at least one rental property, this system saves you time and stress."

**Grid:** `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`

---

### Translations for Section 3

```
target: {
  badge: "Za koga?" / "Who is it for?"
  headline: "Kome je namijenjen SignedStay?" / "Who is SignedStay for?"
  body: "Signed Stay je namijenjen svima koji žele profesionalno upravljati iznajmljivanjem i izbjeći probleme s gostima." / "SignedStay is built for anyone who wants to professionally manage their rentals and avoid guest disputes."
  sub: "Idealno za:" / "Perfect for:"
  users: [5 items above in both languages]
  closing: "Ako imate barem jedan objekt koji iznajmljujete, ovaj sustav vam štedi vrijeme i živce." / "If you have at least one rental property, this system saves you time and stress."
}
```

---

## Section 4: FAQ

**Position:** Insert AFTER the contact/email section.

**Design concept:** Clean accordion-style FAQ. Each question expands to reveal the answer with a smooth animation. Alternating subtle background on open items.

### Layout & Visual Design

- Background: `bg-slate-50`
- Max width: `max-w-3xl mx-auto` (narrower — FAQ reads better centered)
- Each FAQ item: `border-b border-slate-200 py-5`
- Question row: `flex items-center justify-between cursor-pointer group`
- Question text: `text-slate-900 font-semibold text-lg group-hover:text-indigo-600 transition-colors`
- Toggle icon: Lucide `ChevronDown` — rotates 180° when open: `transition-transform duration-300`
- Answer text: slides down smoothly when open — `text-slate-600 leading-relaxed mt-3 text-base`
- Use React `useState` to track which FAQ item is open (only one at a time)

### FAQ items (5 questions, both languages):

1. **Je li gostima potrebna aplikacija? / Do guests need an app?**
   Ne. Sve se odvija putem linka u browseru. / No. Everything works via a link in the browser — no app needed.

2. **Mogu li imati više objekata? / Can I have multiple properties?**
   Da, svaki objekt ima svoje linkove i zasebnu evidenciju. / Yes, each property has its own links and separate records.

3. **Što ako gost odbije potpisati? / What if a guest refuses to sign?**
   Sustav je fleksibilan, ali preporučuje se korištenje potpisa za maksimalnu sigurnost. / The system is flexible, but we recommend using the signature for maximum security.

4. **Je li sustav kompliciran za korištenje? / Is the system complicated to use?**
   Ne. Dizajniran je da bude jednostavan i brz — i za vlasnike i za goste. / No. It's designed to be simple and fast — for both owners and guests.

5. **Mogu li koristiti sustav na mobitelu? / Can I use it on mobile?**
   Da, sve je prilagođeno mobilnim uređajima. Gosti najčešće ispunjavaju forme upravo na mobitelu. / Yes, everything is optimized for mobile. Guests most often fill in forms on their phones.

---

## Section 5: Final CTA Section

**Position:** Insert AFTER the FAQ section, just before the Footer.

**Design concept:** Bold, full-width closing CTA with a strong gradient background, large headline, and single action button. Similar energy to the hero section — bookends the page.

### Layout & Visual Design

- Background: `bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700`
- Add Apple-style radial glow: two blurred ellipses, `bg-white/10 blur-[100px]` positioned top-left and bottom-right
- Center-aligned content, `text-center py-24`
- Badge: `bg-white/15 text-white border-white/20`
- Headline: `text-4xl md:text-5xl font-bold text-white leading-tight` — gradient text NOT used here (it's already on gradient bg), just white
- Body: `text-indigo-200 text-lg mt-4 max-w-xl mx-auto`
- CTA button: `bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mt-8 inline-flex items-center gap-2`
- Below button: small text `text-indigo-300 text-sm mt-4` — "30€/godišnje po objektu · Bez ugovora" / "€30/year per property · No contracts"

### Content (both languages):

- HR badge: "Počnite danas"
- EN badge: "Start today"
- HR headline: "Započnite s korištenjem SignedStay već danas"
- EN headline: "Start using SignedStay today"
- HR body: "Postavite svoj prvi objekt u nekoliko minuta i počnite koristiti digitalni check-in i check-out već pri sljedećem dolasku gostiju."
- EN body: "Set up your first property in minutes and start using digital check-in and check-out for your next guest arrival."
- CTA button: `Mail` Lucide icon + "Kontaktirajte nas" / "Contact Us" — links to `mailto:info@signedstay.com`

---

## Section 6: Update Contact Information

Find the existing contact section on the landing page and update the contact details to:

- **Email:** info@signedstay.com (with `mailto:` link)
- **Phone:** +385 91 915 7424 (with `tel:` link)
- **Address:** Pula, Croatia

Display each with a relevant Lucide icon:
- `Mail` for email
- `Phone` for phone
- `MapPin` for address

Style each as: `flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors` (email and phone are clickable links).

Update both HR and EN translations with these contact details (they are the same in both languages).

---

## Final checklist before finishing

- [ ] All 5 new sections are added in the correct positions
- [ ] All text is wired through the translations system — no hardcoded strings
- [ ] Both `hr` and `en` translation keys are added to `lib/translations.ts`
- [ ] All sections are mobile responsive
- [ ] No existing sections, styles, or components have been modified
- [ ] Contact section shows correct email, phone, and address
- [ ] FAQ accordion works with smooth open/close animation
- [ ] Final CTA mailto link points to `info@signedstay.com`