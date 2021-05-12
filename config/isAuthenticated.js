module.exports = function (req, res, next) {
    console.log("isAuthenticated log", req.user);
    if (req.user) {
      return next();
    }
    return res.redirect("/dashboard");
  };