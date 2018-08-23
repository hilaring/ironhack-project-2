const mongoose = require('mongoose');
const Course = require('../models/course.js');

mongoose.connect('mongodb://laurang:toystory3@ds213832.mlab.com:13832/ih-project-2');

const courses = [
  {
    name: 'Google Analytics',
    image: 'https://boluda.com/files/curso-google-analytics-300x157.png',
    resume: 'Cómo instalar, configurar, entender los informes y tomar decisiones que nos ayuden a mejorar nuestro SEO, usabilidad y objetivos',
    temary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur fugiat saepe reprehenderit non amet esse, modi autem possimus nihil, accusantium ad? Adipisci accusantium corrupti cum qui laboriosam pariatur natus?',
    category: 'Marketing digital',
    video: 'https://www.youtube.com/embed/P3V01bDbIR0',
  },
  {
    name: 'Google AdWords',
    image: 'https://boluda.com/files/curso-online-adwords-300x157.png',
    resume: '¿Sabéis que Google AdWords es la red de publicidad más grande del mundo? Y no es de extrañar, porque Google es la web más visitada del mundo, y por esa razón todo el mundo quiere anunciarse ahí.',
    temary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur fugiat saepe reprehenderit non amet esse, modi autem possimus nihil, accusantium ad? Adipisci accusantium corrupti cum qui laboriosam pariatur natus?',
    category: 'Marketing digital',
    video: 'https://www.youtube.com/embed/P3V01bDbIR0',
  },
  {
    name: 'WordPress básico',
    image: 'https://boluda.com/files/curso-wordpress-300x157.png',
    resume: 'WordPress es sin duda alguna, el mejor gestor de contenidos del mundo, y el más utilizado con diferencia, llegando actualmente al superar el 58% de cuota de mercado. Y encima es open source y completamente gratuito.',
    temary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur fugiat saepe reprehenderit non amet esse, modi autem possimus nihil, accusantium ad? Adipisci accusantium corrupti cum qui laboriosam pariatur natus?',
    category: 'WordPress',
    video: 'https://www.youtube.com/embed/P3V01bDbIR0',
  },
  {
    name: 'SEO para WordPress',
    image: 'https://boluda.com/files/curso-wordpress-300x157.png',
    resume: 'WordPress es un CMS fantástico, y viene muy preparado para posicionar bien. Sin embargo, hay varias cosas que se deja en el tintero que pueden ayudar a posicionar mejor una web.',
    temary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur fugiat saepe reprehenderit non amet esse, modi autem possimus nihil, accusantium ad? Adipisci accusantium corrupti cum qui laboriosam pariatur natus?',
    category: ['WordPress', 'SEO'],
    video: 'https://www.youtube.com/embed/3V01bDbIR0',
  },
];

Course.create(courses, (err) => {
  if (err) { throw (err); }
  mongoose.connection.close();
});
