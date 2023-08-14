const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: {
                values: ["Electronics", "Clothes", "Foods and Drinks"],
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
            minLength: [3, "Title {VALUE} is too short"],
        },
        thumbnail: {
            type: String,
            required: true,
            default:
                "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/331207338/original/722106652e693e42e78e0a76f1f79adc41d1b863.png",
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
