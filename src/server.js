const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const playerRoutes = require('./routes/player.routes');
const apiRoutes = require('./routes/api.routes');
const syllabusRoutes = require('./routes/syllabus.routes');   // ← add this
const classRoutes = require('./routes/class.routes');   // ← add this

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static assets
app.use(express.static('public'));

// taleem player library
app.use('/taleem-player', express.static('node_modules/taleem-player'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// routes
app.use('/', indexRoutes);
app.use('/player', playerRoutes);
app.use('/api', apiRoutes);
app.use('/syllabus', syllabusRoutes);   // ← add this
app.use('/class', classRoutes);   // ← add this

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});