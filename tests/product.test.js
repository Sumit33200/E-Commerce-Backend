// tests/product.test.js
const request = require('supertest');
const app = require('../server'); // Assuming the server file is named server.js
const mongoose = require('mongoose');

describe('Product API', () => {
  let adminToken;
  let productId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Register an admin and get the token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin'
      });

    adminToken = response.body.token;
  });

  afterAll(async () => {
    // Clean up after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  test('Admin should create a product', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        category: 'Test Category',
        stock: 10
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    productId = response.body._id;
  });

  test('Admin should update a product', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 150,
        stock: 20
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('price', 150);
    expect(response.body).toHaveProperty('stock', 20);
  });

  test('Admin should delete a product', async () => {
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product deleted successfully');
  });

  test('Get all products', async () => {
    const response = await request(app)
      .get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
