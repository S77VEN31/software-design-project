// Mongoose
import mongoose, { Schema } from "mongoose";

const ScheduleModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Schedule", ScheduleModel);
