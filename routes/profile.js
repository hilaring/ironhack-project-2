const express = require('express');
const User = require('../models/user');
const Course = require('../models/course.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.find({})
    .then((user) => {
      console.log(user)
      res.render('private/profile');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
