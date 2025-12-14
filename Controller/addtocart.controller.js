import { cartmodel } from "../models/cart.js";

export const addtocart = async (req, res) => {
    const user = req.userid
    const { foodId, name, quantity = 1, price, image } = req.body
    console.log(user)
    if (!foodId || !name || !price || !image) {
        return res.status(401).json({ message: 'please provide all details' })
    }
    try {
        const existinguser = await cartmodel.findOne({ user })
        if (existinguser) {

            existinguser.item.push({ foodId, name, quantity, price, image })
            await existinguser.save()
            return res.status(200).json({
                success: true,
                message: 'item added',
                cartitem: existinguser
            })
        }
        else {
            const newcart = await cartmodel.create({
                user: user,
                item: [{ foodId, name, quantity, price, image }]
            })
            return res.status(200).json({
                success: true,
                message: "cartcreated",
                cartitem: newcart
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getaddedcart = async (req, res) => {
    try {
        const responce = await cartmodel.findOne({ user: req.userid })
        console.log(responce)
        if (!responce) {
            return res.status(401).json({ message: "no item on your cart" })
        }
        return res.status(200).json(responce)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const deletecartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userid
        const updatecart = await cartmodel.findOneAndUpdate(
            { user: userId },
            { $pull: { item: { _id: id } } },
            { new: true }
        )
        if (!updatecart) {
            return res.status(401).json({ message: "No item found in database" })
        }
        return res.status(200).json({ message: "item removed well", updatecart })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const countcartItem = async (req, res) => {
    try {
        const userId = req.userid
        const cart = await cartmodel.findOne({ user: userId })
        if (!cart) {
            return res.status(401).json({ message: "cart not found" })
        }
        const totalItems = cart.item.length
        return res.status(200).json({
            message: "count gotten welll",
            totalItems
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}