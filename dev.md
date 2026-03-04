
# Taleem Content API – Architecture v1

## Philosophy

This system is pipeline-first, not CMS-first.

Navigation and placement are static, deliberate, and version-controlled.

Dynamic runtime state is minimal and restricted to content payload and future user activity.

We prefer dissolving complexity rather than layering abstractions.

---

## Layer Separation

### 1️⃣ Static Layer (Build-Time Artifacts)

Located in:

```
/syllabus/books.json
/syllabus/chapters.json
/links/links.json (generated from build step)
```

These files define:

* Books (thin wrapper)
* Chapters (flat list)
* Link placement (parentKey + tag + deckSlug + order + type)

These are:

* Hand-authored or build-generated
* Uploaded deliberately
* Version-controlled
* Public and crawlable
* Not editable at runtime

Navigation truth lives here.

---

### 2️⃣ Dynamic Layer (Database)

Database contains only:

## Deck Table

```
model Deck {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  title     String
  deckJson  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Rules:

* slug is permanent identity
* deckJson stored as string (JSON.stringify)
* deckJson parsed in service layer
* no partial JSON mutation
* full replace on update

Deck content may be free or protected.

---

### 3️⃣ Runtime Flow

Book Page:

* Load books.json
* Load chapters.json
* Filter chapters by bookSlug

Chapter Page:

* Load links.json
* Filter by parentKey
* Show:

  * root links (tag == null)
  * grouped links (distinct tags)

Deck Page:

* Call API `/api/deck/:slug`
* API:

  * checks subscription (future)
  * checks free flag (future)
  * returns deckJson

Deck content is not served directly from CDN.

---

## Admin Dashboard Scope (Minimal)

Admin handles only:

Deck CRUD:

* Create Deck (slug, title, deckJson textarea)
* Edit Deck
* Delete Deck
* List Decks

No chapter CRUD.
No link CRUD.
No navigation CRUD.

All placement happens in build step.

---

## Build Step Responsibilities

Workshop produces:

* books.json
* chapters.json
* links.json
* deck JSON files

Decks are uploaded via admin.
Links are exported as single JSON.

Build discipline is required.
Runtime remains simple.

---

## Security Model

Public:

* books.json
* chapters.json
* links.json

Protected:

* Deck content via API
* Future subscriptions
* Future user progress

---

## Non-Goals

* No runtime editing of navigation
* No CMS-style taxonomy UI
* No recursive nesting beyond chapter
* No DB-stored syllabus
* No DB-stored links

---

## Guiding Principle

Navigation is infrastructure.
Content payload is protected.
User data is dynamic.

When complexity appears,
we dissolve it before adding tables.

---