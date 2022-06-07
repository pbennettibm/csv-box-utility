const express = require('express');
const Box = require('./box-sdk');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/csv', (req, res) => {
  if (req.body.filename) {
    
    // transform to csv

    Box.files
      .uploadFile(
        'doodlebugs-norfolksouthern-w9-external-confidential',
        req.body.filename,
        fileContents
      )
      .then((fileObject) => {
        res.status(201).end();
      })
      .catch((error) => {
        res.status(400).end();
      });
  } else {
    res.status(406).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
