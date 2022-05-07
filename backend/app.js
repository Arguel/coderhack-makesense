const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("./services/auth/auth");
const passport = require("passport");

const app = express();
const { API_VERSION } = require("./config");

// Load routings
const authRoutes = require("./routers/auth");
const newsletterRoutes = require("./routers/newsletter");
const postRoutes = require("./routers/post");
const challengeRoutes = require("./routers/challenge");
const citizenRoutes = require("./routers/citizen");
const entrepreneurRoutes = require("./routers/entrepreneur");
const messageRoutes = require("./routers/message");
const questionRoutes = require("./routers/question");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(passport.initialize());

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, challengeRoutes);
app.use(`/api/${API_VERSION}`, citizenRoutes);
app.use(`/api/${API_VERSION}`, entrepreneurRoutes);
app.use(`/api/${API_VERSION}`, messageRoutes);
app.use(`/api/${API_VERSION}`, questionRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

module.exports = app;
