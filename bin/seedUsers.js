const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://laurang:toystory3@ds213832.mlab.com:13832/ih-project-2');

User.collection.drop();

const users = [
  {
    username: 'admin',
    name: 'admin',
    lastname: 'admin',
    birth: '01-01-1111',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 123,
    stats: [], 
  },
  {
    username: 'lau',
    name: 'Laura',
    lastname: 'R. Ojeda',
    birth: '30-08-1989',
    email: 'lau@lau.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 666,
    stats: [], 
  },
  {
    username: 'hilaring',
    name: 'Oriol',
    lastname: 'Hilari Amat',
    birth: '13-08-1992',
    email: 'orihil@gmail.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 677739624,
    stats: [],
  },
  {
    username: 'Dante',
    name: 'Gato',
    lastname: 'Asesino',
    birth: '15-04-2018',
    email: 'dante@dante.com',
    password: bcrypt.hashSync('123', salt).toString(),
    phone: 666,
    stats: [],
  },
];

User.create(users, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});
