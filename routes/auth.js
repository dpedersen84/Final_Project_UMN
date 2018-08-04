const passport = require('passport');
const settings = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");

// Register new user
router.post('/register', (req, res) => {
    console.log("=== New User Register ===");
    console.log(req.body);
    if (!req.body.userName || !req.body.password) {
        res.json({success: false, msg: 'Please enter a username and password!'});
    } else {
        const newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            profileUrl: req.body.profileUrl,
        });
    User.create(newUser)
        .then((err, dbNote) => {
            if (err) return res.json({success: false, msg: 'Username already exists.'})
            return res.json({Success: true, msg: 'Successfully created new user.'})
        })
    }
});

// Sign-in
router.post('/login', (req, res) => {
    User.findOne({
        userName: req.body.userName
    }, (err, user) => {
        console.log("=== User Signed In ===")
        console.log(user);
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(user.toJSON(), settings.secret);
                    // return the information including token as JSON
                    return res.json({success: true, token: 'JWT ' + token, userName: req.body.userName, userId: user._id});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// Get user profile picture
router.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const token = getToken(req.headers);
    if (token) {
        User.find({_id: req.params.id }, (err, userData) => {
            console.log("UserData: " + userData)
            res.json(userData)
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }    
});

module.exports = router;