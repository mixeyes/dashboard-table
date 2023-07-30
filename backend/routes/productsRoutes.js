const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);

router.get('/filters', productController.listFilters);

router.put('/:id', productController.updateProduct);

module.exports = router;
