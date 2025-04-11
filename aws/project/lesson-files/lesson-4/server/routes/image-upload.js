const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const config = require('../config');
const paramsConfig = require('../utils/params-config');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});

// image is the key!
const upload = multer({ storage }).single('image');

const s3 = new AWS.S3({
  apiVersion: config.s3Api
})

router.post('/image-upload', upload, (req, res) => {
  console.log("post('/api/image-upload'", req.file);
  const params = paramsConfig(req.file);
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log("Success", data.Location)
      res.json(data);
    }
  });
});

module.exports = router;
