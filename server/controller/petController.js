
import { Pet } from "../model/Pet.js"
import { UserProfile } from "../model/User.js"
import { petBreeds } from "../utils/BreedsData.js"


// add pet
export const addPetController = async (req, res) => {
    console.log(`pet add controller hit`)
    try {
        const { petName, petCategory, petBreed, birthMonth, birthYear, petAge } = req.body

        const petProfileImage = req.file ? `/uploads/${req.file.filename}` : req.body.petProfileImage || null
        if (!petProfileImage) {
            console.log("Image not uploaded")
        }

        if (!petProfileImage || !petName || !petCategory || !petBreed || !birthMonth || !birthYear || !petAge) {
            return res.status(400).json({ message: 'All fields are compulsory, Plese fill required fields', success: false })

        }

        const { userId } = req.params
        console.log(userId)
        // userId = '67addf6861e1988112e3074c' //for testing purpose 
        console.log((userId) ? `User id received through frontend ${userId}` : `User id not getting from params`)

        const user = await UserProfile.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found in db', success: false })
        }
        // created the pet data
        console.log(`petCategory`, petCategory)

        const pet = await Pet.create({
            owner: userId,
            petProfileImage: petProfileImage,
            petName: petName,
            petCategory: petCategory,
            petBreed: petBreed,
            birthMonth: birthMonth,
            birthYear: birthYear,
            petAge: petAge,
        })
        // if pets Id store in User Scehma   {13-02 changes}
        console.log(pet)
        await UserProfile.updateOne(
            { _id: user.id },  // Find the user by ID
            { $push: { pets: pet._id } } // Push pet ID into the pets array
        );

        user.pets.push(pet._id)  // extra linking (optional)
        console.log(user.pets.push(pet._id));

        await pet.save()
        res.status(201).json({ message: 'Pet added successfully in db', pet, success: true })
        console.log("pet information stored in db")
    } catch (error) {
        console.log("Error in saving the add pet data.")
        res.status(500).json({ message: 'Error to add pet', error: error.message, success: false })
    }
}

// pet category
export const petCategory = async (req, res) => {
    const categories = Object.keys(petBreeds)
    await res.status(200).json({ data: categories, success: true, message: 'Categories fetched successfully..' })
}

// breed according to category
export const petBreedByCategory = async (req, res) => {
    const category = await req.params.category

    if (petBreeds[category]) {
        return res.json({ data: petBreeds[category], success: true, message: 'Breed fetched..' })
    }
    else {
        return res.json(404).json({ message: 'Breed not found for this category ', success: false })
    }
}