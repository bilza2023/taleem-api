
const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/studio', (req, res) => {

    // const studentId = req.session.studentId;
    const studentId = "cmmi3z12b0002m3aml4ts457j";
  
    res.render('studio/index', {
      studentId
    });
  
  });

module.exports = router