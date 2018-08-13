const express = require('express');
const User = require('../models/user');
const Course = require('../models/course.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  const user = req.session.currentUser;
  res.render('profile', user);
});

module.exports = router;
