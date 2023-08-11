const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        user: {
            _id: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            email: {
                type: String,
                required: true,
            }
        },
        video: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Video",
        },
        content: {
            type: String,
            required: true,
            maxLength: 280,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Comment", CommentSchema)
