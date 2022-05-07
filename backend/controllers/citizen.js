const Citizen = require("../models/citizen");
const config = require("config");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Environment settings
const {
  app: { secretKey },
} = config;

function signupCitizen(req, res, next) {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
}

function updateCitizen(req, res) {
  Citizen.findByIdAndUpdate(req.params.id, req.body, (err, citizenUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!citizenUpdate) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ningun ciudadano.",
        });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Ciudadano actualizado correctamente." });
      }
    }
  });
}

function deleteCitizen(req, res) {
  Citizen.findByIdAndRemove(req.params.id, (err, citizenDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!citizenDeleted) {
        res
          .status(404)
          .send({ code: 404, message: "Ciudadano no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El ciudadano ha sido eliminado correctamente.",
        });
      }
    }
  });
}

function loginCitizen(req, res, next) {
  passport.authenticate(
    "login-citizen",
    {
      session: false,
      failureRedirect: "/login-citizen",
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
  signupCitizen,
  updateCitizen,
  deleteCitizen,
  loginCitizen,
};
