import mongoose from 'mongoose';

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB successfully connected")

    }
    catch(error){
        console.log("Error connecting DB",error.message)

    }
}
export default connectDb