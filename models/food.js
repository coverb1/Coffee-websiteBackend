import mongoose from "mongoose";
const foodschema=new mongoose.Schema({
image:[
{
    url:{type:String,required:true},
    public_id:{type:String,required:true}
}
],
name:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String,required:true},

})
export const foodtable=mongoose.model('foodtable',foodschema)