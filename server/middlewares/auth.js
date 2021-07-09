const admin = require("../firebase/index");
const User = require("../models/user")
exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth()
            .verifyIdToken(req.headers.authtoken);
        //console.log("Firebase user in authcheck", firebaseUser);
        req.user = firebaseUser; //adding user property in request header so that we can access in controller
        next();
    }
    catch (err) {
        res.status(401).send("authCheck error arised in middlewares", err);
    }
}
exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email }).exec();
    if (adminUser.role === "admin") {
        next();
    } else {
        res.status(403).json({
            err: "Admin resource, Access denied.",
        })
    }
}