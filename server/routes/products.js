const express = require('express');
const router = express.Router();

const product_controller = require("../controllers/products");


// router create product get
router.get("/product/create", product_controller.product_create_get);


// router create product post
router.post("/product/create", product_controller.product_create_post);


// router delete product get
router.get("/product/:id/delete", product_controller.product_delete_get);


// router delete product post
router.post("/product/:id/delete", product_controller.product_delete_post);



// router update product get
router.get("/product/:id/update", product_controller.product_update_get);


// router update product post
router.post("/product/:id/update", product_controller.product_update_post);



// router to get all products
router.get("/products", product_controller.product_list);


// router to get a particular product
router.get("/product/:id", product_controller.product_detail);

// For index page
router.get('/',product_controller.index);


module.exports = router;