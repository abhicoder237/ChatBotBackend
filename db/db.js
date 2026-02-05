import mongoose from 'mongoose'


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDb is Connected : ")
    } catch (error) {
        console.log("Error in MOngodb connection" , error.message)
    }
}

export default connectDB