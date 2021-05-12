const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("../config/socialLink");
// const chalk = require("chalk");
const User  = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.getUserByEmail(email, (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) {
          return done(null, false, { message: "Unknown Email" });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Invalid password" });
        });
      });
    }
  )
);


// // Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: keys.GOOGLE.clientID,
//   clientSecret: keys.GOOGLE.clientSecret,
//   callbackURL: "/auth/google/callback"
// },
// (accessToken, refreshToken, profile, cb) => {
//   console.log(chalk.blue(JSON.stringify(profile)));
//   user = { ...profile };
//   return cb(null, profile);
// }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;