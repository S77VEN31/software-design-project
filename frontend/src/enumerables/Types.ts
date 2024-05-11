export type Permission = {
  slug: string;
  description: string;
  type: string;
  selector: string;
};

export type Role = "Teacher" | "Student" | "AdminAssistant" | "Admin";

export type Teacher = {
  idNumber: string;
  userName: string;
  email: string;
  roles: Role[];
  password: string;
  name: string;
  campusBranch: string[];
  career: string[];
};

export type Student = {
  carne: string;
  userName: string;
  email: string;
  roles: Role[];
  password: string;
  name: string;
  campusBranch: string[];
  career: string[];
};

export type Admin = {
  idNumber: string;
  userName: string;
  email: string;
  roles: Role[];
  password: string;
  name: string;
};

export type AdminAssistant = {
  idNumber: string;
  userName: string;
  email: string;
  roles: Role[];
  password: string;
  name: string;
};
