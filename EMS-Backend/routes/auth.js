import express from 'express';
import { login, resendOtp, resetPassword, sendOtp, verifyEmail, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login)
router.post('/verify-email', verifyEmail)
router.post('/send-otp', sendOtp)
router.post('/resend-otp', resendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)

export default router;