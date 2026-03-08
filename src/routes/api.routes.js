const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// --------------------
// GET CHAPTER LINKS
// --------------------

router.get('/chapter/:slug', (req, res) => {

  const slug = req.params.slug;

  const file = path.join(
    process.cwd(),
    'public/data/links',
    `${slug}.json`
  );

  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: "chapter not found" });
  }

  const links = JSON.parse(fs.readFileSync(file, 'utf8'));

  res.json({
    chapter: slug,
    links
  });

});


// --------------------
// GET DECK
// --------------------

router.get('/deck/:vid', (req, res) => {

  const vid = req.params.vid;

  const deckPath = path.join(
    process.cwd(),
    'public/decks',
    `${vid}.json`
  );

  if (!fs.existsSync(deckPath)) {
    return res.status(404).json({ error: "deck not found" });
  }

  const deck = JSON.parse(fs.readFileSync(deckPath, 'utf8'));

  res.json(deck);

});


// --------------------
// REGISTER
// --------------------

router.post('/register', async (req, res) => {

  try {

    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "missing fields" });
    }

    const existing = await prisma.student.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(400).json({ error: "email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        email,
        passwordHash,
        displayName
      }
    });

    res.json({
      success: true,
      studentId: student.id
    });

  } catch (err) {
    res.status(500).json({ error: "register failed" });
  }

});


// --------------------
// LOGIN
// --------------------

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const student = await prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const valid = await bcrypt.compare(password, student.passwordHash);

    if (!valid) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    res.json({
      success: true,
      studentId: student.id,
      displayName: student.displayName
    });

  } catch (err) {
    res.status(500).json({ error: "login failed" });
  }

});


// --------------------
// ASK QUESTION
// --------------------

router.post('/questions', async (req, res) => {

  try {

    const { studentId, lessonSlug, questionText } = req.body;

    if (!studentId || !lessonSlug || !questionText) {
      return res.status(400).json({ error: "missing fields" });
    }

    const question = await prisma.question.create({
      data: {
        studentId,
        lessonSlug,
        questionText
      }
    });

    res.json({
      success: true,
      questionId: question.id
    });

  } catch (err) {
    res.status(500).json({ error: "question save failed" });
  }

});

// --------------------
// CREATE ARTICLE
// --------------------

router.post('/articles', async (req, res) => {

  try {

    const { slug, title, tags, contentHtml } = req.body;

    if (!slug || !title || !contentHtml) {
      return res.status(400).json({ error: "missing fields" });
    }

    const existing = await prisma.article.findUnique({
      where: { slug }
    });

    if (existing) {
      return res.status(400).json({ error: "slug already exists" });
    }

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        tags,
        contentHtml,
        published: true
      }
    });

    res.json({
      success: true,
      articleId: article.id
    });

  } catch (err) {

    res.status(500).json({ error: "article save failed" });

  }

});

// --------------------
// GET STUDENT QUESTIONS
// --------------------

router.get('/questions/student/:studentId', async (req, res) => {

  try {

    const studentId = req.params.studentId;

    const questions = await prisma.question.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      questions
    });

  } catch (err) {

    res.status(500).json({ error: "failed to fetch questions" });

  }

});

// --------------------
// GET DISCUSSION
// --------------------

router.get('/discussion/:type/:slug', async (req, res) => {

  try {

    const { type, slug } = req.params;

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
    });

    res.json({
      success: true,
      discussion: questions
    });

  } catch (err) {

    res.status(500).json({ error: "discussion fetch failed" });

  }

});
module.exports = router;