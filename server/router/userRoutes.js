import express from 'express'
import { uploadImage } from '../middleware/imageStoringProcess.js'
import { registration } from '../controller/userController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'


const router = express.Router()

//user registeration after otp
router.post('/registration', verifyTokenService, uploadImage('userProfileImage'), registration)


export const userProfileRouter = router