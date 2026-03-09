
//class.routes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = "taleem-secret-key";

router.get('/', (req, res) => {

  const { chapter, course } = req.query;

  if (!chapter) {
    return res.send("chapter not specified");
  }

  if (!course) {
    return res.send("course not specified");
  }

  // --------------------
  // READ TOKEN (from cookie)
  // --------------------

  const token = req.cookies?.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {

    const payload = jwt.verify(token, JWT_SECRET);

    const subs = payload.subscriptions || [];
    console.log("subs", subs);

    // --------------------
    // ACCESS CHECK (course level)
    // --------------------

    if (!subs.includes(course)) {
      return res.redirect('/subscribe');
    }

    // --------------------
    // ALLOW ACCESS
    // --------------------

    res.render('class/index', {
      chapter,
      course
    });

  } catch (err) {

    return res.redirect('/login');

  }

});

module.exports = router;