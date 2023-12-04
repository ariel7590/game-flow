import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../types/jwt.types";

dotenv.config();

export const jwtExp = 30 * 24 * 60 * 60;

export function createJWT(payload: { email: string; id: number }) {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
		expiresIn: jwtExp,
	});
}

export function verifyJWT(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): Response | void {
	const token = (req.cookies as { jwt: string }).jwt;
	if (!token) {
		return res.status(400).json({
			auth: false,
			message: "No token found!",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				auth: false,
				message: "Not authorized!",
			});
		}
		req.userId = (decoded as { id: number }).id;
		next();
	});
}
