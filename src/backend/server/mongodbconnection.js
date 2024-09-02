const mongoDB = require('mongodb');
const env = require('../../env');

async function connect(collection) {
    const client = await mongoDB.MongoClient.connect(env.mongodbconnetrionstring);
    return client.db('Projcet').collection(collection);
}  

module.exports = {
    connect
};



