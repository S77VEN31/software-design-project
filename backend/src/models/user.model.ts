// Mongoose
import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
      required: true,
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
      required: true,
      trim: true,
    },
    carne: {
      type: String,
      unique: true,
      required: true,
    },
    phones: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    carrer: {
      type: Schema.Types.ObjectId,
      ref: "Carrer",
      required: true,
    },
    campusBranch: {
      type: Schema.Types.ObjectId,
      ref: "CampusBranch",
      required: true,
    },
    description: {
      type: String,
    },
    roles: [
      {
        required: true,
        type: String,
        enum: [
          "Admin",
          "ProfessorGuide",
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
