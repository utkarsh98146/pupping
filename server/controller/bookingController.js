import { Booking } from "../model/Booking.js"
import { Service } from "../model/Service.js"
import { Vehicle } from "../model/Vehicle.js"

export const bookAppointment = async (req, res) => {
    try {
        const { userId, pets, vehicleId, bookingDate, bookTimeSlot } = req.body
        let totalServicePrice = 0

        /* Step -1 Getting all services for all pets  */
        // it collects all service Ids for single-sinlge pet into array
        const serviceIds = pets.flatMap(pet => pet.serviceIds)

        //colect all service details according to ids and make an array of service
        const allServices = await Service.find({ _id: { $in: serviceIds } })

        /* Step -2 Service details and total for pets */

        // fetching the all details of the pets 
        const petDetails = pets.map(pet => {
            //acc to pet service seleted and fetch through service ids
            const selectedServices = pet.serviceIds.map(serviceId => {
                // from all services extract each service details
                const service = allServices.find(ser => ser._id.toString() === serviceId)
                return {
                    serviceId: service._id,
                    serviceName: service.name,
                    servicePrice: service.price,
                }
            })
            // adding the total only acc to service added for one pet
            totalServicePrice += selectedServices.reduce((sum, price) => sum + price.servicePrice, 0)
            return {
                petId: pet.petId,
                services: selectedServices,
            }
        })

        /*  Step -3 Getting vehicle details */

        // fetching vehicle details from db through received vehicleId
        const selectedVehicle = await Vehicle.findById(vehicleId)
        if (!selectedVehicle) {
            console.log("Vehicle not selected, or vehicle Id not matched")
            return res.status(400).json({ message: 'Vehicle not selected,Please select vehicle', success: false })
        }
        // else {
        //     console.log(`Vehicle found in db, Here are details ${vehicleId}`)
        //     res.status(200).json({ message: 'Vehicle fetched', data: vehicleId })
        // }

        // total bill including the service total + vehicle charges
        const totalAmountBill = totalServicePrice + selectedVehicle.price

        // save the booking details into db
        const book = await Booking.create({
            userId: userId,
            pets: {
                petId: petDetails,
                selectedServices: petDetails.selectedServices,
            },
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
        res.status(201).json({ success: true, message: 'Booking successful', data: book, success: true })

    } catch (error) {
        console.log('Some thing wrong while booking', error)
        res.status(500).json({ message: 'Booking failed', error: error.message, success: false })
    }
}
