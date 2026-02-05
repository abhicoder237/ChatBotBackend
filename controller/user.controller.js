import  jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"
import sendMail from "../middleware/sendMail.js"


export const userLogin = async (req ,res)=>{
    try {
        const {email } = req.body
        // get user
        let user = await User.findOne({ email })
        // user not found then create
       if (!user) {
        user = await User.create({ email })
    }

         // generate otp
           const otp = Math.floor(1000 + Math.random() * 9000)

       const verifyToken = jwt.sign(
      {   userId: user._id, otp },
      process.env.secret_key,
       { expiresIn: "5m" }
)

      await sendMail(email, "ChatBot", otp)

    res.json({
      message: "Otp send to your mail",
  verifyToken
   })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log("Error in Login Controller " , error)
    }
}


export const verifyToken = async (req ,res) =>{
    try {
        // get verify and otp from req.body
        const {verifyToken , otp } = req.body

        // verify
        const verify = jwt.verify(verifyToken , process.env.secret_key)

        if(!verify){
            res.status(400).json({
                message:"Otp Expired"
            })
        }

        if(verify.otp !== otp) return res.status(400).json({message:"Wrong otp"})

        // get user 
        const user = await User.findById(verify.userId)
        if(!user){
            res.status(400).json({message:"User not Found"})
        }

            // generate tokemn
            const token = jwt.sign({_id: user?._id} , process.env.jwt_key , {expiresIn: "5d"})

            res.status(201).json({
                message:"Login Successfully",
                user ,
                token
            })

    } catch (error) {
        
        return res.status(500).json({
            message: error.message
        })
        
    }
}


export const profileController = async (req ,res) =>{

    try {
         const user = await User.findById(req.user?._id)
    res.json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log("Error in profile Controller " , error)
    }
   
}