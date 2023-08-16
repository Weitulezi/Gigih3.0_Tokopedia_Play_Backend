const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createCommentController,
    getCommentListOfVideoController,
} = require("../controllers/comment")

router.post("/comments", validateAuthorization, createCommentController)

module.exports = router
