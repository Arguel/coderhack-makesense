const express = require("express");
const CitizenController = require("../controllers/citizen");
const passport = require("passport");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post(
  "/signup-citizen",
  passport.authenticate("signup-citizen", {
    session: false,
    failureRedirect: "/signup-citizen",
  }),
  CitizenController.signupCitizen
);
api.put("/update-citizen/:id", CitizenController.updateCitizen);
api.delete("/delete-citizen/:id", CitizenController.deleteCitizen);
api.post("/login-citizen", CitizenController.loginCitizen);

module.exports = api;
