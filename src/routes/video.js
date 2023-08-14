const express = require("express")
const router = express.Router()
const { validateAuthorization } = require("../middleware/auth")

const {
    createVideoController,
    getVideoController,
    getVideoListController,
    deleteVideoController,
    updateVideoController,
} = require("../controllers/video")

router.post(`/videos`, validateAuthorization, createVideoController)
router.get(`/videos`, getVideoListController)
router.get(`/videos/:videoId`, getVideoController)
router.delete(`/videos/:videoId`, validateAuthorization, deleteVideoController)
router.put(`/videos/:videoId`, validateAuthorization, updateVideoController)

module.exports = router
