function isUserLoggedOut(req, res, next) {
  if (req.session.currentUser) {
    req.flash('info', 'You are alredy logged in');
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = isUserLoggedOut;
