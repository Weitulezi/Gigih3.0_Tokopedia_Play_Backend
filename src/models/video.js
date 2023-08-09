const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        videoImage: {
            type: String,
            required: true,
        },
        embedId: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            requried: true,
            ref: "User",
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Video", VideoSchema)
