const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.currentUser;
  res.render('profile/detail', user);
});

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.render('profile/edit', user);
    })
    .catch((error) => {
      next(error);
    })
})

router.post('/:id/detail', (req, res, next) => {
  const { id } = req.params;
  const { username, name, lastname, birth, email, phone } = req.body;
  User.findByIdAndUpdate(id, { username, name, lastname, birth, email, phone })
    .then(() => {
      User.findById(id)
        .then((user) => {
          req.session.currentUser = user;
          res.redirect('/profile');
        })
        .catch((error) => {
          next(error);
        })
    })
    .catch((error) => {
      next(error);
    })
});

module.exports = router;
