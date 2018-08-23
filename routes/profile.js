const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line

const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.session.currentUser._id; // eslint-disable-line
  User.findById(userId).populate('stats.courses')
    .then((resultUser) => {
      // let birthday = resultUser.birth
      // let date = birthday.slice(0, 10)
      // resultUser.birth = date
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

// DELETE COURSE IN PROFILE
router.post('/:id/remove', (req, res, next) => { //eslint-disable-line
  const userID = req.session.currentUser._id; //eslint-disable-line
  const courseId = req.params.id;
  User.findByIdAndUpdate(userID, { $pull: { stats: { _id: courseId } } })
    .exec((err, result) => {
      res.status(200).json(result);
    });

  /* ---- Otra forma de hacerlo ---- */
  /* Esta forma es con el método pull de mongoose, la anterior es con el $pull de mongo */
  // User.findById(userID)
  //   .then((user) => {
  //     user.stats.pull({ courses: courseId, checked: false }, { new: true });
  //     user.save()
  //       .then(() => {
  //         res.status(200).json({ courseId });
  //       });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
});

module.exports = router;
