const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
    },
    authorUserName: String,
    body: String,
    date: {
            type: Date,
            default: Date.now()
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;