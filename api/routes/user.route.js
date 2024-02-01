import express from "express";
import { getAllData } from "../controller/UserController.js";

const router = express.Router();

// Get All Data
router.get("/", getAllData);

export default router;
