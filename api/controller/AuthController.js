import dotenv from "dotenv";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";
import jwt from "jsonwebtoken";
dotenv.config();

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

export const signInController = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const validUser = await User.findOne({ email: email });
		if (!validUser) return next(errorHandle(404, "User not found!"));

		const validatePassword = bcryptjs.compareSync(
			password,
			validUser.password
		);
		if (!validatePassword)
			return next(errorHandle(401, "Wrong credentials!"));

		const { password: pass, ...rest } = validUser._doc; // Untuk menghilangkan password pada response

		const token = jwt.sign(
			{
				_id: validUser._id,
				username: validUser.username,
				email: validUser.email,
			},
			process.env.JWT_SECRET
		);

		res.cookie("access_token", token, {
			httpOnly: true,
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		})
			.status(200)
			.json({
				status: 200,
				message: "Successfully Sign In",
				data: rest,
			});
	} catch (error) {
		next(error);
	}
};
