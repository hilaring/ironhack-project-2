function isUserTeacher(req, res, next) {
  if (req.session.currentUser.teacher === true) {
    next();
  } else {
    req.flash('info', 'You are not a teacher');
    res.redirect('/profile');
  }
}

module.exports = isUserTeacher;
