const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: {
                values: ["electronics", "clothes"],
                message: "{VALUE} category doesn't exist",
            },
        },
    },
    { _id: false },
)

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
        categories: [CategorySchema],
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Video", VideoSchema)
