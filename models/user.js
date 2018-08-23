const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  lastname: String,
  birth: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: Number,
  stats: [
    {
      courses: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      checked: { type: Boolean, default: false },
    }] // eslint-disable-line
  }, { // eslint-disable-line
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
