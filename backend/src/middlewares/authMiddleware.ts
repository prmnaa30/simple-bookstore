import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
	user?: any;
}

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
): any => {
	const token = req.cookies.auth;
	if (!token) {
		return res.status(401).json({ message: "Akses ditolak." });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET as string);
		req.user = decoded;
		next();
	} catch (error) {
		return res.json({ message: "Token kadaluarsa atau tidak valid!" });
	}
};
