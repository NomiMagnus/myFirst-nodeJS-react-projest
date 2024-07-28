const Cart = require("../models/cart")
///////////////////////////////////////////////////////////////////////////
const createNewCart = async (req, res) => {
    const { productId, amount } = req.body
    if (!productId) {
        return res.status(400).json({ message: 'You forgot to enter a product id, but it\'s required😜' })
    }

    const duplicate = await Cart.findOne({userId:req.user._id,productId:productId })
    if (duplicate) {
        // updateCount({productId:productId, amount:amount})
        return res.status(409).json({ message: "Duplicate product name" })
    }

    const cart = await Cart.create({ userId:req.user._id, productId, amount })

    if (cart) {
        return res.status(201).json({ message: 'new Cart created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid Carts' })
    }
}
///////////////////////////////////////////////////////////////////////////
const updateCount = async (req, res) => {
    const { productId,amount } = req.body
    if (!productId)
        return res.status(400).json({ message: 'Please enter a product id' })
    if (!amount)
        return res.status(400).json({ message: 'Please enter an amount' })

    const a = await Cart.findOne({userId:req.user._id,productId:productId }).exec()
    if (!a)
        return res.status(400).json({ message: 'No cart found 🔍' })

    a.amount=amount //<1?1:amount

    const updateCart = await a.save()
    res.json(`${updateCart._id} updated 🧐`)
}

///////////////////////////////////////////////////////////////////////////
const getAllCartsByUser = async (req, res) => {
    const arrCarts = await Cart.find({ userId:req.user._id }).populate("productId")

    if (!arrCarts?.length) {
        return res.status(400).json({ message: 'no cart found ' })
    }
    
    res.json(arrCarts)
}

///////////////////////////////////////////////////////////////////////////
const deleteCart = async (req, res) => {
    const { _id } = req.body
    const c = await Cart.findById( _id ).exec()
    if (!c)
        return res.status(400).json({ message: 'Sorry, we could not delete your cart 😢' })
    const result = await Cart.deleteOne(c)
    res.json(`Cart deleted`)
}

///////////////////////////////////////////////////////////////////////////

module.exports = {
    createNewCart,
    updateCount,
    getAllCartsByUser,
    deleteCart
}