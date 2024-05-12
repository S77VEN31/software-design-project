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

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

const TeacherFields = [
  {
    id: "idNumber",
    label: "ID Number",
    type: "text",
    section: "Teacher Information",
    fullWidth: true,
    inputProps: {
      maxLength: 9,
      minLength: 9,
    },
    // valitation must be 9 digits numeric strictly
    validation: (value: string) => value === "" || /^\d{9}$/.test(value),
    helperText: "ID Number must have 9 digits",
    required: true,
  },
  {
    id: "userName",
    label: "Username",
    type: "text",
    section: "Teacher Information",
    fullWidth: true,
    inputProps: {
      maxLength: 20,
      minLength: 4,
    },
    validation: (value: string) => value === "" || value.length >= 4,
    helperText: "Username must have at least 4 characters",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    section: "Teacher Contact",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    validation: (value: string) =>
      value === "" || value.endsWith("@itcr.ac.cr"),
    helperText: "Email must end with @itcr.ac.cr",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    section: "Teacher Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
      minLength: 8,
    },
    validation: (value: string) => value === "" || passwordRegex.test(value),
    helperText:
      "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
    required: true,
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Teacher Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    required: true,
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "dropdown",
    section: "Teacher Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "career",
    label: "Career",
    type: "dropdown",
    section: "Teacher Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    section: "About",
    multiline: true,
    rows: 4,
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
  },
  {
    id: "roles",
    label: "Coordinator",
    type: "checkbox",
    section: "Roles",
    fullWidth: true,
  },
];

const TeacherUpdateFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Teacher Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    required: true,
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "dropdown",
    section: "Teacher Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "career",
    label: "Career",
    type: "dropdown",
    section: "Teacher Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "description",
    label: "Description",
    type: "textarea",
    section: "About",
    multiline: true,
    rows: 4,
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
  },
  {
    id: "roles",
    label: "Coordinator",
    type: "checkbox",
    section: "Roles",
    fullWidth: true,
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
    section: "Student Information",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 10,
      minLength: 10,
    },
    validation: (value: string) => value === "" || /^\d{10}$/.test(value),
    helperText: "Carne must have 10 digits",
  },
  {
    id: "userName",
    label: "Username",
    type: "text",
    section: "Student Information",
    fullWidth: true,
    inputProps: {
      maxLength: 20,
      minLength: 4,
    },
    validation: (value: string) => value === "" || value.length >= 4,
    helperText: "Username must have at least 4 characters",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    section: "Student Contact",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    validation: (value: string) =>
      value === "" || value.endsWith("@estudiantec.cr"),
    helperText: "Email must end with @estudiantec.cr",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    section: "Student Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
      minLength: 8,
    },
    validation: (value: string) => value === "" || passwordRegex.test(value),
    helperText:
      "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
    required: true,
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Student Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    required: true,
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "dropdown",
    section: "Student Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "career",
    label: "Career",
    type: "dropdown",
    section: "Student Information",
    fullWidth: true,
    required: true,
  },
];

const StudentUpdateFields = [
  {
    id: "carne",
    label: "Carne",
    type: "text",
    section: "Student Information",
    fullWidth: true,
    required: true,
    inputProps: {
      maxLength: 10,
      minLength: 10,
    },
    validation: (value: string) => value === "" || /^\d{10}$/.test(value),
    helperText: "Carne must have 10 digits",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    section: "Student Information",
    fullWidth: true,
    inputProps: {
      maxLength: 100,
    },
    required: true,
  },
  {
    id: "campusBranch",
    label: "Campus Branch",
    type: "dropdown",
    section: "Student Information",
    fullWidth: true,
    required: true,
  },
  {
    id: "career",
    label: "Career",
    type: "dropdown",
    section: "Student Information",
    fullWidth: true,
    required: true,
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
  StudentUpdateFields,
  TeacherFields,
  TeacherUpdateFields,
};

