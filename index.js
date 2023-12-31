require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const mongoose = require("mongoose")

const mongoDbUrl = process.env.DATABASE_URL

mongoose.connect(mongoDbUrl)
const database = mongoose.connection

database.on("error", (error) => {
    console.log(error)
})

database.once("connected", () => {
    console.log("Database connected!")
})

const isProduction = true

const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    cors({
        origin: [
            "https://gigih3-0-tokopedia-play-frontend.vercel.app/",
            "https://gigih3-0-tokopedia-play-frontend.vercel.app",
            !isProduction && "http://localhost:3000",
        ],
    }),
)

const userRoutes = require("./src/routes/user")
const videoRoutes = require("./src/routes/video")
const productRoutes = require("./src/routes/product")
const commentRoutes = require("./src/routes/comment")

app.use("/api", userRoutes)
app.use("/api", videoRoutes)
app.use("/api", productRoutes)
app.use("/api", commentRoutes)

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`)
})
