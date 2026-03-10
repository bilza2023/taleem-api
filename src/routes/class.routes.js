const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

  const { chapter, course } = req.query

  if (!chapter) {
    return res.send("chapter not specified")
  }

  // if (!course) {
  //   return res.send("course not specified")
  // }

  // --------------------
  // USER MUST BE LOGGED IN
  // --------------------

  if (!req.user) {
    return res.redirect('/login')
  }

  const subs = req.user.subscriptions || []

  // --------------------
  // ACCESS CHECK
  // --------------------

  // if (!subs.includes(course)) {
  //   return res.redirect('/subscribe')
  // }

  // --------------------
  // ALLOW ACCESS
  // --------------------

  res.render('class/index', {
    chapter,
    course
  })

})

module.exports = router