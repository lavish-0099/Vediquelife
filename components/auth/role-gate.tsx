"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import Loader from "@/components/loader/loader";
import { useCurrentPermissions } from "@/hooks/use-current-permissions";
import { useEffect, useState } from "react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string[];
  requiredPermissions?: string;
}

export const RoleGate = ({
  children,
  allowedRole,
  requiredPermissions,
}: RoleGateProps) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const role = useCurrentRole();
  const { hasPermission, loading: permissionsLoading } =
    useCurrentPermissions();

  useEffect(() => {
    if (permissionsLoading) return;

    const roleAllowed = allowedRole.length === 0 || allowedRole.includes(role!);

    const permissionAllowed =
      requiredPermissions === undefined || hasPermission(requiredPermissions);

    setHasAccess(roleAllowed && permissionAllowed);
  }, [role, permissionsLoading, allowedRole, requiredPermissions]);

  if (hasAccess === false) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
  // return hasAccess === null ? <Loader /> : <>{children}</>;
};
