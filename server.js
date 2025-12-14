import dotenv from 'dotenv';
dotenv.config();

import express, { Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer'
import 'dotenv/config'
import { fileURLToPath } from 'url';
import path from 'path'
import routes from './Routes/routes.js'
const app = express()
const PORT =process.env.PORT||3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:5174/']
}))

const MONGOOSE_URL = process.env.MONGODB_URL
mongoose.connect(MONGOOSE_URL)
    .then(() => {
        console.log('database connected well ')
    })
//endpoints
app.use('/api', routes)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/api/uploads', express.static(path.join(__dirname, 'Images')))
app.listen(PORT, () => {
    console.log(`Serving is running on http://localhost:${PORT}`)
})