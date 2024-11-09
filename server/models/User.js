const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // Makes the field mandatory
  },
  userEmail: {
    type: String,
    required: true, // Makes the field mandatory
    unique: true,   // Ensures no duplicate emails
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: true, // Makes the field mandatory
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"], // Validates roles
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);