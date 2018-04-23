const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductsController = require("../controllers/products");


//<<<<<<<<<<Multer starts here>>>>>>>>>>
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});
//<<<<<<<<<<Multer ends here>>>>>>>>>>>

// const checkAuth = require('../middleware/check-auth');

router.get("/", ProductsController.getAllProducts);

router.post("/",/* checkAuth,*/ upload.single("productImage"),ProductsController.addProduct);

router.get("/:productId", ProductsController.getProduct);

// router.patch('/:productId', checkAuth, ProductsController.updateProduct);

// router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

module.exports = router;
