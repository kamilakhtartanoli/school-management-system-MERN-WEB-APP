const mongoose = require("mongoose");

const teacherschema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
},{timestamps:true});

const Teacher = mongoose.model("Teacher", teacherschema);

module.exports = {
  Teacher,
};
