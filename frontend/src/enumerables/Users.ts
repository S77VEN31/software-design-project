// Types
import { Admin, AdminAssistant, Student, Teacher } from "@enumerables";

const DefaultTeacher: Teacher = {
  idNumber: "",
  userName: "",
  email: "",
  roles: ["Teacher"],
  password: "",
  name: "",
  campusBranch: [],
  career: [],
};

const TeacherFields = [
  {
    id: "idNumber",
    label: "ID Number",
    type: "text",
  },
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "text",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "dropdown",
    options: [
      { value: "", label: "Select an option" },
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
  {
    id: "career",
    label: "Career",
    type: "dropdown",
    options: [
      { value: "", label: "Select an option" },
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
];

const DefaultStudent: Student = {
  carne: "",
  userName: "",
  email: "",
  roles: ["Student"],
  password: "",
  name: "",
  campusBranch: [],
  career: [],
};

const StudentFields = [
  {
    id: "carne",
    label: "Carne",
    type: "text",
  },
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "text",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "text",
  },
  {
    id: "career",
    label: "Career",
    type: "text",
  },
];

const DefaultAdmin: Admin = {
  idNumber: "",
  userName: "",
  email: "",
  roles: ["Admin"],
  password: "",
  name: "",
};

const AdminFields = [
  {
    id: "idNumber",
    label: "ID Number",
    type: "text",
  },
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "text",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
  },
];

const DefaultAdminAssistant: AdminAssistant = {
  idNumber: "",
  userName: "",
  email: "",
  roles: ["AdminAssistant"],
  password: "",
  name: "",
};

const AdminAssistantFields = [
  {
    id: "idNumber",
    label: "ID Number",
    type: "text",
  },
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "text",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
  },
];

export {
  AdminAssistantFields,
  AdminFields,
  DefaultAdmin,
  DefaultAdminAssistant,
  DefaultStudent,
  DefaultTeacher,
  StudentFields,
  TeacherFields,
};
