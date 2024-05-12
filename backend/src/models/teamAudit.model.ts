// Mongoose
import mongoose, { Schema } from "mongoose";

const teamAuditModel = new Schema(
  {
    teamCode: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    change: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("TeamAudit", teamAuditModel);
