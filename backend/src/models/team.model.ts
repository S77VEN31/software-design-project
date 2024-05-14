// Mongoose
import mongoose, { Schema } from "mongoose";

const teamModel = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    year: {
      type: String,
      required: true,
    },
    campusBranch: [
      { type: Schema.Types.ObjectId, ref: "CampusBranch", required: true },
    ],
    career: [{ type: Schema.Types.ObjectId, ref: "Career", required: true }],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    coordinator: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Team", teamModel);
