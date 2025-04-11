const AWS = require("aws-sdk");

// config points to local instance,
// updates local environmental variables
AWS.config.update({
  region: "us-east-2"
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const params = {
    TableName : "Thoughts",
    KeySchema: [       
        { AttributeName: "username", KeyType: "HASH"},  //Partition key
        { AttributeName: "createdAt", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};
// create table method using schema params
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
