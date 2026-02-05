import mongoose from "mongoose";


const conversionSchema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
}, {timestamps: true})

export const Conversion = mongoose.model("Conversion" , conversionSchema)