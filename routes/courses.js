const express = require('express');
const Course = require('../models/course.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Course.find({})
    .sort({ name: 1 })
    .then((coursesArray) => {
      res.render('courses/list', { coursesArray, header: 'Courses' });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Course.findById(id)
    .then((course) => {
      res.render('courses/detail', course);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
