const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsletterSchema = new Schema({
  nameUser: String,
  email: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);
