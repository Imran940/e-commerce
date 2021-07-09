const Sub = require("../models/sub");
const slugify = require('slugify');
exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const subCategory = await new Sub({ name, parent, slug: slugify(name) }).save();
        res.json(subCategory);
    } catch (err) {
        console.log(err);
        res.status(400).send("Create sub-category falild");
    }
}
exports.list = async (req, res) => {
    const resp = await Sub.find({}).sort({ createdAt: -1 }).exec();  // -1 will give u latest data
    res.json(resp);
}
exports.read = async (req, res) => {
    let category = await Sub.findOne({ slug: req.params.slug }).exec();
    res.json(category);
}
exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, parent, slug: slugify(name) }, { new: true }).exec();// new will give us newly updated data
        res.json(updated);
    } catch (err) {
        console.log("sub category updation error ______", err);
        res.status(400).send("Sub-Category update failed");
    }
}
exports.remove = async (req, res) => {
    //
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);

    } catch (err) {
        console.log(err);
        res.status(400).send("Sub delete failed");
    }
}