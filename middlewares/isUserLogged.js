function isUserLogged(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    req.flash('info', 'You have to login!');
    res.redirect('/');
  }
}

module.exports = isUserLogged;
