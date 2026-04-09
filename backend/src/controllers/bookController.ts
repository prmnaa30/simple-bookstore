import { Request, Response } from "express";
import { prisma } from "../lib/client.js";
import path from "path";
import fs from 'fs'

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

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const price = req.body.price ? parseInt(req.body.price, 10) : 0
    const { title, author, description, imageUrl } = req.body

    const existingBook = await prisma.book.findUnique({
      where: { id: Number(id) }
    })

    if (!existingBook) {
      return res.status(404).json({ message: "Buku tidak ditemukan"})
    }

    if (imageUrl && existingBook.imageUrl) {
      const oldImagePath = path.join(path.resolve("uploads"), existingBook.imageUrl)

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author, price, description, imageUrl }
    })

    return res.status(200).json({ message: `Detail buku '${updatedBook.title}' berhasil diubah!`})
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengubah detail buku" })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existingBook = await prisma.book.findUnique({
      where: { id: Number(id) }
    })

    if (!existingBook) {
      return res.status(404).json({ message: "Buku tidak ditemukan"})
    }

    if (existingBook.imageUrl) {
      const oldImagePath = path.join(path.resolve('uploads'), existingBook.imageUrl);
      
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await prisma.book.delete({
      where: { id: Number(id) }
    })

    return res.status(200).json({ message: `Buku '${existingBook.title}' berhasil dihapus`})
  } catch (error) {
    return res.status(500).json({ message: "Gagal menghapus buku" })
  }
}