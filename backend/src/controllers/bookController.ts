import { Request, Response } from "express";
import { prisma } from "../lib/client.js";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const formattedBooks = books.map(book => ({
      ...book,
      imageUrl: book.imageUrl
        ? `${req.protocol}://${req.get('host')}/uploads/${book.imageUrl}`
        : null
    }))

    return res.status(200).json(formattedBooks)
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data buku."})
  }
}

export const createBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const price = parseInt(req.body.price, 10)
    const { title, author, description, imageUrl } = req.body

    const newBook = await prisma.book.create({
      data: { title, author, price, description, imageUrl }
    })

    return res.status(201).json({ message: "Buku berhasil ditambahkan", data: newBook })
  } catch (error) {
    return res.status(500).json({ message: "Gagal menambah buku" })
  }
}