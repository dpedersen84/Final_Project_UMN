const express = require('express');
const router = express.Router();
const Image = require("../../models/Image")
// const User = require("../models/User");
// const Comment = require('../models/Comment.js');
const passport = require('passport');
require('../../config/passport')(passport);

// The following routes match with "/api/images"
// Get all images
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        console.log("=== Getting All Images ===")
        Image
        .find(req.query)
        // .sort({ likes: -1 })
        .then(images => res.json(images))
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Save image
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        Image.create(req.body, (err, image) => {
            console.log("==== Save Image ====")
            // console.log(req.body);
            if (err) return next(err);
            res.json(image);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Edit image
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    // console.log(req.body)
    if (token) {
        Image.findOneAndUpdate({ _id: req.params.id }, req.body, (err, image) => {
            console.log("=== Updating Image ===")
                if (err) return next(err);

                res.json(image)
            

        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

//Edit image likes
router.put('/likes/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    // console.log(req.body)
    if (token) {
        Image.findOneAndUpdate({ _id: req.params.id }, {$push: {usersWhoLiked: req.body}}, (err, image) => {
        // Image.findOneAndUpdate({ _id: req.params.id }, {$inc: {likes: req.body}}, (err, Image) => {
            console.log("=== Updating Users Who Liked ===")
                if (err) return next(err);

                res.json(image)
        })
        // .then(() => {
        //     Image.findOneAndUpdate({_id: req.params.id } , req.body, (err, Image) => {
        //         console.log("=== Updating Like Amount ===")
        //             if (err) return next(err);

        //             res.json(Image)
        //     })
        // })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Get User images
router.get('/:userId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        Image.find({userId: req.params.userId }, (err, images) => {
            console.log("=== Get User Images ===")
            // console.log(Images);
            if (err) return next(err);
            res.json(images);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Get all image comments
router.get('/:id/comments', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        console.log("=== Get Comments ===")
        Image.find({_id: req.params.id})
        .populate('comments')
        .then(comments => {
            // console.log(comments);
            res.json(comments);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Save comment to image
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        console.log("=== Save Comments ===");
        Comment.create(req.body)
        .then(dbComment => {
            return Image.findOneAndUpdate({_id: req.params.id}, {$push: {comments: dbComment._id}}, {new: true})
        })
        .then(dbImage => {
            res.json(dbImage);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// Edit comment
router.put('/:id/comments', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        console.log("=== Updating Comment ===");
        Comment.findOneAndUpdate({_id: req.params.id }, req. body)
        .then(dbComment => {
            res.json(dbComment)
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
}); 

// Delete comment
router.delete('/:id/comments', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
        Comment.findById({_id: req.params.id})
        .then(dbComment => dbComment.remove())
        .then(dbComment => res.json(dbComment))
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

// // Get user profile picture
// router.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     const token = getToken(req.headers);
//     if (token) {
//         User.find({_id: req.params.id }, (err, UserData) => {
//             console.log("UserData: " + UserData)
//             res.json(UserData)
//         });
//     } else {
//         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//     }    
// });

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