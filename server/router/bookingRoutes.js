import express from 'express'
import { bookAppointment } from '../controller/bookingController.js'

const router = express.Router()

router.post('/bookAppointment', bookAppointment)

export const bookingRouter = router