const BoxSDK = require('box-node-sdk');

// Initialize the SDK with your app credentials
const sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
});

// Create a basic API client, which does not automatically refresh the access token
const client = sdk.getBasicClient('DEVELOPER_TOKEN');

module.exports = client;
