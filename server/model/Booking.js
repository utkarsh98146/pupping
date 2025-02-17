import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDB",
        required: true,
    },
    pets: [
        {
            petId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PetDB",
                required: true,
            },
            selectedServices: [{
                serviceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ServiceDB",
                    required: true,
                },
                serviceName: {
                    type: String,
                    required: true,
                },
                servicePrice: {
                    type: Number,
                    required: true,
                    min: 0,
                },

            }],
        }
    ],
    selectedVehicle: {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VehicleDB",
            required: true,
        },
        vehicleName: {
            type: String,
            required: true,
        },
        vehiclePrice: {
            type: Number,
            required: true,
            min: 0,
        },

    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    appointment: {
        bookingDate: {
            type: String,
            default: Date.now
        },
        bookTimeSlot: {
            // timeRanges: String, 
            type: String,
            required: true,
        },

    },

    // new things added on 12-02
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        default: "Pending",
    },
},
    {
        timestamps: true,
    }
)

export const Booking = mongoose.model("BookingDB", bookingSchema)