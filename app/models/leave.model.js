const mongoose = require("mongoose");

const Leave = mongoose.model(
  "Leave",
  new mongoose.Schema({
    from_date: {
        type : String,
        required: true
    },
    to_date: {
        type : String,
        required: true
    },
    type: {
      type: String, // String type
      required: true,
    },
    cause: {
        type: String, // String type
        required: true,
    },
    status: {
      type: String, // String type
      required: true,
    },
    noofDays: {
      type: String, // String type
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  })
);

module.exports = Leave;
