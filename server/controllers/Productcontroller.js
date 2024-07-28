const Product = require("../models/product")//יבוא של הסכמה 

////////////////////////////////////////////////////////////
const createNewProduct = async (req, res) => {
    const { name, price, picture, ageMatch, category, description, deliverPrice } = req.body
    if (!name) {//חייבים להכניס שם כדי ליצור סכמה כי היא שדה חובה
        return res.status(400).json({ message: 'name is require' })
    }

    const duplicate = await Product.findOne({ name: name }).lean()//נתונים שרק אני מחזירה
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate product name" })
    }

    const product = await Product.create({ name, price, picture, ageMatch, category, description, deliverPrice })
    if (product) {//האם נוצרה סכמה 
        return res.status(201).json({ productId: product._id })
    }
    else {
        return res.status(400).json({ message: 'Invalid product' })
    }
}
////////////////////////////////////////////////////////////
const getAllProducts = async (req, res) => {
    const arrProduct = await Product.find().lean()
    if (!arrProduct?.length)
        return res.status(200).json('No product found 🔍')
    res.json(arrProduct)
}

////////////////////////////////////////////////////////////
const updateProduct = async (req, res) => {
    const { _id, name, price, picture, ageMatch, category, description,deliverPrice } = req.body
    if (!_id)
        return res.status(400).json({ message: 'You forgot to enter an id, but it is required😜' })
    if (!name)
        return res.status(400).json({ message: 'You forgot to enter a name, but it is required😜' })
    const product = await Product.findById(_id).exec()
    if (!product)
        return res.status(400).json({ message: 'No product found 🔍' })

    product.name = name
    product.price = price
    product.picture = picture
    product.ageMatch = ageMatch
    product.category = category
    product.description=description
    product.deliverPrice=deliverPrice

    const updateProduct = await product.save()
    res.json(`${updateProduct.name} updated 🧐`)
}

///////////////////////////////////////////////////////////////////////////
const deleteProduct = async (req, res) => {
    const { _id } = req.body
    const product = await Product.findById(_id).exec()
    if (!product)
        return res.status(400).json({ message: 'Sorry, we could not delete your product 😢' })
    const result = await Product.deleteOne(product)
    const reply = `Product deleted`
    res.json(reply)
}
////////////////////////////////////////////////////////////
module.exports = {
    createNewProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}