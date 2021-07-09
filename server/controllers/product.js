const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");


exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log('create product error----->', err);
        res.status(400).send(err.message)
    }
}
exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')    // it will return whole details of category documents
        .populate('subs')
        .sort([["createdAt", "desc"]])
        .exec()
    res.json(products);
}
exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({ slug: req.params.slug }).exec()
        res.json(deleted);
    } catch (err) {
        console.log('product deleting err', err)
        return res.status(400).send("Product delete failed")
    }

}
exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product)
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,  // req.body is already an object so no need to write inside curly bracket
            { new: true }  // to get updated data 
        ).exec();
        res.json(updated)

    } catch (err) {
        console.log('Product Update Error', err)
        return res.status(400).send(err.message);
    }
}

exports.list = async (req, res) => {
    console.table(req.body)
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 3;
        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products)
    } catch (err) {
        console.log(err)
    }

}
exports.totalProducts = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec()
    res.json(total);
}

exports.productStar = async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    //check if currently logged in user have already added rating to this product
    let existingRatingObject = product.ratings.find((elem) =>
        (elem.postedBy.toString() === user._id.toString())
    )

    //if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(product._id,
            {
                $push: { ratings: { star, postedBy: user._id } }
            },
            { new: true }).exec()
        console.log(ratingAdded)
        res.json(ratingAdded)
    } else {
        let ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log('ratingUpdated', ratingUpdated);
        res.json(ratingUpdated)
    }

}