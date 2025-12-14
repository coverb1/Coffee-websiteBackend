import mongoose from "mongoose";
const foodschema=new mongoose.Schema({
image:{type:String,required:true},
name:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String,required:true},

})
export const foodtable=mongoose.model('foodtable',foodschema)