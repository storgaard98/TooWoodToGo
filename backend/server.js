// DB SETUP
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ME_CONFIG_MONGODB_URL;
const dbName = process.env.ME_CONFIG_MONGODB_AUTH_DATABASE;
let server;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Function to handle CRUD operations for products
async function handleProductOperation(operation, data) {
  try {
    let result;
    switch (operation) {
      case "get":
        result = await productsCollection.find({}).toArray();
        break;
      case "getById":
        result = await productsCollection.findOne({ _id: data });
        break;
      case "insert":
        result = await productsCollection.insertOne(data);
        break;
      case "delete":
        result = await productsCollection.deleteOne({ _id: data });
        break;
      case "deleteById":
        result = await productsCollection.deleteOne({ _id: data });
        break;
      case "acceptPrice":
        result = await productsCollection.updateOne(
          { _id: data },
          { $set: { acceptedPrice: true } }
        );
        break;
      case "rejectPrice":
        result = await productsCollection.updateOne(
          { _id: data },
          { $set: { acceptedPrice: false } }
        );
        break;
      case "setPrice":
        result = await productsCollection.updateOne(
          { _id: data.productId },
          { $set: { price: data.price } }
        );
        break;
      default:
        throw new Error("Invalid operation");
    }
    console.log(`Successfully performed operation ${operation}`);
    return result;
  } catch (error) {
    console.error("Error handling product operation:", error);
    throw error;
  }
}

// Express route for accepting a price for a product
app.put("/api/products/:id/acceptPrice", async (req, res) => {
  const productId = req.params.id;
  console.log("Accepting price for product", productId);
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
  console.log("Reject price for product", productId);

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

// Express route for inserting a product into the database
app.post("/api/products", async (req, res) => {
  const product = {
    _id: req.body.productId,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    acceptedPrice: false,
    date: new Date().toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
  try {
    const result = await handleProductOperation("insert", product);
    res.json({
      message: "Product inserted successfully",
      productId: result.insertedId,
    });
    console.log("Product inserted successfully with ID:", result.insertedId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while inserting product" });
  }
});

// Express route for getting a product from the database based on unique ID
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await handleProductOperation("getById", productId);
    if (result) {
      res.json(result);
      console.log("Product found with ID:", productId);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting product" });
  }
});

// Express route for getting all products from the database
app.get("/api/products", async (req, res) => {
  try {
    const result = await handleProductOperation("get");
    if (!result) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.json(result);
      console.log("All products retrieved successfully");
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting products" });
  }
});

// Express route for deleting a product from the database
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await handleProductOperation("deleteById", productId);
    res.json({ message: "Product deleted successfully" });
    console.log("Product deleted successfully with ID:", productId);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting product" });
  }
});

async function startServer() {
  try {
    await client.connect();
    const db = client.db(dbName);
    productsCollection = db.collection("products");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // Start the server
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    // Close MongoDB client
    client.close().then(async () => {
      console.log("MongoDB connection closed");
      await client.close();
      process.exit(0);
    });
  });
});

startServer();
