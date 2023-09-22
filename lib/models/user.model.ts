import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String, // Optional field for the user's image
  bio: String,   // Optional field for the user's bio
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // Reference to the "Thread" model, indicating threads authored by the user
    },
  ],
  onboarded: {
    type: Boolean,
    default: false, // Default value for whether the user has completed onboarding
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // Reference to the "Community" model, indicating communities the user is a member of
    },
  ],
});

// Create a Mongoose model named "User" based on the schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
