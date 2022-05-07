const express = require("express");
const ChallengeController = require("../controllers/challenge");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-challenge/:postId", ChallengeController.addChallenge);
api.get("/get-challenges", ChallengeController.getChallenges);
api.put("/update-challenge/:id", ChallengeController.updateChallenge);
api.delete("/delete-challenge/:id", ChallengeController.deleteChallenge);
api.get("/get-challenge/:id", ChallengeController.getChallenge);

module.exports = api;
