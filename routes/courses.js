const express = require('express');
const Course = require('../models/course.js');
const User = require('../models/user.js');
const isUserLogged = require('../middlewares/isUserLogged');
const router = express.Router();

router.get('/', (req, res, next) => {
  Course.find({})
    // .sort({ name: 1 })
    .then((coursesArray) => {
      res.render('courses/list', { coursesArray, header: 'Courses' });
    })
    .catch((error) => {
      next(error);
    });
});

// FIND COURSES
router.post('/search', (req, res, next) => {
  const searchInput = req.body.query;
  Course.find({
    $text: {
      $search: searchInput,
      $caseSensitive: false,
      $diacriticSensitive: false,
    },
  }, (err, result) => {
    if (result.length) {
      Course.find({
        $text: {
          $search: searchInput,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      }).sort({ name: 1 })
        .then((coursesArray) => {
          res.render('courses/list', { coursesArray, header: 'Courses Search' });
        })
        .catch((error) => {
          next(error);
        });
    } else {
      Course.find({})
        // .sort({ name: 1 })
        .then((coursesArray) => {
          req.flash('info', 'We don\'t have results');
          res.render('courses/list', { coursesArray, header: 'Courses' });
        })
        .catch((error) => {
          next(error);
        });
    }
  });
});

// SORT COURSES
router.get('/sort/:type', (req, res) =>{
  const { type } = req.params;
  let sortCase = {};

  switch (type) {
    case 'mostStudents':
      sortCase = { name: -1 };
      break;
    case 'alphabeticalAscending':
      sortCase = { name: 1 };
      break;
    case 'alphabeticalDescending':
      sortCase = { name: -1 };
      break;
    case 'creationAscending':
      sortCase = { created_at: 1 };
      break;
    case 'creationDescending':
      sortCase = { created_at: -1 };
      break;
    default:
      sortCase = { name: 1 };
  }

  Course.find({})
    .sort(sortCase)
    .then((coursesArray) => {
      if (coursesArray) {
        res.render('courses/list', { coursesArray });
      }
    })
    // .catch((error) => {
    //   next(error);
    // });
});

// router.post('/sort', (req, res, next) => {
//   // const objBtn = JSON.parse(req.body);
//   const strBtn = JSON.stringify(req.body);
//   const btn = strBtn.replace('{"btnType":"', '').replace('"}', '');

//   let sortCase = {};

//   switch (btn) {
//     case 'mostStudents':
//       sortCase = { name: -1 };
//       break;
//     case 'alphabeticalAscending':
//       sortCase = { name: 1 };
//       break;
//     case 'alphabeticalDescending':
//       sortCase = { name: -1 };
//       break;
//     case 'creationAscending':
//       sortCase = { createdAt: 1 };
//       break;
//     case 'creationDescending':
//       sortCase = { createdAt: -1 };
//       break;
//     default:
//       sortCase = { name: 1 };
//   }

//   Course.find({})
//     .sort(sortCase)
//     .exec((err, coursesArray) => {
//       res.status(200).json(coursesArray);
//       // if (coursesArray) {
//       //   res.render('/courses/list', coursesArray);
//       // }
//     });
//   // .then((coursesArray) => {
//   //   res.redirect('courses/list', coursesArray);
//   // })
//   // .catch((error) => {
//   //   next(error);
//   // });
// });

// COURSE DETAIL
router.get('/:id', isUserLogged, (req, res, next) => {
  const { id } = req.params;
  Course.findById(id).populate('reviews.author').populate('teacher').populate('students')
    .then((course) => {
      res.render('courses/detail', course);
    })
    .catch((error) => {
      next(error);
    });
});

// ADD A COURSE
router.post('/:id/add', isUserLogged, (req, res, next) => { //eslint-disable-line
  const courseId = req.params.id;
  const userId = req.session.currentUser._id; //eslint-disable-line

  // User.find({ stats: $elemMatch: })
  //   .exec((err, docs) => {
  //     console.log(docs)
  //   })

  // User.findById(userId)
  //   .exec((err, docs) => {
  //     console.log(docs.stats);
  //   });


  User.findById(userId)
    .then((user) => {
      user.stats.push({ courses: courseId, checked: false });
      user.save()
        .then(() => {
          req.flash('info', 'Added sucessfully');
          res.status(200).json({ courseId });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  Course.findByIdAndUpdate(courseId, { $push: { students: userId } }, { new: true })
    .exec((err, result) => {
      res.status(200).json(result);
    });
});

//  REVIEWS OF USERS
router.post('/:id/review', isUserLogged, (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.currentUser._id; //eslint-disable-line
  const { userComment, userRate } = req.body;

  if (userComment || userRate) {
    Course.findById(courseId)
      .then((course) => {
        course.reviews.push({ comment: userComment, author: userId, rate: userRate });
        course.save()
          .then(() => {
            req.flash('info', 'Added sucessfully');
            res.redirect(`/courses/${courseId}`);
          })
          .catch((error) => {
            next(error);
          });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    req.flash('info', 'Both fields cant be empty!');
    res.redirect(`/courses/${courseId}`);
  }
});

module.exports = router;
