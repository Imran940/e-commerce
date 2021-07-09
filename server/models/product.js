const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,      //remove blank spaces
        maxlength: 32,
        text: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        maxlength: 200,
        text: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        maxlength: 32,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    subs: [{
        type: ObjectId,
        ref: "Sub"
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "No"],
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    },
    ratings: [{
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
    }]
},
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)