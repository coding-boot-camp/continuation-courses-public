const { v4: uuidv4 } = require('uuid');
const config = require('../config');

// Process the req.file retrieved from the route to create a params object for s3
const params = (fileName) => {
  const myFile = fileName.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  // configure the params object for the web service call
  const imageParams = {
    Bucket: config.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: 'public-read'
  };

  return imageParams;
};

module.exports = params;
