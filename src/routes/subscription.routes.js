
const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// --------------------
// GET PAGE
// --------------------

router.get('/', async (req, res) => {

  const subscriptions = await prisma.subscription.findMany({
    include: {
      student: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.render('admin/subscription/index', {
    subscriptions
  })

})


// --------------------
// CREATE SUBSCRIPTION
// --------------------

router.post('/create', async (req, res) => {

    try {
  
      const { email, classSlug, months } = req.body
  
      const student = await prisma.student.findUnique({
        where: { email }
      })
  
      if (!student) {
        return res.send("Student not found")
      }
  
      const startDate = new Date()
  
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + Number(months || 1))
  
      // --------------------
      // CHECK EXISTING SUB
      // --------------------
  
      const existing = await prisma.subscription.findUnique({
        where: {
          studentId_classSlug: {
            studentId: student.id,
            classSlug: classSlug
          }
        }
      })
  
      if (existing) {
  
        // extend existing subscription instead of crashing
  
        await prisma.subscription.update({
          where: { id: existing.id },
          data: {
            endDate,
            status: "active"
          }
        })
  
      } else {
  
        await prisma.subscription.create({
          data: {
            studentId: student.id,
            classSlug,
            startDate,
            endDate
          }
        })
  
      }
  
      res.redirect('/admin/subscription')
  
    } catch (err) {
  
      console.error(err)
      res.send("subscription creation failed")
  
    }
  
  })

module.exports = router