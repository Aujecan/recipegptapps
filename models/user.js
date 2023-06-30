// user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// // Add a method to validate the user's password
// userSchema.methods.validatePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// Create User model using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;