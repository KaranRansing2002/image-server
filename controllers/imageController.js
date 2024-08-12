const { mongoose } = require("mongoose");
const { Image } = require("../models/imageModel");

const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await mongoose.connection.db
        .collection('counters')
        .findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { returnOriginal: false, upsert: true }
        );

    // If no document was found before the update, initialize the sequence value
    if (!sequenceDocument.value) {
        const newSequenceDocument = await mongoose.connection.db
            .collection('counters')
            .findOne({ _id: sequenceName });

        // Return the sequence value from the newly created document
        return newSequenceDocument.sequence_value;
    }

    // If document already existed, return the updated sequence value
    return sequenceDocument.value.sequence_value;
};



const uploadImage = async (req, res) => {
    try {
        const imageId = await getNextSequenceValue('imageId');
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