export const generateOtp = () => {
    console.log("Otp generating.. ")
    return Math.floor(100000 + Math.random() * 900000).toString()
}

