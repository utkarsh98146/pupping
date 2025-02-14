import express from 'express'
import { getAllServices } from '../controller/serviceController.js'

const router = express.Router()

// to get all services
router.get('/showService', getAllServices)

export const serviceRouter = router