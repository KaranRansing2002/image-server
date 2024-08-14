const mongoose = require('mongoose');

const dblink = "mongodb+srv://ransingkaran495:NzRn3ZZ2h1Yth8O7@cluster0.o1m1k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//mongodb+srv://ransingkaran495:NzRn3ZZ2h1Yth8O7@cluster0.o1m1k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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
