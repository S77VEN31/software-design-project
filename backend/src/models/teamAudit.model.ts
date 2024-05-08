// Mongoose
import mongoose, { Schema } from "mongoose";

const teamAuditModel = new Schema(
  {
    groupCode: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Group",
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
