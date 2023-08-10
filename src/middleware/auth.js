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

const validateAuthorization = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1]
        const { tokenValid, data } = verifyToken(token)
        if (tokenValid) {
            // Auth bear exist in header and Valid
            req.tokenValid = tokenValid
            req.loggedInUser = data
            next()
        } else {
            // Auth bear exist in header and but not Valid
            req.tokenValid = tokenValid // false
            req.loggedInUser = data // null
            next()
        }
    } else {
        // No Authorization Bearer in header
        req.tokenValid = false
        req.loggedInUser = null
        next()
    }
}

module.exports = { generateToken, verifyToken, validateAuthorization }
