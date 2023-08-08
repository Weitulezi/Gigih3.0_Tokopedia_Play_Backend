const express = require("express")
const router = express.Router()

const {
    createUserController,
    loginUserController,
} = require("../controllers/User")

router.post("/users", createUserController)
router.post("/users/login", loginUserController)

module.exports = router
