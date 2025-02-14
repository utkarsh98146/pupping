import mongoose from "mongoose";


export const UserSchema = new mongoose.Schema({
    // user details (first all false before otp verification)
    userProfileImage: {
        type: String,
        required: false,
    },
    gender: {

        type: String,
        // enum: ['Male', 'Female', 'Other'],
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    email: {
        type: String,
        required: false,
        match: /.+\@.+\..+/,
    },
    name: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    alternativeAddress: {
        type: String,
        required: false,
    },
    alternativePhoneNumber: {
        type: String,
        required: false,
        match: /^\+?[0-9]\d{1,14}$/,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?[0-9]\d{1,14}$/,
    },
    otp: {
        type: String,
        required: false,
    },
    // otpExpires:{
    //     type:Date,
    //     default:false
    // },

    isNewUser: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // false if not verified
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PetDB',
    }],
},
    {
        timestamps: true,
    }
)

export const UserProfile = mongoose.model("UserDB", UserSchema)