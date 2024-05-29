const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// Route to get featured products
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;