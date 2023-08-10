const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        imageProfile: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 220,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("User", UserSchema)
