const mongoose = require('mongoose');
const Course = require('../models/course.js');

mongoose.connect('mongodb://laurang:toystory3@ds213832.mlab.com:13832/ih-project-2');

const courses = [
  {
    name: 'Curso Google Analytics',
    description: 'Curso de Analytics: Cómo instalar, configurar, entender los informes y tomar decisiones que nos ayuden a mejorar nuestro SEO',
    category: 'Marketing digital',
    url: 'https://boluda.com/files/curso-google-analytics-300x157.png',
  },
  {
    name: 'Curso Google AdWords',
    description: '¿Sabéis que Google AdWords es la red de publicidad más grande del mundo? Y no es de extrañar, porque Google es la web más visitada del mundo, y por esa razón todo el mundo quiere anunciarse ahí.',
    category: 'Marketing digital',
    url: 'https://boluda.com/files/curso-online-adwords-300x157.png',
  },
];

Course.create(courses, (err) => {
  if (err) { throw (err); }
  console.log('Created courses.');
  mongoose.connection.close();
});
