const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

beforeAll(async () => {
  // Clean database before tests
  await prisma.article.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Article System', () => {

  let article

  test('create article', async () => {

    article = await prisma.article.create({
      data: {
        slug: "simple-interest",
        title: "Simple Interest",
        contentHtml: "<h1>Simple Interest</h1><p>Basic explanation</p>",
        tags: "finance,interest",
        published: true
      }
    })

    expect(article.slug).toBe("simple-interest")

  })


  test('get article by slug', async () => {

    const found = await prisma.article.findUnique({
      where: { slug: "simple-interest" }
    })

    expect(found.title).toBe("Simple Interest")

  })


  test('update article content', async () => {

    const updated = await prisma.article.update({
      where: { slug: "simple-interest" },
      data: {
        title: "Simple Interest Explained"
      }
    })

    expect(updated.title).toBe("Simple Interest Explained")

  })


  test('get published articles', async () => {

    const articles = await prisma.article.findMany({
      where: { published: true }
    })

    expect(articles.length).toBeGreaterThan(0)

  })


  test('delete article', async () => {

    await prisma.article.delete({
      where: { slug: "simple-interest" }
    })

    const deleted = await prisma.article.findUnique({
      where: { slug: "simple-interest" }
    })

    expect(deleted).toBeNull()

  })

})