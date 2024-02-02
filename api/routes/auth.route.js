import express from "express";
import {
	signInController,
	signUpController,
	googleController,
	githubController,
} from "../controller/AuthController.js";

const route = express.Router();

route.post("/signUp", signUpController);
route.post("/signIn", signInController);
route.post("/google", googleController);
route.post("/github", githubController);

export default route;
