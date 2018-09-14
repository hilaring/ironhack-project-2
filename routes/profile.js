const express = require('express');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line
const isUserLogged = require('../middlewares/isUserLogged');
const isUserTeacher = require('../middlewares/isUserTeacher');

const router = express.Router();

router.get('/', isUserLogged, (req, res) => {
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
  const teacherResponse = req.body;
  let teacherTrueFalse = false;
  if (teacherResponse === 'no') {
    teacherTrueFalse = false;
  } else {
    teacherTrueFalse = true;
  }
  User.findByIdAndUpdate(id, { 
    username,
    teacher: teacherTrueFalse,
    name,
    lastname,
    birth,
    email,
    phone,
  }, { new: true }) // eslint-disable-line
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
  User.findByIdAndUpdate(userID, { $pull: { stats: { _id: courseId } } }, { new: true })
    // hacer pull de lista de estudiantes de cursos
    .exec((err, result) => {
      res.status(200).json(result)
    });
});

// TEACHER'S SPACE
router.get('/:id/teacher', isUserTeacher, (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .populate('coursesCreated')
    .then((resultUser) => {
      res.render('profile/teacher', resultUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/createcourse', isUserTeacher, (req, res, next) => {
  const userId = req.session.currentUser._id; //eslint-disable-line
  const { videoInput } = req.body;
  const videoEmbed = videoInput.replace('watch?v=', 'embed/');

  if (!req.body.name || !req.body.category || !req.body.resume || !req.body.temary) {
    // mensaje de error, necesita rellenar campos
    res.redirect(`/profile/${userId}/teacher`);
  } else {
    const newCourse = {
      name: req.body.name,
      teacher: userId,
      image: req.body.image,
      category: req.body.category,
      resume: req.body.resume,
      temary: req.body.temary,
      video: videoEmbed,
      students: [],
      reviews: [],
    };

    Course.create(newCourse, (err, docsInserted) => {
      if (err) {
        next(err);
      } else {
        User.findByIdAndUpdate(userId, { $push: { coursesCreated: docsInserted._id } }, { new: true })
          .then(() => {
            res.redirect(`/profile/${userId}/teacher`);
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
});

module.exports = router;
