import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: "String",
			required: true,
			unique: true,
		},
		email: {
			type: "String",
			required: true,
			unique: true,
		},
		password: {
			type: "String",
			required: true,
		},
		avatar: {
			type: "String",
			default:
				"https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F2%2F2c%2FDefault_pfp.svg%2F2048px-Default_pfp.svg.png&tbnid=a79EuCifZPtiYM&vet=12ahUKEwjC_d7F3ouEAxVjpWMGHcBGCXAQMygDegQIARB8..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3ADefault_pfp.svg&docid=92PmITuhH680TM&w=2048&h=2048&q=image%20default&ved=2ahUKEwjC_d7F3ouEAxVjpWMGHcBGCXAQMygDegQIARB8",
		},
		authType: {
			type: "String",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
