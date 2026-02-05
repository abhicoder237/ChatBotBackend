 import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    // console.log("AUTH HEADER:", req.headers.authorization)

    if (!authHeader) {
      return res.status(401).json({ message: "Please login first" })
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

    const decoded = jwt.verify(token, process.env.jwt_key)
    // console.log("DECODED:", decoded)

    const user = await User.findById(decoded._id)
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user 
    next()

  } catch (error) {
    console.log("Error in isAuth", error.message)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
