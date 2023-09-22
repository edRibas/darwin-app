import mongoose from "mongoose";

// Define the Community schema
const communitySchema = new mongoose.Schema({
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
  image: String, // URL or path to the community's image
  bio: String,   // A short description or bio of the community
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model, indicating the user who created the community
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // Reference to the Thread model, representing threads associated with the community
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model, representing members of the community
    },
  ],
});

// Create a Mongoose model named "Community" based on the schema
const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
