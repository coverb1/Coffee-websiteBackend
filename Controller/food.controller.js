import mongoose from "mongoose";
import { foodtable } from "../models/food.js";

import cloudinary from "../Cloudinary.js";

export const addfoodcontroller = async (req, res) => {
    try {
        const { price, description, name } = req.body
        if (!price || !description || !name) {
            return res.status(402).json({ message: "please provide details" })
        }

        if (!req.files || req.files.length === 0) {
            return res.status(402).json({ message: "no image seen" })
        }

        const uplodedImages = []

        for (let file of req.files) {
            const uploadResults = await new Promise((resolve, reject) => {
                const upload = cloudinary.uploader.upload_stream({ folder: "foodImages" }, (error, results) => {
                    if (error) reject(error);
                    else resolve(results)
                })
                upload.end(file.buffer);
            })
            uplodedImages.push({
                url: uploadResults.secure_url,
                public_id: uploadResults.public_id
            })
        }

        const food = await foodtable.create({
            image: uplodedImages,
            price,
            description,
            name
        });
        return res.status(200).json({ message: "food created well", food })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const getexplorefood = async (req, res) => {
    try {
        const foods = await foodtable.find()
        console.log(foods)
        if (!foods) {
            return res.status(402).json({ message: "There is no food found" })
        }
        return res.status(200).json(foods)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getOnefoodDetails=async(req,res)=>{
    const {id}=req.params;
    try {
        const product = await foodtable.findById(id)
        if (!product) {
            return res.status(402).json({message:"This food does not Exist"})
        }
        res.status(200).json({product})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}