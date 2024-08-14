const express = require('express');
const multer = require('multer');
const cors = require('cors');
const {uploadImage, getImage} = require('./controllers/imageController')

const app = express();
 
app.use(cors())
app.use(express.json({ limit: '3000kb' }));

const storage = multer.memoryStorage();  
const upload = multer({ storage }); 

  
app.post('/upload', upload.single('image'), uploadImage);

app.get('/image/:imageId', getImage);
 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));