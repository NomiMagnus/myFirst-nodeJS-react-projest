require("dotenv").config()//ראשון כדי שכולם ישתמשו נתונים מאובטחים שמשתמשים איתם במערכת

//---הטמעה של חבילות---

const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose")


//---הטמעה של קבצים---
const corsOptions=require("./config/corsOptions");
const conectDataBase=require("./config/dbConn")//אפשרות חיבור למסד הנתונים


//---משתנים של המערכת---
conectDataBase()
const PORT=process.env.PORT ||7000
const app=express()//express מריץ את השרת עי שימוש בחבילת


//---middleware---
app.use(cors(corsOptions)) 
//app.use(cors())
app.use(express.json())
app.use(express.static("public"))//גישה לקבצים סטטים כגון תמונות html,css
app.use("/api/Product",require("./Routes/ProductRoutes"))
app.use("/api/Cart",require("./Routes/CartRoutes"))
app.use("/api/auth",require("./Routes/authRoutes"))


//---הרצה---
//בדיקה1 אם יש חיבור לדאטא בייס אם אין לא להריץ שרת
mongoose.connection.once('open',()=>{
    console.log("conenct to db")
    //אם הצלחנו להתחבר מריצים שרת
    app.listen(PORT,()=>{
        console.log(`Server run on ${PORT}` )
    })
    console.log(process.env.NODE_ENV);
})
//אם לא
mongoose.connection.on("error",err=>{
    console.log("erro on"+err)
})

//http://localhost:7020/api/auth/register
/**{"userName":"user1",
 "password":"12356",
  "fullname":"ftyu5",
  "email":"13yi,m7",
   "phone":"13579"} */