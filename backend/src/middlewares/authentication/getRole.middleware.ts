// Types
import { Role } from "../../types";
// Interfaces
interface RoleStrategy {
  assignRole(): Role;
}

class TeacherStrategy implements RoleStrategy {
  assignRole(): Role {
    return "Teacher";
  }
}

class StudentStrategy implements RoleStrategy {
  assignRole(): Role {
    return "Student";
  }
}

class AdministrativeAssistantStrategy implements RoleStrategy {
  assignRole(): Role {
    return "AdminAssistant";
  }
}

class AdminStrategy implements RoleStrategy {
  assignRole(): Role {
    return "Admin";
  }
}

class RoleManager {
  private static strategyMap: { [key: string]: RoleStrategy } = {
    "@itcr.ac.cr": new TeacherStrategy(),
    "@estudiantec.cr": new StudentStrategy(),
    "@aaitcr.ac.cr": new AdministrativeAssistantStrategy(),
    "@aitcr.ac.cr": new AdminStrategy(),
  };

  public static getRole(email: string): string {
    const domain = Object.keys(this.strategyMap).find((domain) =>
      email.endsWith(domain)
    );
    if (!domain) {
      throw new Error(`Invalid email domain for role assignment: ${email}`);
    }
    return this.strategyMap[domain].assignRole();
  }
}

export { RoleManager };

