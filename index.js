import  dotenv from 'dotenv'
import "dotenv/config";
// dotenv config
dotenv.config()
import express from 'express'

import cors from "cors"

 


// importing
import connectDB from './db/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from "./routes/chatRoutes.js"



const app = express()
const PORT = process.env.PORT || 5000


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "https://chat-botfrontend.vercel.app", 
  credentials: true
}))

// routes

app.use("/api/user" , userRoutes)
app.use("/api/chat" , chatRoutes)


// server is listen 
 
app.listen(PORT, ()=>{
    console.log(`Server is Listen on ${PORT}`)
    connectDB()
   
})


