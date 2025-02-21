import express from 'express'
import { checkUserType, resendOtp, sendOtp, verifyOtp } from '../controller/authController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'

const router = express.Router()

//check-user status if new or existing
router.post('/check-user', checkUserType)

// send otp
router.post('/send-otp', sendOtp)

// resend otp
router.post('/resend-otp', verifyTokenService, resendOtp)

// verify otp
router.post('/verify-otp', verifyOtp)


export const authRouter = router