const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'There is not product with id: ' + id });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result =>
      res.status(200).json({ message: 'Product updated: ' + id, result })
    )
    .catch(err => res.status(500).json({ message: err.message }));
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result =>
      res
        .status(200)
        .json({
          message: 'Deleted product: ' + id,
          result
        })
        .catch(err => res.status(500).json({ message: err.message }))
    );
});

module.exports = router;
