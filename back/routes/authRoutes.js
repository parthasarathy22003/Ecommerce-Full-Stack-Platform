import express from 'express';
import { signupUser, loginUser } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;