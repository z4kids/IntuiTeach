const {MongoClient} = require('mongodb')
const uri = `something`
const client = new MongoClient(uri)
await client.connect()
module.exports = client