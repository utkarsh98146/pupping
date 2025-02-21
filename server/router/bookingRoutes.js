import express from 'express'
import { bookAppointment } from '../controller/bookingController.js'
import { verifyTokenService } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/bookAppointment', verifyTokenService, bookAppointment)

export const bookingRouter = router;