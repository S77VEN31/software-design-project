export type Role =
  | "Teacher"
  | "Student"
  | "AdministrativeAssistant"
  | "Admin"
  | "Coordinator";

export type Permission = {
  slug: string;
  description: string;
  type: string;
  selector: string;
};
