import axios from 'axios';

// Set the base URL for API requests
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });


// Add a request interceptor to include the token in the headers
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Auth API
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Product API
export const getProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Order API
export const getOrders = () => API.get('/orders');
export const placeOrder = (orderData) => API.post('/orders', orderData);
export const updateOrderStatus = (orderId, status) => API.put('/orders', { orderId, status });
