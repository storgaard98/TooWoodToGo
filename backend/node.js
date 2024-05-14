// DB SETUP
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ME_CONFIG_MONGODB_URL;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// Express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
// Middleware to secure Express apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());
// Middleware to log requests
const morgan = require("morgan");
app.use(morgan("dev"));
// Middleware to enable CORS
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
// Middleware to parse JSON bodies
app.use(express.json());

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    // Close MongoDB client
    client.close().then(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});

// Insert functions for DB

// Function to handle CRUD operations for products
async function handleProductOperation(operation, data) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const productsCollection = db.collection("products");
    let result;
    switch (operation) {
      case "get":
        result = await productsCollection.find({}).toArray();
        break;
      case "getById":
        result = await productsCollection.findOne({ _id: ObjectId(data) });
        break;
      case "insert":
        result = await productsCollection.insertOne(data);
        break;
      case "delete":
        result = await productsCollection.deleteOne({ _id: ObjectId(data) });
        break;
      case "deleteById":
        result = await productsCollection.deleteOne({ id: data });
        break;
      case "acceptPrice":
        result = await productsCollection.updateOne({ _id: ObjectId(data) }, { $set: { acceptedPrice: true } });
        break;
      case "rejectPrice":
        result = await productsCollection.updateOne({ _id: ObjectId(data) }, { $set: { acceptedPrice: false } });
        break;
      case "setPrice":
        result = await productsCollection.updateOne({ _id: ObjectId(data.productId) }, { $set: { price: data.price } });
        break;
      default:
        throw new Error("Invalid operation");
    }
    return result;
  } catch (error) {
    console.error("Error handling product operation:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Express route for accepting a price for a product
app.put("/api/products/:id/acceptPrice", async (req, res) => {
  const productId = req.params.id;
  try {
    await handleProductOperation("acceptPrice", productId);
    res.json({ message: "Price accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while accepting price" });
  }
});

// Express route for rejecting a price for a product
app.put("/api/products/:id/rejectPrice", async (req, res) => {
  const productId = req.params.id;
  try {
    await handleProductOperation("rejectPrice", productId);
    res.json({ message: "Price rejected successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while rejecting price" });
  }
});

// Express route for setting a price for a product
app.put("/api/products/:id/setPrice", async (req, res) => {
  const productId = req.params.id;
  const price = req.body.price;
  try {
    await handleProductOperation("setPrice", { productId, price });
    res.json({ message: "Price set successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while setting price" });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});