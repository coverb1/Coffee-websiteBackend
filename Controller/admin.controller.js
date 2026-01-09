import mongoose from "mongoose";
import  bcrypt from "bcryptjs"
import { userschema } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { execPath } from "process";
import { foodtable } from "../models/food.js";

export const adminController=async(req,res)=>{
    try {
    const adminExist=await userschema.findOne({Role:"Admin"})
    if (adminExist) {
        res.status(409).json({message:"Admin arleady exist"})
       
    }
    const harshedPassword=await bcrypt.hash("waguancofeee123",10);

    await userschema.create({
        Firstname:"waguan",
        Secondname:"coffee",
        Email:"waguancoffee123@gmail.com",
        Password:harshedPassword,
        Role:"Admin"
    })
   return  res.status(200).json({message:"Admin created successiful"})

    } catch (error) {
     return   res.status(500).json({error:error.message})
    }
}

export const AdmindeleteItem=async(req,res)=>{
    const {id}=req.params
try {
     const updaFoodstore=await foodtable.findByIdAndDelete(id)

    if (!updaFoodstore) {
        return res.status(402).json({message:"No item found in Foodtable"})
    }
return res.status(200).json({message:"Item deleted well",updaFoodstore})
} catch (error) {
    return res.status(500).json({error})
}
}
