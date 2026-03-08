
const express = require('express');
const router = express.Router();


router.get('/register', (req, res) => {
  res.render('register/index');
});

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.get('/subscribe', (req, res) => {
  res.render('subscribe/index');
});

router.get('/ask', (req, res) => {

  const lesson = req.query.lesson;

  if(!lesson){
    return res.send("lesson not specified");
  }

  res.render('ask/index', {
    lesson
  });

});


module.exports = router;