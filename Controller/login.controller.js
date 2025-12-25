import jwt from "jsonwebtoken";
import { userschema } from "../models/usermodel.js";
import bcrypt from "bcryptjs"



export const  logincontroller=async(req,res)=>{
    const{Email,Password}=req.body
     if(!Email){
            return res.status(401).json({message:"Please provide us Email"})
        }
        else if(!Password){
           return res.status(401).json({message:"Please provide us password"})
        }
    try {
       const user=await userschema.findOne({Email})
       if (!user) {
        return res.status(401).json({message:"please user does not exist"})
       }
       const ismatch=await bcrypt.compare(Password,user.Password)
       if (!ismatch) {
        return res.status(401).json({message:"please incorrect password"})
       }
       let expiresTime='7d'
       if (user.Role==="Admin") {
         expiresTime='15d'
       }
       const token=jwt.sign({id:user._id,Role:user.Role},
         process.env.JWT_SECRET,
         {expiresIn:expiresTime})
      
       return res.status(200).json({message:"login succesfull",token,user:{id:user._id,role:user.Role}})
    } catch (error) {
       return res.status(500).json({error:error.message}) 
    }
}
export const getuser=async(req,res)=>{
try {
   const user=await userschema.findById(req.userid)
   console.log(user)
   if (!user) {
      return res.status(401).json({message:"user does not exist"})
   }
   return res.status(200).json({
      message:"got",
      userData:{
     name:user.Firstname[0].toUpperCase()+user.Secondname[0].toUpperCase()
      }
   })
} catch (error) {
   return res.status(500).json({error:error.message})
}
}

export const logoutuser=async(req,res)=>{
try {
   return res.status(200).json({message:'the user deleted weell'})
} catch (error) {
   return res.status(500).json({error:error.message})
}
}