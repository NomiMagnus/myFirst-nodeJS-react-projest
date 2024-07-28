const product=require("./product")
const mongoose= require("mongoose")
const cartSchcema = new mongoose.Schema({
    userId:{
        type: mongoose.ObjectId,
        required:true,
        ref:"user"
    },
    productId:{
        type:mongoose.ObjectId,
        required:true,
        ref:product
    },
    amount:{
        type:Number,
        min:1,
        default:1
    }
},{
    timestamps:true
})

module.exports=mongoose.model("cart",cartSchcema)