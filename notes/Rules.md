```md
# 🔐 CASL Ability Rules for Authorization

## 🛠 Overview
The `defineAbility.js` function controls access to `TCode` resources based on the user's role and the `questionType` of the requested document. **If a user has a role, they are considered logged in** within this function.

This file enforces the following access rules:

---

## 🚀 Rules for Unauthenticated Users (`role === null`)

> **Who?** Users who are NOT logged in (no role assigned).

- ✅ **Can** `read` **TCode** **if** `questionType === 'free'`
  - _Why?_ Free resources are accessible to everyone, even without logging in.
- ❌ **Cannot** `read` **TCode** **if** `questionType === 'login'` or `questionType === 'paid'`
  - _Why?_ Login-restricted and paid content require authentication.
- ✅ **Can** `list` **TCode**
  - _Why?_ Listing all available resources is allowed, but detailed access requires authentication.

---

## 👨‍🎓 Rules for Students (`role === 'student'`)

> **Who?** Authenticated users with the `student` role.

- ✅ **Can** `list` **TCode`
  - _Why?_ Students can see available resources.
- ✅ **Can** `read` **TCode** **if** `questionType === 'free'`
  - _Why?_ Free resources are accessible to all users.
- ✅ **Can** `read` **TCode** **if** `questionType === 'login'`
  - _Why?_ A student is a logged-in user, so they have access to `login`-restricted content.
- ❌ **Cannot** `read` **TCode** **if** `questionType === 'paid'` **AND** `isValidCustomer === false`
  - _Why?_ Paid content is restricted to valid customers.
- ✅ **Can** `read` **TCode** **if** `questionType === 'paid'` **AND** `isValidCustomer === true`
  - _Why?_ If the student has purchased access, they are allowed to read.

---

## 👨‍🏫 Rules for Teachers (`role === 'teacher'`)

> **Who?** Authenticated users with the `teacher` role.

- ✅ **Can** `list` **TCode`
  - _Why?_ Teachers can see all available resources.
- ✅ **Can** `read` **TCode` (always)
  - _Why?_ Teachers have full read access to all `TCode` documents.
- ✅ **Can** `update` **TCode`
  - _Why?_ Teachers can modify content but not delete it.

---

## 🛡 Rules for Admins (`role === 'admin'`)

> **Who?** Authenticated users with the `admin` role.

- ✅ **Can** `manage` **TCode` (Full CRUD)
  - _Why?_ Admins have full control over all resources.
- ✅ **Can** `update` **TCode`
  - _Why?_ Admins can modify any content.

---

## 📝 Summary
- **Anyone** can access `free` resources.
- **Only logged-in users** (students, teachers, admins) can access `login` resources.
- **Paid resources require valid purchases**.
- **Teachers have broad access**, while **admins have full control**.

This system ensures **structured access control** while keeping `TCode` data secure and role-based! 🚀
```