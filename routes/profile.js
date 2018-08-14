const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.currentUser;
  res.render('profile', user);
});

module.exports = router;
