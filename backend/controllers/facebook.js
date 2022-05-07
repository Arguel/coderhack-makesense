const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://www.example.com/auth/facebook/callback", //URL al cual redirecciona luego de la validación
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate("", function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

