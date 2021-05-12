const passport = require("../../../config/passport");
const router = require("express").Router();
const isAuthenticated = require("../../../config/isAuthenticated");
const User = require("../../../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//validators
const {runValidation} = require("../../../validators");
const {userSignupValidator, userSigninValidator} = require("../../../validators/auth");


//Register User
router.post('/signup', userSignupValidator, runValidation, function(req, res){
  console.log("Signup route", req.body)
    var password = req.body.password;
    var password2 = req.body.password2;
  
    if (password == password2){
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicUrl: req.body.profilePicUrl
      });
  
      User.createUser(newUser, function(err, user){
        if(err) throw err;
        res.send(user).end()
      });
    } else{
      res.status(500).send("{error: \"Passwords don't match\"}").end()
    }
  });

  // Endpoint to login
router.post("/login", passport.authenticate("local"),userSigninValidator,runValidation,
  (req, res) => {
  const loginUser = {
    email: req.body.email,
    // password: req.body.password,
  };
  res.send(loginUser);
  console.log(loginUser, " authenticated");
});

// Endpoint to get current user
router.get("/", isAuthenticated, (req, res) => {
  if (!req.user) {
    res.json({
      error:"User not found"
    });
  } else {
    User.findById({ _id: req.user.id })
      .populate("User")
      .then((data) => {
        const loadUser = {
          name: data.name,
          email: data.email,
          profilePicUrl: data.profilePicUrl
        }
        res.json(loadUser);
      });
    console.log("res on server", req.user);
    // res.json(req.user);
  }
});

// Endpoint to logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
  res.send(null);

});

module.exports = router;
