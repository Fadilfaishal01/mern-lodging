import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";
import User from "./../model/user.model.js";

export const getAllUser = async (req, res) => {
	try {
		return res.status(200).json({
			status: 200,
			message: "Successfuly Get All Data User",
			data: await User.find(),
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return next(errorHandle(404, "User not found"));

		const { password: pass, ...rest } = user._doc;

		res.status(200).json({
			status: 200,
			message: "Successfully Get User",
			data: rest,
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	const { id } = req.params;

	if (req.user._id !== id)
		return next(errorHandle(401, "You can only update your own account!"));

	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}

		const user = await User.findByIdAndUpdate(
			id,
			{
				$set: {
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					avatar: req.body.avatar,
				},
			},
			{
				new: true,
			}
		);

		const { password, ...rest } = user._doc;

		return res.status(200).json({
			status: 200,
			message: "Successfuly Update User",
			data: rest,
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};

export const deleteUser = async (req, res, next) => {
	const { id } = req.params;

	if (req.user._id !== id)
		return next(errorHandle(401, "You can only delete your own account!"));

	try {
		await User.findByIdAndDelete(id);

		res.clearCookie("access_token");
		res.status(200).json({
			status: 200,
			message: "Successfuly Delete User",
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: error.message,
		});
	}
};
