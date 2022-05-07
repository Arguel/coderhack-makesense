const mongoose = require("mongoose");
const config = require("config");

// Environment settings
const {
  db: { mongoUri },
} = config;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(mongoUri, mongoOptions)
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

module.exports = mongoose;

