const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectToDb = (cb) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(`MongoDB connection Error: `, err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = {
  connectToDb,
  getDb,
};

/* 
const { MongoClient } = require("mongodb");

let dbConnection;

const connectToDb = async () => {
  if (dbConnection) return;  // Prevents multiple connections

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";

  try {
    const client = await MongoClient.connect(uri);
    dbConnection = client.db();
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;  // Ensure errors are caught properly
  }
};

const getDb = () => {
  if (!dbConnection) throw new Error("No database connection established");
  return dbConnection;
};

module.exports = {
  connectToDb,
  getDb,
}; */
