const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: String,
  resume: { type: String, required: true },
  temary: { type: String, required: true },
  category: { type: String, required: true, enum: [] }, // Ej.: 'Desarrollo web', 'SEO'...
  video: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // lessons: [
  //   {
  //     name: { type: String, required: true },
  //     description: String,
  //     video: String,
  //   }] // eslint-disable-line
  // }, { // eslint-disable-line
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
