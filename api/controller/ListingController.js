import Listing from "../model/listing.model.js";
import { errorHandle } from "../utils/errorHandle.js";

export const dataFilter = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit) || 6;
		const startIndex = parseInt(req.query.startIndex) || 0;
		let offer = req.query.offer;
		let type = req.query.type;
		let parking = req.query.parking;
		let furnished = req.query.furnished;

		if (offer === undefined || offer === "false") {
			offer = { $in: [false, true] };
		}

		if (parking === undefined || parking === "false") {
			parking = { $in: [false, true] };
		}

		if (furnished === undefined || furnished === "false") {
			furnished = { $in: [false, true] };
		}

		if (type === undefined || type === "all") {
			type = { $in: ["sale", "rent"] };
		}

		const searchTerm = req.query.searchTerm || "";
		const sort = req.query.sort || "createdAt";
		const order = req.query.order || "desc";

		const listings = await Listing.find({
			name: { $regex: searchTerm, $options: "i" },
			offer,
			furnished,
			parking,
			type,
		})
			.sort({ [sort]: order })
			.limit(limit)
			.skip(startIndex);

		return res.status(200).json({
			status: 200,
			message: "Successfully Get Data Listing Search",
			data: listings,
		});
	} catch (error) {
		next(error);
	}
};

export const getDataController = async (req, res, next) => {
	try {
		const listings = await Listing.find({
			userRef: req.user._id,
		});

		res.status(200).json({
			status: 200,
			message: "Successfuly Get All Data Listing",
			data: listings,
		});
	} catch (error) {
		next(error.message);
	}
};

export const getDataByIdController = async (req, res, next) => {
	const { id } = req.params;

	try {
		const listing = await Listing.findById(id);
		if (!listing) return next(errorHandle(404, "Listing not found!"));
		return res.status(200).json({
			status: 200,
			message: "Successfuly Get Data Listing By Id",
			data: listing,
		});
	} catch (error) {
		next(error);
	}
};

export const createDataController = async (req, res, next) => {
	try {
		const listing = await Listing.create(req.body);
		return res.status(201).json({
			status: 201,
			message: "Successfuly Create Data Listing",
			data: listing,
		});
	} catch (error) {
		next(error);
	}
};

export const updateDataController = async (req, res, next) => {
	const { id } = req.params;
	const listing = await Listing.findById(id);
	if (!listing) return next(errorHandle(404, "Listing not found!"));

	if (req.user._id !== listing.userRef)
		return next(errorHandle(401, "You can only update your own listings!"));

	try {
		const updateListing = await Listing.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		return res.status(200).json({
			status: 200,
			message: "Successfuly Update Data Listing",
			data: updateListing,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteDataController = async (req, res, next) => {
	const { id } = req.params;
	const { _id } = req.user;

	const listing = await Listing.findById(id);
	if (!listing) return next(errorHandle(404, "Listing not found!"));
	if (_id !== listing.userRef)
		return next(errorHandle(401, "You can only delete your own listings!"));

	try {
		await Listing.findByIdAndDelete(id);
		const listings = await Listing.find({
			userRef: req.user._id,
		});
		return res.status(200).json({
			status: 200,
			message: "Successfuly Delete Data Listing",
			data: listings,
		});
	} catch (error) {
		next(error.message);
	}
};
