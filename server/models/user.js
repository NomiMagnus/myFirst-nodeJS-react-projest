//סכמה מבנה של הדף
const mongoose = require("mongoose")//מייבאים את הספריה

const userSchema = new mongoose.Schema({//הגדרת הספרייה

    userName: {
        type: mongoose.Schema.Types.String,//שזם משתמש
        required: true,//שדה חובה
        unique: true,
        lowercase: true
    },
    password: {
        type: mongoose.Schema.Types.String,//סיסמא
        default: false
    },
    firstName: {
        type: mongoose.Schema.Types.String
    },
    lastName: {
        type: mongoose.Schema.Types.String
    },
    email: {//כמה המשימה משמעותית
        type: String,
        lowercase: true
    },
    phone: {
        type: String
    },
    roles: {//הרשאה
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    active: {//האם המשתמש פעיל
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)//מייצאת כאוביקט מונגו