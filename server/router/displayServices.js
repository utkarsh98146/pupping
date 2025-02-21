import express from 'express'
import { getAllServices } from '../controller/serviceController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'

const router = express.Router()

// to get all services
router.get('/showService', verifyTokenService, getAllServices)

export const serviceRouter = router