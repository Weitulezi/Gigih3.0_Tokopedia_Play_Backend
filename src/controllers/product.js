const ProductModel = require("../models/product")

const createProductController = async (req, res) => {
    const { title, image, link, price, videoId } = req.body

    const product = new ProductModel({
        title,
        image,
        link,
        price,
        video: videoId,
    })

    try {
        const savedProduct = await product.save()
        res.status(200).json({
            message: "Product is successfully created.",
            data: savedProduct,
        })
    } catch (err) {
        res.status(400).json({})
    }

    res.status(200).json()
}

export { createProductController }
