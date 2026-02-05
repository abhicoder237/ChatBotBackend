import express from 'express'
import { isAuth } from '../middleware/isauth.js'
import { chatController, chatDeleted, conversationController, getAllChats, getAllConversation } from '../controller/chat.controller.js'


const router = express.Router()

router.post("/new" , isAuth , chatController)
router.get("/get_all_chat" ,isAuth , getAllChats)
router.post("/:id" , isAuth, conversationController)
router.get("/:id" , isAuth, getAllConversation)
router.delete("/:id" , isAuth,  chatDeleted)

export default router