// Types
import { Permission, Role } from "../../types";
// Interfaces
interface PermissionStrategy {
  getPermissions(): Permission[];
}

class TeacherStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return [
      {
        slug: "/teacher/get",
        description: "Get teacher",
        type: "GET",
        selector: "TEACHER",
      },
      {
        slug: "/teacher/put",
        description: "Put teacher",
        type: "PUT",
        selector: "TEACHER",
      },
      {
        slug: "/teacher/delete",
        description: "Delete teacher",
        type: "DELETE",
        selector: "TEACHER",
      },
    ];
  }
}

class CoordinatorStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return [
      {
        slug: "/team/get",
        description: "Get team",
        type: "GET",
        selector: "TEAM",
      },
      {
        slug: "/team/put",
        description: "Put team",
        type: "PUT",
        selector: "TEAM",
      },
    ];
  }
}

class StudentStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return [
      {
        slug: "/teacher/get",
        description: "Get teacher",
        type: "GET",
        selector: "TEACHER",
      },
      {
        slug: "/teams/get",
        description: "Get teams",
        type: "GET",
        selector: "TEAMS",
      },
    ];
  }
}

class AdministrativeAssistantStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return [
      {
        slug: "/teachers/get",
        description: "Get teachers",
        type: "GET",
        selector: "TEACHERS",
      },
      {
        slug: "/teacher/get",
        description: "Get teacher",
        type: "GET",
        selector: "TEACHER",
      },
      {
        slug: "/teacher/post",
        description: "Post teachers",
        type: "POST",
        selector: "TEACHER",
      },
      {
        slug: "/teacher/put",
        description: "Put teacher",
        type: "PUT",
        selector: "TEACHER",
      },
      {
        slug: "/teacher/delete",
        description: "Delete teacher",
        type: "DELETE",
        selector: "TEACHER",
      },
    ];
  }
}

class AdminStrategy implements PermissionStrategy {
  getPermissions(): Permission[] {
    return [
      {
        slug: "/teacher/post",
        description: "Post teachers",
        type: "POST",
        selector: "TEACHER",
      },
    ];
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

