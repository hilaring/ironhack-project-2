const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((connection) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error.message);
  })

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const coursesRouter = require('./routes/courses');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60,
  }),
  secret: process.env.MONGODB_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/courses', coursesRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  switch (err.status) {
    case 404:
      res.status(err.status || 404);
      res.render('errors/error404')
      break;
    case 500:  
      res.status(err.status || 500);
      res.render('errors/error500');
      break;
    default:
      res.status(err.status || 500);
      res.render('errors/error500');
      break;
  }
  // render the error page
});

module.exports = app;
