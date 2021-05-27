import {
	registerValidation,
	passwordValidation,
} from "../includes/validation.js";
import response from "../includes/response.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
	User.findById(req.username).then((user) =>
		res
			.send(new response({ data: { user: user } }))
			.catch((err) =>
				res
					.status(400)
					.send(new response({ status: "Error", message: err }))
			)
	);
};

export const editUser = async (req, res) => {
	const data = req.body;
	const { error } = registerValidation(data);

	if (error)
		return res.send(
			new response({
				status: "Error",
				message: error.details[0].message,
			})
		);

	if (data.password !== null) {
		const { error } = passwordValidation({ password: data.password });
		if (error)
			return res.send(
				new response({
					status: "Error",
					message: error.details[0].message,
				})
			);
	}

	User.findById(req.username)
		.then(async (user) => {
			user.name = data.name ? data.name : user.name;
			user.username = data.username ? data.username : user.username;
			user.school = data.school ? data.school : user.school;
			user.score = data.score ? data.score : user.score;

			if (data.password !== null && data.password !== user.password)
				user.password = await user.encryptPassword(data.password);

			user.save()
				.then((_) =>
					res.res.send(
						new response({
							message: "User edited successfully",
						})
					)
				)
				.catch((err) =>
					res
						.status(400)
						.send(new response({ status: "Error", message: err }))
				);
		})
		.catch((err) =>
			res
				.status(400)
				.send(new response({ status: "Error", message: err }))
		);
};
