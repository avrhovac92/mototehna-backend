const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.find()
      .select('_id product quantity')
      .populate('product', '_id name price')
      .exec();
    return res.status(200).json({ count: order.length, orders: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        productId: req.body.productId
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });
    const result = await order.save();
    const { __v, ...savedOrder } = result._doc;
    return res.status(201).json({ ...savedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('product', '_id name price')
      .exec();
    if (order) {
      return res.status(200).json(order);
    }
    return res
      .status(404)
      .json({ message: `There is no order with id: ${req.params.orderId}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.remove({ _id: req.params.productId }).exec();
    return res.status(200).json({
      message: `Deleted order: ${req.params.productId}`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
