const bcrypt = require("bcryptjs")

const validateEmail = (email) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
    return regex.test(email)
}

const hashPassword = (textPassword) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(textPassword, salt)

    return hash
}

module.exports = { validateEmail, hashPassword }
