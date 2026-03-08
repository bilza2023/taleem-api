const { PrismaClient } = require('@prisma/client')
const apiRoutes = require('../src/routes/api.routes')

const prisma = new PrismaClient()

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

beforeAll(async () => {
  await prisma.question.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.student.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('API Routes', () => {

  test('register student', async () => {

    const req = {
      body: {
        email: "jest@test.com",
        password: "123456",
        displayName: "Jest Student"
      }
    }

    const res = mockRes()

    const registerHandler = apiRoutes.stack.find(
      r => r.route && r.route.path === '/register'
    ).route.stack[0].handle

    await registerHandler(req, res)

    expect(res.json).toHaveBeenCalled()

  })

})