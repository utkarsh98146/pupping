import express from 'express'
import { checkUserType, resendOtp, sendOtp, verifyOtp } from '../controller/authController.js'

const router = express.Router()

//check-user status if new or existing
router.post('/check-user', checkUserType)

// send otp
router.post('/send-otp', sendOtp)

// resend otp
router.post('/resend-otp', resendOtp)

// verify otp
router.post('/verify-otp', verifyOtp)

// //user registeration after otp
// router.post('/registration', uploadImage('userProfileImage'), registration)

// // // login after registration
// // router.post('/login/send)

export const authRouter = router