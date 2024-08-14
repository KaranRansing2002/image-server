const { mongoose } = require("mongoose");
const { Image } = require("../models/imageModel");


function generateUniqueId() {
    return Math.floor(Math.random() * 1e16);
}


const uploadImage = async (req, res) => {
    try {
        const imageId = generateUniqueId();
        // console.log(req.file.buffer.toString());
        const newImage = new Image({
            imageId,
            image: req.file.buffer,
            contentType: req.file.mimetype,
        });

        await newImage.save();

        res.status(201).json({ success: true, imageId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to upload image' });
    }
}

const getImage = async (req, res) => {
    try {
        const imageId = parseInt(req.params.imageId, 10);

        const image = await Image.findOne({ imageId });

        if (!image) {
            return res.status(404).json({ success: false, error: 'Image not found' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to retrieve image' });
    }
}



module.exports = { uploadImage, getImage };