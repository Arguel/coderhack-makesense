const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChallengeSchema = new Schema(
  {
    postId: Schema.Types.ObjectId,
    challengeName: String,
    description: String,
    previewLink: {
      type: String,
      required: false,
    },
    contact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);

