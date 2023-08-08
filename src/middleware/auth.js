const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: 60 * 60,
    })
    return token
}

const verifyToken = (token) => {
    console.log(jwt.verify(token, process.env.PRIVATE_KEY))
}

module.exports = { generateToken, verifyToken }
