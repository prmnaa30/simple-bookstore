import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from 'fs';
import { NextFunction, Request, Response } from "express";

const storage = multer.memoryStorage()
export const upload = multer({ storage })

export const processImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.file) return next()

  try {
    const uploadPath = path.resolve("uploads")
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath)
    }

    const filename = `${Date.now()}-${req.file.originalname.split('.')[0]}.webp`
    const filepath = path.join(uploadPath, filename)

    await sharp(req.file.buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(filepath)

    req.body.imageUrl = filename
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Gagal memproses gambar"})
  }
}