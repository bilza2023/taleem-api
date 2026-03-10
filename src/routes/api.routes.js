const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


// --------------------
// GET DECK
// --------------------

router.get('/deck/:vid', (req, res) => {

  const vid = req.params.vid

  const deckPath = path.join(
    process.cwd(),
    'public/decks',
    `${vid}.json`
  )

  if (!fs.existsSync(deckPath)) {
    return res.status(404).json({ error: "deck not found" })
  }

  const deck = JSON.parse(fs.readFileSync(deckPath, 'utf8'))

  res.json(deck)

})


// --------------------
// REGISTER
// --------------------

router.post('/register', async (req, res) => {

  try {

    const { email, password, displayName } = req.body

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "missing fields" })
    }

    const existing = await prisma.student.findUnique({
      where: { email }
    })

    if (existing) {
      return res.status(400).json({ error: "email already exists" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const student = await prisma.student.create({
      data: {
        email,
        passwordHash,
        displayName
      }
    })

    res.json({
      success: true,
      studentId: student.id,
      displayName: student.displayName
    })

  } catch (err) {

    res.status(500).json({ error: "register failed" })

  }

})


// --------------------
// LOGIN
// --------------------

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "missing fields" })
    }

    const student = await prisma.student.findUnique({
      where: { email }
    })

    if (!student) {
      return res.status(401).json({ error: "invalid credentials" })
    }

    const valid = await bcrypt.compare(password, student.passwordHash)

    if (!valid) {
      return res.status(401).json({ error: "invalid credentials" })
    }

    // --------------------
    // FETCH SUBSCRIPTIONS
    // --------------------

    const now = new Date()

    const subs = await prisma.subscription.findMany({
      where: {
        studentId: student.id,
        status: "active",
        endDate: { gt: now }
      },
      select: {
        classSlug: true
      }
    })

    const subscriptions = subs.map(s => s.classSlug)

    const jwt = require('jsonwebtoken')
    const JWT_SECRET = "taleem-secret-key"

    const token = jwt.sign(
      {
        studentId: student.id,
        displayName: student.displayName,
        subscriptions
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30
    })

    res.json({
      success: true,
      displayName: student.displayName,
      subscriptions
    })

  } catch (err) {

    res.status(500).json({ error: "login failed" })

  }

})


// --------------------
// ASK QUESTION
// --------------------

router.post('/questions', async (req, res) => {

  try {

    if (!req.user) {
      return res.redirect('/login')
    }

    const { contentSlug, contentType, questionText } = req.body

    if (!contentSlug || !questionText) {
      return res.send("missing fields")
    }

    const question = await prisma.question.create({
      data: {
        studentId: req.user.studentId,
        contentSlug,
        contentType,
        questionText
      }
    })

    res.redirect(
      `/ask?contentSlug=${contentSlug}&contentType=${contentType}&success=1`
    )

  } catch (err) {

    res.send("question save failed")

  }

})


// --------------------
// GET STUDENT QUESTIONS
// --------------------

router.get('/questions/student', async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({ error: "not logged in" })
    }

    const questions = await prisma.question.findMany({
      where: { studentId: req.user.studentId },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      questions
    })

  } catch (err) {

    res.status(500).json({ error: "failed to fetch questions" })

  }

})


// --------------------
// GET DISCUSSION
// --------------------

router.get('/discussion/:type/:slug', async (req, res) => {

  try {

    const { type, slug } = req.params

    const questions = await prisma.question.findMany({
      where: {
        contentType: type,
        contentSlug: slug,
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        questionText: true,
        answerText: true,
        links: true
      }
    })

    res.json({
      success: true,
      discussion: questions
    })

  } catch (err) {

    res.status(500).json({ error: "discussion fetch failed" })

  }

})


router.get('/syllabus', (req, res) => {

  const file = path.join(
    process.cwd(),
    'public/data',
    'syllabus.json'
  )

  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: "syllabus not found" })
  }

  const syllabus = JSON.parse(fs.readFileSync(file, 'utf8'))

  res.json(syllabus)

})
module.exports = router