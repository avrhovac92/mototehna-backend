const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//     return cb(null, true);
//   }
//   return cb(null, false);
// };
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 }
// });

const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find()
      .select('name price _id')
      .exec();
    return res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post(
  '/',
  checkAuth /*, upload.single('productImage')*/,
  async (req, res, next) => {
    try {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
        // productImage: req.file.path
      });
      const result = await product.save();
      const { __v, ...savedProduct } = result._doc;
      return res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
      .select('name price _id')
      .exec();
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({
      message: `There is not product with id: ${req.params.productId}`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch('/:productId', checkAuth, async (req, res, next) => {
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  try {
    const result = await Product.update(
      { _id: req.params.productId },
      { $set: updateOps }
    ).exec();
    const { __v, ...updatedProduct } = result;
    return res.status(200).json({
      message: `Product updated: ${req.params.productId}`,
      updatedProduct
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:productId', checkAuth, async (req, res, next) => {
  try {
    await Product.remove({ _id: req.params.productId }).exec();
    return res.status(200).json({
      message: `Deleted product: ${req.params.productId}`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
