const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../schemas/User');

beforeEach(async () => {
  // Ensure the test database is clean before running tests
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise(resolve => setTimeout(resolve, 1000)); 
});

/**
 * Test 1: Register a new user
 */
test('Register a new user', async () => {
  const res = await request(app)
    .post('/register')
    .send({ email: 'admin@gmail.com', password: '123456' });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('message', 'User registered successfully');
});

/**
 * Test 2: Login with correct credentials
 */
test('Login with correct credentials and receive JWT', async () => {
  await request(app)
    .post('/register')
    .send({ email: 'admin@gmail.com', password: '123456' });

  const res = await request(app)
    .post('/login')
    .send({ email: 'admin@gmail.com', password: '123456' });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('message', 'Login successful');
  expect(res.body).toHaveProperty('token');
});

/**
 * Test 3: Login with incorrect credentials
 */
test('Login with incorrect credentials', async () => {
  await request(app)
    .post('/register')
    .send({ email: 'admin@gmail.com', password: '123456' });

  const res = await request(app)
    .post('/login')
    .send({ email: 'admin@gmail.com', password: 'wrongpassword' });

  expect(res.statusCode).toBe(401);
  expect(res.body).toHaveProperty('message', 'Invalid credentials');
});
