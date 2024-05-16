// Mongoose
import mongoose, { Schema } from "mongoose";

const commentModel = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Comment", commentModel);
