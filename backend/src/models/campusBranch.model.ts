// Mongoose
import mongoose, { Schema } from "mongoose";

const campusBranchModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    careers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Career",
      },
    ],
  },
  { timestamps: true }
);
campusBranchModel.index({ location: "2dsphere" });
export default mongoose.model("CampusBranch", campusBranchModel);
