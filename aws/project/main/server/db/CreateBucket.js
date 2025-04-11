// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const config = require('../config')

// Set the region
AWS.config.update({ region: config.region });

// Create S3 service object - Lock version
const s3 = new AWS.S3({ apiVersion: config.s3Api });

// Create bucket name - make unique
const bucketParams = {
  Bucket : "user-images-" + Date.now()
};

// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);  // /user-images-1602606110149
  }
});
