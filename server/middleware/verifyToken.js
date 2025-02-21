import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (!bearerHeader) {
        return res.status(400).json({ message: 'Token not received', success: false })
    }

    const token = bearerHeader.split(' ')[1]

    console.log(`Token received:${token}`)

    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token', success: false })
        }
        req.user = authData
        next()
    })
}
export const verifyTokenService = verifyToken