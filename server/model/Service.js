import mongoose from "mongoose";

export const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    icon: {
        type: String,
        // required: true,
    }
},
    {
        timestamps: true,
    }
)

export const Service = mongoose.model("ServiceDB", serviceSchema)