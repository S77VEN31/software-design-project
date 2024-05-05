// Strategy interface
interface RoleStrategy {
  assignRole(): string;
}

// Concrete strategies for each user type
class ProfessorStrategy implements RoleStrategy {
  assignRole(): string {
    return "Professor";
  }
}

class StudentStrategy implements RoleStrategy {
  assignRole(): string {
    return "Student";
  }
}

class AdministrativeAssistantStrategy implements RoleStrategy {
  assignRole(): string {
    return "AdministrativeAssistant";
  }
}

class AdminStrategy implements RoleStrategy {
  assignRole(): string {
    return "Admin";
  }
}

// Context that uses the strategy
class RoleContext {
  private strategy: RoleStrategy;

  constructor(strategy: RoleStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: RoleStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(): string {
    return this.strategy.assignRole();
  }
}

// Mapping of domains to strategies
const strategyMap: { [key: string]: RoleStrategy } = {
  "@itcr.ac.cr": new ProfessorStrategy(),
  "@estudiantec.cr": new StudentStrategy(),
  "@aaitcr.ac.cr": new AdministrativeAssistantStrategy(),
  "@aitcr.ac.cr": new AdminStrategy(),
};

// Helper function to determine strategy based on email
const getRole = (email: string): RoleStrategy => {
  const domain = Object.keys(strategyMap).find((domain) =>
    email.endsWith(domain)
  );
  if (!domain) {
    throw new Error("Invalid email domain for role assignment");
  }
  return strategyMap[domain];
};

// Export the getRole function and RoleContext class
export { RoleContext, getRole };
