const express = require("express")
const router = express.Router()

const {
    createVideoController,
    getVideoController,
} = require("../controllers/video")

router.post(`/videos`, createVideoController)
router.get(`/videos/:videoId`, getVideoController)
