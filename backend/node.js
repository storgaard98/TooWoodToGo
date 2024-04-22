
// DB SETUP
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ME_CONFIG_MONGODB_URI
const dbName = 'test';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      // Handle the error appropriately, e.g., exit the application or retry connection.
  } finally {
      await client.close();
  }
}

run().catch(console.dir);

// Express setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;


// Define a route for inserting a document
app.post('/insert', async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            throw new Error('Request body is missing or invalid');
        }
        // Additional validation if needed...

        const db = client.db(dbName);
        const collection = db.collection('test');
        const result = await collection.insertOne(req.body);
        console.log('Inserted document:', result.insertedId);
        res.status(200).json({ message: 'Document inserted successfully' });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.status(400).json({ error: error.message });
    }
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
      console.log('Server closed');
      // Close MongoDB client
      client.close().then(() => {
          console.log('MongoDB connection closed');
          process.exit(0);
      });
  });
});

const helmet = require('helmet');
app.use(helmet());

const morgan = require('morgan');
app.use(morgan('dev'));
