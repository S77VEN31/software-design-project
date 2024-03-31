// Mongoose
import mongoose, { Schema } from "mongoose";

const groupModel = new Schema(
  {
    code: {
      type: String, // IC2021
      required: true,
      unique: true,
    },
    name: {
      type: String, // Ingeniería de la Computación
      required: true,
    },
    description: {
      type: String, // Grupo de estudiantes de Ingeniería de la Computación
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    coordinator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Group", groupModel);
