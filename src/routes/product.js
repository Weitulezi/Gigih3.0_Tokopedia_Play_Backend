const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createProductController,
    updateProductController,
    deleteProductController,
} = require("../controllers/product")

// Get Products that belong to a video.
router.post("/products", validateAuthorization, createProductController)
router.put(
    "/products/:productId",
    validateAuthorization,
    updateProductController,
)

router.delete(
    "/products/:productId",
    validateAuthorization,
    deleteProductController,
)

module.exports = router
