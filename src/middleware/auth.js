const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: 60 * 60,
    })
    return token
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.PRIVATE_KEY)
        if (data) {
            return { tokenValid: true, data }
        }
    } catch (err) {
        return { tokenValid: false, data: err }
    }
    return { tokenValid: false, data: null }
}

module.exports = { generateToken, verifyToken }
