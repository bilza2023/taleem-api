const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

  const course = req.query.course

  if (!course) {
    return res.send('course not specified')
  }

  res.render('syllabus/index')

})

module.exports = router