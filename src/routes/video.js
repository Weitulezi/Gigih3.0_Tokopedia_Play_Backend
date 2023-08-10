const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createVideoController,
    getVideoController,
    getVideoListController,
} = require("../controllers/video")

router.post(`/videos`, createVideoController)
router.get(`/videos`, getVideoListController)
router.get(`/videos/:videoId`, getVideoController)

module.exports = router
