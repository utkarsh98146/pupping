import express from 'express'
import { addPetController, petBreedByCategory, petCategory } from '../controller/petController.js'
import { uploadImage } from '../middleware/imageStoringProcess.js'

const router = express.Router()
// add pet
router.post('/addPet/:userId', uploadImage('petProfileImage'), addPetController)

// get pet category
router.get("/categories", petCategory)

// get breed according to pet category
router.get('/categories/breed/:category', petBreedByCategory)
export const petRouter = router
