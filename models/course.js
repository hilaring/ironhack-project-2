const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: [] }, // Ej.: 'Desarrollo web', 'SEO'...
  lessons: {
    name: { type: String, required: true },
    description: String,
    url: String,
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },∫
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
