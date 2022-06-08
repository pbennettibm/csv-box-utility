// const Box = require('./box-sdk');
// const axios = require('axios');
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const directoryPath = path.join(__dirname, 'downloads');

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
    // const axiosConfig = {
    //   method: 'post',
    //   url: 'https://upload.box.com/api/2.0/files/content',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + process.env.DEV_TOKEN,
    //   },
    //   data: JSON.stringify(csv),
    // };

    // axios(axiosConfig)
    //   .then(function (response) {
    //     console.log(response);
    //     res.status(201).end();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     res.status(400).end();
    //   });

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

// app.get('/download', (req, res) => {
//   res.download(`${directoryPath}/business1.csv`);
//   // res.status(200).end();
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
