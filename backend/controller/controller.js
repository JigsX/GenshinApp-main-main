import mongoose from "mongoose";

import Content from '../models/productModels.js';

export const createContent = async (req, res) => {
    const content = req.body;

    if(!(content.title && content.character && content.category && content.image)){
        return res.status(200).json({
            success: false,
            message: "Please provide all fields!"
        });
    }

    const newContent = new Content(content);

    try{
        newContent.save();
        res.status(200).json({
            success: true,
            data: newContent
        });
    }catch(error){
        console.error("Content creation failed!")
        res.status(201).json({
            success: false,
            message: "Server Error!"
        });
    }
}

export const deleteContent = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(200).json({
            success: false,
            message: "Invalid ID!"
        })
    }

    try{
        await Content.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Content deleted successfully!"
        })
    }catch(error){
        console.error("Server error!", error.message);
        res.status(201).json({
            success: false,
            message: "Server Error: Content nod deleted!"
        })
    }
}

export const getContent = async (req,res) => {
    try{
        const contents = await Content.find({});
        res.status(201).json({
            success: true,
            data: contents
        });
        
    }catch(error){
        res.status(201).json({
            success: false,
            message: "No Content to load!"
        })
    }
}

export const updateContent = async (req,res) => {
    const {id} = req.params;
    const content = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(200).json({
            success: false,
            message: "Invalid ID!"
        })
    }

    try{
        const newContent = await Content.findByIdAndUpdate(id, content, {new: true});
        res.status(201).json({
            success: true,
            data: newContent
        })
    }catch(error){
        res.status(201).json({
            success: false,
            message: error.message
        })
    }
}


