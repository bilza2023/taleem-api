require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schemas/User');
const TCode = require('./schemas/TCode');
const app = express();
const bcrypt = require('bcrypt');
const checkAbility = require('./middlewares/authorization/checkAbility');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const RestfulExpressRouter = require('restful_express_router'); 
const {login} = require('./controllers/authController');
const { listFiles } = require('./utils/s3Utils');
// const setUserMiddleware = require('./middlewares/setUserMiddleware');


app.use(express.json());
const PORT = process.env.PORT || 5000;
///////////////////////////////////////////////////////////////
const MONGO_URI = process.env.MONGO_URI ;
///////////////////////////////////////////////////////////////
const userRouter = new RestfulExpressRouter(User);
app.use('/user', userRouter.getRouter());
///////////////////////////////////////////////////////////////

const tcodeRouter = new RestfulExpressRouter(TCode);

// tcodeRouter.middlewareForList = []; 
// tcodeRouter.middlewareForGetById = [checkAbility('read', 'Tcode')]; // Same 
// tcodeRouter.middlewareForCreate = [jwtMiddleware, checkAbility('create', 'Tcode')];
// tcodeRouter.middlewareForUpdate = [jwtMiddleware, checkAbility('update', 'Tcode')];
// tcodeRouter.middlewareForDelete = [jwtMiddleware, checkAbility('delete', 'Tcode')];

tcodeRouter.middlewareForList = []; 
tcodeRouter.middlewareForGetById = [];
tcodeRouter.middlewareForCreate =  [];
tcodeRouter.middlewareForUpdate =  [];
tcodeRouter.middlewareForDelete =  [];

app.use('/tcode', tcodeRouter.getRouter());

///////////////////////////////////////////////////////////////

app.get('/get-images-list', async (req, res) => {
    try {
        const files = await listFiles('taleem-media', 'bucket/');
        res.json({ files });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching images list', error: err.message });
    }
});

app.get('/get-narrations-list', async (req, res) => {
    try {
        const files = await listFiles('taleem-media', 'sound/');
        res.json({ files });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching narrations list', error: err.message });
    }
});


///////////////////////////////////////////////////////////////
// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

///////////////////////////////////////////////////////////////
// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js API with MongoDB!' });
});

// Secure route
app.get('/secure', jwtMiddleware, (req, res) => {
  res.json({ message: 'This is a secure route', user: req.user });
});

// User registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    debugger;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


app.post('/login', login);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

/////
module.exports = app;