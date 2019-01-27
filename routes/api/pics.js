const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Pic = require("../../models/Pic");
const Profile = require("../../models/Profile");

// Validation
const validatePicInput = require("../../validation/pic");

// @route         GET api/pics/test
// @description   Tests pics route
// @access        Public
router.get("/test", (req, res) => res.json({ msg: "Pics Route Works" }));

// @route         POST api/pics/
// @description   Create pic
// @access        Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePicInput(req.body);

    // Check if valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPic = new Pic({
      image: req.body.image,
      caption: req.body.caption,
      name: req.body.name,
      user: req.user.id
    });

    newPic.save().then(pic => res.json(pic));
  }
);

// @route         GET api/pics
// @description   Get pics
// @access        Public
router.get("/", (req, res) => {
  Pic.find()
    .sort({ date: -1 })
    .then(pics => res.json(pics))
    .catch(err => res.status(404).json({ nopicsfound: "No pics found" }));
});

// @route         GET api/pics/:id
// @description   Get pic by id
// @access        Public
router.get("/:id", (req, res) => {
  Pic.findById(req.params.id)
    .then(pic => res.json(pic))
    .catch(err =>
      res.status(404).json({ nopicfound: "No pic found by that ID" })
    );
});

// @route         DELETE api/pics/:id
// @description   Delete pic by id
// @access        Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Pic.findById(req.params.id)
        .then(pic => {
          // Check post owner
          // Must convert id to string
          if (pic.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unauthorized: "User not authorized to remove pic" });
          }

          // Delete pic
          pic.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ picnotfound: "No pic found" }));
    });
  }
);

module.exports = router;
