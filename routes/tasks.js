import express from 'express';
import * as TaskController from '../controllers/taskController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/task/:id').get(auth, TaskController.getTask)

router.route('/all').get(auth, TaskController.getTasks)

router.route('/add').post(auth, TaskController.addTask);

router.route('/edit/:id').post(auth, TaskController.editTask)

router.route('/delete/:id').delete(auth, TaskController.deleteTask);

export default router;