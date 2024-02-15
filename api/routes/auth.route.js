import express from "express";
import {
	signInController,
	signUpController,
	googleController,
	githubController,
	signOutController,
} from "../controller/AuthController.js";

const route = express.Router();

route.post("/signUp", signUpController);
route.post("/signIn", signInController);
route.post("/signOut", signOutController);
route.post("/google", googleController);
route.post("/github", githubController);

export default route;
