import express from 'express'
import { createBook, getAllBooks } from '../controllers/bookController.js' 
import { processImage, upload } from '../middlewares/uploadMiddleware.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllBooks)
router.post('/', verifyToken, upload.single("image"), processImage, createBook)

export default router
