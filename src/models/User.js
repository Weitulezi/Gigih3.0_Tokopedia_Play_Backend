const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minLength: [6, "Username must contain more than 6 character"],
            maxLength: [20, "Password must contain less than 20 character"],
        },
        email: {
            type: String,
            required: true,
        },
        imageProfile: {
            type: String,
            required: false,
            default: "/assets/default_pp.png",
        },
        password: {
            type: String,
            required: true,
            minLength: [6, "Password must contain more 6 character"],
            maxLength: [500, "Password must contain less than 220 character"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isSuperUser: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("User", UserSchema)
