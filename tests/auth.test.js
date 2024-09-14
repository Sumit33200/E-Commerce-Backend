// tests/auth.test.js
const request = require('supertest');
const app = require('../server'); // Assuming the server file is named server.js
const mongoose = require('mongoose');

describe('Authentication API', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  let token;

  test('Register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('Register a new admin', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('Login with registered user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Login with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongemail@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
