const express = require("express");
const path = require("path");
const passport = require("passport");
require("./config/passport");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Port
const PORT = process.env.PORT || 3001;

// Initialize Express
const app = express();

// Configure middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

// Routes
const photo = require('./routes/photos');
const auth = require('./routes/auth');

app.use('/api/images', passport.authenticate('jwt', {session: false}), photo);
app.use('/api/auth', auth);

// Connect to the Mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/PicMedb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() =>  console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Start the server
app.listen(PORT, function() {
  console.log("App Running on Port " + PORT + "!");
});
