// const Box = require('./box-sdk');
// const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
var reload = require('reload');
const app = express();
const port = process.env.PORT || 3001;

const directoryPath = path.join(__dirname, 'downloads');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/csv', (req, res) => {
  if (req.body.businessName) {
    let csv = '';

    for (let prop in req.body) {
      csv += `${prop}, `;
    }

    csv = csv.slice(0, -2);
    csv += '\n';

    for (let prop in req.body) {
      csv += `${req.body[prop]}, `;
    }

    csv = csv.slice(0, -2);

    fs.writeFileSync(`${directoryPath}/${req.body.businessName}.csv`, csv);
    console.log(`${directoryPath}/${req.body.businessName}.csv created`);
    res.status(201).end();
  } else {
    res.status(406).end();
  }
});

const refresh = (req, res, next) => {
  next();
};

app.get('/', refresh, async (req, res) => {
  let html = '<script src="/reload/reload.js"></script>';
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      files.forEach((file) => {
        html += `<a href="/download/${file}">${file}</a>
          <br>
          <br>`;
      });
      res.send(html);
      res.status(200).end();
    }
  });
});

app.get('/download/:filename', (req, res) => {
  console.log(req.params.filename);
  res.download(`${directoryPath}/${req.params.filename}`);
});

// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(function (err) {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
