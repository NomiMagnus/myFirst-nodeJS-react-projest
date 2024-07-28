
const express =require("express")
const router=express.Router()//הגדרת ראוטר שיודע לנתב 

const authController=require("../controllers/authController")


router.post("/login",authController.login)
router.post("/register",authController.register)
router.get("/Admin",authController.isAdmin)

module.exports=router