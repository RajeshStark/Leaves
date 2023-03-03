const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String, // String type
      required: true,
    },
    email: {
      type: String, // String type
      required: true,
    },
    password: {
      type: String, // String type
      required: true,
    },
    role: {
      type: String, // String type
      default: 'user',
    },
    token : {
      type: String, // String type
      required: true,
    }
  })
);

module.exports = User;
