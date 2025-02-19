import express from 'express'
import jwt from 'jsonwebtoken'

const SECRETKEY = "imtonystark"
const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'sample api'
    })
})

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'utkarsh',
        email: 'ut@gmail.com',
    }
    jwt.sign({ user }, SECRETKEY, { expiresIn: '1hr' }, (err, token) => {
        res.json({ token })
    })
})

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, SECRETKEY, (err, authData) => {
        if (err) {
            res.send({ result: 'Invalid token' })
        }
        else {
            res.json({ message: 'Profile accessed', data: authData })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    }
    else {
        res.send({
            result: 'Token is Invalid'
        })
    }
}
app.listen(5000, (req, res) => {
    console.log(`Server start..`)
})