import express from 'express';
import {createContent, getContent, deleteContent, updateContent} from '../controller/controller.js';

const router = express.Router();

router.get("/", getContent);
router.post("/", createContent);
router.delete("/:id", deleteContent);
router.put("/:id", updateContent);

export default router;
