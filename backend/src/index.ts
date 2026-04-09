import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js';

import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Welcome to Bookstore API with TypeScript!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});