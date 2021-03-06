const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy;
// const user = require('./models/account');
const userRouter = express.Router();
const userSchema = require("../models/user");

const conn = mongoose.createConnection('mongodb://localhost:27017/user')
const User = conn.model("User", userSchema)

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// userRouter.use(bodyParser.json());

userRouter.post('/signup', (req, res, next) => {
    console.log('in signup')
  User.register(new User({username: req.body.username, admin: true}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

userRouter.post('/login', passport.authenticate('local'), async(req, res) => {
    const user = await User.find({"username":`${req.body.username}`})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!', admin: user[0].admin });

});

userRouter.get('/logout', (req, res) => {
    if (req.session) {
        console.log('in log out')
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


  module.exports = userRouter;