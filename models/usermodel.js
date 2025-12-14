import mongoose from "mongoose";

const usechema = new mongoose.Schema({
    Firstname: { type: String, required: true },
    Secondname: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Isaccountverfied: { type: Boolean, default: false },
    Role: { type: String, default: "User" },
    profilepicture: { type: String, default: null }
})
export const userschema = mongoose.model("userschema", usechema)