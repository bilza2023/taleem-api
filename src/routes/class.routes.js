const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  const chapter = req.query.chapter;

  if (!chapter) {
    return res.send("chapter not specified");
  }

  res.render('class/index', {
    chapter
  });

});

module.exports = router;