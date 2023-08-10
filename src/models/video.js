const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
            default: "",
        },
        embedId: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Video", VideoSchema)
