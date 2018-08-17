const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.currentUser;
  res.render('profile/detail', user);
});

// EDIT
router.post('/:id/detail', (req, res, next) => {
  const { id } = req.params;
  const { username, name, lastname, birth, email, phone } = req.body; // eslint-disable-line
  User.findByIdAndUpdate(id, { username, name, lastname, birth, email, phone }, { new: true }) // eslint-disable-line
    .then((user) => {
      req.session.currentUser = user;
      res.redirect('/:id/profile', user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.render('profile/edit', user);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE USER ACCOUNT
router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
