
import 'dotenv/config'
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/client.js';

const JWT_SECRET = process.env.JWT_SECRET

export const login = async (req: Request, res: Response ): Promise<any> => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { username: username } })
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah!"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Username atau password salah!"})
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 Hr
    })

    return res.json({ message: "Login berhasil", user: { username: user.username } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}