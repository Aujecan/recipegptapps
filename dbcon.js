// mongodb.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://vaustinchris:7nd9P20mc9XA0W21@mycluster1.9cfaf35.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    await client.db("mycluster1").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function close() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error);
    throw error;
  }
}

module.exports = {
  client,
  connect,
  close
};
