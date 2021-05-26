import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		ip: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			unique: true,
			min: 4,
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

const User = mongoose.model("User", userSchema);

export default User;
