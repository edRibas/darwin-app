import mongoose from "mongoose";

// Define the Thread schema
const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model, indicating the author of the thread
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community", // Reference to the Community model, indicating the community to which the thread belongs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String, // Optional field to represent the parent thread (if this is a reply)
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // Reference to other Thread models, representing child threads (replies)
    },
  ],
});

// Create a Mongoose model named "Thread" based on the schema
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
