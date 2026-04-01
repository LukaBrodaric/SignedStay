You are working on an existing SaaS application called "Signed Stay" built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

Your task is to implement the following improvements and fixes WITHOUT breaking existing functionality, UI structure, or database integrity. Maintain current design system and component structure.

---

## 1. ADMIN-ONLY: DELETE USER

### Requirements:

* Add an option in the admin dashboard to delete a user.
* This option must ONLY be visible and accessible to admin users.
* Ensure proper authorization check on both frontend and backend.

### Backend:

* Create a secure API route (e.g. `/api/admin/delete-user`)
* Validate that the requester is an admin
* Delete user from database
* Handle related data:

  * Either cascade delete related records (properties, check-ins, check-outs)
  * OR prevent deletion if related data exists (choose safest approach and document it)

### Frontend:

* Add "Delete User" button in admin dashboard (user list view)
* Add confirmation modal:

  * "Are you sure you want to delete this user?"
* Show success and error states

---

## 2. ADMIN-ONLY: DELETE PROPERTY

### Requirements:

* Admin can delete any property
* Only admin sees this option

### Backend:

* API route `/api/admin/delete-property`
* Validate admin role
* Delete property safely (handle related check-in/out records)

### Frontend:

* Add "Delete Property" button in property list (admin view)
* Confirmation modal required

---

## 3. ADD SIGNATURE FIELD TO CHECK-OUT FORM

### Requirements:

* Add digital signature (draw input) to check-out form
* Match the same implementation used in check-in form

### Implementation:

* Use canvas-based signature pad
* Store signature as base64 (data URL) in database

### Database:

* Add new field to CheckOut model:
  signatureDataUrl String? @db.Text

### Backend:

* Update API to accept and store signature

### Frontend:

* Add signature field UI
* Make it required before submission


* Store the signature in the .pdf that property owner can export

---

## 4. FIX BUG: CREATE USER BUTTON FREEZE

### Problem:

* When clicking "Create User", user is created in DB
* UI freezes until manual refresh

### Fix:

* Ensure proper async handling
* After successful creation:

  * Reset form
  * Update UI state immediately (optimistic update or refetch users)
* Add loading state to button
* Disable button while submitting

### Expected behavior:

* User appears instantly in UI
* No need for manual refresh

---

## 5. GENERAL REQUIREMENTS

* Do NOT break existing UI design (keep Tailwind structure)
* Do NOT remove existing features
* Keep code clean and modular
* Use proper error handling
* Add loading states where needed
* Ensure all admin-only features are protected on backend (not just frontend)

---

## 6. OPTIONAL (IF EASY)

* Add toast notifications for:

  * success
  * error
* Improve UX for destructive actions

---

## OUTPUT REQUIREMENTS

* Provide all updated files
* Include Prisma schema changes
* Include migration command if needed
* Ensure app runs without errors after changes

---

IMPORTANT:
Do not refactor the whole app. Only implement requested features and fixes.
