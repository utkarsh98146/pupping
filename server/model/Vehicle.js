import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Bike Service", "Van Service"],
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    icon: {
        type: String,

    },
},
    {
        timestamps: true,
    }
)

export const Vehicle = mongoose.model("VehicleDB", VehicleSchema)