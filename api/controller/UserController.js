import User from "./../model/user.model.js";

export const getAllData = async (req, res) => {
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
