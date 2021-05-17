const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
// const postRouter = require("./routes/api/post");
// const useRouter = require("./routes/api/user");
const app = express();
var passport = require('passport');
var User = require('./models/user')
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// BodyParser Middleware

app.use(cookieParser());
// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(postRouter);

// app.use(useRouter);
app.use(routes);
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/castleon");

// mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://bootcamp-admin:karma345@cluster0.hj2wq.mongodb.net/castle?retryWrites=true&w=majority",
// {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false
// }
// );

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
