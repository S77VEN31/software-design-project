// Mongoose
import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: Buffer,
    },
    name: {
      type: String,
    },
    carne: {
      type: String,
    },
    phone: {
      type: String,
    },
    carrer: {
      type: Schema.Types.ObjectId,
      ref: "Carrer",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userModel);
