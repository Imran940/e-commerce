const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require('slugify');
exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(400).send("Create Category falild");
    }
}
exports.list = async (req, res) => {
    const resp = await Category.find({}).sort({ createdAt: -1 }).exec();  // -1 will give u latest data
    res.json(resp);
}
exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
}
exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true }).exec();// new will give us newly updated data
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).send("Category update failed");
    }
}
exports.remove = async (req, res) => {
    //
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);

    } catch (err) {
        console.log(err);
        res.status(400).send("Category delete failed");
    }
}

exports.getSubs = (req, res) => {
    Sub.find({ parent: req.params.pid }).exec((err, subs) => {
        if (!err) {
            res.json(subs)
        } else {
            console.log('getSubs error-->', err)
        }
    })
}