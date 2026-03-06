const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {

  const slug = req.query.course

  if (!slug) {
    return res.send('course not specified')
  }

  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'courses',
    `${slug}.json`
  )

  if (!fs.existsSync(filePath)) {
    return res.send(`course file not found: ${filePath}`)
  }

  const course = JSON.parse(
    fs.readFileSync(filePath,'utf8')
  )

  res.render('syllabus', { course })

})

module.exports = router