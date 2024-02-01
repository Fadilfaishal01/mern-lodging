import dotenv from "dotenv";
import express from "express";

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}!`);
});
