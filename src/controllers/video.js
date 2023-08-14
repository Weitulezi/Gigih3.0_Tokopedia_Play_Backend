const VideoModel = require("../models/video")

const createVideoController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const { title, thumbnail, embedId, category } = req.body

    const video = new VideoModel({
        title,
        thumbnail,
        embedId,
        categories: category,
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

const deleteVideoController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const videoId = req.params.videoId

    try {
        const deletedVideo = await VideoModel.findOneAndDelete({
            _id: videoId,
            user: loggedInUser._id,
        })
        res.status(200).json({
            message: "Video is successfully deleted.",
        })
    } catch (err) {
        const cleanErrorMessage = err.message.split(": ")[2]
        res.status(400).json({
            success: false,
            message: cleanErrorMessage,
        })
    }
}

const updateVideoController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const videoId = req.params.videoId
    const { title, thumbnail, embedId, category } = req.body
    console.log(loggedInUser)
    console.log(req.body)

    try {
        const updatedVideo = await VideoModel.findOneAndUpdate(
            {
                _id: videoId,
                user: loggedInUser._id,
            },
            {
                title,
                thumbnail,
                embedId,
                categories: category,
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
            },
        )
        await updatedVideo.save()
        res.status(200).json(updatedVideo)
    } catch (err) {
        console.log(err.message)
        const cleanErrorMessage = err.message.split(": ")[2]
        res.status(400).json({
            success: false,
            message: cleanErrorMessage,
        })
    }
}

module.exports = {
    createVideoController,
    getVideoController,
    getVideoListController,
    deleteVideoController,
    updateVideoController,
}
