import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
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
  { timestamps: true }
);
const User = mongoose.model("User", userModel);

const adminUserModel = userModel.clone();
adminUserModel.add({
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
});
const AdminUser = mongoose.model("AdminUser", adminUserModel);

const adminAssistantUserModel = userModel.clone();
adminAssistantUserModel.add({
  campusBranch: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "CampusBranch",
    },
  ],
});
const AdminAssistantUser = mongoose.model(
  "AdminAssistantUser",
  adminAssistantUserModel
);

const teacherUserModel = userModel.clone();
teacherUserModel.add({
  description: {
    type: String,
  },
  campusBranch: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "CampusBranch",
    },
  ],
  carrer: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Carrer",
    },
  ],
  idNumber: {
    required: true,
    type: String,
  },
});
const TeacherUser = mongoose.model("TeacherUser", teacherUserModel);

const studentUserModel = userModel.clone();
studentUserModel.add({
  description: {
    type: String,
  },
  campusBranch: [
    {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "CampusBranch",
    },
  ],
  carrer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Carrer",
      required: true,
    },
  ],
  carne: {
    type: String,
    required: true,
  },
});
const StudentUser = mongoose.model("StudentUser", studentUserModel);

export { AdminAssistantUser, AdminUser, StudentUser, TeacherUser, User };
