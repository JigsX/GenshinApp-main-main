import mongoose from "mongoose";

export const connectDatabase = async () => {
    try{
        await mongoose.connect("mongodb://mongo:27017/Genshin");
        console.log(`Database Status: ${mongoose.connection.host}`)
    } catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

