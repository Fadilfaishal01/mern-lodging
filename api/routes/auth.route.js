import express from "express";
import {
	signInController,
	signUpController,
} from "../controller/AuthController.js";

const route = express.Router();

route.post("/signUp", signUpController);
route.post("/signIn", signInController);

export default route;
