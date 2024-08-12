const mongoose = require('mongoose');

const dblink = "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";

const conn=mongoose
  .connect(dblink)
  .then(() => {
    console.log("image-server DB connected.");
  })
  .catch((err) => {
    console.log("Error", err);
  }); 

console.log(conn);

const ImageSchema = new mongoose.Schema({
  imageId: {
    type: Number,
    unique: true,
    required: true,
  },
  image: {
    type: Buffer, 
    required: true,
  },
  contentType: {
    type: String, 
    required: true,
  },
});

const Image = mongoose.model('Image', ImageSchema);


module.exports={Image}
