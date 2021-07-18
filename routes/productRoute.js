const express = require("express");
const router = express.Router();

// Import route functions from route controller
const {
    getProducts,
    getSingleProduct,
    postProducts,
    updateProducts,
    deleteProducts,
} = require("../controller/productController");

// Setting routes for products CRUD processes
router.get("/", getProducts)
router.get("/:id", getSingleProduct)
router.post("/", postProducts);
router.put("/:id", updateProducts)
router.delete("/:id", deleteProducts)

module.exports = router;