import fs from 'fs'
import { url } from 'inspector'
import path from 'path'
import { userschema } from '../models/usermodel.js'

import cloudinary from '../Cloudinary.js'

export const uploadProfileImage = async (req, res) => {
    const user = req.userid
    // const {image}=req.body
    // if (!image) {
    //     return res.status(400).json({message:"no image uploaded"})
    // }
    if (!user) {
        return res.status(401).json({ message: "please first login to upload your image" })
    }
    try {
        if (!req.file) {
            return res.status(402).json({ message: "no profile found" })
        }

        // uploading to cloudinary
        const uploadtoCloudnary = await new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream({ folder: "profileImage" }, (error, results) => {
                if (error) {
                    return reject(error)
                }
                else {
                    resolve(results)
                }
            })
            upload.end(req.file.buffer)
        })

        const user = await userschema.findById(req.userid)
        if (user.profilepicture && user.profilepicture.startsWith("images/")) {
            const deletepath = path.join('images', user.profilepicture)
            if (fs.existsSync(deletepath)) {
                fs.unlinkSync(deletepath)
            }
        }
        user.profilepicture = uploadtoCloudnary.secure_url
        user.profilepicture = uploadtoCloudnary.public_id;

        await user.save()
        return res.status(200).json({
            message: "profile image uploaded well",
            url: uploadtoCloudnary.secure_url,
            public_id: uploadtoCloudnary.public_id
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const deleteProfileImage = async (req, res) => {
    try {
        const filename = req.params.filename
        const deletepath = path.join('Images', filename)
        if (fs.existsSync(deletepath)) {
            fs.unlinkSync(deletepath)
        }
        return res.json({ message: "profile imagedeleted well" })
    } catch (error) {
        return res.json({ error: error.message })
    }
}

