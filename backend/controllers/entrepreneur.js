const Entrepreneur = require("../models/entrepreneur");
const config = require("config");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Environment settings
const {
  app: { secretKey },
} = config;

function signupEntrepreneur(req, res, next) {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
}

function updateEntrepreneur(req, res) {
  Entrepreneur.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, entrepreneurUpdate) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!entrepreneurUpdate) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningun emprendedor.",
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Emprendedor actualizado correctamente.",
          });
        }
      }
    }
  );
}

function deleteEntrepreneur(req, res) {
  Entrepreneur.findByIdAndRemove(req.params.id, (err, entrepreneurDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!entrepreneurDeleted) {
        res
          .status(404)
          .send({ code: 404, message: "Emprendedor no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El emprendedor ha sido eliminado correctamente.",
        });
      }
    }
  });
}

function loginEntrepreneur(req, res, next) {
  passport.authenticate(
    "login-entrepreneur",
    {
      session: false,
      failureRedirect: "/login-entrepreneur",
    },
    (err, user, info) => {
      try {
        if (err || !user) {
          console.log(err);
          const error = new Error("User not found | Error");
          return next(error);
        }

        req.login(user, { session: false }, (err) => {
          if (err) return next(err);
          const body = { _id: user._id, email: user.email };

          const token = jwt.sign({ user: body }, secretKey);
          return res.json({ token });
        });
      } catch (e) {
        return next(e);
      }
    }
  )(req, res, next);
}

module.exports = {
  signupEntrepreneur,
  updateEntrepreneur,
  deleteEntrepreneur,
  loginEntrepreneur,
};
