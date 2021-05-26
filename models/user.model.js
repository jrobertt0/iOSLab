import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 25,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 255,
		},
		school: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 255,
		},
		score: {
			type: Number,
			required: true,
			trim: true,
		},
		tasks: {
			type: Array,
			required: false,
			default: [],
		},
		date: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.encryptPassword = async (password) => {
	return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
