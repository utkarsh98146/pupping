import express from 'express'
import { UserProfile } from '../model/User.js'

const router = express.Router()

// user registration after otp
export const registration = async (req, res) => {
    console.log("User Registration form open")
    try {
        const { phoneNumber, name, gender, dateOfBirth, email, country, state, city, pincode, address, alternativeAddress, alternativePhoneNumber } = req.body

        const userProfileImage = req.file ? `/uploads/${req.file.filename}` : req.body.userProfileImage || null

        if (!phoneNumber || !dateOfBirth || !name || !gender || !country || !state || !city || !pincode || !address) {
            return res.status(400).json({ message: 'Enter all compulsory fields', success: false })
        }
        let user = await UserProfile.findOne({ phoneNumber })
        console.log(user ? `User found by this phone number: ${user}` : "User not found by this phone number");

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false })
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify user before registration', success: false })
        }
        user.name = name
        user.gender = gender
        user.dateOfBirth = dateOfBirth
        user.email = email
        user.country = country
        user.state = state
        user.city = city
        user.pincode = pincode
        user.address = address
        user.alternativeAddress = alternativeAddress
        user.alternativePhoneNumber = alternativePhoneNumber
        user.userProfileImage = userProfileImage
        user.isNewUser = false
        await user.save()

        console.log("User registered successfully..'")
        res.status(201).json({ message: 'User registered successfully..', user, success: true })

    } catch (error) {
        console.log('Error to save user form detail')
        registration.status(500).json({ message: 'user registration fails to save data ', error: error.message, success: false })
    }
}
