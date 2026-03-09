///home/bilal-tariq/00--TALEEM===>/taleem-api/src/routes/ui.routes.js

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const JWT_SECRET = "taleem-secret-key";

const fs = require('fs')
const path = require('path')

router.get('/studio', (req, res) => {

    // const studentId = req.session.studentId;
    const studentId = "cmmi3z12b0002m3aml4ts457j";
  
    res.render('studio/index', {
      studentId
    });
  
  });

  router.get('/ask', (req, res) => {

    const { contentSlug, contentType, success } = req.query;
  
    const token = req.cookies?.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  
    const payload = jwt.verify(token, JWT_SECRET);
  
    res.render('ask/index', {
      contentSlug,
      contentType,
      studentId: payload.studentId,
      success
    });
  
  });
module.exports = router