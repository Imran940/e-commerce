const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,     //trim removes blank spaces
            required: "Name is required",
            minlength: [2, "Too Short"],
            maxlength: [32, "Too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }

);
module.exports = mongoose.model("Category", categorySchema);