import response from "../includes/response.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getTask = async (req, res) => {
	User.findById(req.username)
		.then((user) =>
			res.send(
				new response({
					data: {
						tasks: user.tasks.filter(
							(task) => (task.id = parseInt(req.params.id))
						),
					},
				})
			)
		)
		.catch((err) =>
			res
				.status(400)
				.send(new response({ status: "Error", message: err }))
		);
};

export const getTasks = async (req, res) => {
	User.findById(req.username)
		.then((user) => res.send(new response({ data: { tasks: user.tasks } })))
		.catch((err) =>
			res
				.status(400)
				.send(new response({ status: "Error", message: err }))
		);
};

export const addTask = (req, res) => {
	const { title, teacher, points, place, date, description } = req.body;

	User.findById(req.username)
		.then((user) => {
			let index = 0;
			if (user.tasks.length > 0)
				index = user.tasks[user.tasks.length - 1].id + 1;

			user.tasks.push(
				new Task(
					index,
					title,
					teacher,
					points,
					place,
					date,
					description
				)
			);

			user.save()
				.then(() => res.send(new response({})))
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

export const deleteTask = async (req, res) => {
	User.findById(req.username)
		.then((user) => {
			const filteredTasks = user.tasks.filter(
				(val) => val.id !== parseInt(req.params.id)
			);
			if (user.tasks.length === filteredTasks.length)
				return res.send(
					new response({
						status: "Error",
						message:
							"No task with id:" + req.params.id + " was found",
					})
				);
			user.tasks = filteredTasks;

			user.markModified("tasks");
			user.save()
				.then(() =>
					res.send(
						new response({
							message: "Task deleted successfully",
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

export const editTask = async (req, res) => {
	const { title, teacher, points, place, date, description } = req.body;

	let edited = false;
	User.findById(req.username)
		.then((user) => {
			let tasks = user.tasks;
			for (let i = 0; i < tasks.length; i++) {
				if (parseInt(tasks[i].id) === parseInt(req.params.id)) {
					tasks[i].title = title;
					tasks[i].teacher = teacher;
					tasks[i].points = points;
					tasks[i].place = place;
					tasks[i].date = date;
					tasks[i].description = description;
					edited = true;
					break;
				}
			}

			if (!edited)
				return res.send(
					new response({
						status: "Error",
						message:
							"No task with id:" + req.params.id + " was found",
					})
				);

			user.tasks = tasks;
			user.markModified("tasks");
			user.save()
				.then(() =>
					res.send(
						new response({
							message: "Task edited successfully",
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
