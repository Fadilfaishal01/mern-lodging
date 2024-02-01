import express from "express";
import { signUpController } from "../controller/AuthController.js";

const route = express.Router();

route.post("/signUp", signUpController);

export default route;
