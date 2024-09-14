// tests/order.test.js
const request = require('supertest');
const app = require('../server'); // Assuming the server file is named server.js
const mongoose = require('mongoose');

describe('Order API', () => {
  let userToken, adminToken, productId, orderId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Register a user and get the token
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'user@example.com',
        password: 'userpassword',
        role: 'user'
      });
    userToken = userResponse.body.token;

    // Register an admin and get the token
    const adminResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin'
      });
    adminToken = adminResponse.body.token;

    // Admin creates a product
    const productResponse = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        category: 'Test Category',
        stock: 10
      });
    productId = productResponse.body._id;
  });

  afterAll(async () => {
    // Clean up after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  test('User should place an order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        products: [
          { product: productId, quantity: 2 }
        ],
        totalPrice: 200
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    orderId = response.body._id;
  });

  test('Admin should update order status', async () => {
    const response = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'Processing'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'Processing');
  });

  test('User should get their orders', async () => {
    const response = await request(app)
      .get('/api/orders/myorders')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty('_id', orderId);
  });
});
