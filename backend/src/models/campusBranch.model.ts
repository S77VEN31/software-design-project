// Mongoose
import mongoose, { Schema } from "mongoose";

const CampusBranchModel = new Schema(
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
    carrers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Carrer",
      },
    ],
  },
  { timestamps: true }
);
CampusBranchModel.index({ location: "2dsphere" });
export default mongoose.model("CampusBranch", CampusBranchModel);
