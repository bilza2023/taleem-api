const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// --------------------
// ADMIN ARTICLE PAGE
// --------------------

router.get('/admin/articles', (req, res) => {

  res.render('admin/articles/index');

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
// VIEW ARTICLE
// --------------------

router.get('/articles/:slug', async (req, res) => {

  const slug = req.params.slug;

  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article || !article.published) {
    return res.status(404).send("article not found");
  }

  res.render('articles/index', {
    article
  });

});


module.exports = router;