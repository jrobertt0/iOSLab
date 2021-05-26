import express from "express";
import * as UploadsController from "../controllers/uploadsController.js";
import { auth } from "../controllers/authController.js";

const router = express.Router();

router
	.route("/")
	.get(UploadsController.collection("item"), UploadsController.ui);

router
	.route("/item")
	.post(
		auth,
		UploadsController.uploadPicture("item").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/items")
	.get(
		UploadsController.collection("item"),
		UploadsController.getFilesJSON
	);

router
	.route("/item/file/:filename")
	.get(
		UploadsController.collection("item"),
		UploadsController.getFile
	);

router
	.route("/item/image/:filename")
	.get(
		UploadsController.collection("item"),
		UploadsController.getImageFile
	);

router
	.route("/item/delete/:id")
	.delete(
		auth,
		UploadsController.collection("item"),
		UploadsController.deleteFile
	);

// avatar

router
	.route("/avatar")
	.post(
		auth,
		UploadsController.uploadPicture("avatar").single("file"),
		UploadsController.uploadFile
	);

router
	.route("/avatars")
	.get(
		UploadsController.collection("avatar"),
		UploadsController.getFilesJSON
	);

router
	.route("/avatar/file/:filename")
	.get(
		UploadsController.collection("avatar"),
		UploadsController.getFile
	);

router
	.route("/avatar/image/:filename")
	.get(
		UploadsController.collection("avatar"),
		UploadsController.getImageFile
	);

router
	.route("/avatar/delete/:id")
	.delete(
		auth,
		UploadsController.collection("avatar"),
		UploadsController.deleteFile
	);

export default router;
