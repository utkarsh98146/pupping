import { UserProfile } from "../model/User.js"
import { generateOtp } from "../utils/otpGeneration.js"


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
    let user = await UserProfile.findOne({ phoneNumber })

    if (!user || !user.otp === otp) {
        return res.status(404).json({ message: 'Invalid or expired otp. Please request a new OTP.' })
    }

    // if (user.otp === otp && new Date() < user.otpExpires) {
    if (user.otp === otp) {
        user.isVerified = true
        user.otp = null
        // user.otpExpires = null
        await user.save()
        return user
        // res.status(200).json({ message: 'Otp Verified Succefully..', user })
    }


}

// resend otp service
export const resendOtpService = async (phoneNumber) => {
    return sendOtpService(phoneNumber)
}