const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// TODO: Validation

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route         GET api/profile/test
// @description   Tests profile route
// @access        Public
router.get("/test", (req, res) => res.json({ msg: "Profile Route Works" }));

module.exports = router;
