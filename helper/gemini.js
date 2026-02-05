// import { GoogleGenerativeAI } from "@google/generative-ai";
// console.log("Key:", process.env.gemni_api_key)

// const genAI = new GoogleGenerativeAI(process.env.gemni_api_key)

// export const geminiModel = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",

// })



import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const groqChat = async (question) => {
  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: question }],
  });

  return completion.choices[0].message.content;
};