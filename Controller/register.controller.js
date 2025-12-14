import bcrypt from 'bcrypt'
import { userschema } from '../models/usermodel.js'
import nodemailer from 'nodemailer'

export const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.SENDER_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
})

export const registercontroller = async (req, res) => {
    const { Firstname, Secondname, Email, Password } = req.body
    if (!Firstname || !Secondname || !Email || !Password) {
        return res.status(401).json({ message: "Please fill this fields" })
    }
    try {
        const user = await userschema.findOne({ Email })
        if (user) {
            return res.status(402).json({ message: "this user already Exist" })
        }
        const harshedpass = await bcrypt.hash(Password,10)
        const newuser = new userschema({
            Firstname,
            Secondname,
            Email,
            Role:'User',
            Password:harshedpass
        })
        const mailoption={
            from:process.env.SENDER_EMAIL,
            to:Email,
            subject:"Welcome to our website",
            text:`${Email} You have registered on Our website`
        }
        await transporter.sendMail(mailoption)
        await newuser.save()
        return res.status(200).json({message:"you have successful registered"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
