import mongoose from "mongoose";

export const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Status: ${mongoose.connection.host}`)
    } catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

