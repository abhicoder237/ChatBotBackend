import express from 'express'
import { profileController, userLogin, verifyToken } from '../controller/user.controller.js'
import { isAuth } from '../middleware/isauth.js'

const router = express.Router()

router.post("/login" , userLogin)
router.post("/verify" ,verifyToken)
router.get("/profile", isAuth , profileController)


export default router