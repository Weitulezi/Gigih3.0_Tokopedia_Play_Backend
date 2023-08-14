const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            default: "/assets/bracket-tv.png",
        },
        price: {
            type: Number,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        video: {
            type: mongoose.Types.ObjectId,
            ref: "Video",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Product", ProductSchema)
