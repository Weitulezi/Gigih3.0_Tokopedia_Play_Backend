const CommectSchema = require("../models/comment")

const createCommentController = async (req, res) => {
    const loggedInUser = req.loggedInUser

    const { content } = req.body

    const comment = new CommectSchema({
        user: loggedInUser.id,
        content: content,
        video: videoId,
    })

    try {
        const savedComment = await comment.save()
        res.status(201).json({
            data: savedComment,
            message: "Comment successfully created.",
        })
    } catch (err) {
        res.status(400).json({ message: "Failed to post a comment." })
    }
}

const getCommentListOfVideoController = async (req, res) => {
    const videoId = req.params.videoId
    try {
        const comments = await comments.find({ video: videoId })
        res.status(200).json(comments)
    } catch (err) {
        res.status(400).json({ message: "Faield to retrieve video's comment" })
    }
}

module.exports = { createCommentController, getCommentListOfVideoController }
