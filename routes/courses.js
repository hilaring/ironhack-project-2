const express = require('express');
const Course = require('../models/course.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Course.find({})
    .then((coursesArray) => {
      res.render('courses/list', { coursesArray });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Course.findById(id)
    .then((course) => {
      console.log(course)
      res.render('courses/detail', course);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
