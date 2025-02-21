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
    res.status(200).json({ message: 'Profile accessed successfully..', user: req.user })
})
/* JWT Token
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
*/
// OR II APproach

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (!bearerHeader) {
        return res.status(401).json({ message: 'Unauthorized', success: false })
    }

    const token = bearerHeader.split(' ')[1]

    jwt.verify(token, SECRETKEY, (err, auth) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        req.user = auth
        next()
    })


    // }
}
/*function verifyToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1]
    console.log(`Token:${token}`)
 
    if (!token) {
        return res.status(403).json({ message: 'Token is required' })
    }
    jwt.verify(token, SECRETKEY, (err, authData) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        req.user = authData
        next()
    })
}*/

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

app.listen(5000, (req, res) => {
    console.log(`Server start..`)
})