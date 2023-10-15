const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const path = require('path');


app.use(express.json());
app.use(fileUpload()); // Middleware for handling file uploads


app.post('/', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;

  // Change the destination folder to "backend"
  const uploadPath = path.join(__dirname, 'backend', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to the "backend" folder!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
