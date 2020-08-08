const {MongoClient} = require('mongodb')
require("dotenv").config()

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    // const uri = `mongodb+srv://${process.env.DB_USERNAME}:<${process.env.PASSWORD}>@${process.env.DB_CLUSTER_URL}/<dbname>?retryWrites=true&w=majority`
    console.log(process.env.DB_URI)
    const uri = process.env.DB_URI

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
