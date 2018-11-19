const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo.js');
const User = require("../models/User");
const passport = require('passport');
require('../config/passport')(passport);

// Get all photos
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    var token = getToken(req.headers);

    if (token) {
        console.log("=== Getting All Photos ===")
        Photo.find(req.query)
        // .sort({ likes: -1 })
        .then(photos => res.json(photos))
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Save photo
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);

    if (token) {
        Photo.create(req.body, (err, post) => {
            console.log("==== Save Photo ====")
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Edit photo
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);

    if (token) {
        Photo.findOneAndUpdate({ _id: req.params.id }, req.body, (err, photo) => {
            console.log("=== Updating Photo ===")
            if (err) return next(err);
            res.json(photo)
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Get User photos
router.get('/:userId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        Photo.find({userId: req.params.userId }, (err, photos) => {
            console.log("=== Get User Photos ===")
            // console.log(photos);
            if (err) return next(err);
            res.json(photos);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Get user profile picture
router.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const token = getToken(req.headers);
    if (token) {
        User.find({_id: req.params.id }, (err, UserData) => {
            console.log("UserData: " + UserData)
            res.json(UserData)
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }    
});

getToken = headers => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;