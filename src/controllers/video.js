const VideoModel = require("../models/video")

const createVideoController = async (req, res) => {
    /*
        IMPORTANT
        Get user id, wheter from body or decoded from jwt token.
        If jwt token use to get user id, consider using middleware,
        or put the logic directly here.
    */

    const { title, videoImage, embedId, userId } = req.body

    const video = new VideoModel({
        title,
        videoImage,
        embedId,
        user: userId,
    })

    try {
        const savedVideo = await video.save()
        res.status(201).json({
            video: savedVideo,
            message: "Video is successfully created.",
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to create a video.",
        })
    }
}

const getVideoController = async (req, res) => {
    const { videoId } = req.params.videoId

    try {
        const video = await VideoModel.findById(videoId)
        res.status(200).json(video)
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve a video.",
        })
    }
}

const getVideoListController = async (req, res) => {
    try {
        const videos = await VideoModel.find()
        res.status(200).json(videos)
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't find any video.",
        })
    }
}

module.exports = {
    createVideoController,
    getVideoController,
    getVideoListController,
}
