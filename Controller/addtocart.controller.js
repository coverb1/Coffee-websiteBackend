import { cartmodel } from "../models/cart.js";

export const addtocart = async (req, res) => {
try {
    const user=req.userid
    const {foodId,name,price,image,quantity=1}=req.body

    if (!foodId||!name||!price||!image||!quantity) {
        return res.status(400).json({message:"Please provide all details"})
    }
    const cart=await cartmodel.findOne({user})
if (cart) {
    const item=cart.item.find(i=>i.foodId===foodId)

    if (item) {
       item.quantity +=quantity
    }
    else{
        cart.item.push({foodId,name,price,image,quantity})
    }
 // recalculate totalAmount
    cart.totalAmount=cart.item.reduce((sum,i)=>sum+(i.price*i.quantity),0)
    await cart.save()
    return res.status(200).json({message:"cart updated",cart})
}
// if Cart does not exist
const newcart=await cartmodel.create({
    user,
    item:[{foodId,name,price,quantity}],
    totalAmount:price*quantity
})
return res.status(200).json({message:"Cart Created",newcart})
} catch (error) {
    return res.status(500).json({erro:error.message})
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
   const cart=await cartmodel.findOne({user:userId})
   if (!cart) {
    return res.status(401).json({message:"cart not found"})
   }
   const item=cart.item.find(i=i._id.toString() === id)
   if (!item) {
    return res.status(200).json({ message: "item not found" })
   }
       cart.totalAmount-=item.price*item.quantity 
       cart.item=cart.item.filter(i=>i._id.toString() !== id)
       await cart.save()
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
