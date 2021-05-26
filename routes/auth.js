import express from 'express';
import * as AuthController from '../controllers/authController.js';

const router = express.Router();

router.route('/register').post(AuthController.register);

router.route('/login').post(AuthController.login);

export default router;