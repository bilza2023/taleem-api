const express = require('express');
const router = express.Router();

const syllabus = {
  chapter: "Dynamics",
  items: [
    { title: "Newton First Law", vid: "newton-first-law" },
    { title: "Newton Second Law", vid: "newton-second-law" },
    { title: "Newton Third Law", vid: "newton-third-law" }
  ]
};

const discussion = [
  {
    id: "q1",
    question: "What is Newton’s First Law?",
    answer: "Newton's First Law states that an object remains at rest or in uniform motion unless acted upon by an external force."
  }
];

// import deck directly
const deck = require('../../public/decks/what-is-llm.json');

// GET /api/presentation/demo
router.get('/presentation/:vid', (req, res) => {

  const presentation = {
    ...deck,
    syllabus,
    discussion
  };

  res.json(presentation);

});

module.exports = router;