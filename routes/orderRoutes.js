// routes/orderRoutes.js
const express = require('express');
const { placeOrder, updateOrderStatus, getUserOrders } = require('../controllers/orderController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', isAuthenticated, placeOrder);
router.put('/:id', isAdmin, updateOrderStatus);
router.get('/myorders', isAuthenticated, getUserOrders);

module.exports = router;
