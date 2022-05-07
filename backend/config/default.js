require("dotenv").config();

const config = {
  // Used on the express server (express)
  app: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
    startMsg: "Listening on {0}", // {0} = placeholder
    secretKey: process.env.SECRET_KEY, // jwt
  },
  // Used on the database server (mongodb)
  db: {
    mongoUri: process.env.MONGO_URI, // Connection string
  },
};

module.exports = config;
