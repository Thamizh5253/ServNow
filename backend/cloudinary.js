const { v2 } = require("cloudinary");
require('dotenv').config();
const api_key = process.env.CLOUD_API_KEY;
const cloud_name = process.env.CLOUD_NAME ;
const api_secret = process.env.CLOUD_API_SECRET ;


v2.config({
  api_key: api_key,
  cloud_name: cloud_name,
  api_secret:api_secret,
});

module.exports = v2;
