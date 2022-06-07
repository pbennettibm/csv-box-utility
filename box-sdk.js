const BoxSDK = require('box-node-sdk');
var sdkConfig = require('./config.json');
require('dotenv').config();

// Initialize the SDK with your app credentials
const sdk = new BoxSDK({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Create a basic API client, which does not automatically refresh the access token
const client = sdk.getBasicClient(process.env.DEV_TOKEN);

module.exports = client;
