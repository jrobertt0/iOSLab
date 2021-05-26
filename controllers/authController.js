import User from "../models/user.model.js";
import Task from "../models/task.model.js";

export const test = async (req, res) => {
	res.send("funciona");
};

export const auth = async (req, res) => {
	let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

	const existingUser = await User.findOne({ ip: ip });
	if (existingUser !== null) return res.send({ id: existingUser._id });

	const newUser = new User();
	newUser.ip = ip;

	newUser
		.save()
		.then((savedUser) => {
			res.send({ id: savedUser._id });
		})
		.catch((err) => res.send({ err }));
};

export const getTask = async (req, res) => {
	console.log("aqui");
	User.findById(req.params.userid)
		.then((user) =>
			res.json({
				task: user.tasks.filter(
					(task) => (task.id = req.params.taskid)
				),
			})
		)
		.catch((err) => res.status(400).json("Error: " + err));
};

export const getTasks = async (req, res) => {
	User.findById(req.params.userid)
		.then((user) => res.send({ tasks: user.tasks }))
		.catch((err) => res.status(400).json("Error: " + err));
};

export const addTask = (req, res) => {
	const { name, description } = req.body;

	User.findById(req.params.userid)
		.then((user) => {
			let index = 0;
			if (user.tasks.length > 0)
				index = user.tasks[user.tasks.length - 1].id + 1;

			user.tasks.push(new Task(index, name, description));

			user.save()
				.then(() => res.json("status: success"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
};

export const deleteTask = async (req, res) => {
	const { taskid } = req.body;

	User.findById(req.params.userid)
		.then((user) => {
			user.tasks = user.tasks.filter((val) => val.id !== taskid);

			user.save()
				.then(() => res.json("status: success"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
};

export const editTask = async (req, res) => {
	const { taskid, name, description } = req.body;

	User.findById(req.params.userid)
		.then((user) => {
			let tasks = user.tasks;
			for (let i = 0; i < tasks.length; i++) {
				if (parseInt(tasks[i].id) === parseInt(taskid)) {
					tasks[i].name = name;
					tasks[i].description = description;
				}
			}
			user.tasks = tasks;
			user.markModified("tasks");
			user.save()
				.then(() => res.json("status: success"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
};
