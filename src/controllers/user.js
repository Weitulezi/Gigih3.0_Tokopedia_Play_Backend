const UserModel = require("../models/User")
const { hashPassword, validateEmail } = require("../utils/form")
const { generateToken, verifyToken } = require("../middleware/auth")
const bcrypt = require("bcryptjs")

const createUserController = async (req, res) => {
    const { email, password } = req.body

    // Making sure password is not empty
    if (password === "") {
        return res.status(400).json({ message: "Password can't be empty" })
    }

    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
        return res.status(400).json({ message: "Email is not valid." })
    }

    const hashedPassword = hashPassword(password)

    const user = new UserModel({
        email,
        imageProfile: "",
        password: hashedPassword,
    })

    try {
        await user.save()
        res.status(201).json({
            message: "User is successfully created.",
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Unable to create a sure, try again later.",
        })
    }
}

const loginUserController = async (req, res) => {
    const { email, password } = req.body

    // Validate email text
    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
        return res.status(400).json({ message: "Email is not valid." })
    }

    const user = await UserModel.findOne({ email: email })

    if (user === null) {
        return res.status(400).json({ message: "User doesn't exits." })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Please input a correct email and password" })
    }

    const token = generateToken({ id: String(user._id), emai: user.email })
    res.status(200).json({ user: { email: user.email }, token })
}

module.exports = { createUserController, loginUserController }
