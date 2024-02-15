import express from "express";
import {
	getDataController,
	createController,
} from "../controller/ListingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const route = express.Router();

route.get("/", verifyToken, getDataController);
route.post("/create", verifyToken, createController);

export default route;
