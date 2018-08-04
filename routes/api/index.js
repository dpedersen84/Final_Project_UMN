const router = require("express").Router();
const imageRoutes = require("./images");

// Image routing
router.use("/images", imageRoutes);

module.exports = router;