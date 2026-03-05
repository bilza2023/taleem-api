
const express = require('express');
const router = express.Router();

// GET /player?v=newton-first-law

router.get('/', (req, res) => {

const vid = req.query.v || 'demo';

res.render('player/player', {
vid
});

});

module.exports = router;
