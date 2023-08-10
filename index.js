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

const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const userRoutes = require("./src/routes/user")
const videoRoutes = require("./src/routes/video")
const productRoutes = require("./src/routes/product")

app.use("/api", userRoutes)
app.use("/api", videoRoutes)
app.use("/api", productRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
