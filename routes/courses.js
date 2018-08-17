const express = require('express');
const Course = require('../models/course.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Course.find({})
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

router.post('/:id', (req, res, next) => {
  const { id } = req.params.id;
  const user = req.session.currentUser;
  const message = { messages: req.flash('info') };
  if (user) {
    User.findByIdandUpdate(user, { $push: { courses: id } })
      .then(() => {
        req.flash('info', 'Add course successfully');
        res.redirect('/', message);
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = router;
