import mongoose from "mongoose";

const Order = new mongoose.Schema({
   userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"userschema",
required:true
   },
    items: { type: Array, required: true },
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    statues:{type:String,required:true,default:"Order Place"},
    paymentMethod:{type:String,required:true},
    payment:{type:Boolean,required:true,default:false},
    date:{type:Number,required:true}

})
export const orderscheema = mongoose.model("orderscheema", Order)