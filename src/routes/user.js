const express = require("express")
const router = express.Router()

const {
    createUserController,
    loginUserController,
    verifyTokenController,
    updateUserController,
    getUserVideosController,
    getUserProductsController,
} = require("../controllers/user")
const { validateAuthorization } = require("../middleware/auth")

router.post("/users", createUserController)
router.put("/users/:userId", validateAuthorization, updateUserController)
router.post("/users/login", loginUserController)

// Routes related to product
router.get("/users/videos", validateAuthorization, getUserVideosController)
router.get("/users/products", validateAuthorization, getUserProductsController)

// For testing token (might delete it later)
router.post("/users/verifytoken", verifyTokenController)

module.exports = router
