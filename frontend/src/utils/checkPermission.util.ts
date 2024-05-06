// Types
import { Permission } from "@enumerables";

export const checkPermission = (
  permissions: Permission[],
  selector: string,
  type: string
) => {
  return permissions.some(
    (permission) => permission.selector === selector && permission.type === type
  );
};
