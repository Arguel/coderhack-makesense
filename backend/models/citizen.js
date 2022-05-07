const mongoose = require("mongoose");
const { Schema } = mongoose;
const emailValidation = require("../utils/formValidation").emailValidation;
const minLengthValidation =
  require("../utils/formValidation").minLengthValidation;
const Message = require("./message");
const Question = require("./question");
const bcrypt = require("bcryptjs");

const CitizenSchema = new Schema(
  {
    fullname: String,
    email: {
      type: String,
      unique: true,
      validate: {
        validator: emailValidation,
        message: (props) =>
          `The email ${props.value} is not valid, the email has to match the following regex - /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/`,
      },
    },
    password: {
      type: String,
      validate: {
        validator: minLengthValidation,
        message: (props) =>
          `The password ${props.value} is not valid, the password must be at least 6 characters long`,
      },
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

CitizenSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
  next();
});

CitizenSchema.post("remove", function (res, next) {
  Question.deleteMany({ userId: this._id });
  Message.deleteMany({ userId: this._id });
  next();
});

CitizenSchema.methods.isValidPassword = function (password) {
  const user = this;
    return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("Citizen", CitizenSchema);
