import User from "../models/user.model.js";
import { registerValidation, loginValidation } from "../includes/validation.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const data = req.body;
	const { error } = registerValidation(data);
	const newUser = new User();

	if (error) return res.send({ status: "Error", message: err.errors });
	try {
		const existingUser = await User.findOne({ username: data.username });
		if (existingUser)
			return res.send({
				status: "Error",
				message: "User already exists",
			});

		newUser.username = data.username;
		newUser.name = data.name;
		newUser.school = data.school;
		newUser.score = data.score;
		newUser.password = await newUser.encryptPassword(data.password);
	} catch (err) {
		console.log(err);
		return res.send({
			status: "Error",
			message: "Problems while processing",
		});
	}

	newUser
		.save()
		.then((savedUser) => {
			const token = jwt.sign(
				{ _id: savedUser._id },
				process.env.TOKEN_SECRET
			);
			res.send({
				status: "success",
				message: "User added successfully",
				token: token,
			});
		})
		.catch((err) => res.send({ status: "Error", message: err.errors }));
};

export const login = async (req, res) => {
	const data = req.body;
	const { error } = loginValidation(data);

	if (error)
		return res.send({
			status: "Error",
			message: error.details[0].message,
		});

	const user = await User.findOne({ username: data.username });
	if (!user)
		return res.send({
			status: "Error",
			message: "Username or Password are wrong",
		});

	const validPass = await user.comparePassword(data.password);
	if (!validPass)
		return res.send({
			status: "Error",
			message: "Username or Password are wrong",
		});

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", token).send({
		status: "success",
		message: "User logged in",
		token: token,
	});
};

export function auth(req, res, next) {
	const token = req.header("auth-token");
	if (!token)
		return res.status(401).send({
			status: "Error",
			message: "Access Denied",
		});

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.username = verified;
		next();
	} catch (err) {
		return res.status(400).send({
			status: "Error",
			message: "Invalid Token",
		});
	}
}
