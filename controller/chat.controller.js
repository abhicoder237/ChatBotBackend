import {Chat} from "../models/Chat.model.js"
import {Conversion} from "../models/Converstion.js"
// import { geminiModel } from "../helper/gemini.js"
import {groqChat} from "../helper/groq.js"

export const chatController  = async (req ,res) =>{
    try {
        const userId = req.user._id

        const chat = await Chat.create({
            user: userId
        })

        res.json(chat)
    } catch (error) {
        console.log("Error in Chat Controller")
      return res.status(501).json({
      
        message:  error.message
       }) 
         
    }
}

export const  getAllChats = async (req ,res) =>{
        try {
            // get chat 
            const chat = await Chat.find({user: req.user._id}).sort({createdAt: -1})
            res.json(chat)
        } catch (error) {
              console.log("Error in get Chat Controller")
             return res.status(501).json({
      
        message:  error.message
       }) 
       
        }
}


// export const conversationController  = async (req ,res) =>{
//     try {
//         // get chat
//         const chat = await Chat.findById(req.params.id)
//         // if chat not found 
//         if(!chat){
//             return res.status(404).json({
//                 message:"No Chat FOund"
//             })
//         }
//         // get question 
//         const question = req.body.question

//         // gemini integrigate
//         const result = await  geminiModel.generateContent(question)
//         const answer = result.response.text()

//         // create conversation
//         const conversation =  await Conversion.create({
//             chat: chat._id,
//             question,
//             answer 
//         })
//         // update chat
//         const updateChat = await Chat.findByIdAndUpdate(req.params.id , {
//             latestMes: req.body.question
//         }, {new: true})

//         // send response 
//         res.status(201).json({
//             message:"Updated Successfully",
//             conversation,
//             updateChat
//         })
//     } catch (error) {
//         console.log("Error in conversation  Controller")
//       return res.status(501).json({
      
//         message:  error.message
//        }) 
//     }
// }

export const conversationController = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: "No Chat Found" });
    }

    const question = req.body.question;

    const answer = await groqChat(question);

    const conversation = await Conversion.create({
      chat: chat._id,
      question,
      answer,
    });

    const updateChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMes: question },
      { new: true }
    );

    res.status(201).json({
      message: "Updated Successfully",
      conversation,
      updateChat,
    });
  } catch (error) {
    console.log("Error in conversation Controller");
    res.status(501).json({ message: error.message });
  }
};


export const getAllConversation = async (req ,res) =>{
    try {
        // get conversation 
        const conversation = await Conversion.find({chat:req.params.id})

        // conversation not found
        if(!conversation){
            return res.status(404).json({
                message:"No Conversation FOund"
            })
        }

        // send res
        res.json(conversation)
         
    } catch (error) {
        console.log("Error in get all conversation  Controller")
        res.status(501).json({
      
        message:  error.message
       }) 
    }
}

export const chatDeleted = async (req ,res) =>{
    try {
          // get chat 
        const chat = await Chat.findById(req.params.id)

        // chat not found
        if(!chat){
            return res.status(404).json({
                message:"No chat FOund"
            })
        }
         
        // only user allowed
        if(chat.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Unauthorized"
            })    
        }
        await chat.deleteOne()
        res.json({
            message:"Chat Deleted"
        })
    } catch (error) {
       console.log("Error in delete  Controller")
        res.status(501).json({
      
        message:  error.message
       })  
    }
}


