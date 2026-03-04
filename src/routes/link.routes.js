const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Load syllabus once
const syllabusPath = path.join(__dirname, '../public/data/syllabus.json')
const syllabusData = JSON.parse(fs.readFileSync(syllabusPath, 'utf-8'))

// Helper: extract all parentKeys recursively
function extractKeys(obj, keys = new Set()) {
  if (!obj) return keys

  if (obj.parentKey) keys.add(obj.parentKey)

  if (Array.isArray(obj)) {
    obj.forEach(item => extractKeys(item, keys))
  } else if (typeof obj === 'object') {
    Object.values(obj).forEach(value => extractKeys(value, keys))
  }

  return keys
}

const VALID_KEYS = extractKeys(syllabusData)

function validateParentKey(parentKey) {
  if (!VALID_KEYS.has(parentKey)) {
    throw new Error(`Invalid parentKey: ${parentKey}`)
  }
}

async function createLink({ parentKey, deckId, type, order }) {
  if (!parentKey) throw new Error('parentKey required')
  if (!deckId) throw new Error('deckId required')
  if (!type) throw new Error('type required')
  if (order === undefined) throw new Error('order required')

  validateParentKey(parentKey)

  // prevent duplicate (parentKey, deckId, type)
  const existing = await prisma.link.findUnique({
    where: {
      parentKey_deckId_type: {
        parentKey,
        deckId,
        type
      }
    }
  })

  if (existing) {
    throw new Error('Link already exists for this parentKey + deck + type')
  }

  return prisma.link.create({
    data: {
      parentKey,
      deckId,
      type,
      order
    }
  })
}

async function listLinks(filter = {}) {
  return prisma.link.findMany({
    where: filter,
    orderBy: [
      { parentKey: 'asc' },
      { type: 'asc' },
      { order: 'asc' }
    ],
    include: {
      deck: true
    }
  })
}

async function updateLink(id, { type, order, isPublished }) {
  const data = {}

  if (type !== undefined) data.type = type
  if (order !== undefined) data.order = order
  if (isPublished !== undefined) data.isPublished = isPublished

  return prisma.link.update({
    where: { id },
    data
  })
}

async function deleteLink(id) {
  return prisma.link.delete({
    where: { id }
  })
}

module.exports = {
  createLink,
  listLinks,
  updateLink,
  deleteLink
}