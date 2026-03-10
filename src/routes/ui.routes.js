const express = require('express')
const router = express.Router()

router.get('/studio', (req, res) => {

  if (!req.user) {
    return res.redirect('/login')
  }

  res.render('studio/index', {
    studentId: req.user.studentId
  })

})

router.get('/ask', (req, res) => {

  if (!req.user) {
    return res.redirect('/login')
  }

  const { contentSlug, contentType, success } = req.query

  res.render('ask/index', {
    contentSlug,
    contentType,
    studentId: req.user.studentId,
    success
  })

})

module.exports = router