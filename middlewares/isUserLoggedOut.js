function isUserLoggedOut(req, res, next) {
  if (!req.session.currentUser) {
    next();
  } else {
    req.flash('info', 'You are alredy logged in');
    res.redirect('/');
  }
}

module.exports = isUserLoggedOut;
