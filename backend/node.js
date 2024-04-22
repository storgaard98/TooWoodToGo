const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 6000;
const uri = 'mongodb://localhost:27017';
const dbName = 'myDatabase';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB database
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB database');
    } catch (err) {
        console.error('Error connecting to the MongoDB database:', err);
    }
}

// Define a route for inserting a document
app.post('/insert', async (req, res) => {
    try {
        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection('documents');

        // Insert the document into the collection
        const result = await collection.insertOne(req.body);
        console.log('Inserted document:', result.insertedId);

        res.status(200).json({ message: 'Document inserted successfully' });
    } catch (err) {
        console.error('Error inserting document:', err);
        res.status(500).json({ error: 'An error occurred while inserting the document' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Connect to the MongoDB database when the server starts
    connectToMongoDB();
});
