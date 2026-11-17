import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
const getRoleIdByName = async (roleName: string) => {
  if (!roleName) return null;

  const role = await db.role.findUnique({
    where: { name: roleName },
  });

  return role?.id || null;
};

const getRolePermissions = async (roleId: string) => {
  if (!roleId) return new Set<string>();

  const roleWithPermissions = await db.role.findUnique({
    where: { id: roleId },
    include: {
      RolePermission: {
        include: {
          permission: true,
        },
      },
    },
  });

  if (!roleWithPermissions) {
    console.error("Role not found for ID:", roleId);
    return new Set<string>();
  }

  // ✅ Format permissions in "module:action" format
  return new Set(
    roleWithPermissions.RolePermission.map(
      (rp) => `${rp.permission.module}:${rp.permission.action}`
    )
  );
};
export const currentPermissions = async () => {
  const session = await auth();
  const roleName = session?.user?.role;

  if (!roleName) {
    return { permissions: new Set(), hasPermission: () => false };
  }

  // ✅ Fetch Role ID using roleName
  const roleId = await getRoleIdByName(roleName);
  if (!roleId) {
    console.error("No role found for", roleName);
    return { permissions: new Set(), hasPermission: () => false };
  }

  // ✅ Fetch Permissions by Role ID
  const permissions = await getRolePermissions(roleId);

  // ✅ Check Permission Utility
  const hasPermission = (permission: string) => permissions.has(permission);

  return { permissions, hasPermission };
};
