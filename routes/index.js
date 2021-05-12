const path = require("path");
const router = require("express").Router();
const postRoutes = require("./api/post");
const userRoutes = require("./api/user");
const profileRoutes = require("./api/profile")

// API Routes
router.use("/api", postRoutes);

//API User
router.use("/api", userRoutes);
router.use("/api", profileRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});



module.exports = router;
// module.exports = router;
