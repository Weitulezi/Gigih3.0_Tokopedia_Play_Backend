const VideoModel = require("../models/video")

const createVideoController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const { title, thumbnail, embedId, categories } = req.body

    const video = new VideoModel({
        title,
        thumbnail,
        embedId,
        categories,
        user: loggedInUser._id,
    })

    try {
        const savedVideo = await video.save()
        res.status(201).json({
            video: savedVideo,
            message: "Video is successfully created.",
        })
    } catch (err) {
        const cleanErrorMessage = err.message.split(": ")[2]
        res.status(400).json({
            success: false,
            message: cleanErrorMessage,
        })
    }
}

const getVideoController = async (req, res) => {
    const videoId = req.params.videoId
    try {
        const video = await VideoModel.findById(videoId)
        video !== null
            ? res.status(200).json(video)
            : res
                  .status(404)
                  .json({ success: false, message: "Video doesn't exist" })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Video doesn't exist",
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
