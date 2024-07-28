const User = require("../models/user")
const bcrypt = require('bcrypt')//להצפין סיסמא
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: ' All fields are required' })
    }

    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser || !foundUser.active) {
        return res.status(200).json('User not allowed!')
    }

    const match = await bcrypt.compare(password, foundUser.password)//לבדוק האם סיסמת המשתמש שווה לסיסמה המוצפנת
    if (!match) return res.status(200).json('Wrong password!')
    const userInfo = {
        _id: foundUser._id,
        userName: foundUser.userName,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        roles: foundUser.roles,
        email: foundUser.email
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)//מחזיר טוקן

    res.json({ id: foundUser._id, name: foundUser.userName, userToken: accessToken ,role:foundUser.roles})
}


//כניסת משתמשים
const register = async (req, res) => {
    const { userName, password, firstName, lastName, email, phone } = req.body
    if (!userName || !password || !firstName || !lastName) {
        return res.status(400).json({ message: ' fields are required' })
    }

    //בדיקה אם קיים משתמש עם אותו שם משתמש
    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    const hashedPwd = await bcrypt.hash(password, 10)//ליצור סיסמה מקודדת
    const userObject = { userName, password: hashedPwd, firstName, lastName, email, phone }
    const user = await User.create(userObject)
    if (user)//אם נוצר
        return res.status(201).json({ message: `New user ${user.userName} created` })

    else {
        return res.status(400).json({ message: "Invalid user received" })
    }


}

const isAdmin = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id }).lean()
    if (!user)
        return res.status(400).json('User not fount :(')
    if (user.role === "Admin")
        return res.json(True)
    res.json(False)
}
module.exports = { login, register, isAdmin }