
const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {

  const course = req.query.course

  if (!course) {
    return res.send('course not specified')
  }

  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'links',
    `${course}.json`
  )

  if (!fs.existsSync(filePath)) {
    return res.send(`course file not found: ${filePath}`)
  }

  const chapters = JSON.parse(
    fs.readFileSync(filePath, 'utf8')
  )

  res.render('syllabus', {
    course,
    chapters
  })

})

module.exports = router