const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const Multer = require("multer");




exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select('name price _id category subCategory description productImage')
      .exec();
    return res.status(200).json({
      count: products.length,
      products
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      category:req.body.category,
      subCategory:req.body.subCategory,
      description:req.body.description,
      productImage:req.file.path
    });
    const result = await product.save();
    const { __v, ...savedProduct } = result._doc;
    return res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getProduct = async (req, res, next) => {
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
};

exports.updateProduct = async (req, res, next) => {
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
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.remove({ _id: req.params.productId }).exec();
    return res.status(200).json({
      message: `Deleted product: ${req.params.productId}`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
