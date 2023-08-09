const VideoModel = require("../models/video")

const createVideoController = async (req, res) => {
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
        res.status(400).json({ message: "Bad Requeest" })
    }
}

const getVideoController = (req, res) => {
    const { videoId } = req.params.videoId

    try {
        const video = VideoModel.findById(videoId)
        res.status(200).json(video)
    } catch (err) {
        res.status(400).json({})
    }
}

module.exports = { createVideoController, getVideoController }
