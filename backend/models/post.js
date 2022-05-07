const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongoosePaginate = require("mongoose-paginate");
const Challenge = require("./challenge");
const Message = require("./message");
const Question = require("./question");

const PostSchema = new Schema(
  {
    entrepreneurId: Schema.Types.ObjectId,
    logo: String,
    title: String,
    description: String,
    challenges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Challenge",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

PostSchema.post("remove", function (res, next) {
  Challenge.deleteMany({ postId: this._id });
  Message.deleteMany({ postId: this._id });
  Question.deleteMany({ postId: this._id });
  next();
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
