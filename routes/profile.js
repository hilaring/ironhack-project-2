const express = require('express');
const youtubeInfo = require('youtube-info');
const nodemailer = require('nodemailer');
const User = require('../models/user'); // eslint-disable-line
const Course = require('../models/course.js'); // eslint-disable-line
const isUserLogged = require('../middlewares/isUserLogged');
const isUserTeacher = require('../middlewares/isUserTeacher');

const router = express.Router();

router.get('/', isUserLogged, (req, res) => {
  const userId = req.session.currentUser._id; // eslint-disable-line
  User.findById(userId).populate('stats.courses')
    .then((resultUser) => {
      res.render('profile/detail', resultUser);
    });
});

// EDIT USER PROFILE
router.post('/:id/detail', isUserLogged, (req, res, next) => {
  const { id } = req.params;
  const { username, name, lastname, birth, email, phone } = req.body; // eslint-disable-line
  const teacherResponse = req.body.teacherResponse; // eslint-disable-line
  let teacherTrueFalse;

  if (teacherResponse === 'no') {
    teacherTrueFalse = false;
  } else if (teacherResponse === 'yes') {
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
      req.flash('info', 'Successfully edited');
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/edit', isUserLogged, (req, res, next) => {
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
router.post('/:id/delete', isUserLogged, (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(() => {
      req.session.destroy();
      // req.flash('info', 'User removed, we miss you...');
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE COURSE IN PROFILE
// TODO: hacer pull de lista de estudiantes de cursos
router.post('/:id/remove', isUserLogged, (req, res, next) => { //eslint-disable-line
  const userID = req.session.currentUser._id; //eslint-disable-line
  const courseId = req.params.id;
  Course.findByIdAndUpdate(courseId, { $pull: { students: userID } }, { new: true })
    .then(() => {
      User.findByIdAndUpdate(userID, { $pull: { stats: { _id: courseId } } }, { new: true })
        .exec((err, result) => {
          // req.flash('info', 'Successfully deleted');
          res.status(200).json(result);
        });
    });
});

// TEACHER'S SPACE
router.get('/teacher', isUserTeacher, (req, res, next) => {
  const userId = req.session.currentUser._id; // eslint-disable-line
  User.findById(userId)
    .populate('coursesCreated')
    .then((resultUser) => {
      res.render('profile/teacher', resultUser);
    })
    .catch((error) => {
      next(error);
    });
});

// CREATE COURSES
router.post('/:id/createcourse', isUserTeacher, (req, res, next) => {
  const userId = req.session.currentUser._id; //eslint-disable-line
  const userMail = req.session.currentUser.email;
  const userUsername = req.session.currentUser.username;
  const { videoInput } = req.body;
  const videoEmbed = videoInput.replace('watch?v=', 'embed/');
  const videoId = videoInput.replace('https://www.youtube.com/watch?v=', '');

  if (!req.body.videoInput) {
    req.flash('info', 'The fields name, category, resume and cant be empty!');
    res.redirect(`/profile/${userId}/teacher`);
  } else {
    youtubeInfo(videoId)
      .then((videoInfo) => {
        // console.log(videoInfo);
        const newCourse = {
          name: videoInfo.title,
          teacher: userId,
          image: videoInfo.thumbnailUrl,
          category: videoInfo.genre,
          resume: req.body.resume,
          temary: req.body.temary,
          video: videoEmbed,
          students: [],
          reviews: [],
        };

        Course.create(newCourse, (err, docsInserted) => {
          const course = newCourse.name;
          const img = newCourse.image;
          if (err) {
            next(err);
          } else {
            User.findByIdAndUpdate(userId, { $push: { coursesCreated: docsInserted._id } }, { new: true })
              .then(() => {
                const message = `You create the new course <h3>${course}</h3><br> <img src="${img}" alt="course-image" height="175" width="300">`;
                const transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                    user: process.env.NODEMON_EMAIL,
                    pass: process.env.NODEMON_PASS,
                  },
                });
                transporter.sendMail({
                  from: '"Courstory e-Learning Platform" <courstoryweb@gmail.com>',
                  to: userMail,
                  subject: `Thanks, ${userUsername}, for make Courstory big`,
                  text: message,
                  html: `<b>${message}</b>`,
                });

                req.flash('info', 'Successfully created');
                res.redirect('/profile/teacher');
              })
              .catch((error) => {
                next(error);
              });
          }
        });
      })
      .catch((error) => {
        next(error);
      });
  }
});

// EDIT COURSE CREATED
router.post('/teacher', isUserTeacher, (req, res, next) => {
  const { name, temary, resume, image, id } = req.body; // eslint-disable-line
  Course.findByIdAndUpdate(id, { name, temary, resume, image }, { new: true }) // eslint-disable-line
    .then(() => {
      req.flash('info', 'Successfully edited');
      res.redirect('/profile/teacher');
      // res.redirect(`/courses/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/courseedit', isUserTeacher, (req, res, next) => {
  const courseId = req.params.id;
  Course.findById(courseId)
    .then((course) => {
      res.render('profile/courseedit', course);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
