const express = require('express');
const Box = require('./box-sdk');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/csv', (req, res) => {
  if (req.body.businessName) {
    let csv = '';

    for (let prop in req.body) {
      csv += `${prop}, `;
    }

    csv += '\n';

    for (let prop in req.body) {
      csv += `${req.body[prop]}, `;
    }

    const axiosConfig = {
      method: 'post',
      url: 'https://upload.box.com/api/2.0/files/content',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.DEV_TOKEN,
      },
      data: JSON.stringify(csv),
    };

    axios(axiosConfig)
      .then(function (response) {
        console.log(response);
        res.status(201).end();
      })
      .catch(function (error) {
        console.log(error);
        res.status(400).end();
      });

  //   Box.files
  //     .uploadFile('My Box Notes', `${req.body.businessName}.csv`, csv)
  //     .then((fileObject) => {
  //       res.status(201).end();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(400).end();
  //     });
  } else {
    res.status(406).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
