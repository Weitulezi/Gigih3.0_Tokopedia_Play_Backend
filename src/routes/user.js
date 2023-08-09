const express = require("express")
const router = express.Router()

const {
    createUserController,
    loginUserController,
    verifyTokenController,
} = require("../controllers/User")

router.post("/users", createUserController)
router.post("/users/login", loginUserController)
router.post("/users/verifytoken", verifyTokenController)

module.exports = router
