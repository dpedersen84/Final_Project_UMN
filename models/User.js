const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    userName: {
        type: String, 
        require: true,
        unique: true
    },

    password: {
        type: String, 
        require: true
    },

    profileUrl: {
        type: String,
        require: false,
        unique: false
    },
    likedPhotos:{
        type: []
    }
});

UserSchema.pre('save', function (next) {
    const User = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(User.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                User.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// const User = mongoose.model("User", UserSchema);

// module.exports = User;

module.exports = mongoose.model('User', UserSchema);

