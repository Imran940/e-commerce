const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { create, listAll, remove, read,
    update, list, totalProducts, productStar } = require("../controllers/product");

//routes and keeps the get request up
router.post("/product", authCheck, adminCheck, create);
router.get('/product/total', totalProducts)
router.get("/products/:count", listAll);
router.get("/product/:slug", read);
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.put('/product/:slug', authCheck, adminCheck, update)

//Home requesting routes
router.post("/productByCondition", list)

//rating
router.put('/product/star/:productId', authCheck, productStar)

module.exports = router;

