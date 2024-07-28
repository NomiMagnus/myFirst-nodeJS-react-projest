//סכמה מבנה של הדף
const mongoose=require("mongoose")//מייבאים את הספריה

const productSchema=new mongoose.Schema({//הגדרת הספרייה
   
    name:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    price:{
        type: Number
    },
    description:{
        type:String,
        maxLength:100
    },
    picture:{
        type:String,
        default:"nopicture.png"
    },
    ageMatch:{
        type:[Number],
        max:120,
        min:0
    },
    category:{
        type: String,
        enum: ["Box", "Garden", "Thinking", "Imagination"],
        default: "Box"
    },
    deliverPrice:{
        type:Number,
        min:0,
        default:0//משלוח חינם...
    }
},
{
    timestamps:true
})


module.exports=mongoose.model('Product',productSchema)//מייצאת כאוביקט מונגו