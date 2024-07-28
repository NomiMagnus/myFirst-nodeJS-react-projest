const express=require('express')
//////////////////////////////////////////////////
const router=express.Router()
const productController= require("../controllers/ProductController")


router.get("/",productController.getAllProducts)
router.post("/",productController.createNewProduct)
router.delete("/",productController.deleteProduct)
router.put("/",productController.updateProduct)

module.exports = router