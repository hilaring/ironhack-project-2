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

router.post('/:id/add', (req, res, next) => { //eslint-disable-line
  const courseId = req.params.id;
  const userID = req.session.currentUser._id; //eslint-disable-line
  const message = { messages: req.flash('info') }; //eslint-disable-line

  if (userID) {
    User.findById(userID)
      .then((user) => {
        user.stats.push({ courses: courseId, checked: false });
        user.save()
          .then(() => {
            req.flash('info', 'Add course successfully');
            res.status(200).json({ courseId });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
});

module.exports = router;
