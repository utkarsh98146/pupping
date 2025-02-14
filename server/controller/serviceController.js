import { Service } from "../model/Service.js"
import { Vehicle } from "../model/Vehicle.js"

// get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
        const vehicles = await Vehicle.find()
        return res.status(200).json({ message: 'Success fetched successfully', success: true, data: { services, vehicles } })
    } catch (error) {
        return res.status(500).json({ message: 'Error while fetching service details', error: error.message, success: false })
    }
}