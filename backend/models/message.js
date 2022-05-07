const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    postId: String,
    userId: String,
    name: String,
    msg: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);

