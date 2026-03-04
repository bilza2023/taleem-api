
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createDeck({ slug, title, deckObject }) {
  if (!slug) throw new Error("slug is required")
  if (!deckObject) throw new Error("deckObject is required")

  const deckJson = JSON.stringify(deckObject)

  return prisma.deck.create({
    data: {
      slug,
      title,
      deckJson
    }
  })
}

async function getDeckById(id) {
  const deck = await prisma.deck.findUnique({
    where: { id }
  })

  if (!deck) return null

  return {
    ...deck,
    deckJson: JSON.parse(deck.deckJson)
  }
}

async function getDeckBySlug(slug) {
  const deck = await prisma.deck.findUnique({
    where: { slug }
  })

  if (!deck) return null

  return {
    ...deck,
    deckJson: JSON.parse(deck.deckJson)
  }
}

async function listDecks() {
  const decks = await prisma.deck.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return decks.map(d => ({
    ...d,
    deckJson: JSON.parse(d.deckJson)
  }))
}

async function updateDeck(id, { title, deckObject }) {
  const data = {}

  if (title !== undefined) data.title = title
  if (deckObject !== undefined) {
    data.deckJson = JSON.stringify(deckObject)
  }

  const updated = await prisma.deck.update({
    where: { id },
    data
  })

  return {
    ...updated,
    deckJson: JSON.parse(updated.deckJson)
  }
}

async function deleteDeck(id) {
  return prisma.deck.delete({
    where: { id }
  })
}

module.exports = {
  createDeck,
  getDeckById,
  getDeckBySlug,
  listDecks,
  updateDeck,
  deleteDeck
}