// Types
import {
  AdminPermissions,
  AdministrativeAssistantPermissions,
  CoordinatorPermissions,
  StudentPermissions,
  TeacherPermissions,
} from "../../enums/permissions";
import { Permission, Role } from "../../types";
// Interfaces
interface PermissionStrategy {
  getPermissions(): Permission[];
}

class TeacherStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return TeacherPermissions;
  }
}

class CoordinatorStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return CoordinatorPermissions;
  }
}

class StudentStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return StudentPermissions;
  }
}

class AdministrativeAssistantStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return AdministrativeAssistantPermissions;
  }
}

class AdminStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return AdminPermissions;
  }
}

class PermissionManager {
  private static roleStrategyMap: { [role: string]: PermissionStrategy } = {
    Teacher: new TeacherStrategy(),
    Student: new StudentStrategy(),
    AdministrativeAssistant: new AdministrativeAssistantStrategy(),
    Admin: new AdminStrategy(),
    Coordinator: new CoordinatorStrategy(),
  };

  public static getPermissionsByRoles(roles: Role[]): Permission[] {
    return roles.reduce<Permission[]>((acc, role) => {
      const strategy = this.roleStrategyMap[role];
      if (!strategy) {
        throw new Error(`No strategy defined for role: ${role}`);
      }
      return acc.concat(strategy.getPermissions());
    }, []);
  }
}

export { PermissionManager };

