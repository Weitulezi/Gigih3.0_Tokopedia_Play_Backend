const ProductModel = require("../models/product")
const VideoModel = require("../models/video")

const createProductController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const { title, image, link, price, videoId } = req.body

    try {
        const video = await VideoModel.findById(videoId)

        // Making sure video is belong to the loggedi in user, before creating the product.
        if (String(video.user) !== loggedInUser._id) {
            return res
                .status(401)
                .json({ message: "You are unauthorized to make this request." })
        }

        const product = new ProductModel({
            title,
            image,
            link,
            price,
            video: videoId,
            user: loggedInUser._id,
        })
        const savedProduct = await product.save()

        res.status(201).json({
            message: "Product is successfully created.",
            data: savedProduct,
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ message: "There is something wrong" })
    }
}

const updateProductController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const productId = req.params.productId
    const { title, image, link, price, videoId } = req.body

    try {
        const product = await ProductModel.findOneAndUpdate(
            { _id: productId, user: loggedInUser._id },
            {
                title,
                image,
                link,
                price,
                video: videoId,
            },
            {
                runValidators: true,
                upsert: true,
            },
        )

        console.log(product)

        res.status(200).json(product)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const deleteProductController = async (req, res) => {
    const loggedInUser = req.loggedInUser
    const productId = req.params.productId

    try {
        await ProductModel.findOneAndDelete({
            _id: productId,
            user: loggedInUser._id,
        })
        res.status(200).json({ message: "Product is successfully deleted" })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const getProductListOfVideoController = async (req, res) => {
    const videoId = req.params.videoId

    try {
        const products = await ProductModel.find({ video: videoId })
        res.status(200).json(products)
    } catch (err) {
        res.status(404).json({ message: "Can't find products" })
    }
}

module.exports = {
    createProductController,
    updateProductController,
    deleteProductController,
    getProductListOfVideoController,
}
