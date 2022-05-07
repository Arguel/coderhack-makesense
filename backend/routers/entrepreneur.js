const express = require("express");
const EntrepreneurController = require("../controllers/entrepreneur");
const passport = require("passport");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post(
  "/signup-entrepreneur",
  passport.authenticate("signup-entrepreneur", {
    session: false,
    failureRedirect: "/signup-entrepreneur",
  }),
  EntrepreneurController.signupEntrepreneur
);
api.put("/update-entrepreneur/:id", EntrepreneurController.updateEntrepreneur);
api.delete(
  "/delete-entrepreneur/:id",
  EntrepreneurController.deleteEntrepreneur
);
api.post("/login-entrepreneur", EntrepreneurController.loginEntrepreneur);

module.exports = api;
