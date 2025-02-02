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
const cors = require('cors');
const {login} = require('./controllers/authController');
// const setUserMiddleware = require('./middlewares/setUserMiddleware');

///////////////////////////////////////////////////////////////
const allowedOrigins = ['http://localhost:3000' , 'https://taleem.help']; 

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

app.use(cors(corsOptions));
// Ensure OPTIONS requests return proper headers
app.options('*', cors(corsOptions));
// app.use(setUserMiddleware);

///////////////////////////////////////////////////////////////
// Add JSON parsing middleware
app.use(express.json());
// Environment variables with fallback values
const PORT = process.env.PORT || 5000;

///////////////////////////////////////////////////////////////
//=== Mongo URI ====// 
// MONGO_URI For 
const MONGO_URI = process.env.MONGO_URI ;
// const MONGO_URI = "mongodb://admin:password@local_mongo:27017/localDb?authSource=admin";
// const MONGO_URI = "mongodb://admin:password@localhost:27017/localDb?authSource=admin";

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
// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
// mongoose.connect(MONGO_URI, {
//   authSource: "admin",
//   user: "admin",
//   pass: "password"
// })

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