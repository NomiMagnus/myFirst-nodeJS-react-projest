const express =require("express")
const router=express.Router()

const cartController=require("../controllers/cartController")

 const verifyJWT=require("../middleware/verityJWT")
 router.use(verifyJWT)

router.post("/",cartController.createNewCart)
router.get("/",cartController.getAllCartsByUser)
router.put("/",cartController.updateCount)
router.delete("/",cartController.deleteCart)

module.exports=router
