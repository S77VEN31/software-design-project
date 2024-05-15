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

  export type Statuses = "active" | "inactive";
  export type Teacher = {
    _id?: string;
    status?: Statuses;
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
    _id?: string;
    status?: Statuses;
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
    status?: Statuses;
    idNumber: string;
    userName: string;
    email: string;
    roles: Role[];
    password: string;
    name: string;
  };

  export type AdminAssistant = {
    status?: Statuses;
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

  export type TeamOverview = {
    _id: string;
    name: string;
    code: string;
    description: string;
  };

  export type Activity = {
    _id: string;
    name: string;
    code: string;
    description: string;
  };

  export type CampusBranch = {
    location: Location;
    _id: string;
    name: string;
    initials: string;
    code: string;
    careers: Career[];
  };

  export type Option = {
    label: string;
    value: string;
  };

  export type Schedule = {
    name: string;
    status?: Statuses;
    startDate: string;
    endDate: string;
    teams: string[];
    activities: string[];
  };

export type Team = {
  name: string;
  code: string;
  year: string;
  description: string;
  students: string[];
  teachers: string[];
  coordinator: string[];
};

export type FormData = Student | Teacher | Schedule | Team;  

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
