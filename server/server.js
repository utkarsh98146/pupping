import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/dbConnection.js'
import { petRouter } from './router/petRoutes.js'
import cors from 'cors'
import { authRouter } from './router/authRoutes.js'
import { userProfileRouter } from './router/userRoutes.js'
import { Service } from './model/Service.js'
import { services } from './utils/AddService.js'
import { serviceRouter } from './router/displayServices.js'
import { bookingRouter } from './router/bookingRoutes.js'
import { Vehicle } from './model/Vehicle.js'
import { vehicles } from './utils/AddVehicle.js'


dotenv.config()
// db connection 
dbConnect()

const app = express()

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*
// middleware

// Middleware to handle JSON payloads
app.use(express.json())

// Middleware to handle form-data and x-www-form-urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// for frontend and backend communication(allows 3rd party libraries)
app.use(cors())

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*

// router

app.use("/api/userAuth", authRouter) // router for auth
app.use('/userProfile', userProfileRouter) // user profile routes
app.use('/pets', petRouter) // pet fuctionality routes
app.use("/service", serviceRouter) // services routes
app.use('/booking', bookingRouter) // booking routes



// for enter the service 
Service.findOne().then(document => {
    if (document === null) {
        Service.insertMany(services)
        console.log("all Services added.")
    } else {
        console.log("Data already exits no need to add in service db")
    }
}).catch((err) => {
    console.log("Something gone wrong with add service")
})
// for entering the vehicle
Vehicle.findOne().then(document => {
    if (document === null) {
        Vehicle.insertMany(vehicles)
        console.log("all vehicles added.")
    } else {
        console.log("Data already exits no need to add in vehicle db")
    }
}).catch((err) => {
    console.log("Something gone wrong to add vehilces")
})


console.log("Hi server")
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`)
})
