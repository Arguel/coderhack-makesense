const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("config");

// Environment settings
const {
  app: { secretKey },
} = config;

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La peticion no tiene la cabecera de Autenticacion." });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    const payload = jwt.decode(token, secretKey);

    if (payload.exp <= moment().unix()) {
      return res.status(404).send({ message: "El token ha expirado." });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(404).send({ message: "Token invalido." });
  }
  req.user = payload;
  next();
};
