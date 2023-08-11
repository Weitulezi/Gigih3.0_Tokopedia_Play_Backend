const CommentModel = require("../models/comment")

const createCommentController = async (req, res) => {
    const loggedInUser = req.loggedInUser

    const { content, videoId } = req.body

    const comment = new CommentModel({
        user: {
            _id: loggedInUser._id,
            email: loggedInUser.email,
        },
        content: content,
        video: videoId,
    })

    try {
        const savedComment = await comment.save()
        console.log(savedComment)
        res.status(201).json(savedComment)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Failed to post a comment." })
    }
}

const getCommentListOfVideoController = async (req, res) => {
    const videoId = req.query.video

    try {
        const comments = await CommentModel.find({ video: videoId })
        res.status(200).json(comments)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Faield to retrieve video's comment" })
    }
}

module.exports = { createCommentController, getCommentListOfVideoController }
