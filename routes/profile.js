const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line

const router = express.Router();

router.get('/', (req, res) => {
  let user = req.session.currentUser;
  const userId = req.session.currentUser._id; // eslint-disable-line
  User.findById(userId).populate('stats.courses')
    .then((resultUser) => {
      res.render('profile/detail', resultUser);
    });
});

// EDIT USER PROFILE
router.post('/:id/detail', (req, res, next) => {
  const { id } = req.params;
  const { username, name, lastname, birth, email, phone } = req.body; // eslint-disable-line
  User.findByIdAndUpdate(id, { username, name, lastname, birth, email, phone }, { new: true }) // eslint-disable-line
    .then(() => {
      res.redirect('/profile');
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
      req.session.destroy();
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
