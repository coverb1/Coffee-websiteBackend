import mongoose from "mongoose";
import { foodtable } from "../models/food.js";

import cloudinary from "../Cloudinary.js";

export const addfoodcontroller = async (req, res) => {
    try {
        const { price, description, name } = req.body
        if (!price || !description || !name) {
            return res.status(402).json({ message: "please provide us image,price and description" })
        }
        // const image = req.file ? req.file.filename : null
        if (!req.files||req.files.length===0) {
            return res.status(401).json({ message: "no image seen" })
        }
        //upload to cloudinary

        const uploadresults = await new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { folder: "foodImage" },
                (error, results) => {
                    if (error) reject(error);
                    else resolve(results)

                }
            );
            upload.end(file.buffer)
        })

        const food = await foodtable.create({
            image: uploadresults.secure_url,
            public_id:uploadresults.public_id,
            price,
            description,
            name,
        })
        return res.status(200).json({ message: "food created well", food })
    } catch (error) {
        return res.status(500).json({ error: error.message })
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