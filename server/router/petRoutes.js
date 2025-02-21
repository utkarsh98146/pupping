import express from 'express'
import { addPetController, petBreedByCategory, petCategory } from '../controller/petController.js'
import { uploadImage } from '../middleware/imageStoringProcess.js'
import { verifyTokenService } from '../middleware/verifyToken.js'

const router = express.Router()
// add pet
router.post('/addPet/:userId', verifyTokenService, uploadImage('petProfileImage'), addPetController)

// get pet category
router.get("/categories", verifyTokenService, petCategory)

// get breed according to pet category
router.get('/categories/breed/:category', verifyTokenService, petBreedByCategory)
export const petRouter = router
