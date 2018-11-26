const express = require("express");
const path = require("path");
const passport = require("passport");
require("./config/passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Port
const PORT = process.env.PORT || 3001;

// Routes
const photo = require('./routes/photos');
const auth = require('./routes/auth');

// Initialize Express
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/images', passport.authenticate('jwt', {session: false}), photo);
app.use('/api/auth', auth);
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Connect to the Mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/PicMedb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() =>  console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, function() {
  console.log("App Running on Port " + PORT + "!");
});
