export const addRoleToParams =
  (role: string) => (req: any, res: any, next: any) => {
    req.params.role = role;
    next();
  };
