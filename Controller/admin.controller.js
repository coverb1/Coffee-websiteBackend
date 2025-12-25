import mongoose from "mongoose";
import  bcrypt from "bcryptjs"
import { userschema } from "../models/usermodel.js";


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
    res.status(200).json({message:"Admin created successiful"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
