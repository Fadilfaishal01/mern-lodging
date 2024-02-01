import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";

export const signUpController = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		return res.status(200).json({
			status: 200,
			message: "Successfuly Sign Up User",
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};
