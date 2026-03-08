const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

beforeAll(async () => {
  // Clean database before tests
  await prisma.question.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.student.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Question System', () => {

  let student

  test('create student', async () => {

    student = await prisma.student.create({
      data: {
        email: "test@test.com",
        passwordHash: "hash",
        displayName: "Test Student"
      }
    })

    expect(student.email).toBe("test@test.com")

  })

  test('create question', async () => {

    const question = await prisma.question.create({
      data: {
        studentId: student.id,
        lessonSlug: "algebra-1",
        questionText: "What is (a+b)^2 ?"
      }
    })

    expect(question.lessonSlug).toBe("algebra-1")
    expect(question.status).toBe("new")

  })

  test('answer question', async () => {

    const q = await prisma.question.findFirst()

    const answered = await prisma.question.update({
      where: { id: q.id },
      data: {
        answerText: "a² + 2ab + b²",
        status: "answered"
      }
    })

    expect(answered.answerText).toBe("a² + 2ab + b²")

  })

  test('publish question', async () => {

    const q = await prisma.question.findFirst()

    const published = await prisma.question.update({
      where: { id: q.id },
      data: {
        published: true
      }
    })

    expect(published.published).toBe(true)

  })

  test('get published questions for lesson', async () => {

    const questions = await prisma.question.findMany({
      where: {
        lessonSlug: "algebra-1",
        published: true
      }
    })

    expect(questions.length).toBeGreaterThan(0)

  })

})

test('question belongs to student', async () => {

    const question = await prisma.question.findFirst({
      include: { student: true }
    })
  
    expect(question.student.email).toBe("test@test.com")
  
  })