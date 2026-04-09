import express from 'express'
import { createBook, deleteBook, getAllBooks, updateBook } from '../controllers/bookController.js'
import { processImage, upload } from '../middlewares/uploadMiddleware.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security: []
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Belajar TypeScript Modern
 *                   author:
 *                     type: string
 *                     example: Pramana
 *                   price:
 *                     type: integer
 *                     example: 150000
 *                   description:
 *                     type: string
 *                     example: Panduan lengkap belajar TS dari nol
 *                   imageUrl:
 *                     type: string
 *                     example: http://localhost:3000/uploads/default-book.webp
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gagal mengambil data buku
 */
router.get('/', getAllBooks)

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book with image upload
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *             properties:
 *               book_image:
 *                 type: string
 *                 format: binary
 *                 description: Cover image for the book
 *               title:
 *                 type: string
 *                 example: Advanced Node.js
 *               author:
 *                 type: string
 *                 example: John Doe
 *               price:
 *                 type: integer
 *                 example: 200000
 *               description:
 *                 type: string
 *                 example: Panduan mendalam Node.js
 *     responses:
 *       201:
 *         description: Book successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil ditambahkan
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Akses ditolak
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gagal menambah buku
 */
router.post('/', verifyToken, upload.single("book_image"), processImage, createBook)

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book with optional image replacement
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               book_image:
 *                 type: string
 *                 format: binary
 *                 description: New cover image (optional, replaces old image)
 *               title:
 *                 type: string
 *                 example: Advanced Node.js Updated
 *               author:
 *                 type: string
 *                 example: Jane Smith
 *               price:
 *                 type: integer
 *                 example: 250000
 *               description:
 *                 type: string
 *                 example: Updated edition
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Detail buku 'Advanced Node.js Updated' berhasil diubah!
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku tidak ditemukan
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Akses ditolak
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gagal mengubah detail buku
 */
router.put('/:id', verifyToken, upload.single("book_image"), processImage, updateBook)

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book and its associated image file
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku 'Advanced Node.js' berhasil dihapus
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku tidak ditemukan
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Akses ditolak
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gagal menghapus buku
 */
router.delete('/:id', verifyToken, deleteBook)

export default router
