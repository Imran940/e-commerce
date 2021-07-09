const User = require('../models/user');

exports.createOrUpdateuser = async (req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        {
            name: email.split("@")[0], picture
        },
        { new: true });
    if (user) {
        res.json(user);
        console.log("User updated", user)
    }
    else {
        const newUser = await new User({
            email,
            name: email.split("@")[0],
            picture,
        }).save();
        console.log("User is created", newUser);
        res.json(newUser);
    }
}  // you can export the above function like this way export.createOrUpdateuser

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (err) console.log(err);
        console.log(user);
        res.json(user);
    })
}