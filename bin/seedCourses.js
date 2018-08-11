const mongoose = require('mongoose');
const Course = require('../models/course.js');

mongoose.connect('mongodb://laurang:toystory3@ds213832.mlab.com:13832/ih-project-2');

const courses = {
  name: 'Curso Google Analytics',
  description: 'Curso de Analytics: Cómo instalar, configurar, entender los informes y tomar decisiones que nos ayuden a mejorar nuestro SEO, usabilidad y objetivos. En cada capítulo os guiaré paso a paso a través de videotutoriales para que podáis aprender a instalar analytics, configurarlo correctamente, entender los informes y tomar decisiones para mejorar vuestro SEO y vuestras conversiones.',
  category: 'Marketing digital',
  url: 'https://www.youtube.com/watch?v=o-obgiAB1Kc',
};

Course.create(courses, (err) => {
  if (err) { throw (err); }
  console.log('Created courses.');
  mongoose.connection.close();
});
