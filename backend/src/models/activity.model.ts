import mongoose, { Schema } from "mongoose";

const activityModel = new Schema(
  {
    week: {
      type: Number,
      required: true,
      min: 1,
      max: 18,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Orientation",
        "Motivational",
        "Support",
        "Technical",
        "Recreational",
      ],
    },
    name: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    organizers: [
      {
        type: Schema.Types.ObjectId,
        ref: "TeacherUser",
      },
    ],
    announcementDays: Number,
    reminderDays: Number,
    mode: {
      type: String,
      enum: ["Online", "Presential"],
      required: true,
    },
    meetingLink: String,
    poster: Buffer,
    status: {
      type: String,
      enum: ["Planned", "Notified", "Realized", "Canceled"],
      required: true,
    },
    evidence: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Activity", activityModel);
