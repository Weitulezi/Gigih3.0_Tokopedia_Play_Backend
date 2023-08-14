const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createCommentController,
    getCommentListOfVideoController,
} = require("../controllers/comment")

router.post("/comments", validateAuthorization, createCommentController)
// Get comment list that belong to a video based on the video id
router.get("/comments", getCommentListOfVideoController)

module.exports = router
