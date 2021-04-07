const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose')
// const user = require('./models/account');
const userRouter = express.Router();
const userSchema = require("../models/user");

const conn = mongoose.createConnection('mongodb://localhost:27017/user')
const User = conn.model("User", userSchema)



  userRouter.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  userRouter.get('/register', function(req, res) {
      res.render('register', { });
  });

  userRouter.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  userRouter.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  userRouter.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  userRouter.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  userRouter.get('/ping', function(req, res){
      console.log('in ping')
      res.send("pong!", 200);
  });

  module.exports = userRouter;