const express = require("express");
const MessageController = require("../controllers/message");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-message/:postId", MessageController.addMessage);
api.get("/get-messages", MessageController.getMessages);
api.delete("/delete-message/:id", MessageController.deleteMessage);
api.get("/get-message/:id", MessageController.getMessage);

module.exports = api;
