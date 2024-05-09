export type Role = "Teacher" | "Student" | "AdminAssistant" | "Admin";

export type Permission = {
  slug: string;
  description: string;
  type: string;
  selector: string;
};
