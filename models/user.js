const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  lastname: String,
  age: Number,
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true },
  stats: [
    {
      courses: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      checked: { type: Boolean, default: false },
    },
  ],
  // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
