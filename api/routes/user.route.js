import express from "express";
import {
	deleteUser,
	getAllData,
	updateUser,
	getDataListing,
} from "../controller/UserController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get All Data
router.get("/", getAllData);
router.get("/getDataListing", verifyToken, getDataListing);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
