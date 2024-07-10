const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
const secrets = require("./private/secrets.json");
dotenv.config();

const app = express();
const port = process.env.SERVER;

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  googleId: String
})
const Users = mongoose.model("user", userSchema);

app.use(session({
    secret: '12345', // Change this to a secure random string for production
    resave: false,
    saveUninitialized: false,
  }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  }));
  
// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,cb) {
  cb(null,user);
});

passport.deserializeUser(async(id,cb) => {
  try{
    return cb(null, await Users.findById(id));
  }catch(err){
    return cb(err);
  }
});

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: secrets.google_client_id,
    clientSecret: secrets.google_client_secret,
    callbackURL: '/auth/google/callback',
  },
  async(accessToken, refreshToken, profile, done) => {

    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    }
    
    try {
      let user = await Users.findOne({googleId: profile.id});

      if(user){
        done(null,user);
      } else{
        user = await Users.create(newUser);
        done(null,user);
      }
    }catch(err){
      console.error(err);
    }
  }
));


// Define routes

// Logout route - clears the session
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// // Redirect to Google OAuth login
// app.get('/login', (req, res) => {
//   // If there's an existing user session, logout to allow account selection
//   if (req.isAuthenticated()) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   }
//   // Redirect to Google OAuth login
//   res.redirect('/auth/google');
// });

// Google OAuth callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/',failureRedirect: '/login' })
);

// Home route - user must be authenticated
app.get('/', (req, res) => {
  console.log("this is the user in home route: ",req.user)
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:3000/home');
  } else {
    res.redirect('/auth/google');
  }
});

app.get('/api/user', (req, res) => {
  console.log("this is the request in apiuser: ",req.user)
  res.json({
    name: req.user.displayName,
    email: req.user.emails[0].value // Assuming first email is primary
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});