const mongoose = require("mongoose");
const { Schema } = mongoose;
const emailValidation = require("../utils/formValidation").emailValidation;
const minLengthValidation =
  require("../utils/formValidation").minLengthValidation;
const Post = require("./post");
const Message = require("./message");
const bcrypt = require("bcryptjs");

const EntrepreneurSchema = new Schema(
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
      required: true,
    },
    password: {
      type: String,
      validate: {
        validator: minLengthValidation,
        message: (props) =>
          `The password ${props.value} is not valid, the password must be at least 6 characters long`,
      },
      required: true,
    },
    businessName: {
      type: String,
      required: false,
      default: "Mi emprendimiento",
    },
    businessCategory: {
      type: String,
      required: false,
      default: "accion climatica",
      enum: [
        "accion climatica",
        "transformacion social",
        "comunidad e innovacion",
        "tejido social",
        "reduccion de desigualdades",
      ],
    },
    businessPicture: {
      type: String,
      required: false,
    },
    businessDesc: {
      type: String,
      required: false,
      default: "Mi nuevo emprendimiento",
    },
    businessInstagram: {
      type: String,
      required: false,
    },
    businessFacebook: {
      type: String,
      required: false,
    },
    businessWebsite: {
      type: String,
      required: false,
    },
    businessLinkedin: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

EntrepreneurSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
  next();
});

EntrepreneurSchema.post("remove", function (res, next) {
  Post.deleteMany({ entrepreneurId: this._id });
  Message.deleteMany({ userId: this._id });
  next();
});

EntrepreneurSchema.methods.isValidPassword = function (password) {
  const user = this;
    return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("Entrepreneur", EntrepreneurSchema);
