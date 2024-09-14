// routes/productRoutes.js
const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', isAdmin, createProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);
router.get('/', getAllProducts);

module.exports = router;
