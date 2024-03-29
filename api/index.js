import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

// Router
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

const port = process.env.PORT || 3000;
const clientOptions = {
	serverApi: { version: "1", strict: true, deprecationErrors: true },
};

mongoose
	.connect(process.env.MONGODB_URI, clientOptions)
	.then((res) => {
		console.log("Connected to Database Mongoose!");
	})
	.catch((err) => {
		console.log("Can't Connect to Database Mongoose! : " + err.message);
	});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(port, () => {
	console.log(`Server running on port ${port}!`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Handle Error
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
