const cloudinary = require('cloudinary');

//config
cloudinary.config({
    cloud_name: 'immo-cloud',
    api_key: '334474916722932',
    api_secret: '2_Uxw6p1FYg-vYPlbJZxBZACfac',
})

exports.upload = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
    })
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
}
exports.remove = (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (!err) {
            res.send("ok")
        } else {
            return res.json({ success: false, err })
        }
    })
}