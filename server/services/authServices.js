import { UserProfile } from "../model/User.js"
import { generateOtp } from "../utils/otpGeneration.js"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


//send otp service
export const sendOtpService = async (phoneNumber) => {
    console.log("send otp method invoke")

    const otp = generateOtp()

    // const otpExpires = new Date(Date.now() + 60000)

    let user = await UserProfile.findOne({ phoneNumber })

    if (!user) {
        // user = new UserProfile({ phoneNumber, otp, otpExpires, isVerified: false })
        user = new UserProfile({ phoneNumber, otp, isVerified: false })
    } else {
        user.otp = otp
        // user.otpExpires = otpExpires
    }

    await user.save({ validateBeforeSave: false })

    // await client.messages.create({
    //     body:`You otp sended :${otp}`,
    //     from : twilioPhoneNumber,
    //     to:phoneNumber
    // })

    // console.log("Ready to send otp before ending method ")

    return { otp }

}

// verify otp service
export const verifyOtpService = async (phoneNumber, otp) => {

    try {
        let user = await UserProfile.findOne({ phoneNumber })
        console.log(user ? `User found` : `User not found`);

        if (!user) {
            return { success: false, message: 'User not Found' }
        }
        if (!user.otp || user.otp.toString() !== otp.toString()) {
            return { success: false, message: 'Invalid or expired OTP. Please request a new OTP.' };
        }

        // if (user.otp === otp) {
        user.isVerified = true
        user.otp = null  // otp clear after verification
        await user.save()
        console.log(user.save ? `Data saved` : `Data not saved`)

        // Generate JWT Token
        const token = jwt.sign(
            {
                userId: user._id,
                phoneNumber: user.phoneNumber
            },
            process.env.SECRET_KEY,
            { expiresIn: '2h' } // Token expires in 2h
        )

        console.log(`Otp Verified and TOken generated successfully.. `);
        console.log(`TOKEN ${token}`);
        // return { user, token }
        return { success: true, message: 'Otp Verified Succefully..', user, token, isVerified: user.isVerified }

        // }
    } catch (err) {
        console.log('Error while verifying otp', err.message)
        return { success: false, message: 'Internal server error', error: err.message }
    }

}

// resend otp service
export const resendOtpService = async (phoneNumber) => {
    return sendOtpService(phoneNumber)
}