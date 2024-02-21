import express from "express";
import {
	dataFilter,
	getDataController,
	getDataByIdController,
	createDataController,
	deleteDataController,
	updateDataController,
} from "../controller/ListingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const route = express.Router();

route.get("/dataFilter", dataFilter);
route.get("/:id", getDataByIdController);
route.get("/", verifyToken, getDataController);
route.post("/create", verifyToken, createDataController);
route.put("/update/:id", verifyToken, updateDataController);
route.delete("/delete/:id", verifyToken, deleteDataController);

export default route;
