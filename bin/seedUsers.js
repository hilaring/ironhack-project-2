const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://laurang:toystory3@ds213832.mlab.com:13832/ih-project-2', { useNewUrlParser: true });

User.collection.drop();

const users = [
  {
    username: 'admin',
    teacher: true,
    name: 'admin',
    lastname: 'admin',
    birth: '1111-01-01',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 123,
    coursesCreated: [],
    stats: [],
  },
  {
    username: 'lau',
    teacher: false,
    name: 'Laura',
    lastname: 'R. Ojeda',
    birth: '1989-08-30',
    email: 'lau@lau.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 666,
    coursesCreated: [],
    stats: [],
  },
  {
    username: 'hilaring',
    teacher: false,
    name: 'Oriol',
    lastname: 'Hilari Amat',
    birth: '1992-08-13',
    email: 'orihil@gmail.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 677739624,
    coursesCreated: [],
    stats: [],
  },
  {
    username: 'Manu',
    teacher: true,
    name: 'Manuel',
    lastname: 'Teacher',
    birth: '1980-12-04',
    email: 'teacher@teacher.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 6666666666,
    coursesCreated: [],
    stats: [],
  },
];

User.create(users, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});
