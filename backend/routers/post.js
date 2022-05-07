const express = require("express");
const PostController = require("../controllers/post");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-post/:entrepreneurId", PostController.addPost);
api.get("/get-posts", PostController.getPosts);
api.put("/update-post/:id", PostController.updatePost);
api.delete("/delete-post/:id", PostController.deletePost);
api.get("/get-post/:id", PostController.getPost);

module.exports = api;
