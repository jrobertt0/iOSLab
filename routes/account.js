import express from 'express';
import * as AccountController from '../controllers/accountController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/user').post(auth, AccountController.getUser);

router.route('/user/edit').post(auth, AccountController.editUser);

export default router;