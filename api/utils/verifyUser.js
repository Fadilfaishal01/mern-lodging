import jwt from "jsonwebtoken";
import { errorHandle } from "./errorHandle.js";

export const verifyToken = async (req, res, next) => {
	const token = await req.cookies.access_token;

	if (!token) return next(errorHandle(401, "Unauthorized"));

	try {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) return next(errorHandle(403, "Forbidden"));

			req.user = user;
			next();
		});
	} catch (error) {
		return next(errorHandle(500, "Error Verify Token : " + error.message));
	}
};
