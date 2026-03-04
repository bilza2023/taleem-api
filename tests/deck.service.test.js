const { PrismaClient } = require('@prisma/client');
const deckService = require('../src/services/deck.service');

const prisma = new PrismaClient()

beforeAll(async () => {
  // Clean database before tests
  await prisma.link.deleteMany()
  await prisma.deck.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Deck Service', () => {

  test('create deck', async () => {
    const deckObject = {
      version: "deck-v1",
      name: "Test Deck",
      deck: []
    }

    const deck = await deckService.createDeck({
      slug: "test-deck",
      title: "Test Deck",
      deckObject
    })

    expect(deck.slug).toBe("test-deck")
  })

  test('get deck by slug returns parsed JSON', async () => {
    const deck = await deckService.getDeckBySlug("test-deck")

    expect(deck).not.toBeNull()
    expect(typeof deck.deckJson).toBe("object")
    expect(deck.deckJson.version).toBe("deck-v1")
  })

  test('update deck replaces JSON', async () => {
    const existing = await deckService.getDeckBySlug("test-deck")

    const updatedObject = {
      version: "deck-v1",
      name: "Updated Deck",
      deck: []
    }

    const updated = await deckService.updateDeck(existing.id, {
      deckObject: updatedObject
    })

    expect(updated.deckJson.name).toBe("Updated Deck")
  })

  test('delete deck works', async () => {
    const existing = await deckService.getDeckBySlug("test-deck")

    await deckService.deleteDeck(existing.id)

    const deleted = await deckService.getDeckBySlug("test-deck")

    expect(deleted).toBeNull()
  })

})