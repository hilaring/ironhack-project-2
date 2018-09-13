const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models/user');
const isUserLoggedOut = require('../middlewares/isUserLoggedOut');

// SIGN UP
router.get('/signup', isUserLoggedOut, (req, res) => {
  const message = { messages: req.flash('info') };
  const signUp = 'Sign up';
  res.render('auth/signup', { message, header: signUp });
});

router.post('/signup', isUserLoggedOut, (req, res, next) => {
  const { username, name, lastname, birth, email, password, phone } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const teacherResponse = req.body;
  let teacherTrueFalse = false;
  if (teacherResponse === 'no') {
    teacherTrueFalse = false;
  } else {
    teacherTrueFalse = true;
  }

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
            username,
            teacher: teacherTrueFalse,
            name,
            lastname,
            birth,
            phone,
            email,
            password: hashedPassword,
            coursesCreated: [],
            stats: [],
          })
            .then((newUser) => {
              if (newUser) {
                req.session.currentUser = newUser;
                req.flash('info', 'You create a new user :)');
                res.redirect('/courses');
              }
            })
            .catch((error) => {
              next(error);
            });
        }
      });
  }
});

// LOG IN
router.get('/', isUserLoggedOut, (req, res) => {
  const message = { messages: req.flash('info') };
  res.render('/', message);
});

router.post('/', isUserLoggedOut, (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('info', 'The fields can\'t be empty!');
    res.redirect('/');
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect('/courses');
          } else {
            req.flash('info', 'Your email or password is incorrect :(');
            res.redirect('/');
          }
        } else {
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
