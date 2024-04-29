// DB SETUP
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ME_CONFIG_MONGODB_URI;
const localUri = process.env.LOCAL_URI;
const dbName = process.env.DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/* const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}); */

const client = new MongoClient("mongodb://mongo:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error appropriately, e.g., exit the application or retry connection.
  } finally {
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
app.use(cors({ origin: "http://nextjs-app-1:3000" }));
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
    db = client.db(dbName);
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
        // Delete a product by its custom ID
        result = await productsCollection.deleteOne({ id: data });
        break;
      default:
        throw new Error("Invalid operation");
    }
    return result;
  } catch (error) {
    console.error("Error handling product operation:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await handleProductOperation("get");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});

// Get a product by ID
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await handleProductOperation("getById", productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
});

// Store a new product
app.post("/api/products", async (req, res) => {
  const productData = req.body;
  try {
    await handleProductOperation("insert", productData);
    res.status(201).json({ message: "Product inserted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while inserting product" });
  }
});

// Express route for deleting a product by ID
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id; // Custom ID passed from the client
  try {
    // Perform the deletion operation using the custom ID
    const result = await handleProductOperation("deleteById", productId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting product" });
  }
});

// Function to handle CRUD operations for users
async function handleUserOperation(operation, data) {
  let db;
  try {
    await client.connect();
    db = client.db(dbName);
    const usersCollection = db.collection("users");
    let result;
    switch (operation) {
      case "create":
        result = await usersCollection.insertOne(data);
        break;
      case "delete":
        result = await usersCollection.deleteOne({ _id: ObjectId(data) });
        break;
      case "validateByUsername":
        result = await usersCollection.findOne({ username: data });
        break;
      case "validatePassword":
        result = await usersCollection.findOne({ password: data });
        break;
      default:
        throw new Error("Invalid operation");
    }
    return result;
  } catch (error) {
    console.error("Error handling user operation:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Validate a user by username
app.post("/api/users/validateByUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await handleUserOperation("validateByUsername", username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while validating user" });
  }
});

// Validate a user's password hash
app.post("/api/users/validatePassword", async (req, res) => {
  const { username, passwordHash } = req.body;
  try {
    const user = await handleUserOperation("validateByUsername", username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== passwordHash) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({ message: "Password is valid" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while validating password" });
  }
});

// Create a new user
app.post("/api/users", async (req, res) => {
  const userData = req.body;
  try {
    await handleUserOperation("create", userData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating user" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await handleUserOperation("delete", userId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
