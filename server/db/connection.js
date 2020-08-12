const {MongoClient} = require('mongodb')
require('dotenv').config()
const uri = process.env.DB_URI
const client = new MongoClient(uri)

module.exports = client
