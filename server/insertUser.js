require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define your schema (assuming a `User` model)
const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: { type: String, unique: true, required: true }, // Ensure uniqueness
  password: String,
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'], // Add enum validation for role
    required: true
  },
  __v: Number
});


const User = mongoose.model('User', userSchema);

// Insert new user
const insertUser = async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI);
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ userEmail: '22bt04120@gsfcuniversity.ac.in' });
      if (existingUser) {
        console.log('User with this email already exists:', existingUser.userEmail);
        return;
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash('pratik123', 10);
  
      // Create new user object
      const newUser = {
        userName: 'John Doe',
        userEmail: 'john@example.com',
        role: 'student' // Check where this might be set to 'user'
      };
      
      console.log('Inserting role:', newUser.role);

      // Save to MongoDB
      await newUser.save();
      console.log('User inserted successfully');
    } catch (error) {
      if (error.code === 11000 && error.keyValue && error.keyValue.userEmail) {
        console.log('Duplicate email error:', error.keyValue.userEmail);
      } else if (error.code === 11000) {
        console.log('Duplicate error:', error.keyValue); // Fallback for other duplicate fields
      } else {
        console.error('Error inserting user:', error);
      }
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();
    }
  };
  
// Call the function to insert the user
insertUser();
