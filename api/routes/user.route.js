import express from "express";
import {
	getUser,
	deleteUser,
	getAllUser,
	updateUser,
} from "../controller/UserController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get All Data
router.get("/", getAllUser);
router.get("/:id", verifyToken, getUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
