const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createProductController,
    getProductListOfVideoController,
    updateProductController,
    deleteProductController,
} = require("../controllers/product")

// Get Products that belong to a video.
router.get("/products", getProductListOfVideoController)
router.post("/products", validateAuthorization, createProductController)
router.put("/products", validateAuthorization, updateProductController)

router.delete(
    "/products/:productId",
    validateAuthorization,
    deleteProductController,
)

module.exports = router
