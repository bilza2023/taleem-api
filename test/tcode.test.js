const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

let studentToken = ''; // Store the student JWT token

beforeAll(async () => {
  // Register a student user
  await request(app)
    .post('/register')
    .send({ email: 'student@gmail.com', password: 'student123', role: 'student' });

  // Login to get the token
  const res = await request(app)
    .post('/login')
    .send({ email: 'student@gmail.com', password: 'student123' });

  studentToken = res.body.token; // Store token for future tests
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Ensure Jest exits cleanly
});

describe('TCode API', () => {
  test('Fetch all TCodes without authentication', async () => {
    const res = await request(app).get('/tcode');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Future tests will use studentToken
});
