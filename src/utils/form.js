const bcrypt = require("bcryptjs")

const hashPassword = (textPassword) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(textPassword, salt)

    return hash
}

module.exports = { hashPassword }
