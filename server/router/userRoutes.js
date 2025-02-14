import express from 'express'
import { uploadImage } from '../middleware/imageStoringProcess.js'
import { registration } from '../controller/userController.js'


const router = express.Router()

// // get user profile
// router.get('/profile', authenticateUser, getUserDet)

//user registeration after otp
router.post('/registration', uploadImage('userProfileImage'), registration)


export const userProfileRouter = router