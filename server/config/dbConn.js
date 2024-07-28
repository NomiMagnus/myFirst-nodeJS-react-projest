const mongoose=require("mongoose")

const conectDataBase= async()=>{
    try{
        await mongoose.connect(process.env.DATA_BASE_URI)
    }
    catch(err){
        console.log("erro"+err)
    }
}
module.exports=conectDataBase