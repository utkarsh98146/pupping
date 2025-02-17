import { Booking } from "../model/Booking.js"
import { Pet } from "../model/Pet.js"
import { Service } from "../model/Service.js"
import { Vehicle } from "../model/Vehicle.js"

export const bookAppointment = async (req, res) => {
    try {
        const { userId, pets, vehicleId, bookingDate, bookTimeSlot } = req.body
        let totalServicePrice = 0 // total service price for all pets

        /* Step -1 Getting all services for all pets  */

        // it collects all service Ids for single-sinlge pet into array
        const serviceIds = pets.flatMap(pet => pet.serviceIds) // from req body

        /* Step -2 fetch all service from db using serviceIds */

        //colect all service details according to ids and make an array of service
        const allServices = await Service.find({ _id: { $in: serviceIds } })

        const petDetails = [] // to collect each pets, their selected services, total bill

        for (const pet of pets) {
            const selectedServices = []
            let eachPetSelectedServiceTotal = 0

            for (const serviceId of pet.serviceIds) {
                const service = allServices.find(ser => ser._id.toString() === serviceId) // fetch serviceId from serviceId array
                selectedServices.push({
                    serviceId: service._id,
                    serviceName: service.name,
                    servicePrice: service.price,
                })
                eachPetSelectedServiceTotal += service.price // add each service price to individual pet's total
            }
            totalServicePrice += eachPetSelectedServiceTotal // store the overall total of all pets with their services

            petDetails.push({     // store the details for pet array(petId,serviceId)
                petId: pet.petId,
                selectedServices: selectedServices,
            })

            await Pet.updateOne({ _id: pet.petId }, { $push: { services: selectedServices.map(s => s.serviceId) } }) // store the service Ids in pet db
        }

        /*  Step -3 Getting vehicle details */

        // fetching vehicle details from db through received vehicleId
        const selectedVehicle = await Vehicle.findById(vehicleId)
        if (!selectedVehicle) {
            console.log("Vehicle not selected, or vehicle Id not matched")
            return res.status(400).json({ message: 'Vehicle not selected,Please select vehicle', success: false })
        }
        // else {
        //     console.log(`Vehicle found in db, Here are details ${vehicleId}`)
        //     res.status(200).json({ message: 'Vehicle fetched', data: vehicleId, success: true })
        // }

        // total bill including the service total + vehicle charges
        const totalAmountBill = totalServicePrice + selectedVehicle.price
        console.log(`TotalAmount bill for that user ${totalAmountBill}`)
        // save the booking details into db
        const booking = await Booking.create({
            userId: userId,
            // pets: {
            //     petId: petDetails,
            //     selectedServices: petDetails.selectedServices,
            // },
            pets: petDetails, //new way to store the data
            selectedVehicle: {
                vehicleId: vehicleId,
                vehicleName: selectedVehicle.type,
                vehiclePrice: selectedVehicle.price,
            },
            totalAmount: totalAmountBill,
            appointment: {
                bookingDate: bookingDate,
                bookTimeSlot: bookTimeSlot,
            },
            status: "Pending"
        })
        console.log(`Booking complete`)
        console.log()
        res.status(201).json({ success: true, message: 'Booking successful', data: booking })

    } catch (error) {
        console.log('Some thing wrong while booking', error)
        res.status(500).json({ message: 'Booking failed', error: error.message, success: false })
    }
}
