// import { client, twilioPhoneNumber } from "../credentials/sms-credential.js"
import { UserProfile } from "../model/User.js"
import { resendOtpService, sendOtpService, verifyOtpService } from "../services/authServices.js"

// check user type
export const checkUserType = async (req, res) => {
    const { phoneNumber } = req.body
    console.log(`Phone no get from frontend ${phoneNumber}`)
    if (!phoneNumber) {
        console.log("Number not entered")
        return res.status(400).json({ message: 'Please enter the phone number', success: false })
    }
    try {
        const user = await UserProfile.findOne({ phoneNumber })

        if (!user || user.isNewUser) {
            console.log("New Number found")
            return res.status(200).json({ message: 'New User. Proceed to registration form', isNewUser: true, success: true, })
        }
        else {
            console.log("Existing Number found")
            return res.status(200).json({ message: 'User already exits. Proceed to login', isNewUser: false, success: true, })
        }

    } catch (error) {
        res.status(500).json({ message: "Error while checking user status type", error: error.message, success: false })
    }
}

// check user type
// export const checkUserType = async (req, res) => {
//     const { phoneNumber } = req.body;
//     console.log(phoneNumber);

//     if (!phoneNumber) {
//         console.log("Number not entered");
//         return res.status(400).json({ message: 'Please enter the phone number', success: false });
//     }

//     try {
//         const user = await UserProfile.findOne({ phoneNumber });

//         if (user) {
//             console.log("Existing Number found");
//             res.status(200).json({
//                 message: 'User already exists. Proceed to login',
//                 isNewUser: user.isNewUser,  // Use the actual value from the database
//                 success: true
//             });
//         } else {
//             console.log("New Number found");
//             res.status(200).json({
//                 message: 'New User. Proceed to registration form',
//                 isNewUser: true,
//                 success: true
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error while checking user status type", error: error.message, success: false });
//     }
// };

// send otp
export const sendOtp = async (req, res) => {
    console.log("Hi send otp")
    const { phoneNumber } = req.body
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Please enter phone number, it required', success: false })
    }
    try {
        const { otp } = await sendOtpService(phoneNumber)
        console.log("send otp method call")
        res.status(200).json({ message: 'Otp sent successfully...', data: otp, success: true })
        console.log(`Otp sent successfully on frontend, OTP is ${otp}`)
    } catch (error) {
        res.status(500).json({ message: 'Sending otp failed', error: error.message, success: false })
        console.log(`Failed to send Otp on frontend!`)
    }

}

// verify otp
export const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body

    if (!otp || !phoneNumber) {
        return res.status(400).json({ message: 'Phone number and OTP are required', success: false })
    }
    try {

        const user = await verifyOtpService(phoneNumber, otp)
        const response = user

        console.log(`Response from the service() ${response}`)
        console.log(`Response from the service() ${user.data}`)
        if (user.isVerified) {
            res.status(200).json({ message: 'OTP succcessfully verified...', data: user, success: true, token: user.token })
            console.log("OTP succcessfully verified...")

            // 12-02 changes
            console.log(user.isNewUser ? `New User directed to Registration page` : `user alaready present direct to dashboard`)
        }
        else {
            res.status(400).json({ message: 'Invalid or expired otp. Please request a new OTP.', success: false })
        }

        // let response = await verifyOtpService(phoneNumber, otp)
        // if (response.success) {
        //     res.status(200).json({
        //         message: 'Otp successfully verified',
        //         data: response.user,
        //         token: response.token,
        //         success: true,
        //     })
        //     console.log("OTP succcessfully verified...")
        //     console.log(response.user.isNewUser ? `New User directed to Registration page` : `user alaready present direct to dashboard`)
        // } else {
        //     res.status(400).json({ message: `Invalid or expired otp. Please request a new OTP.${response.message}`, success: false, data: response })
        // }

    } catch (error) {
        res.status(500).json({ message: 'Otp verification failed', error: error.message, success: false })

    }
}

// resend otp
export const resendOtp = async (req, res) => {
    const { phoneNumber } = req.body

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is not entered, Please enter it' })
    }
    try {
        const { otp } = await resendOtpService(phoneNumber)
        res.status(200).json({ message: 'Otp send successfully..', otp })
        console.log(`Otp resend successfully on frontend, OTP is ${otp}`)
    } catch (error) {
        // console.error("Twilio Error:", error);
        res.status(500).json({ message: "Resending OTP failed.", error: error.message });
    }
}


// login with Otp after registration
// export const loginWithOtp = async (req, res) => {
//     const { phoneNumber } = req.body

//     if (!phoneNumber) {
//         return res.status(400).json({ message: 'Phone number required' })
//     }
//     let user = await UserProfile.findOne({ phoneNumber })
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' })
//     }
//     if (!user.isVerified) {
//         return res.status(403).json({ message: 'Unauthorized user, Please verify your phone number' })
//     }
//     res.status(200).json({ message: 'Login successfully..', user })
// }