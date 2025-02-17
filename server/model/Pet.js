import mongoose from "mongoose";

export const petSchema = new mongoose.Schema({
    owner: {  // same just to check the user belongs to which pet
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDB",
        required: true,
    },

    petProfileImage: {
        type: String,
        required: true,
    },
    petName: {
        type: String,
        required: true,
    },
    petCategory: {
        type: String,
        enum: ['Cat', 'Dog'],
        required: true,

    },
    petBreed: {
        type: String,
        required: true,
    },
    birthMonth: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
    },
    birthYear: {
        type: String,
        min: 2000,
        max: new Date().getFullYear()
    },
    petAge: {
        type: String,
    },

    // new added things *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*--*-
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceDB",
        }
    ],
},
    {
        timestamps: true,
    }
    //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*--*-
)

export const Pet = mongoose.model("PetDB", petSchema)