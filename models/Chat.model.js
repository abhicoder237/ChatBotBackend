import mongoose from 'mongoose'

// create chat Schema
const chatSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    latestMes:{
        type:String,
        default: "New Chat"
    }
}, {timestamps: true})


export const Chat = mongoose.model("Chat" ,chatSchema)