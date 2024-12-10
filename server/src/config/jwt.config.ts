import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "config";
import { AuthenticatedRequest } from "../api/types/jwt.types";

dotenv.config();

export const jwtExp = 30 * 24 * 60 * 60;

export function createJWT(payload: { email: string; id: number | string }) {
	return jwt.sign(payload, config.get("JWTSecret")!, {
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

	jwt.verify(token, config.get("JWTSecret")!, (err, decoded) => {
		if (err) {
			return res.status(403).json({
				auth: false,
				message: "Not authorized!",
			});
		}
		req.userId = (decoded as { id: number | string }).id;
		next();
	});
}
