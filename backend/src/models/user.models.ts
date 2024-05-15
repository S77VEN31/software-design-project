import mongoose, { Schema } from "mongoose";

// Esquema base para todos los usuarios
const baseUserSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
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
      required: true,
    },
    phones: [
      {
        type: String,
        trim: true,
      },
    ],
    roles: {
      required: true,
      type: [String],
      enum: ["Admin", "Teacher", "Student", "Coordinator", "AdminAssistant"],
    },
  },
  { timestamps: true, discriminatorKey: "type" }
);

const User = mongoose.model("User", baseUserSchema);

// Discriminadores
const AdminUser = User.discriminator(
  "AdminUser",
  new Schema({
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

const TeacherUser = User.discriminator(
  "TeacherUser",
  new Schema({
    description: { type: String },
    campusBranch: [
      { type: Schema.Types.ObjectId, ref: "CampusBranch", required: true },
    ],
    career: [{ type: Schema.Types.ObjectId, ref: "Career", required: true }],
    idNumber: { type: String, required: true, unique: true },
    coordinatorId: {
      type: String,
    },
  })
);

const StudentUser = User.discriminator(
  "StudentUser",
  new Schema({
    description: { type: String },
    campusBranch: [
      { type: Schema.Types.ObjectId, ref: "CampusBranch", required: true },
    ],
    career: [{ type: Schema.Types.ObjectId, ref: "Career", required: true }],
    carne: { type: String, required: true, unique: true },
  })
);

const AdminAssistantUser = User.discriminator(
  "AdminAssistantUser",
  new Schema({
    campusBranch: [
      {
        type: Schema.Types.ObjectId,
        ref: "CampusBranch",
        required: true,
      },
    ],
    idNumber: { type: String, required: true, unique: true },
  })
);

// Exportación de modelos
export { AdminAssistantUser, AdminUser, StudentUser, TeacherUser, User };

