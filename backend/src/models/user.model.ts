// Mongoose
import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
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
      trim: true,
    },
    carne: {
      type: String,
      // unique: true,
    },
    phones: [
      {
        type: String,
        trim: true,
      },
    ],
    carrer: {
      type: Schema.Types.ObjectId,
      ref: "Carrer",
    },
    campusBranch: {
      type: Schema.Types.ObjectId,
      ref: "CampusBranch",
    },
    description: {
      type: String,
    },
    roles: [
      {
        type: String,
        enum: [
          "Admin",
          "Professor",
          "Student",
          "Coordinator",
          "AdministrativeAssistant",
        ],
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("User", userModel);
