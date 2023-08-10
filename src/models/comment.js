const mongoose = require("mongoose")

const CommectSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
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

module.exports = mongoose.model("Comment", CommectSchema)
