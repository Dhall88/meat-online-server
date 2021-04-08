const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose')
// const user = require('./models/account');
const userRouter = express.Router();
const userSchema = require("../models/user");

const conn = mongoose.createConnection('mongodb://localhost:27017/user')
const User = conn.model("User", userSchema)

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



const connectEnsureLogin = require('connect-ensure-login');

userRouter.post('/login', (req, res, next) => {
    console.log('in login')
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
});

userRouter.get('/login',
  (req, res) => res.sendFile('html/login.html',
  { root: __dirname })
);

userRouter.get('/',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/index.html', {root: __dirname})
);

userRouter.get('/private',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

userRouter.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
);

User.register({username:'paul', active: false}, 'paul');
User.register({username:'jay', active: false}, 'jay');
User.register({username:'roy', active: false}, 'roy');

  module.exports = userRouter;