const express = require("express");
const Course = require("../models/course.js");
const User = require("../models/user.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Course.find({})
    .then((coursesArray) => {
      res.render("courses/list", { coursesArray, header: "Courses" });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Course.findById(id)
    .then((course) => {
      res.render("courses/detail", course);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/add", (req, res, next) => {
  const courseId = req.params.id;
  const user = req.session.currentUser._id;
  const message = { messages: req.flash("info") };
  console.log(user);

  if (user) {
    User.findByIdAndUpdate(user, { $push: { stats: { courses: courseId } } })
      .then((result) => {
        req.flash("info", "Add course successfully");
        res.status(200).json(result);
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = router;

// router.post('/:_id/follow', isLoggedIn('/'), (req, res, next) => {
//   /* eslint-disable */
//   const userId = req.user._id;
//   const userRol = req.user.collection.collectionName;
//   const campaignId = req.params._id;
//   /* eslint-enable */
//   if (userRol === 'influencers') {
//     Campaign.findByIdAndUpdate(campaignId, { $push: { influencer_id: userId } })
//       .exec((err, result) => {
//         res.status(200).json(result);
//       });
//   } else if (userRol === 'companies') {
//     res.redirect(`/${req.user.username}`);
//   }
// });
