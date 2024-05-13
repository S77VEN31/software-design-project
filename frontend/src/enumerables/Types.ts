export type Permission = {
  slug: string;
  description: string;
  type: string;
  selector: string;
};

export type Role =
  | "Teacher"
  | "Student"
  | "AdminAssistant"
  | "Admin"
  | "Coordinator";

export type Teacher = {
  active?: boolean;
  idNumber?: string;
  userName?: string;
  email?: string;
  roles: Role[];
  password?: string;
  name: string;
  campusBranch: string[];
  career: string[];
  phones: string[];
};

export type Student = {
  active?: boolean;
  carne?: string;
  userName?: string;
  email?: string;
  roles: Role[];
  password?: string;
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

export type Location = {
  type: string;
  coordinates: [number, number];
};

export type Career = {
  _id: string;
  name: string;
  code: string;
  __v: number;
};

export type CampusBranch = {
  location: Location;
  _id: string;
  name: string;
  initials: string;
  code: string;
  careers: Career[];
};

export type FormData = Student | Teacher;

export type Field = {
  id: string;
  disabled?: boolean;
  label?: string;
  options?: { value: string; label: string }[];
  type: string;
  section: string;
  fullWidth?: boolean;
  inputProps?: { maxLength?: number; minLength?: number };
  validation?: (value: string) => boolean;
  helperText?: string;
  required?: boolean;
};
