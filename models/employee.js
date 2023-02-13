let mongoose = require("mongoose");


// Define the employee schema
let employeeSchema =  mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    contactNumber: String,
    dob: Date,
    address: String
  });

  let employee = module.exports = mongoose.model('employee', employeeSchema )