
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');


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


module.exports = router;