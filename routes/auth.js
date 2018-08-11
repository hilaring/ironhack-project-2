const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models/user');

// SIGN UP
router.get('/signup', (req, res) => {
  const data = { message: req.flash('info') };
  res.render('auth/signup', data);
});

router.post('/signup', (req, res, next) => {
  const { username, name, lastname, age, email, password, phone } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  if (!username || !password || !email) {
    req.flash('info', 'The fields can\'t be empty!');
    res.redirect('/auth/signup');
  } else {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          req.flash('info', 'The username can\'t be repeated :(');
          res.redirect('/auth/signup');
        } else {
          User.create({
            name, 
            lastname, 
            age,
            phone,
            username,
            email,
            password: hashedPassword,
          })
            .then((newUser) => {
              req.flash('info', 'You create a new user :)');
              res.redirect('/');
            })
            .catch((error) => {
              next(error);
            });
        }
      });
  }
});

// LOG IN
router.get('/', (req, res) => {
  const data = { message: req.flash('info') };
  res.render('/', data);
});

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  console.log('olga')
  if (!email || !password) {
    req.flash('info', 'The fields can\'t be empty!');
    res.redirect('/');
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            console.log('login')
            req.session.currentUser = user;
            res.redirect('/courses');
          } else {
            req.flash('info', 'Your email or password is incorrect :(');
            res.redirect('/');
          }
        } else {
          console.log('no login')
          req.flash('info', 'Your email or password is incorrect :(');
          res.redirect('/');
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

router.post('/logout', (req, res) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
