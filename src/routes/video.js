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

const { getProductListOfVideoController } = require("../controllers/product")

const { getCommentListOfVideoController } = require("../controllers/comment")

router.post(`/videos`, validateAuthorization, createVideoController)
router.get(`/videos`, getVideoListController)
router.get(`/videos/:videoId`, getVideoController)
router.delete(`/videos/:videoId`, validateAuthorization, deleteVideoController)
router.put(`/videos/:videoId`, validateAuthorization, updateVideoController)

// Video and Product related Endpoint
router.get(`/videos/:videoId/products`, getProductListOfVideoController)
router.get(`/videos/:videoId/comments`, getCommentListOfVideoController)

module.exports = router
