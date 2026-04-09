import express from 'express'
import { createBook, deleteBook, getAllBooks, updateBook } from '../controllers/bookController.js' 
import { processImage, upload } from '../middlewares/uploadMiddleware.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllBooks)
router.post('/', verifyToken, upload.single("book_image"), processImage, createBook)
router.put('/:id', verifyToken, upload.single("book_image"), processImage, updateBook)
router.delete('/:id', verifyToken, deleteBook)

export default router
