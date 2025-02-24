import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    character:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
},{
    timestamps: true
}


);

const Content = mongoose.model('genshincontents', contentSchema);

export default Content;

