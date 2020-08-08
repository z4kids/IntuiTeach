const {MongoClient} = require('mongodb')
require('dotenv').config()
const uri = process.env.DB_URI
async function setup() {
    const client = new MongoClient(uri)
    await client.connect()
    return client
}
module.exports = setup()
