import express from 'express';
import * as AuthController from '../controllers/authController.js';

const router = express.Router();

router.route('/auth').post(AuthController.auth);

router.route('/addTask/:userid').post(AuthController.addTask);
router.route('/editTask/:userid').post(AuthController.editTask);
router.route('/deleteTask/:userid').post(AuthController.deleteTask);
router.route('/getTasks/:userid').get(AuthController.getTasks);
router.route("/getTask/:userid").get(AuthController.getTask);
router.route("/test").get(AuthController.test);

export default router;