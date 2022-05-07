const express = require("express");
const QuestionController = require("../controllers/question");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-question/:postId", QuestionController.addQuestion);
api.get("/get-questions", QuestionController.getQuestions);
api.put("/update-question/:id", QuestionController.updateQuestion);
api.delete("/delete-question/:id", QuestionController.deleteQuestion);
api.get("/get-question/:id", QuestionController.getQuestion);

module.exports = api;
