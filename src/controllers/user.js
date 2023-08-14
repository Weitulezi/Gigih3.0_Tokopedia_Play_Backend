const UserModel = require("../models/User")
const VideoModel = require("../models/video")
const ProductModel = require("../models/product")
const { hashPassword } = require("../utils/form")
const { generateToken, verifyToken } = require("../middleware/auth")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const createUserController = async (req, res) => {
    const { username, email, password } = req.body

    // Validate username is alphanumeric
    const isUsernameAlphanumeric = validator.isAlphanumeric(username)
    if (!isUsernameAlphanumeric) {
        return res.status(400).json({
            message: "Username must contain only numbers and letters.",
        })
    }

    // Validate email format
    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        return res.status(400).json({ message: "Email is not valid." })
    }

    // Validate password is alphanumeric
    const isPasswordAlphanumeric = validator.isAlphanumeric(password)
    if (!isPasswordAlphanumeric) {
        return res.status(400).json({
            message: "Password must contain only numbers and letters.",
        })
    }

    const isPasswordLengthValid = validator.isLength(password, {
        min: 6,
        max: 256,
    })
    if (!isPasswordLengthValid) {
        return res.status(400).json({
            message:
                "Password must contain more than 6 characters and less than 256 characters",
        })
    }

    const hashedPassword = hashPassword(password)

    const user = new UserModel({
        username,
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
        let cleanErrorMessage = err.message.split(": ")[2]
        if (cleanErrorMessage === "username_1 dup key") {
            cleanErrorMessage = "Username already exist"
        }
        res.status(400).json({
            message: cleanErrorMessage,
        })
    }
}

const updateUserController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const { username, email, password } = req.body

    // Validate username is alphanumeric
    const isUsernameAlphanumeric = validator.isAlphanumeric(username)
    if (!isUsernameAlphanumeric) {
        return res.status(400).json({
            message: "Username must contain only numbers and letters.",
        })
    }

    // Validate email format
    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        return res.status(400).json({ message: "Email is not valid." })
    }

    // Validate password is alphanumeric
    const isPasswordAlphanumeric = validator.isAlphanumeric(password)
    if (!isPasswordAlphanumeric) {
        return res.status(400).json({
            message: "Password must contain only numbers and letters.",
        })
    }

    const isPasswordLengthValid = validator.isLength(password, {
        min: 6,
        max: 256,
    })
    if (!isPasswordLengthValid) {
        return res.status(400).json({
            message:
                "Password must contain more than 6 characters and less than 256 characters",
        })
    }

    const hashedPassword = hashPassword(password)

    try {
        const user = await UserModel.findByIdAndUpdate(
            loggedInUser._id,
            {
                username,
                email,
                password: hashedPassword,
            },
            { runValidators: true },
        )
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        console.log(err.message)
        const duplicateUsername = /username_1 dup key/

        let cleanErrorMessage = err.message.split(": ")[2]
        if (cleanErrorMessage === "username_1 dup key") {
            cleanErrorMessage = "Username already exist"
        }
        res.status(400).json({
            message: cleanErrorMessage,
        })
    }
}

const loginUserController = async (req, res) => {
    const { username, password } = req.body

    // Validate username is alphanumeric
    const isUsernameAlphanumeric = validator.isAlphanumeric(username)
    if (!isUsernameAlphanumeric) {
        return res.status(400).json({
            message: "Username must contain only numbers and letters.",
        })
    }

    // Validate password is alphanumeric
    const isPasswordAlphanumeric = validator.isAlphanumeric(password)
    if (!isPasswordAlphanumeric) {
        return res.status(400).json({
            message: "Password must contain only numbers and letters.",
        })
    }

    const isPasswordLengthValid = validator.isLength(password, {
        min: 6,
        max: 256,
    })
    if (!isPasswordLengthValid) {
        return res.status(400).json({
            message:
                "Password must contain more than 6 characters and less than 256 characters",
        })
    }

    const user = await UserModel.findOne({ username: username })

    if (user === null) {
        return res
            .status(400)
            .json({ message: "Please input a correct email and password" })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Please input a correct email and password" })
    }

    const token = generateToken({
        _id: String(user._id),
        username: user.username,
        email: user.email,
    })
    res.status(200).json({
        user: {
            _id: String(user._id),
            username: user.username,
            email: user.email,
        },
        token,
    })
}

const getUserVideosController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    try {
        const videos = await VideoModel.find({ user: loggedInUser._id })
        res.status(200).json(videos)
    } catch (err) {
        console.log(err.message)
        res.status(404).json({
            message: "Failed to retrieved videos.",
        })
    }
}

const getUserProductsController = async (req, res) => {
    const loggedInUser = req.loggedInUser

    try {
        const userProducts = await ProductModel.find({ user: loggedInUser._id })
        res.status(200).json(userProducts)
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ message: "Can't find products" })
    }
}

// For testing
const verifyTokenController = async (req, res) => {
    console.log(req.headers)
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1]
        const { tokenValid, data } = verifyToken(token)
        if (tokenValid) {
            return res.status(200).json(data)
        }
    }
    return res.status(401).json({ message: "Token is not valid." })
}

module.exports = {
    createUserController,
    updateUserController,
    loginUserController,
    verifyTokenController,
    getUserVideosController,
    getUserProductsController,
}
