const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', indexRoutes);
app.use('/taleem-player', express.static('node_modules/taleem-player'));
/* PLAYER PAGE */
app.get('/player', (req, res) => {

  const deck = req.query.deck || 'demo';

  res.render('player/player', {
    deck
  });

});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});