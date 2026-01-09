import { orderscheema } from "../models/order.js";
import { userschema } from "../models/usermodel.js";

// placing order using COD Method
export const CodplaceOrder=async(req,res)=>{
try {
    const userId=req.req.userid
const {items,amount,address}=req.body;

const orderData={
    userId,
    items,
    amount,
    address,
    paymentMethod:"COD",
    payment:false,
    date:Date.now()
}

const newOrder=new orderscheema(orderData)
await newOrder.save()
await userschema.findByIdAndUpdate(userId,{cartData:{}})
return res.status(200).json({message:"Order added well in the database"})
} catch (error) {
    return res.status(500).json({error:error,message})
}
}

// placing order using Stripe Method
export const StripeplaceOrder = async(req,res)=>{

}

// All order data for Admin panel frontend
 export const allOrders=(req,res)=>{

 }

 //Update order status from Admin panel

 export const Updatestatus=(req,res)=>{

 }

 export const userOrders=(req,res)=>{

 }