import dotenv from "dotenv";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const signUpController = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
		authType: "Manual",
	});

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

export const signOutController = async (req, res, next) => {
	try {
		res.clearCookie("access_token");
		res.status(200).json("User has been logged out!");
	} catch (error) {
		next(error);
	}
};

export const googleController = async (req, res, next) => {
	const { name, email, photo } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign(
				{
					_id: user._id,
					username: user.username,
					email: user.email,
				},
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = user._doc;

			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		} else {
			const generatePassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
			const newUser = new User({
				username:
					name.split(" ").join("").toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: email,
				password: hashedPassword,
				avatar: photo,
				authType: "Google",
			});

			await newUser.save();

			const token = jwt.sign(
				{
					_id: newUser._id,
					username: newUser.username,
					email: newUser.email,
				},
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = newUser._doc;

			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};

export const githubController = async (req, res, next) => {
	const { name, email, photo } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign(
				{
					_id: user._id,
					username: user.username,
					email: user.email,
				},
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = user._doc;

			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		} else {
			const generatePassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
			const newUser = new User({
				username:
					name.split(" ").join("").toLowerCase() +
					Math.random().toString(36).slice(-4),
				email: email,
				password: hashedPassword,
				avatar: photo,
				authType: "Github",
			});

			await newUser.save();

			const token = jwt.sign(
				{
					_id: user._id,
					username: user.username,
					email: user.email,
				},
				process.env.JWT_SECRET
			);
			const { password: pass, ...rest } = newUser._doc;

			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};
