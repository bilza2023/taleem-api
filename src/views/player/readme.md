
# Taleem Lesson API Contract

The Taleem Player loads a lesson through a single API response called **presentation**.

```

presentation = {
deck,
syllabus,
discussion
}

```

These three objects fully define a lesson page.

---

# 1. Deck

The **deck** contains the instructional content for the lesson.

It is produced by the **DeckBuilder system** and rendered by the **Taleem Player**.

The player does not modify the deck. It only reads and renders it.

## Structure

```

deck = {
version: string,
name: string,
background: object,
deck: [slides]
}

```

## Fields

**version**  
Schema version of the deck.

Example
```

"version": "deck-v1"

```

**name**  
Human-readable lesson name.

Example
```

"name": "What is an LLM?"

```

**background**  
Controls the visual theme of the lesson.

Example
```

background: {
backgroundColor: "#1b2a6b",
backgroundImage: null,
backgroundImageOpacity: 0.3
}

```

**deck**  
Array of slide objects defined by **Deck Schema v1**.

Example
```

deck: [
{
type: "titleAndSubtitle",
start: 0,
end: 5,
data: [...]
}
]

```

Notes

• The deck is **pure content**  
• Rendering and timing are handled by the **player engine**

---

# 2. Syllabus

The **syllabus** defines the lesson navigation shown in the **sidebar**.

Each item represents a lesson entry that loads a deck.

## Structure

```

syllabus = [
{
anchor: string,
title: string,
deck: string,
tag: string,
image: string
}
]

```

## Fields

**anchor**  
Logical chapter identifier used to group lessons.

Example
```

"anchor": "fbise8math-ch1"

```

**title**  
Lesson title shown in the sidebar.

Example
```

"title": "Factorization Basics"

```

**deck**  
Deck identifier used in navigation.

Example
```

"deck": "demo"

```

Navigation result

```

/player?v=demo

```

**tag**  
Lesson classification.

Typical values

```

concept
lab
example
theorem
exercise

```

**image**  
Thumbnail used in the syllabus sidebar.

Example
```

"image": "eq.webp"

```

Notes

• The syllabus behaves like a **lesson playlist**  
• Clicking an item loads another deck

---

# 3. Discussion

The **discussion** object powers the **Answer Panel** below the player.

It provides questions, explanations, and cross-lesson references.

## Structure

```

discussion = [
{
id: string,
question: string,
answer: string,
links: [link]
}
]

```

## Fields

**id**  
Unique identifier.

Example
```

"id": "q1"

```

**question**  
Short question shown in the accordion.

Example
```

"What is inertia?"

```

**answer**  
Detailed explanation shown when expanded.

Example
```

"Inertia is the tendency of an object to resist changes in its state of motion..."

```

**links**  
Optional references to related lessons.

Structure

```

links: [
{
title: string,
url: string
}
]

```

Example
```

{
"title": "Lesson: What is Friction?",
"url": "/player?v=what-is-friction"
}

```

Notes

• Discussion items render as an **accordion**  
• Only one item opens at a time  
• Links allow navigation to related lessons

---

# Summary

The Taleem Player expects the API to return:

```

presentation = {
deck,
syllabus,
discussion
}
