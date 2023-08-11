const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createProductController,
    getProductListOfVideoController,
} = require("../controllers/product")

router.post("/products", validateAuthorization, createProductController)

// Get Products that belong to a video.
router.get("/products", getProductListOfVideoController)

module.exports = router
