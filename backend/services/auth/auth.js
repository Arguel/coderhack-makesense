const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Citizen = require("../../models/citizen");
const Entrepreneur = require("../../models/entrepreneur");
const config = require("config");

// Environment settings
const {
  app: { secretKey },
} = config;

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup-citizen",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Citizen.create({ email, password });
        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "login-citizen",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Citizen.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Citizen not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Login successfull" });
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  "signup-entrepreneur",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Entrepreneur.create({
          fullname: email.substr(0, email.indexOf("@")),
          email,
          password,
        });
        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "login-entrepreneur",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Entrepreneur.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Entrepreneur not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Login successfull" });
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (e) {
        done(error);
      }
    }
  )
);
