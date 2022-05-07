const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    postId: String,
    userId: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    subscribed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);

